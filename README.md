# n8n-workflow-tester-safe

Safe MCP server + CLI for testing, inspecting, and operating n8n workflows with a deliberately constrained scope.

## Overview

`n8n-workflow-tester-safe` is a focused MCP server for n8n operators and agents who want:

- workflow testing
- execution inspection
- lightweight workflow operations
- node catalog lookup
- a smaller and safer surface than a broad unrestricted admin wrapper

It supports both **MCP over stdio** and a **local CLI** for config-driven test runs.

## Features

### Testing
- run workflow tests by webhook or execute endpoint
- evaluate output and attach scoring
- run suites of payloads from JSON config
- summarize workflows before/after changes

### Operations
- create workflow
- update workflow
- delete workflow
- add node to workflow
- connect nodes

### Introspection
- list node types
- inspect a specific node type
- list executions
- fetch full execution data
- build lightweight execution traces

### Catalog helpers
- search imported node catalog
- list triggers
- validate node types
- suggest nodes for natural-language tasks

## Safety posture

This repo is intentionally limited.

### Included
- test execution
- workflow inspection
- basic workflow CRUD
- graph edits
- trace/debug helpers

### Excluded on purpose
- credentials management
- secrets lifecycle
- destructive restore flows
- autonomous LLM auto-fix loops

## Install

```bash
npm install
npm run build
```

## Configure

```bash
cp .env.example .env
```

Example:

```env
N8N_BASE_URL=http://127.0.0.1:5678
N8N_API_KEY=replace_me
N8N_DEFAULT_TIMEOUT_MS=30000
```

## CLI

Run all payloads from a config:

```bash
node dist/cli.js --config ./workflows/example.json
```

Run a single payload:

```bash
node dist/cli.js --config ./workflows/example.json --payload happy-path
```

## MCP

Run the MCP server over stdio:

```bash
node dist/index.js
```

## Main tools

- `test_workflow`
- `evaluate_workflow_result`
- `run_workflow_suite`
- `get_workflow_summary`
- `create_workflow`
- `update_workflow`
- `delete_workflow`
- `add_node_to_workflow`
- `connect_nodes`
- `list_node_types`
- `get_node_type`
- `list_executions`
- `get_execution`
- `get_execution_trace`
- `get_catalog_stats`
- `search_nodes`
- `list_triggers`
- `validate_node_type`
- `suggest_nodes_for_task`

## Docs

- [Setup](docs/SETUP.md)
- [Tools Reference](docs/TOOLS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)

## Project structure

```text
src/                  TypeScript source
catalog/              Imported node catalog assets
workflows/            Example test configs
docs/                 Documentation
dist/                 Build output
```

## Status

Working MVP.

Validated locally with:
- `npm install`
- `npm audit`
- `npm run build`

## License

MIT
