// src/lib/supabase.ts
console.warn('Using mock Supabase client for development');

// Sample data
const mockExploits = [
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

const mockAlerts = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    protocol: 'Marinade Finance',
    type: 'Large Withdrawal',
    severity: 'Medium',
    transaction_hash: '5Gq7zDYhXCR8aSdvP1MgU6NvbKVZBPiN1kNJF9xUEpw8CY5TBB44QgVXrVSEifXv3EGjJQEwVVTt8K9Fb34zGVcb'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    protocol: 'Raydium',
    type: 'Unusual Swap',
    severity: 'High',
    transaction_hash: '3GqbKbVoYXynFYS5XGkWECWTu2JpWXVuZpzywHxZBvXVPrm1UcXadXNP7e9Fz3HYaJZJRuZmkrZYQ2GYQnkJ1G2c'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    protocol: 'Solend',
    type: 'Large Borrow',
    severity: 'Low',
    transaction_hash: '2vX2N8K9NXhy4cSvjFkKP8Jh3v48vc5iWP9bvNqkr7Lt8vEfcdTLGjvJeNqbAfba6EzB78jFH3aGGEzGsviUEcGb'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    protocol: 'Jupiter',
    type: 'Flash Loan',
    severity: 'Critical',
    transaction_hash: '4zUdaUm1MnA9CoEnEgHdMUxRbMdPSHj7jbNHPHCtVdY32UTtm3vhYnYHEKbUNyEKpRPMBgUq3Kv9MkzPXBfgYzuP'
  }
];

interface HackReport {
  id: number;
  created_at: string;
  [key: string]: any; // For additional fields
}
const hackReports: HackReport[] = [];
const mockChannels: Record<string, any> = {};

// Simple mock Supabase client
export const supabase = {
  from: (table: string) => {
    return {
      select: (_columns = '*') => {
        return {
          order: (column: string, options: { ascending?: boolean } = {}) => {
            return {
              limit: (limit = 999) => {
                // Return mock data with simulated delay
                return new Promise((resolve) => {
                  setTimeout(() => {
                    if (table === 'exploits') {
                      const sortedData = [...mockExploits].sort((a, b) => {
                        return options.ascending
                          ? new Date(a.date).getTime() - new Date(b.date).getTime()
                          : new Date(b.date).getTime() - new Date(a.date).getTime();
                      });
                      resolve({ data: sortedData.slice(0, limit), error: null });
                    } else if (table === 'live_alerts') {
                      const sortedData = [...mockAlerts].sort((a, b) => {
                        return options.ascending
                          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
                      });
                      resolve({ data: sortedData.slice(0, limit), error: null });
                    } else {
                      resolve({ data: [], error: null });
                    }
                  }, 500);
                });
              }
            };
          }
        };
      },
      
      insert: (data: any) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (table === 'hack_reports') {
              const newReport = {
                id: hackReports.length + 1,
                ...data,
                created_at: new Date().toISOString()
              };
              hackReports.push(newReport);
              resolve({ data: newReport, error: null });
            } else if (table === 'exploits') {
              const newExploit = {
                id: mockExploits.length + 1,
                ...data,
                created_at: new Date().toISOString()
              };
              mockExploits.push(newExploit);
              resolve({ data: newExploit, error: null });
            } else if (table === 'live_alerts') {
              const newAlert = {
                id: (mockAlerts.length + 1).toString(),
                ...data,
                created_at: new Date().toISOString()
              };
              mockAlerts.push(newAlert);
              resolve({ data: newAlert, error: null });
            } else {
              resolve({ data: null, error: null });
            }
          }, 500);
        });
      }
    };
  },
  
  channel: (name: string) => {
    // Create a mock channel object
    const mockChannel = {
      name,
      listeners: [] as ((payload: any) => void)[],
      on: function(event: string, options: any, callback: (payload: any) => void) {
        // Store the callback
        this.listeners.push(callback);
        // Return this for chaining
        return this;
      },
      subscribe: function() {
        console.log(`Mock subscription to ${name} created`);
        // Store the channel for later reference
        mockChannels[name] = this;
        return this;
      },
      // Method to simulate an event happening
      simulateEvent: function(payload: any) {
        this.listeners.forEach(listener => listener(payload));
      }
    };
    
    // Add to global for easy access in testing
    (window as any).mockChannels = mockChannels;
    
    return mockChannel;
  },
  
  removeChannel: (channel: any) => {
    if (channel && channel.name && mockChannels[channel.name]) {
      delete mockChannels[channel.name];
      console.log(`Mock channel ${channel.name} removed`);
    } else {
      console.log('Attempted to remove nonexistent mock channel');
    }
  }
};