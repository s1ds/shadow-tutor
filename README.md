# shadow-tutor

A UTCP (Universal Tool Calling Protocol) client implementation for shadow tutoring with MCP (Model Context Protocol) integration.

## Features

- 🚀 Easy-to-use UTCP client wrapper
- 🔧 Support for multiple MCP servers
- 📦 TypeScript support with full type definitions
- 💡 Comprehensive examples and documentation

## Installation

```bash
npm install
```

## Quick Start

### Basic Usage

```typescript
import { CodeModeUtcpClient } from '@utcp/code-mode';

const client = await CodeModeUtcpClient.create();                    // 1. Initialize
await client.registerManual({ name: 'github', /* MCP config */ });  // 2. Add tools
const { result } = await client.callToolChain(`/* TypeScript */`);   // 3. Execute code
```

### Using the Wrapper Class

```typescript
import { ShadowTutorClient } from './src/client.js';

const client = new ShadowTutorClient();
await client.initialize();

const result = await client.executeCode(`
  console.log('Hello from Shadow Tutor!');
  return { message: 'Success!' };
`);
```

## Configuration

### MCP Server Integration

Configure MCP servers during client initialization:

```typescript
const client = new ShadowTutorClient({
  mcpServers: [
    {
      name: 'github',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN
      }
    }
  ]
});

await client.initialize();
```

### Multiple MCP Servers

```typescript
const client = new ShadowTutorClient({
  mcpServers: [
    { name: 'github', /* github config */ },
    { name: 'filesystem', /* filesystem config */ },
    { name: 'database', /* database config */ }
  ]
});
```

## Examples

Run the included examples:

```bash
# Basic example
npm run dev

# With GitHub integration
npm run dev examples github

# Multiple MCP servers
npm run dev examples multiple
```

## API Reference

### `ShadowTutorClient`

#### Constructor

```typescript
constructor(config?: UtcpClientConfig)
```

#### Methods

- `initialize(): Promise<void>` - Initialize the UTCP client
- `executeCode(code: string): Promise<unknown>` - Execute TypeScript code
- `getClient(): CodeModeUtcpClient` - Get the underlying client instance
- `isInitialized(): boolean` - Check initialization status

## Project Structure

```
shadow-tutor/
├── src/
│   ├── index.ts      # Main entry point
│   ├── client.ts     # Client wrapper class
│   └── examples.ts   # Usage examples
├── package.json
├── tsconfig.json
└── README.md
```

## Development

```bash
# Type checking
npm run type-check

# Build
npm run build

# Run development mode
npm run dev
```

## Environment Variables

- `GITHUB_TOKEN` - GitHub personal access token (for GitHub MCP integration)

## License

MIT
