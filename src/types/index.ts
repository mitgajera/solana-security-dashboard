// This file exports TypeScript types and interfaces used throughout the application.

export interface Exploit {
  id: string;
  protocol: string;
  date: string;
  type: string;
  fundsLost: number;
  responseTime: number;
}

export interface LiveAlert {
  id: string;
  timestamp: string;
  protocol: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  transactionHash: string;
}

export interface ChartData {
  name: string;
  value: number;
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

export interface Resource {
  title: string;
  link: string;
  description: string;
}

export interface Contributor {
  username: string;
  contributions: number;
}