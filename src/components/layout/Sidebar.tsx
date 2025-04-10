import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    
    const navItems = [
        { 
            path: '/',
            name: 'Home',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ) 
        },
        { 
            path: '/dashboard',
            name: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ) 
        },
        { 
            path: '/live-tracker',
            name: 'Live Tracker',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ) 
        },
        { 
            path: '/best-practices',
            name: 'Security Guide',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ) 
        },
        { 
            path: '/contribute',
            name: 'Contribute',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ) 
        },
        { 
            path: '/submit-hack',
            name: 'Submit a Hack',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            highlight: true
        },
    ];

    return (
        <div className="hidden md:block bg-dark-800 border-r border-dark-500 w-64 flex-shrink-0">
            <div className="h-full flex flex-col">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    {/* Navigation Links */}
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                                        isActive
                                            ? 'bg-dark-600 text-white border-l-4 border-primary'
                                            : 'text-dark-100 hover:bg-dark-700 hover:text-white'
                                    } ${item.highlight && !isActive ? 'bg-primary bg-opacity-10 text-primary' : ''}`}
                                >
                                    <div className={`mr-3 ${isActive ? 'text-primary' : 'text-dark-100 group-hover:text-white'}`}>
                                        {item.icon}
                                    </div>
                                    {item.name}
                                    
                                    {item.highlight && (
                                        <span className="ml-auto inline-block py-0.5 px-2 text-xs rounded-full bg-primary bg-opacity-20 text-primary">
                                            New
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                
                {/* Bottom section with stats */}
                <div className="p-4">
                    <div className="bg-dark-700 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-dark-100">Security Score</div>
                            <span className="text-xs font-medium text-success">86/100</span>
                        </div>
                        <div className="mt-2 w-full bg-dark-500 rounded-full h-2">
                            <div className="bg-gradient-to-r from-primary to-success h-2 rounded-full" style={{ width: '86%' }}></div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-md bg-dark-700 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-xs font-medium text-dark-100">Need help?</p>
                            <a href="#" className="text-xs text-primary hover:underline">
                                View support docs
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;