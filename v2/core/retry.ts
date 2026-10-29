export interface RetryPolicy {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  retryableStatusCodes: number[];
}

export const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 4,
  baseDelayMs: 250,
  maxDelayMs: 4000,
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
};

export function computeBackoffDelay(attempt: number, policy: RetryPolicy): number {
  const exponential = policy.baseDelayMs * Math.pow(2, attempt - 1);
  return Math.min(exponential, policy.maxDelayMs);
}

export function shouldRetry(statusCode?: number): boolean {
  if (!statusCode) {
    return false;
  }

  return defaultRetryPolicy.retryableStatusCodes.includes(statusCode);
}
