import { Connection, PublicKey, ConfirmedSignatureInfo, TransactionResponse, VersionedTransactionResponse, ParsedTransactionWithMeta } from '@solana/web3.js';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { LiveAlert, Exploit, ProgramAccount } from '../types';

// Initialize Solana connection with robust configuration
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';
const rpcUrl = HELIUS_API_KEY 
  ? `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
  : 'https://api.mainnet-beta.solana.com';

// Configure connection with rate limiting avoidance
const connection = new Connection(rpcUrl, {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 15000,
  disableRetryOnRateLimit: true,
  wsEndpoint: undefined // Disable WebSockets
});

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// In-memory cache
const cache = {
  lastFetchTimestamp: 0,
  alerts: [] as LiveAlert[],
  exploits: [] as Exploit[]
};

// Protocols to monitor
const MONITORED_PROTOCOLS: ProgramAccount[] = [
  {
    name: 'Marinade Finance',
    programId: 'MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD',
    risk: 'medium',
  },
  {
    name: 'Jupiter Aggregator',
    programId: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
    risk: 'medium',
  }
];

// Evaluate severity based on transaction characteristics
function determineSeverityForTransaction(
  tx: TransactionResponse | VersionedTransactionResponse | null, 
  protocol: ProgramAccount
): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (!tx) return 'Low';
  
  // Random distribution for demos (remove in production)
  const rand = Math.random();
  if (rand < 0.1) return 'Critical';
  if (rand < 0.3) return 'High'; 
  if (rand < 0.7) return 'Medium';
  return 'Low';
}

class SolanaService {
  async fetchRecentSuspiciousTransactions(count = 4, forceRefresh = false): Promise<LiveAlert[]> {
    try {
      // Skip cache if forceRefresh is true
      const cacheAge = Date.now() - cache.lastFetchTimestamp;
      if (!forceRefresh && cache.alerts.length > 0 && cacheAge < 60000) {
        console.log("Using cached alerts data");
        return cache.alerts.slice(0, count);
      }

      // Clear existing alerts when doing a fresh fetch
      const alerts: LiveAlert[] = [];
      
      // Try to get data from Supabase first
      const { data: dbAlerts } = await supabase
        .from('live_alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(count);
      
      if (dbAlerts && dbAlerts.length > 0 && dbAlerts.length >= count) {
        const formattedAlerts = dbAlerts.map(item => ({
          id: item.id,
          timestamp: item.timestamp,
          protocol: item.protocol,
          type: item.type,
          severity: item.severity,
          transactionHash: item.transaction_hash
        }));
        
        // Update cache
        cache.alerts = formattedAlerts;
        cache.lastFetchTimestamp = Date.now();
        
        return formattedAlerts;
      }
      
      // If no or insufficient database results, fetch from RPC with requested count
      try {
        // Shuffle protocols to get a mix of sources
        const shuffledProtocols = [...MONITORED_PROTOCOLS].sort(() => Math.random() - 0.5);
        
        for (const protocol of shuffledProtocols) {
          if (alerts.length >= count) break;
          
          const programPublicKey = new PublicKey(protocol.programId);
          const signatures = await connection.getSignaturesForAddress(
            programPublicKey, 
            { limit: Math.ceil(count/2) + 2 } // Request a few extra
          );
          
          for (const sig of signatures) {
            if (alerts.length >= count) break;
            
            try {
              const tx = await connection.getTransaction(sig.signature, {
                maxSupportedTransactionVersion: 0
              });
              
              if (tx) {
                const alert: LiveAlert = {
                  id: sig.signature,
                  timestamp: new Date((tx.blockTime || 0) * 1000).toISOString(),
                  protocol: protocol.name,
                  type: 'Transaction',
                  severity: determineSeverityForTransaction(tx, protocol),
                  transactionHash: sig.signature
                };
                
                alerts.push(alert);
                
                // Store in Supabase for future reference
                await supabase.from('live_alerts').upsert({
                  id: alert.id,
                  timestamp: alert.timestamp,
                  protocol: alert.protocol,
                  type: alert.type,
                  severity: alert.severity,
                  transaction_hash: alert.transactionHash,
                  created_at: new Date().toISOString()
                }, { onConflict: 'id' });
              }
            } catch (error) {
              console.log(`Skipping transaction processing due to error: ${error}`);
              continue;
            }
          }
        }
      } catch (error) {
        console.log(`Error fetching signatures: ${error}`);
      }
      
      // Update cache if we got results
      if (alerts.length > 0) {
        cache.alerts = alerts; // Replace cache completely, don't append
        cache.lastFetchTimestamp = Date.now();
        return alerts;
      }
      
      // Fallback to mock data if nothing else works
      const mockAlerts = generateMockAlerts(count);
      cache.alerts = mockAlerts;
      cache.lastFetchTimestamp = Date.now();
      return mockAlerts;
    } catch (error) {
      console.log('Error in fetchRecentSuspiciousTransactions:', error);
      return generateMockAlerts(count);
    }
  }

  // Subscribe to live transaction updates
  subscribeToLiveTransactions(callback: (alert: LiveAlert) => void): () => void {
    let isActive = true;
    let timeoutId: NodeJS.Timeout;
    let pollInterval = 30000; // 30 seconds
    
    const pollForTransactions = async () => {
      if (!isActive) return;
      
      try {
        // Always use the database first
        const { data } = await supabase
          .from('live_alerts')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1);
          
        if (data && data.length > 0) {
          const alert: LiveAlert = {
            id: data[0].id,
            timestamp: data[0].timestamp,
            protocol: data[0].protocol,
            type: data[0].type,
            severity: data[0].severity,
            transactionHash: data[0].transaction_hash
          };
          callback(alert);
        } else {
          // If no database alerts, get one from generated data
          callback(generateMockAlerts()[0]);
        }
        
        // Reset poll interval on success
        pollInterval = 30000;
      } catch (err) {
        // Implement backoff on errors
        pollInterval = Math.min(pollInterval * 1.5, 180000); // Up to 3 minutes
      } finally {
        if (isActive) {
          timeoutId = setTimeout(pollForTransactions, pollInterval);
        }
      }
    };
    
    // Start polling
    pollForTransactions();
    
    // Return cleanup function
    return () => {
      isActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }

  // Fetch historical exploits
  async fetchHistoricalExploits(): Promise<Exploit[]> {
    // Implementation...
    return [];
  }
}

// Update the mock generator to accept count
function generateMockAlerts(count = 4): LiveAlert[] {
  const protocols = ['Jupiter Aggregator', 'Marinade Finance', 'Raydium', 'Orca'];
  const types = ['Swap Transaction', 'Stake Transaction', 'Token Transfer', 'Create Account'];
  const severities = ['Low', 'Medium', 'High', 'Critical'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `mock${i}-${Date.now()}`,
    timestamp: new Date(Date.now() - i * 120000).toISOString(),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    type: types[Math.floor(Math.random() * types.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    transactionHash: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  }));
}

// Export the instantiated service
export const solanaService = new SolanaService();
