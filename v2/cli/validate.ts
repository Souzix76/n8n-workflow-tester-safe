import { evaluateSafetyPolicy } from './security.js';
import { validateEnvironmentConfig } from './validation.js';
import { checkN8nHealth } from './health.js';
import { getEnvironmentPolicy } from './policy.js';

export async function validateV2Project(env: Record<string, unknown>): Promise<string> {
  const validation = validateEnvironmentConfig(env);
  const policy = getEnvironmentPolicy(String(env.N8N_ENVIRONMENT ?? 'prod-safe'));
  const health = await checkN8nHealth(String(env.N8N_BASE_URL ?? ''));

  const safety = evaluateSafetyPolicy(
    {
      mode: 'read-only',
      allowMutations: false,
      environment: policy.environment,
    },
    'validate_workflow',
  );

  const summary = [
    'v2 validation: OK',
    `Environment policy: ${policy.environment}`,
    `Validation issues: ${validation.issues.length}`,
    `Health status: ${health.status}`,
    `Safety mode: ${safety.mode}`,
  ];

  return summary.join(' | ');
}
