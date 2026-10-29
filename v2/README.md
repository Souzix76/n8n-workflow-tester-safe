# n8n-workflow-tester-safe v2

This directory is the strategic product line for the v2 version of the project.

The v2 is intentionally separated from the v1 implementation and exists on branch `v2/production-safe-qa`.

## Product identity

`n8n-workflow-tester-safe v2` is a production-safe QA, validation, and operational diagnosis platform for n8n workflows.

It is not a broader admin wrapper and it is not an autonomous destructive agent. It is a governed, evidence-driven platform centered on:

- safe validation before release
- workflow health assessment
- operational diagnostics and regression detection
- environment-aware execution checks
- recommendation with traceable evidence
- read-only-by-default governance

## Strategic goals

1. Validate workflow health before production use
2. Detect operational risk early and with evidence
3. Explain why a workflow failed and where it failed
4. Recommend fixes based on context, not guesses
5. Keep all workflows and automation actions within safe boundaries

## Non-goals

- credential lifecycle management
- secret administration
- autonomous repair loops
- destructive workflow recovery
- uncontrolled mutation of production workflows

## Core principles

- Read-only by default
- Dry-run for any mutation path
- Human approval for dangerous actions
- Structured diagnostics over raw logs
- Environment-aware validation
- Production safety over feature volume

## v2 pillars

### 1. Production-safe validation
Interpret workflow results in the context of the operating environment, not just local success.

### 2. Workflow health scoring
Move from simple pass/fail to a quality model with categories such as:

- reliability
- data integrity
- compatibility
- operational risk
- maintainability

### 3. Operational diagnosis
Capture enough evidence to answer:

- what failed
- where it failed
- whether it is a logic issue, infrastructure issue, or data issue
- whether the issue matches a pattern seen before

### 4. Recommendation engine
Provide actionable recommendations based on:

- execution evidence
- previous failures
- workflow structure
- environment context
- known compatibility patterns

### 5. Governance and reporting
Generate reports that are useful to:

- engineers
- QA teams
- operators
- CI pipelines
- release reviews

## Scope for the v2 branch

The v2 branch focuses on:

- architecture and product strategy
- safe validation engine
- workflow health and risk analysis
- reports and evidence
- recommendation and compatibility checks
- CI readiness and professional CLI workflows

The v1 project remains untouched and continues as the stable baseline.
