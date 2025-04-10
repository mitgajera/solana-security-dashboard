// src/types/index.ts
export interface Exploit {
  id: string | number;
  protocol: string;
  date: string;
  type: string;
  fundsLost: number;
  responseTime: number;
  description?: string;
  transactionHash?: string;
}

export interface LiveAlert {
  id: string;
  timestamp: string;
  protocol: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  transactionHash: string;
  details?: Record<string, any>;
}

export interface HackReport {
  protocol: string;
  date: string;
  type: string;
  fundsLost: number;
  description: string;
  sourceLinks: string[];
  reporterName?: string;
  reporterEmail?: string;
}