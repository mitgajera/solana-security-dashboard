import React from 'react';
import { useLiveAlerts } from '../../hooks/useLiveAlerts';

const LiveTracker: React.FC = () => {
  const { alerts, loading, error } = useLiveAlerts();

  if (loading) return <div className="p-4 text-center">Loading live alerts...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Live Exploit Tracker</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No active alerts at the moment
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border-l-4 p-3 ${
                alert.severity === 'Critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                alert.severity === 'High' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                alert.severity === 'Medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              } rounded`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{alert.protocol}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-sm mt-1">{alert.type}</div>
              <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                <a 
                  href={`https://solscan.io/tx/${alert.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Transaction
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveTracker;