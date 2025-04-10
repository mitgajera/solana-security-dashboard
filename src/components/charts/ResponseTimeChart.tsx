import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExploitData } from '../../hooks/useExploitData';

const ResponseTimeChart: React.FC = () => {
  const { exploits, loading, error } = useExploitData();

  if (loading) return <div className="p-4 text-center">Loading chart data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  const chartData = exploits.map(exploit => ({
    name: exploit.protocol,
    x: exploit.fundsLost / 1000000, // Funds lost in millions
    y: exploit.responseTime, // Response time in hours
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
          }}
        >
          <CartesianGrid />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Funds Lost" 
            unit="M" 
            label={{ value: 'Funds Lost (Millions USD)', position: 'insideBottom', offset: -10 }} 
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Response Time" 
            unit="h"
            label={{ value: 'Response Time (hours)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name, props) => {
              if (name === 'x') return [`$${value}M`, 'Funds Lost'];
              if (name === 'y') return [`${value} hours`, 'Response Time'];
              return [value, name];
            }}
            labelFormatter={(value) => chartData[value]?.name || ''}
          />
          <Scatter name="Exploits" data={chartData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseTimeChart;