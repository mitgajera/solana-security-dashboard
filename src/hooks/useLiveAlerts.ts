import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LiveAlert } from '../types';
import { solanaService } from '../services/solanaService';

export function useLiveAlerts() {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionActive, setConnectionActive] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        
        // Try to get alerts from Supabase first - most reliable method
        try {
          const result = await supabase
            .from('live_alerts')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(10);
            
          const { data, error: supabaseError } = result;
          
          if (supabaseError) throw supabaseError;
          
          if (data && data.length > 0) {
            // Transform the data to match our LiveAlert interface
            const formattedData = data.map((item: any) => ({
              id: item.id,
              timestamp: item.timestamp,
              protocol: item.protocol,
              type: item.type,
              severity: item.severity,
              transactionHash: item.transaction_hash
            }));
            
            setAlerts(formattedData);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Failed to fetch alerts from Supabase, trying real-time service', err);
        }
        
        // If Supabase fails or returns no data, try the real-time service
        try {
          const realTimeAlerts = await solanaService.fetchRecentSuspiciousTransactions();
          if (realTimeAlerts && realTimeAlerts.length > 0) {
            setAlerts(realTimeAlerts);
          } else {
            // If no alerts, use mock data as fallback
            setAlerts(generateMockAlerts());
          }
        } catch (err) {
          console.warn('Failed to fetch real-time alerts, using fallback data', err);
          setAlerts(generateMockAlerts());
        }
      } catch (error) {
        console.error('Error in fetchAlerts:', error);
        setError('Failed to load security alerts');
        setAlerts(generateMockAlerts());
      } finally {
        setLoading(false);
      }
    }
    
    fetchAlerts();
    
    // Set up subscription with error handling
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = solanaService.subscribeToLiveTransactions((newAlert) => {
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      });
      setConnectionActive(true);
    } catch (error) {
      console.error('Failed to set up real-time subscription:', error);
      setConnectionActive(false);
    }
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  // Generate mock alerts as fallback
  function generateMockAlerts(): LiveAlert[] {
    return [
      {
        id: 'mock1',
        timestamp: new Date().toISOString(),
        protocol: 'MockProtocol',
        type: 'MockType',
        severity: 'Low',
        transactionHash: 'mockHash1'
      },
      {
        id: 'mock2',
        timestamp: new Date().toISOString(),
        protocol: 'MockProtocol',
        type: 'MockType',
        severity: 'Medium',
        transactionHash: 'mockHash2'
      }
    ];
  }
  
  return { alerts, loading, error, connectionActive };
}