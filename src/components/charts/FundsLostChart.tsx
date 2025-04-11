import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useExploitData } from '../../hooks/useExploitData';

interface TooltipData {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const FundsLostChart = () => {
  const { exploits, loading, error } = useExploitData();
  const [timeRange, setTimeRange] = useState('all');
  const chartRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  if (loading) {
    return (
      <div className="card p-6 h-80 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
          <p className="text-dark-100 text-sm">Loading chart data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="card p-6 h-80 flex items-center justify-center text-danger">
        <div className="flex flex-col items-center">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-center">Unable to load chart data</p>
        </div>
      </div>
    );
  }
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (timeRange === 'all') return exploits;
    
    const now = new Date();
    const months = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
    const cutoffDate = new Date(new Date().setMonth(now.getMonth() - months));
    
    return exploits.filter(exploit => new Date(exploit.date) >= cutoffDate);
  };
  
  const exploitTypes = [...new Set(exploits.map(e => e.type))];
  const typeColors: Record<string, string> = {
    'Smart Contract': '#FF5A5A',
    'Flash Loan': '#3B82F6',
    'Oracle Manipulation': '#FFB800',
    'Reentrancy': '#00C853',
    'Access Control': '#9333EA'
  };

  const chartData = getFilteredData()
    .sort((a, b) => b.fundsLost - a.fundsLost) // Sort by largest to smallest
    .slice(0, 8) // Take top 8 for better visibility
    .map(exploit => ({
      name: exploit.protocol,
      value: exploit.fundsLost / 1000000, // Convert to millions
      date: new Date(exploit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
      type: exploit.type,
      color: typeColors[exploit.type] || '#64B5F6'
    }));

  // Custom styled tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipData) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-white">{label}</span>
            <span className="text-xs text-dark-100">{data.date}</span>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-xl font-bold text-white">${data.value.toFixed(2)}M</span>
          </div>
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: data.color }}
            ></div>
            <span className="text-xs text-dark-100">{data.type}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={chartRef} className="card overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-dark-500">
        <div>
          <h3 className="text-white font-medium">Funds Lost by Protocol</h3>
          <p className="text-xs text-dark-100 mt-1">Top exploits by USD value</p>
        </div>
        <div className="flex space-x-2">
          {['3m', '6m', '1y', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-1 text-xs rounded-md ${
                timeRange === range 
                  ? 'bg-primary text-white' 
                  : 'bg-dark-700 text-dark-100 hover:bg-dark-600'
              }`}
            >
              {range === 'all' ? 'All time' : range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                type="number" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 'dataMax + 1']}
                tickFormatter={(value) => `$${value}M`}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false}
                tickLine={false}
                width={100}
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                animationDuration={animate ? 1200 : 0}
                animationBegin={animate ? 300 : 0}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    fillOpacity={0.8}
                    className="hover:fill-opacity-100 transition-all duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-xs text-dark-100">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundsLostChart;