import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { LiveAlert } from '../types';

export const useLiveAlerts = () => {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchLiveAlerts();
        setAlerts(data);
      } catch (err) {
        setError('Failed to fetch live alerts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    
    // Polling for new alerts every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  return { alerts, loading, error };
};