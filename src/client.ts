import { CodeModeUtcpClient } from '@utcp/code-mode';

export interface McpServerConfig {
  name: string;
  call_template_type: 'mcp';
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  [key: string]: any;
}

export interface UtcpClientConfig {
  mcpServers?: McpServerConfig[];
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
  async executeCode(code: string): Promise<{ result: any; logs: string[] }> {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize() first.');
    }

    return await this.client.callToolChain(code);
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
