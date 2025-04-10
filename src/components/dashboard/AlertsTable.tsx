import React from 'react';
import { useLiveAlerts } from '../../hooks/useLiveAlerts';
import { LiveAlert } from '../../types';

const AlertsTable: React.FC = () => {
  const { alerts, loading, error } = useLiveAlerts();
  
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
          <p className="text-dark-100 text-sm">Loading alerts...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 text-center text-danger">
        <p>Unable to load alerts</p>
      </div>
    );
  }
  
  const getSeverityColor = (severity: 'Low' | 'Medium' | 'High' | 'Critical'): string => {
    switch (severity) {
      case 'High':
      case 'Critical':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'info';
    }
  };
  
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-100 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-100 uppercase tracking-wider">
                Protocol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-100 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-100 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-dark-100 uppercase tracking-wider">
                Transaction
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-500">
            {alerts.map((alert: LiveAlert) => (
              <tr key={alert.id} className="hover:bg-dark-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-100">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {alert.protocol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-dark-100">{alert.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge badge-${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-100">
                  <a 
                    href={`https://solscan.io/tx/${alert.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light"
                  >
                    {alert.transactionHash.substring(0, 8)}...
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-4 border-t border-dark-500 flex items-center justify-between">
        <div className="text-sm text-dark-100">
          Showing <span className="font-medium text-white">1-{alerts.length}</span> of <span className="font-medium text-white">{alerts.length}</span> alerts
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-dark-700 text-dark-100 rounded-md text-sm" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-dark-700 text-dark-100 rounded-md text-sm" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsTable;