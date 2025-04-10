import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExploitData } from '../../hooks/useExploitData';

const FundsLostChart: React.FC = () => {
  const { exploits, loading, error } = useExploitData();
  
  if (loading) return <div className="p-4 text-center">Loading chart data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  const chartData = exploits
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(exploit => ({
      name: exploit.protocol,
      value: exploit.fundsLost / 1000000, // Convert to millions for readability
    }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis label={{ value: 'Millions USD', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`$${value}M`, 'Funds Lost']} />
          <Bar dataKey="value" fill="#FF6B6B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundsLostChart;