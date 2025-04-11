import { Connection, PublicKey, ConfirmedSignatureInfo, TransactionResponse, VersionedTransactionResponse } from '@solana/web3.js';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { LiveAlert, Exploit } from '../types';

// Initialize Solana connection with more resilient configuration
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';
const rpcUrl = HELIUS_API_KEY 
  ? `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
  : 'https://api.mainnet-beta.solana.com';

// Configure connection with better error handling
const connection = new Connection(rpcUrl, {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 30000, // 30 seconds
  disableRetryOnRateLimit: false,
  // Explicitly disable WebSocket connections to avoid WS errors
  wsEndpoint: undefined
});

// Create a backup endpoint for cases where primary fails
const backupConnection = new Connection('https://api.devnet.solana.com', {
  commitment: 'confirmed',
  wsEndpoint: undefined // Disable WebSockets on backup too
});

// Initialize Supabase client for storing and retrieving data
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Key protocols to monitor
const MONITORED_PROTOCOLS = [
  {
    name: 'Marinade Finance',
    programId: 'MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD',
    risk: 'medium',
  },
  {
    name: 'Jupiter Aggregator',
    programId: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4',
    risk: 'medium',
  },
  {
    name: 'Raydium',
    programId: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
    risk: 'high',
  },
  {
    name: 'Solend',
    programId: 'So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo',
    risk: 'high',
  },
  {
    name: 'Orca',
    programId: 'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc',
    risk: 'medium',
  },
  {
    name: 'Mango Markets',
    programId: 'mv3ekLzLbnVPNxjSKvqBpU3ZeZXquFumRxLiqDS7SDg',
    risk: 'critical',
  }
];

// Utility to determine if a transaction is suspicious
function isSuspiciousTransaction(tx: TransactionResponse | VersionedTransactionResponse): boolean {
  if (!tx) return false;
  
  // Large value transfers
  const largeValueTransfer = tx.meta && tx.meta.postBalances && 
    tx.meta.postBalances.some((balance, i) => {
      const preBalance = tx.meta?.preBalances[i] || 0;
      return Math.abs(balance - preBalance) > 100000000000; // 100 SOL
    });
    
  // Multiple instructions
  const instructions = 'instructions' in tx.transaction.message 
    ? tx.transaction.message.instructions 
    : tx.transaction.message.compiledInstructions;
  const multipleInstructions = instructions.length > 5;
  
  // Involves known risky programs
  const accountKeys = 'accountKeys' in tx.transaction.message 
    ? tx.transaction.message.accountKeys 
    : tx.transaction.message.staticAccountKeys;
  const involvesRiskyProgram = accountKeys.some(key => {
    const keyStr = key.toBase58();
    return MONITORED_PROTOCOLS.some(p => p.programId === keyStr && (p.risk === 'high' || p.risk === 'critical'));
  });
  
  // Return true if any suspicious condition is met
  return largeValueTransfer || multipleInstructions || involvesRiskyProgram;
}

// Determine severity based on transaction characteristics
function determineSeverity(tx: TransactionResponse | VersionedTransactionResponse): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (!tx) return 'Low';
  
  // Check if it involves critical risk protocols
  const accountKeys = 'accountKeys' in tx.transaction.message 
    ? tx.transaction.message.accountKeys 
    : tx.transaction.message.staticAccountKeys;
  const involvesHighRiskProtocol = accountKeys.some(key => {
    const keyStr = key.toBase58();
    return MONITORED_PROTOCOLS.some(p => p.programId === keyStr && p.risk === 'critical');
  });
  
  if (involvesHighRiskProtocol) return 'Critical';
  
  // Check for large value transfers (over 10,000 SOL)
  const largeValueTransfer = tx.meta && tx.meta.postBalances && 
    tx.meta.postBalances.some((balance, i) => {
      const preBalance = tx.meta?.preBalances[i] || 0;
      return Math.abs(balance - preBalance) > 10000000000000; // 10,000 SOL
    });
    
  if (largeValueTransfer) return 'High';
  
  // Check for medium sized transfers (over 1,000 SOL)
  const mediumValueTransfer = tx.meta && tx.meta.postBalances && 
    tx.meta.postBalances.some((balance, i) => {
      const preBalance = tx.meta?.preBalances[i] || 0;
      return Math.abs(balance - preBalance) > 1000000000000; // 1,000 SOL
    });
  
  // Default return for all other transactions
  return 'Low';
}

// Determine transaction type
function determineTransactionType(tx: TransactionResponse | VersionedTransactionResponse): string {
  if (!tx) return 'Unknown Activity';
  
  // Look at program IDs involved
  const accountKeys = 'accountKeys' in tx.transaction.message 
    ? tx.transaction.message.accountKeys 
    : tx.transaction.message.staticAccountKeys;
  
  const programIds = accountKeys.map(key => key.toBase58());
  
  if (programIds.includes('JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4')) {
    return 'Token Swap';
  }
  
  if (programIds.includes('So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo')) {
    return 'Lending/Borrowing';
  }
  
  // Default return for transactions that don't match specific patterns
  return 'Unknown Activity';
}

// Identify the protocol involved
function identifyProtocol(tx: TransactionResponse | VersionedTransactionResponse): string {
  if (!tx) return 'Unknown Protocol';
  
  const accountKeys = 'accountKeys' in tx.transaction.message 
    ? tx.transaction.message.accountKeys 
    : tx.transaction.message.staticAccountKeys;
  
  for (const account of accountKeys) {
    const accountId = account.toBase58();
    const matchedProtocol = MONITORED_PROTOCOLS.find(p => p.programId === accountId);
    if (matchedProtocol) {
      return matchedProtocol.name;
    }
  }
  
  return 'Unknown Protocol';
}

export const solanaService = {
  // Fetch recent suspicious transactions
  async fetchRecentSuspiciousTransactions(): Promise<LiveAlert[]> {
    try {
      // Fetch recent signatures for all monitored protocols
      let allSignatures: ConfirmedSignatureInfo[] = [];
      
      for (const protocol of MONITORED_PROTOCOLS) {
        try {
          const programPublicKey = new PublicKey(protocol.programId);
          const signatures = await connection.getSignaturesForAddress(programPublicKey, { limit: 10 });
          allSignatures = [...allSignatures, ...signatures];
        } catch (error) {
          console.error(`Error fetching signatures for ${protocol.name}:`, error);
        }
      }
      
      // Deduplicate and sort by timestamp
      allSignatures = Array.from(new Map(allSignatures.map(item => 
        [item.signature, item])).values())
        .sort((a, b) => (b.blockTime || 0) - (a.blockTime || 0));
      
      // Fetch transaction details
      const alerts: LiveAlert[] = [];
      
      for (const sig of allSignatures.slice(0, 20)) { // Limit to 20 to avoid rate limits
        try {
          const tx = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0
          });
          
          if (tx && isSuspiciousTransaction(tx)) {
            alerts.push({
              id: sig.signature,
              timestamp: new Date((tx.blockTime || 0) * 1000).toISOString(),
              protocol: identifyProtocol(tx),
              type: determineTransactionType(tx),
              severity: determineSeverity(tx),
              transactionHash: sig.signature
            });
            
            // Store in Supabase for future reference
            await supabase.from('live_alerts').upsert({
              id: sig.signature,
              timestamp: new Date((tx.blockTime || 0) * 1000).toISOString(),
              protocol: identifyProtocol(tx),
              type: determineTransactionType(tx),
              severity: determineSeverity(tx),
              transaction_hash: sig.signature,
              details: JSON.stringify(tx),
              created_at: new Date().toISOString()
            }, { onConflict: 'id' });
          }
        } catch (error) {
          console.error(`Error processing transaction ${sig.signature}:`, error);
        }
      }
      
      return alerts;
    } catch (error) {
      console.error('Error fetching suspicious transactions:', error);
      throw error;
    }
  },
  
  // Use Helius API for enhanced blockchain data
  async fetchLargeTransactions(): Promise<LiveAlert[]> {
    try {
      // Use Helius API's enhanced RPC methods
      const response = await axios.post(
        `https://api.helius.xyz/v0/addresses/active-events?api-key=${HELIUS_API_KEY}`,
        { 
          query: { 
            sources: ["MANGO_MARKETS", "RAYDIUM", "ORCA", "SOLEND"],
            types: ["SWAP", "TRANSFER", "BORROW", "LIQUIDATE"],
            minValueUsd: 10000 // Only transactions over $10k
          }
        }
      );
      
      const events = response.data || [];
      
      // Convert to our LiveAlert format
      const alerts: LiveAlert[] = events.map((event: any) => ({
        id: event.signature,
        timestamp: new Date(event.timestamp * 1000).toISOString(),
        protocol: event.source || 'Unknown Protocol',
        type: event.type || 'Unknown Activity',
        severity: event.valueUsd > 100000 ? 'Critical' : 
                  event.valueUsd > 50000 ? 'High' : 
                  event.valueUsd > 20000 ? 'Medium' : 'Low',
        transactionHash: event.signature
      }));
      
      // Store in database for history
      for (const alert of alerts) {
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
      
      return alerts;
    } catch (error) {
      console.error('Error fetching large transactions from Helius:', error);
      throw error;
    }
  },
  
  // Fetch known exploits
  async fetchHistoricalExploits(): Promise<Exploit[]> {
    try {
      const { data, error } = await supabase
        .from('exploits')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          protocol: item.protocol,
          date: item.date,
          type: item.type,
          fundsLost: Number(item.funds_lost || 0),
          responseTime: item.response_time || 0
        }));
      }
      
      // If no data in Supabase, fetch from external source
      return fetchExploitsFromExternalSource();
    } catch (error) {
      console.error('Error fetching historical exploits:', error);
      throw error;
    }
  },
  
  // Subscribe to live transaction updates
  subscribeToLiveTransactions(callback: (alert: LiveAlert) => void): () => void {
    // For this to work, we'll use websocket connection from Solana web3.js
    const programIds = MONITORED_PROTOCOLS.map(p => new PublicKey(p.programId));
    
    // Set up subscription to account changes for all program IDs
    const subscriptions: number[] = [];
    
    for (const programId of programIds) {
      const subscription = connection.onProgramAccountChange(
        programId,
        async (accountInfo) => {
          // When an account changes, fetch the recent transaction
          try {
            const signatures = await connection.getSignaturesForAddress(
              accountInfo.accountId, 
              { limit: 1 }
            );
            
            if (signatures.length > 0) {
              const tx = await connection.getTransaction(signatures[0].signature, {
                maxSupportedTransactionVersion: 0
              });
              
              if (tx && isSuspiciousTransaction(tx)) {
                const protocol = MONITORED_PROTOCOLS.find(
                  p => p.programId === programId.toBase58()
                )?.name || 'Unknown Protocol';
                
                const alert: LiveAlert = {
                  id: signatures[0].signature,
                  timestamp: new Date().toISOString(),
                  protocol,
                  type: determineTransactionType(tx),
                  severity: determineSeverity(tx),
                  transactionHash: signatures[0].signature
                };
                
                // Store in database and notify via callback
                await supabase.from('live_alerts').upsert({
                  id: alert.id,
                  timestamp: alert.timestamp,
                  protocol: alert.protocol,
                  type: alert.type,
                  severity: alert.severity,
                  transaction_hash: alert.transactionHash,
                  created_at: new Date().toISOString()
                }, { onConflict: 'id' });
                
                callback(alert);
              }
            }
          } catch (error) {
            console.error('Error processing account update:', error);
          }
        }
      );
      
      subscriptions.push(subscription);
    }
    
    // Return unsubscribe function
    return () => {
      subscriptions.forEach(sub => {
        connection.removeProgramAccountChangeListener(sub);
      });
    };
  }
};

// Helper function to fetch exploits from external sources
async function fetchExploitsFromExternalSource(): Promise<Exploit[]> {
  try {
    // Fetch from public sources like Rekt.news API if available
    const response = await axios.get(
      'https://raw.githubusercontent.com/superteam-security/exploit-tracker/main/solana-exploits.json'
    );
    
    const data = response.data || [];
    
    // Transform to our format
    const exploits: Exploit[] = data.map((item: any, index: number) => ({
      id: index + 1,
      protocol: item.protocol_name || item.name,
      date: item.date,
      type: item.category || 'Unknown',
      fundsLost: Number(item.amount_lost_usd || 0),
      responseTime: item.response_time_hours || 12
    }));
    
    // Store in our database for future use
    for (const exploit of exploits) {
      await supabase.from('exploits').upsert({
        protocol: exploit.protocol,
        date: exploit.date,
        type: exploit.type,
        funds_lost: exploit.fundsLost,
        response_time: exploit.responseTime,
        created_at: new Date().toISOString()
      }, { onConflict: 'protocol,date' });
    }
    
    return exploits;
  } catch (error) {
    console.error('Error fetching exploits from external source:', error);
    return [];
  }
}
