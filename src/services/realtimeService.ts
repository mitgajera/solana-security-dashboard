import { supabase } from '../lib/supabase';

type PostgresChangePayload = {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Record<string, unknown>;
  old: Record<string, unknown>;
  schema: string;
  table: string;
};

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
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'exploits' 
        }, 
        (payload: PostgresChangePayload) => {
          callback(payload);
        }
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