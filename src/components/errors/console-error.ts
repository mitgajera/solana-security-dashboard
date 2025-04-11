export class ConsoleError extends Error {
  constructor(message: string, public type: string = 'general') {
    super(message);
    this.name = 'ConsoleError';
  }

  isSolanaError() {
    return this.message.includes('Solana') || 
           this.message.includes('RPC') ||
           this.message.includes('WebSocket');
  }
}

export function createConsoleError(message: string, type: string = 'general'): ConsoleError {
  return new ConsoleError(message, type);
}