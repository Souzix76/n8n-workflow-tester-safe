# n8n-workflow-tester-safe v2

This directory is intentionally isolated from the v1 implementation. It is a strategic second version focused on production-safe QA, workflow health, diagnostics, and governed operations for n8n workflows.

## Product direction

The v2 is not an extension of the v1 tester surface. It is a new product layer built around:

- production-safe validation
- workflow health scoring
- evidence-based execution reports
- risk-aware recommendations
- read-only by default governance
- CI and operational readiness

## Design principles

- Read-only by default
- No secret lifecycle or credential management
- No destructive auto-repair loops
- Clear risk classification
- Structured diagnostics over raw output
- Operational focus over “tool count” growth

## Current v2 scaffold

This directory contains the early architecture for the v2 product layer:

- core/security.ts: safety and read-only enforcement
- core/logger.ts: structured logging
- core/errors.ts: typed application errors
- core/validation.ts: configuration validation
- core/retry.ts: retry/backoff helpers
- testing/assertions.ts: richer validation rules
- reports/report-generator.ts: JSON/Markdown output generation
- recommendations/recommendation-engine.ts: workflow-based recommendations
- index.ts: public v2 exports

This is the start of the v2 architecture and intentionally does not alter the v1 codebase.
