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

    // 2. Execute TypeScript code via tool chain
    console.log('Executing tool chain...');
    const { result, logs } = await client.callToolChain(`
      // Your TypeScript code here
      const greeting = 'Hello from Shadow Tutor!';
      console.log(greeting);

      // You can do calculations
      const sum = [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0);
      console.log('Sum of 1-5:', sum);

      // Return a value
      return { greeting, sum };
    `);
    console.log('✓ Tool chain executed successfully');
    console.log('Result:', result);
    console.log('Captured logs:', logs);

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
