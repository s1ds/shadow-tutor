import { CodeModeUtcpClient } from '@utcp/code-mode';

export interface UtcpClientConfig {
  mcpServers?: Array<{
    name: string;
    command?: string;
    args?: string[];
    env?: Record<string, string>;
  }>;
}

/**
 * Shadow Tutor UTCP Client wrapper
 * Provides a convenient interface for UTCP operations
 */
export class ShadowTutorClient {
  private client: CodeModeUtcpClient | null = null;
  private config: UtcpClientConfig;

  constructor(config: UtcpClientConfig = {}) {
    this.config = config;
  }

  /**
   * Initialize the UTCP client
   */
  async initialize(): Promise<void> {
    if (this.client) {
      console.warn('Client already initialized');
      return;
    }

    this.client = await CodeModeUtcpClient.create();

    // Register MCP servers if configured
    if (this.config.mcpServers) {
      for (const server of this.config.mcpServers) {
        await this.client.registerManual(server);
      }
    }
  }

  /**
   * Execute TypeScript code via the tool chain
   */
  async executeCode(code: string): Promise<unknown> {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize() first.');
    }

    const { result } = await this.client.callToolChain(code);
    return result;
  }

  /**
   * Get the underlying UTCP client instance
   */
  getClient(): CodeModeUtcpClient {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize() first.');
    }
    return this.client;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.client !== null;
  }
}
