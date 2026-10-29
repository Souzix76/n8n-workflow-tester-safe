export interface ValidationIssue {
  path: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface ConfigRule {
  path: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  minLength?: number;
  regex?: RegExp | string;
  allowedValues?: unknown[];
}

export function getValueAtPath(input: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, input as Record<string, unknown>);
}

export function validateConfigShape(input: Record<string, unknown>, rules: ConfigRule[]): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const rule of rules) {
    const value = getValueAtPath(input, rule.path);

    if (rule.required && (value === undefined || value === null || value === '')) {
      issues.push({
        path: rule.path,
        message: `Required value is missing at '${rule.path}'.`,
        severity: 'error',
      });
      continue;
    }

    if (value === undefined || value === null) {
      continue;
    }

    if (rule.type && !matchesType(value, rule.type)) {
      issues.push({
        path: rule.path,
        message: `Expected type '${rule.type}' at '${rule.path}'.`,
        severity: 'error',
      });
    }

    if (typeof rule.minLength === 'number' && typeof value === 'string' && value.length < rule.minLength) {
      issues.push({
        path: rule.path,
        message: `Value at '${rule.path}' is shorter than expected minimum length (${rule.minLength}).`,
        severity: 'warning',
      });
    }

    if (rule.allowedValues && !rule.allowedValues.includes(value)) {
      issues.push({
        path: rule.path,
        message: `Value at '${rule.path}' is not in the allowed set.`,
        severity: 'warning',
      });
    }

    if (rule.regex) {
      const pattern = rule.regex instanceof RegExp ? rule.regex : new RegExp(String(rule.regex));
      if (typeof value === 'string' && !pattern.test(value)) {
        issues.push({
          path: rule.path,
          message: `Value at '${rule.path}' does not match the required pattern.`,
          severity: 'error',
        });
      }
    }
  }

  return {
    valid: issues.every((issue) => issue.severity !== 'error'),
    issues,
  };
}

function matchesType(value: unknown, type: ConfigRule['type']): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && Number.isFinite(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    default:
      return true;
  }
}

export function validateEnvironmentConfig(input: Record<string, unknown>): ValidationResult {
  return validateConfigShape(input, [
    { path: 'N8N_BASE_URL', required: true, type: 'string', regex: '^https?://', message: 'N8N_BASE_URL must be a valid URL.' },
    { path: 'N8N_API_KEY', required: true, type: 'string', minLength: 8 },
    { path: 'N8N_ENVIRONMENT', required: true, type: 'string', allowedValues: ['dev', 'staging', 'prod-safe', 'production'] },
  ]);
}
