import { createClient } from '@supabase/supabase-js';
import { Exploit, LiveAlert } from '../types';

// Move these to a function to prevent execution at build time
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseKey && typeof window !== 'undefined') {
    console.warn('No Supabase key found in environment variables');
  }
  
  if (!supabaseUrl || !supabaseKey) {
    if (typeof window !== 'undefined') {
      console.warn('Supabase credentials missing - using mock data');
    }
    // Return a minimal mock client when credentials are missing
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

// Lazy initialize only when actually used (not during SSG build)
let _supabase = null;
export const supabase = {
  // Proxy the common methods
  from: (...args) => {
    if (!_supabase) _supabase = getSupabaseClient();
    return _supabase ? _supabase.from(...args) : { select: () => ({ data: null, error: new Error('Not connected') }) };
  },
  // Add other methods you're using
  channel: (...args) => {
    if (!_supabase) _supabase = getSupabaseClient();
    return _supabase ? _supabase.channel(...args) : { on: () => ({ subscribe: () => {} }) };
  },
  removeChannel: (...args) => {
    if (!_supabase) _supabase = getSupabaseClient();
    return _supabase ? _supabase.removeChannel(...args) : {};
  }
};

// Keep the mockExploits as fallback data during development
export const mockExploits: Exploit[] = [
  {
    id: 1,
    protocol: 'Mango Markets',
    date: '2022-10-11',
    type: 'Oracle Manipulation',
    fundsLost: 114000000,
    responseTime: 24,
    description: 'Price oracle manipulation that led to significant drain of funds'
  },
  {
    id: 2,
    protocol: 'Solend',
    date: '2022-11-02',
    type: 'Smart Contract',
    fundsLost: 1260000,
    responseTime: 4,
    description: 'Contract vulnerability exploited leading to loss of user funds'
  },
  {
    id: 3,
    protocol: 'Solana Wormhole',
    date: '2022-02-02',
    type: 'Smart Contract',
    fundsLost: 320000000,
    responseTime: 16,
    description: 'A vulnerability in the token bridge allowed attacker to mint tokens'
  },
  {
    id: 4,
    protocol: 'Marinade Finance',
    date: '2023-03-15',
    type: 'Access Control',
    fundsLost: 4500000,
    responseTime: 8,
    description: 'Improper access controls led to unauthorized withdrawals'
  },
  {
    id: 5,
    protocol: 'Jupiter',
    date: '2023-05-22',
    type: 'Flash Loan',
    fundsLost: 8900000,
    responseTime: 12,
    description: 'Flash loan attack targeting liquidity pools'
  }
];

export interface PendingExploit {
  id: string;
  project: string;
  type: string;
  submittedBy: string;
  submittedDate: string;
  estimatedLoss: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
}

export const mockPendingExploits: PendingExploit[] = [
  {
    id: "p1",
    project: "SolWallet Protocol",
    type: "Flash Loan Attack",
    submittedBy: "security@blockchain-watch.com",
    submittedDate: "2024-04-05T14:23:00Z",
    estimatedLoss: "$12.5M",
    status: "pending",
    priority: "high",
    description: "An attacker used multiple flash loans to manipulate liquidity pools and drain user funds. The attack was conducted across multiple transactions and exploited a vulnerability in the price calculation mechanism."
  },
  {
    id: "p2",
    project: "SolarFinance",
    type: "Reentrancy",
    submittedBy: "alice@securityfirm.io",
    submittedDate: "2024-03-28T09:15:00Z",
    estimatedLoss: "$8.3M",
    status: "pending",
    priority: "high",
    description: "Multiple funds were drained due to a classic reentrancy vulnerability in the deposit function. The attacker was able to withdraw funds multiple times before balance updates were applied."
  },
  {
    id: "p3",
    project: "SolStake",
    type: "Access Control",
    submittedBy: "anonymous-reporter",
    submittedDate: "2024-03-15T18:45:00Z",
    estimatedLoss: "$4.6M",
    status: "pending",
    priority: "medium",
    description: "An improperly secured admin function allowed the attacker to withdraw user funds. The contract lacked proper access controls on critical functions."
  },
  {
    id: "p4",
    project: "TokenBridge",
    type: "Oracle Manipulation",
    submittedBy: "security-team@protocol.com",
    submittedDate: "2024-03-10T11:30:00Z",
    estimatedLoss: "$3.2M",
    status: "under review",
    priority: "medium",
    description: "The price oracle was manipulated to execute trades at favorable prices, resulting in protocol losses. The attacker exploited a time delay in price updates."
  },
  {
    id: "p5",
    project: "NFTMarket",
    type: "Smart Contract Vulnerability",
    submittedBy: "whitehat@securityresearch.org",
    submittedDate: "2024-02-28T16:20:00Z",
    estimatedLoss: "$1.8M",
    status: "pending",
    priority: "low",
    description: "An integer overflow vulnerability allowed an attacker to buy NFTs at significantly reduced prices, causing losses to sellers."
  }
];

// Helper function to safely fetch data with fallback
export async function fetchWithFallback<T>(table: string, fallbackData: T[]): Promise<T[]> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data && data.length > 0 ? (data as T[]) : fallbackData;
  } catch (error) {
    console.warn(`Using fallback data for ${table}:`, error);
    return fallbackData;
  }
}