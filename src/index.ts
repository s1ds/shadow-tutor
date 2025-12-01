import { CodeModeUtcpClient } from '@utcp/code-mode';

/**
 * Main entry point for the Shadow Tutor UTCP client
 */
async function main() {
  try {
    // 1. Initialize the UTCP client
    console.log('Initializing UTCP client...');
    const client = await CodeModeUtcpClient.create();
    console.log('✓ UTCP client initialized');

    // 2. Register MCP tools (example: github integration)
    console.log('Registering MCP tools...');
    await client.registerManual({
      name: 'github',
      // Add your MCP configuration here
      // Example:
      // command: 'npx',
      // args: ['-y', '@modelcontextprotocol/server-github'],
      // env: {
      //   GITHUB_TOKEN: process.env.GITHUB_TOKEN
      // }
    });
    console.log('✓ MCP tools registered');

    // 3. Execute TypeScript code via tool chain
    console.log('Executing tool chain...');
    const { result } = await client.callToolChain(`
      // Your TypeScript code here
      console.log('Hello from Shadow Tutor!');
    `);
    console.log('✓ Tool chain executed successfully');
    console.log('Result:', result);

  } catch (error) {
    console.error('Error running UTCP client:', error);
    process.exit(1);
  }
}

// Run the main function
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
