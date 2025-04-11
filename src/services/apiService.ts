import axios from 'axios';
import { Exploit, LiveAlert, HackReport } from '../types';
import { supabase } from '../lib/supabase';

// Define Supabase data types
interface ExploitRow {
  id: number;
  protocol: string;
  date: string;
  type: string;
  funds_lost: number;
  response_time: number;
  description?: string;
  created_at: string;
}

interface LiveAlertRow {
  id: string;
  timestamp: string;
  protocol: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  transaction_hash: string;
  details?: string;
  created_at: string;
}

// Use environment variables properly
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';
const DUNE_API_KEY = process.env.DUNE_API_KEY || '';

export const apiService = {
  async fetchExploitData(): Promise<Exploit[]> {
    try {
      // Fetch data from Supabase
      const { data, error } = await supabase
        .from('exploits')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        return data.map((item: ExploitRow) => ({
          id: item.id,
          protocol: item.protocol,
          date: item.date,
          type: item.type,
          fundsLost: item.funds_lost,
          responseTime: item.response_time
        }));
      }
      
      // Return empty array if no data
      return [];
    } catch (error) {
      console.error('Error fetching exploit data:', error);
      throw error;
    }
  },
  
  async fetchLiveAlerts(): Promise<LiveAlert[]> {
    try {
      const { data, error } = await supabase
        .from('live_alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        return data.map((item: LiveAlertRow) => ({
          id: item.id,
          timestamp: item.timestamp,
          protocol: item.protocol,
          type: item.type,
          severity: item.severity,
          transactionHash: item.transaction_hash
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching live alerts:', error);
      throw error;
    }
  },
  
  async submitHackReport(hackData: HackReport): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase.from('hack_reports').insert({
        protocol: hackData.protocol,
        date: hackData.date,
        type: hackData.type,
        funds_lost: hackData.fundsLost,
        description: hackData.description,
        source_links: hackData.sourceLinks,
        reporter_name: hackData.reporterName || 'Anonymous',
        reporter_email: hackData.reporterEmail,
        status: 'pending',
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      return { 
        success: true, 
        message: 'Hack report submitted successfully. Thank you for contributing to Solana security.'
      };
    } catch (error) {
      console.error('Error submitting hack report:', error);
      return { 
        success: false, 
        message: 'Failed to submit report. Please try again later.'
      };
    }
  }
};