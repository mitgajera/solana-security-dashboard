import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://ddntksbsutfubpjrcplh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error('SUPABASE_KEY is not defined');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importHistoricalData() {
  try {
    console.log('Starting data import...');
    
    // Try multiple data sources for completeness
    await importFromSlowMist();
    await importFromRektDatabase();
    await importFromSolanaFM();
    
    console.log('Import completed successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

async function importFromSlowMist() {
  console.log('Importing data from SlowMist...');
  const response = await axios.get(
    'https://raw.githubusercontent.com/slowmist/Blockchain-Security-Database/main/Solana/README.md'
  );
  
  // Parse the markdown table
  const markdown = response.data;
  const lines = markdown.split('\n');
  const dataRows = lines.filter(line => line.startsWith('|') && line.includes('|'));
  
  // Skip header and separator rows
  const exploitRows = dataRows.slice(2);
  let imported = 0;
  
  for (const row of exploitRows) {
    const columns = row.split('|').filter(col => col.trim() !== '');
    if (columns.length >= 5) {
      try {
        const date = parseDate(columns[0].trim());
        const protocol = columns[1].trim();
        const description = columns[2].trim();
        const fundsLost = parseFundsLost(columns[3].trim());
        const type = determineExploitType(description);
        const responseTime = estimateResponseTime(description, protocol);
        
        // Check if exploit already exists to avoid duplicates
        const { data: existingExploit } = await supabase
          .from('exploits')
          .select('id')
          .eq('protocol', protocol)
          .eq('date', date)
          .single();
          
        if (!existingExploit) {
          // Insert new exploit
          await supabase.from('exploits').insert({
            protocol,
            date,
            type,
            funds_lost: fundsLost,
            response_time: responseTime,
            description,
            created_at: new Date().toISOString()
          });
          
          imported++;
          console.log(`Imported: ${protocol} (${date})`);
        } else {
          console.log(`Skipped duplicate: ${protocol} (${date})`);
        }
      } catch (err) {
        console.error(`Error processing row: ${row}`, err);
      }
    }
  }
  
  console.log(`Imported ${imported} new exploits from SlowMist`);
}

// Similar functions for importFromRektDatabase and importFromSolanaFM...

function parseDate(dateString: string): string {
  // Enhanced date parsing
  try {
    // Handle various formats
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString; // Already in YYYY-MM-DD format
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return date.toISOString().split('T')[0];
  } catch (e) {
    console.warn(`Invalid date format: ${dateString}, using default date`);
    return '2023-01-01'; // Default date as fallback
  }
}

function parseFundsLost(fundsString: string): number {
  // Extract numeric value from strings like "$1.3M"
  const match = fundsString.match(/\$?(\d+(?:\.\d+)?)\s*([KMB])?/i);
  if (!match) return 0;
  
  let value = parseFloat(match[1]);
  const multiplier = match[2]?.toUpperCase();
  
  if (multiplier === 'K') value *= 1000;
  else if (multiplier === 'M') value *= 1000000;
  else if (multiplier === 'B') value *= 1000000000;
  
  return value;
}

function determineExploitType(description: string): string {
  const lowercaseDesc = description.toLowerCase();
  
  // Enhanced type detection based on common patterns
  if (lowercaseDesc.includes('flash loan') || lowercaseDesc.includes('flashloan')) {
    return 'Flash Loan';
  } else if (lowercaseDesc.includes('oracle') || lowercaseDesc.includes('price manipulation')) {
    return 'Oracle Manipulation';
  } else if (lowercaseDesc.includes('reentrancy')) {
    return 'Reentrancy';
  } else if (lowercaseDesc.includes('access control') || lowercaseDesc.includes('privilege')) {
    return 'Access Control';
  } else if (lowercaseDesc.includes('private key') || lowercaseDesc.includes('key compromise')) {
    return 'Private Key Compromise';
  } else if (lowercaseDesc.includes('smart contract') || lowercaseDesc.includes('code')) {
    return 'Smart Contract';
  }
  
  return 'Other';
}

function estimateResponseTime(description: string, protocol: string): number {
  // Estimate response time based on protocol and description
  // This is a simplified example - you might want to use a more sophisticated approach
  const lowercaseDesc = description.toLowerCase();
  
  if (lowercaseDesc.includes('quickly') || lowercaseDesc.includes('immediate')) {
    return Math.floor(Math.random() * 4) + 1; // 1-4 hours
  } else if (lowercaseDesc.includes('delay') || lowercaseDesc.includes('late')) {
    return Math.floor(Math.random() * 24) + 24; // 24-48 hours
  }
  
  // Default: random time between 4 and 24 hours
  return Math.floor(Math.random() * 20) + 4;
}

// Run the import script
importHistoricalData();