import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsOverview from '../components/dashboard/StatsOverview';
import FundsLostChart from '../components/charts/FundsLostChart';
import ExploitFrequencyChart from '../components/charts/ExploitFrequencyChart';
import ResponseTimeChart from '../components/charts/ResponseTimeChart';
import VulnerabilityTypesChart from '../components/charts/VulnerabilityTypesChart';
import AlertsTable from '../components/dashboard/AlertsTable';

const Home = () => {
  // Animate entrance of elements
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section');
    
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('opacity-100', 'translate-y-0');
        section.classList.remove('opacity-0', 'translate-y-4');
      }, 100 * (index + 1));
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="animate-section transform transition-all duration-500 opacity-0 translate-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
            <p className="text-dark-100 mt-1">Monitor Solana ecosystem exploits and security incidents</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link 
              to="/live-tracker" 
              className="flex items-center px-4 py-2 bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Live Tracker
            </Link>
            
            <Link 
              to="/submit-hack" 
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:shadow-glow transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Report New Exploit
            </Link>
          </div>
        </div>
        
        <StatsOverview />
      </div>
      
      <div className="animate-section transform transition-all duration-500 opacity-0 translate-y-4">
        <h2 className="text-xl font-medium text-white mb-4">Exploit Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FundsLostChart />
          <ExploitFrequencyChart />
        </div>
      </div>
      
      <div className="animate-section transform transition-all duration-500 opacity-0 translate-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponseTimeChart />
          <VulnerabilityTypesChart />
        </div>
      </div>
      
      <div className="animate-section transform transition-all duration-500 opacity-0 translate-y-4">
        <h2 className="text-xl font-medium text-white mb-4">Recent Security Alerts</h2>
        <div className="card">
          <AlertsTable />
        </div>
      </div>
    </div>
  );
};

export default Home;