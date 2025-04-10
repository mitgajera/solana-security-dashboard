import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://ddntksbsutfubpjrcplh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error('SUPABASE_KEY is not defined');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importHistoricalData() {
  try {
    // Example data source: GitHub repository with historical exploits data
    const response = await axios.get(
      'https://raw.githubusercontent.com/slowmist/Blockchain-Security-Database/main/Solana/README.md'
    );
    
    // Parse the markdown table from SlowMist's security database
    const markdown = response.data;
    const lines = markdown.split('\n');
    const dataRows = lines.filter(line => line.startsWith('|') && line.includes('|'));
    
    // Skip header and separator rows
    const exploitRows = dataRows.slice(2);
    
    for (const row of exploitRows) {
      const columns = row.split('|').filter(col => col.trim() !== '');
      if (columns.length >= 5) {
        const date = parseDate(columns[0].trim());
        const protocol = columns[1].trim();
        const description = columns[2].trim();
        const fundsLost = parseFundsLost(columns[3].trim());
        const type = determineExploitType(description);
        const responseTime = Math.floor(Math.random() * 48) + 1; // Placeholder
        
        // Insert into Supabase
        await supabase.from('exploits').insert({
          protocol,
          date,
          type,
          funds_lost: fundsLost,
          response_time: responseTime,
          description
        });
        
        console.log(`Imported exploit: ${protocol}`);
      }
    }
    
    console.log('Import completed successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

function parseDate(dateString: string): string {
  // Convert date formats to YYYY-MM-DD
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (e) {
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
  
  if (lowercaseDesc.includes('flash loan') || lowercaseDesc.includes('flashloan')) {
    return 'Flash Loan';
  } else if (lowercaseDesc.includes('oracle') || lowercaseDesc.includes('price manipulation')) {
    return 'Oracle Manipulation';
  } else if (lowercaseDesc.includes('reentrancy')) {
    return 'Reentrancy';
  } else if (lowercaseDesc.includes('access control') || lowercaseDesc.includes('privilege')) {
    return 'Access Control';
  } else if (lowercaseDesc.includes('smart contract') || lowercaseDesc.includes('code')) {
    return 'Smart Contract';
  }
  
  return 'Other';
}

// Run the import script
importHistoricalData();