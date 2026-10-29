import { evaluateSuite, type AssertionRule, type AssertionSuiteResult } from './assertions.js';

export interface SuiteExecutionInput {
  name: string;
  environment: string;
  input: Record<string, unknown>;
  rules: AssertionRule[];
}

export interface SuiteExecutionResult extends AssertionSuiteResult {
  name: string;
  environment: string;
  status: 'passed' | 'failed';
}

export function runValidationSuite({ name, environment, input, rules }: SuiteExecutionInput): SuiteExecutionResult {
  const result = evaluateSuite(input, rules);

  return {
    ...result,
    name,
    environment,
    status: result.passed ? 'passed' : 'failed',
  };
}
