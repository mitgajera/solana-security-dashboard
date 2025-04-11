import { createClient } from '@supabase/supabase-js';
import { Exploit, LiveAlert } from '../types';

// Move Supabase client creation to a function to prevent execution at build time
let _supabase = null;

export function getSupabaseClient() {
  if (_supabase) return _supabase;

  // Only run in browser environment, not during static build
  if (typeof window === 'undefined') {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('No Supabase key found in environment variables');
    return null;
  }
  
  _supabase = createClient(supabaseUrl, supabaseKey);
  return _supabase;
}

export const supabase = {
  from: (table) => {
    const client = getSupabaseClient();
    if (!client) {
      return {
        select: () => Promise.resolve({ data: null, error: new Error('No Supabase client') }),
        insert: () => Promise.resolve({ data: null, error: new Error('No Supabase client') }),
        update: () => Promise.resolve({ data: null, error: new Error('No Supabase client') }),
        delete: () => Promise.resolve({ data: null, error: new Error('No Supabase client') }),
        eq: () => ({ 
          select: () => Promise.resolve({ data: null, error: new Error('No Supabase client') })
        }),
        order: () => ({ 
          limit: () => Promise.resolve({ data: null, error: new Error('No Supabase client') }) 
        })
      };
    }
    return client.from(table);
  },
  
  channel: (name) => {
    const client = getSupabaseClient();
    if (!client) {
      return { 
        on: () => ({ subscribe: () => ({}) }) 
      };
    }
    return client.channel(name);
  },
  
  removeChannel: (subscription) => {
    const client = getSupabaseClient();
    if (!client) return;
    return client.removeChannel(subscription);
  }
};

// Mock exploit data for fallback
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

// Helper function to fetch with fallback to mock data
export async function fetchWithFallback<T>(table: string, mockData: T[]): Promise<T[]> {
  try {
    const client = getSupabaseClient();
    if (!client) return mockData;
    
    const { data, error } = await client.from(table).select('*');
    if (error) throw error;
    
    return data || mockData;
  } catch (error) {
    console.error(`Error fetching from ${table}:`, error);
    return mockData;
  }
}