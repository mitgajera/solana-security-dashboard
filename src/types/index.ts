export interface Exploit {
  id: string;
  protocol: string;
  date: string;
  type: string;
  fundsLost: number;
  responseTime?: number;
}

export interface LiveAlert {
  id: string;
  timestamp: string;
  protocol: string;
  type: string;
  severity: string;
  transactionHash: string;
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

export interface ProgramAccount {
  name: string;
  programId: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
}

export interface SuspiciousTransaction {
  signature: string;
  blockTime: number;
  protocol: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}