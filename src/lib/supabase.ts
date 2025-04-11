import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_UR;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseKey && process.env.NODE_ENV === 'production') {
  console.error('No Supabase key found in environment variables');
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseKey 
);

// Keep the mockExploits as fallback data during development
export const mockExploits = [
  {
    id: 1,
    protocol: 'Mango Markets',
    date: '2022-10-11',
    type: 'Oracle Manipulation',
    funds_lost: 114000000,
    response_time: 24,
    description: 'Price oracle manipulation that led to significant drain of funds'
  },
  {
    id: 2,
    protocol: 'Solend',
    date: '2022-11-02',
    type: 'Smart Contract',
    funds_lost: 1260000,
    response_time: 4,
    description: 'Contract vulnerability exploited leading to loss of user funds'
  },
  {
    id: 3,
    protocol: 'Solana Wormhole',
    date: '2022-02-02',
    type: 'Smart Contract',
    funds_lost: 320000000,
    response_time: 16,
    description: 'A vulnerability in the token bridge allowed attacker to mint tokens'
  },
  {
    id: 4,
    protocol: 'Marinade Finance',
    date: '2023-03-15',
    type: 'Access Control',
    funds_lost: 4500000,
    response_time: 8,
    description: 'Improper access controls led to unauthorized withdrawals'
  },
  {
    id: 5,
    protocol: 'Jupiter',
    date: '2023-05-22',
    type: 'Flash Loan',
    funds_lost: 8900000,
    response_time: 12,
    description: 'Flash loan attack targeting liquidity pools'
  }
];

// Helper function to safely fetch data with fallback
export async function fetchWithFallback(table: string, fallbackData: any[]) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data && data.length > 0 ? data : fallbackData;
  } catch (error) {
    console.warn(`Using fallback data for ${table}:`, error);
    return fallbackData;
  }
}