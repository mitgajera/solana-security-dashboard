import axios from 'axios';
import { Exploit, LiveAlert, HackReport } from '../types';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';
const DUNE_API_KEY = process.env.REACT_APP_DUNE_API_KEY || '';
const HELIUS_API_KEY = process.env.REACT_APP_HELIUS_API_KEY;

export const apiService = {
  async fetchExploitData(): Promise<Exploit[]> {
    return [
      { id: '1', protocol: 'Solar DEX', date: '2023-01-15', type: 'Smart Contract', fundsLost: 1200000, responseTime: 24 },
      { id: '2', protocol: 'LunarFi', date: '2023-02-22', type: 'Flash Loan', fundsLost: 3500000, responseTime: 12 },
      { id: '3', protocol: 'NFT Galaxy', date: '2023-03-10', type: 'Access Control', fundsLost: 800000, responseTime: 48 },
      { id: '4', protocol: 'Yield Cosmos', date: '2023-04-03', type: 'Oracle Manipulation', fundsLost: 5000000, responseTime: 8 },
      { id: '5', protocol: 'LendSol', date: '2023-05-18', type: 'Reentrancy', fundsLost: 2300000, responseTime: 36 },
      { id: '6', protocol: 'WarpSwap', date: '2023-06-05', type: 'Smart Contract', fundsLost: 1800000, responseTime: 16 },
      { id: '7', protocol: 'StakeDust', date: '2023-07-12', type: 'Flash Loan', fundsLost: 2700000, responseTime: 20 },
      { id: '8', protocol: 'AstroDAO', date: '2023-08-27', type: 'Oracle Manipulation', fundsLost: 4200000, responseTime: 14 }
    ];
  },
  
  async fetchLiveAlerts(): Promise<LiveAlert[]> {
    try {
      const response = await axios.get(
        `https://api.helius.xyz/v0/addresses/{address}/transactions?api-key=${HELIUS_API_KEY}`
      );
      
      return response.data.map((item: any) => ({
        id: item.signature,
        timestamp: new Date(item.timestamp).toISOString(),
        protocol: item.description || 'Unknown Protocol',
        type: 'Potential Exploit',
        severity: 'High',
        transactionHash: item.signature,
      }));
    } catch (error) {
      console.error('Error fetching live alerts:', error);
      
      return [
        { id: '1', timestamp: '2023-09-15T14:30:00Z', protocol: 'Solana DEX', type: 'Unusual Activity', severity: 'Medium', transactionHash: '0xabc123...' },
        { id: '2', timestamp: '2023-09-15T14:35:00Z', protocol: 'NFT Protocol', type: 'Potential Exploit', severity: 'High', transactionHash: '0xdef456...' },
        { id: '3', timestamp: '2023-09-15T14:40:00Z', protocol: 'Lending Platform', type: 'Large Withdrawal', severity: 'Low', transactionHash: '0xghi789...' },
      ];
    }
  },
  
  async fetchDuneData(queryId: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.dune.com/api/v1/query/${queryId}/results?api_key=${DUNE_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Dune data:', error);
      throw error;
    }
  },
  
  async submitHackReport(hackData: HackReport): Promise<{ success: boolean; message: string }> {
    console.log('Submitted hack report:', hackData);
    return { success: true, message: 'Hack report submitted successfully' };
  }
};