import { supabase } from '../lib/supabase';

type RealtimeCallback = (payload: any) => void;

export const realtimeService = {
  subscribeLiveAlerts(callback: RealtimeCallback): () => void {
    // Create and subscribe to the channel
    const subscription = supabase
      .channel('table-db-changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'live_alerts' 
        }, 
        (payload: any) => {
          callback(payload.new);
        }
      )
      .subscribe();
    
    // Return unsubscribe function
    return () => {
      supabase.removeChannel(subscription);
    };
  },
  
  subscribeExploits(callback: RealtimeCallback): () => void {
    // Create and subscribe to the channel
    const subscription = supabase
      .channel('exploits-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'exploits' 
        }, 
        (payload: any) => {
          callback(payload);
        }
      )
      .subscribe();
    
    // Return unsubscribe function
    return () => {
      supabase.removeChannel(subscription);
    };
  }
};