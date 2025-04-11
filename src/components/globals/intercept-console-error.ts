// Previous interceptor implementation
const originalConsoleError = console.error;

// Replace console.error with custom handler
console.error = (...args) => {
  // Check if this is a WebSocket connection error from Solana
  const errorString = args.join(' ');
  if (
    errorString.includes('WebSocket') || 
    errorString.includes('Connection') || 
    errorString.includes('Solana RPC')
  ) {
    // Log to analytics or monitoring system but don't display to user
    // This prevents error UI from showing for common Solana RPC issues
    if (process.env.NODE_ENV !== 'development') {
      // In production, suppress these errors from console
      return;
    }
    // In development, prefix with [Solana RPC] for clarity
    args[0] = `[Solana RPC] ${args[0]}`;
  }
  
  // Call original for other errors
  originalConsoleError(...args);
};

export default function setupErrorInterceptor() {
  // No need to do anything else - the replacement happens on import
  // This is just to provide a clean export
}