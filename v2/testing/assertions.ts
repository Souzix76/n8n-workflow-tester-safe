export type AssertionOperator =
  | 'equals'
  | 'exists'
  | 'notEmpty'
  | 'contains'
  | 'regex'
  | 'deepEqual'
  | 'minLength'
  | 'path';

export interface AssertionRule {
  field: string;
  operator: AssertionOperator;
  value?: unknown;
  severity?: 'info' | 'warning' | 'error';
  message?: string;
}

export interface AssertionResult {
  field: string;
  passed: boolean;
  operator: AssertionOperator;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export function evaluateAssertion(data: unknown, rule: AssertionRule): AssertionResult {
  const severity = rule.severity ?? 'error';

  if (rule.operator === 'exists') {
    const passed = data !== undefined && data !== null;
    return {
      field: rule.field,
      passed,
      operator: rule.operator,
      message: passed ? 'Field exists.' : `Field '${rule.field}' does not exist.`,
      severity,
    };
  }

  return {
    field: rule.field,
    passed: true,
    operator: rule.operator,
    message: 'Assertion placeholder for v2 validation layer.',
    severity,
  };
}
