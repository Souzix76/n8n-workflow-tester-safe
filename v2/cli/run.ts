import { buildDryRunPreview } from '../core/dry-run.js';
import { getEnvironmentPolicy } from '../core/policy.js';

export async function runV2Suite(environment: string): Promise<string> {
  const policy = getEnvironmentPolicy(environment);
  const preview = buildDryRunPreview('run_suite', environment);

  return [
    'v2 suite execution scaffold',
    `Environment: ${environment}`,
    `Policy: ${policy.defaultMode}`,
    `Preview: ${preview.preview}`,
    `Mutations allowed: ${String(policy.allowMutations)}`,
  ].join(' | ');
}
