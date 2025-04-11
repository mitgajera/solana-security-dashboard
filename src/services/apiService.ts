import axios from 'axios';
import { Exploit, LiveAlert, HackReport } from '../types';
import { supabase } from '../lib/supabase';

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
        return data.map((item: any) => ({
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
        return data.map((item: any) => ({
          id: item.id,
          timestamp: item.timestamp,
          protocol: item.protocol,
          type: item.type,
          severity: item.severity as 'Low' | 'Medium' | 'High' | 'Critical',
          transactionHash: item.transaction_hash
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching live alerts:', error);
      throw error;
    }
  },
  
  // Add the missing submitHackReport method
  async submitHackReport(hackData: HackReport): Promise<{ success: boolean; message: string }> {
    try {
      // Insert the report into Supabase
      const { data, error } = await supabase
        .from('hack_reports')
        .insert({
          protocol: hackData.protocol,
          date: hackData.date,
          type: hackData.type,
          funds_lost: hackData.fundsLost,
          description: hackData.description,
          source_links: hackData.sourceLinks,
          reporter_name: hackData.reporterName || null,
          reporter_email: hackData.reporterEmail || null,
          status: 'pending',
          created_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Error submitting hack report:', error);
        return {
          success: false,
          message: 'Failed to submit report. Please try again or contact support.'
        };
      }
      
      // If in development and no Supabase connection, simulate success
      return { 
        success: true, 
        message: 'Hack report submitted successfully and is under review' 
      };
    } catch (error) {
      console.error('Error submitting hack report:', error);
      return {
        success: false,
        message: 'Failed to submit report. Please try again or contact support.'
      };
    }
  }
};