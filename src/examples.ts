import { ShadowTutorClient } from './client.js';

/**
 * Example 1: Basic usage
 */
export async function basicExample() {
  const client = new ShadowTutorClient();
  await client.initialize();

  const { result, logs } = await client.executeCode(`
    const greeting = 'Hello from Shadow Tutor!';
    console.log(greeting);
    return greeting;
  `);

  console.log('Result:', result);
  console.log('Logs:', logs);
}

/**
 * Example 2: With GitHub MCP integration
 */
export async function githubExample() {
  const client = new ShadowTutorClient({
    mcpServers: [
      {
        name: 'github',
        call_template_type: 'mcp',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        env: {
          GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
        },
      },
    ],
  });

  await client.initialize();

  // Execute code that can use GitHub MCP tools
  const { result, logs } = await client.executeCode(`
    // Your TypeScript code that interacts with GitHub
    console.log('GitHub MCP tools are available');
    return { status: 'ready' };
  `);

  console.log('Result:', result);
  console.log('Logs:', logs);
}

/**
 * Example 3: Multiple MCP servers
 */
export async function multipleServersExample() {
  const client = new ShadowTutorClient({
    mcpServers: [
      {
        name: 'github',
        call_template_type: 'mcp',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        env: {
          GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
        },
      },
      {
        name: 'filesystem',
        call_template_type: 'mcp',
        // Add your filesystem server configuration
        // command: 'npx',
        // args: ['-y', '@modelcontextprotocol/server-filesystem']
      },
    ],
  });

  await client.initialize();

  const { result, logs } = await client.executeCode(`
    // Code with access to multiple MCP servers
    console.log('Multiple MCP servers available');
    return { servers: ['github', 'filesystem'] };
  `);

  console.log('Result:', result);
  console.log('Logs:', logs);
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const example = process.argv[2] || 'basic';

  switch (example) {
    case 'basic':
      await basicExample();
      break;
    case 'github':
      await githubExample();
      break;
    case 'multiple':
      await multipleServersExample();
      break;
    default:
      console.error(`Unknown example: ${example}`);
      console.log('Available examples: basic, github, multiple');
      process.exit(1);
  }
}
