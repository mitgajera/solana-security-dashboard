import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: {
    value: number;
    label: string;
  };
  icon: React.ReactNode; // Changed from JSX.Element to React.ReactNode
  accentColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, trend, icon, accentColor }) => {
  return (
    <div className="card overflow-hidden">
      <div 
        className="h-1" 
        style={{ background: `linear-gradient(90deg, ${accentColor} 0%, rgba(255,255,255,0.1) 100%)` }}
      ></div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-dark-100">{title}</h3>
          <div className={`text-${accentColor.replace('#', '')} p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${accentColor}20` }}>
            {icon}
          </div>
        </div>
        <div className="flex items-baseline mb-1">
          <span className="text-2xl font-bold text-white">{value}</span>
          {trend && (
            <span 
              className={`ml-2 text-xs font-medium flex items-center ${
                trend.value >= 0 ? 'text-success' : 'text-danger'
              }`}
            >
              <svg 
                className="h-3 w-3 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={trend.value >= 0 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                />
              </svg>
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        <p className="text-xs text-dark-100">{description}</p>
        
        {trend && (
          <div className="mt-3 pt-3 border-t border-dark-500">
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-100">{trend.label}</span>
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-1 ${
                  trend.value >= 0 ? 'bg-success' : 'bg-danger'
                }`}></div>
                <span className={`text-xs ${
                  trend.value >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {trend.value >= 0 ? 'Improving' : 'Worsening'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Exploits"
        value="48"
        description="All time security breaches"
        trend={{
          value: 12.7,
          label: "vs. previous quarter"
        }}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        }
        accentColor="#FF5A5A"
      />
      
      <StatCard 
        title="Total Funds Lost"
        value="$76.2M"
        description="Lost to exploits"
        trend={{
          value: 8.4,
          label: "vs. previous quarter"
        }}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        accentColor="#FFB800"
      />
      
      <StatCard 
        title="Avg. Response Time"
        value="18.5h"
        description="To patch vulnerabilities"
        trend={{
          value: -14.3,
          label: "vs. previous quarter"
        }}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        accentColor="#3B82F6"
      />
      
      <StatCard 
        title="Active Vulnerabilities"
        value="12"
        description="Currently being monitored"
        trend={{
          value: -3.2,
          label: "vs. previous week"
        }}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        }
        accentColor="#00C853"
      />
    </div>
  );
};

export default StatsOverview;