import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LiveAlert } from '../types';

export function useLiveAlerts() {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        
        const result = await supabase
          .from('live_alerts')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(10);
          
        const { data, error } = result;
        if (error) throw error;
        
        // Transform the data to match our interface
        const formattedData = data.map((item: any) => ({
          id: item.id,
          timestamp: item.timestamp,
          protocol: item.protocol,
          type: item.type,
          severity: item.severity as 'Low' | 'Medium' | 'High' | 'Critical',
          transactionHash: item.transaction_hash || item.transactionHash
        }));
        
        setAlerts(formattedData);
      } catch (err) {
        console.error('Error fetching live alerts:', err);
        setError('Failed to load alerts');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAlerts();
  }, []);
  
  return { alerts, loading, error };
}