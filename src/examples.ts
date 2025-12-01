import { ShadowTutorClient } from './client.js';

/**
 * Example 1: Basic usage
 */
export async function basicExample() {
  const client = new ShadowTutorClient();
  await client.initialize();

  const result = await client.executeCode(`
    const greeting = 'Hello from Shadow Tutor!';
    console.log(greeting);
    return greeting;
  `);

  console.log('Result:', result);
}

/**
 * Example 2: With GitHub MCP integration
 */
export async function githubExample() {
  const client = new ShadowTutorClient({
    mcpServers: [
      {
        name: 'github',
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
  const result = await client.executeCode(`
    // Your TypeScript code that interacts with GitHub
    console.log('GitHub MCP tools are available');
  `);

  console.log('Result:', result);
}

/**
 * Example 3: Multiple MCP servers
 */
export async function multipleServersExample() {
  const client = new ShadowTutorClient({
    mcpServers: [
      {
        name: 'github',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        env: {
          GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
        },
      },
      {
        name: 'filesystem',
        // Add your filesystem server configuration
      },
    ],
  });

  await client.initialize();

  const result = await client.executeCode(`
    // Code with access to multiple MCP servers
    console.log('Multiple MCP servers available');
  `);

  console.log('Result:', result);
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
