// Save the original console.error
const originalConsoleError = console.error;

// Keep a record of throttled errors
const errorLog = {
  solanaRateLimit: {
    count: 0,
    lastTime: 0,
    messages: new Set<string>()
  }
};

// Replace console.error with custom handler
console.error = (...args) => {
  const errorString = args.join(' ');
  
  // Check if this is a rate limit error
  if (errorString.includes('429') && 
     (errorString.includes('rate limit') || errorString.includes('RPC'))) {
    
    // Only log rate limit errors once per minute to avoid flooding
    const now = Date.now();
    if (now - errorLog.solanaRateLimit.lastTime > 60000) {
      errorLog.solanaRateLimit.lastTime = now;
      errorLog.solanaRateLimit.count++;
      
      // In development, show a more helpful message
      if (process.env.NODE_ENV === 'development') {
        originalConsoleError(
          `[Solana Rate Limit] API rate limit hit (count: ${errorLog.solanaRateLimit.count}). ` +
          `Using cached data where available.`
        );
      }
    }
    
    // Don't output anything else for rate limits - prevent console flooding
    return;
  }
  
  // For WebSocket and connection errors, reduce noise
  if (errorString.includes('WebSocket') || 
      errorString.includes('Connection') || 
      errorString.includes('Failed to fetch')) {
    
    // Store unique connection error messages
    const shortError = errorString.slice(0, 100);
    if (!errorLog.solanaRateLimit.messages.has(shortError)) {
      errorLog.solanaRateLimit.messages.add(shortError);
      
      if (process.env.NODE_ENV === 'development') {
        originalConsoleError(`[Solana Connection] ${args[0]}`);
      }
    }
    return;
  }
  
  // Call original for other errors
  originalConsoleError(...args);
};

export default function setupErrorInterceptor() {
  // Function exported for explicit initialization
}