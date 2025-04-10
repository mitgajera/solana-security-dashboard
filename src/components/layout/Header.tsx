import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-dark-800 border-b border-dark-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-br from-primary to-success rounded-lg flex items-center justify-center mr-3">
                                <span className="font-bold text-xl text-white">S</span>
                            </div>
                            <span className="text-xl font-medium text-gradient">Superteam Security</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Search bar */}
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search exploits..." 
                                    className="bg-dark-700 border border-dark-500 rounded-lg py-1.5 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <svg className="w-4 h-4 text-dark-100 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            {/* Notification bell */}
                            <div className="relative">
                                <button className="p-1 rounded-full text-dark-100 hover:text-white focus:outline-none" aria-label="Notifications">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>
                                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-danger rounded-full"></span>
                            </div>
                            
                            {/* Profile */}
                            <div className="ml-3 relative">
                                <div className="flex items-center">
                                    <button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-info flex items-center justify-center text-white">
                                            S
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="bg-dark-700 p-2 rounded-md inline-flex items-center justify-center text-dark-100 hover:bg-dark-600 focus:outline-none"
                                aria-label="Toggle mobile menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-dark-800">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-dark-700">
                            Home
                        </Link>
                        <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-dark-100 hover:text-white hover:bg-dark-700">
                            Dashboard
                        </Link>
                        <Link to="/live-tracker" className="block px-3 py-2 rounded-md text-base font-medium text-dark-100 hover:text-white hover:bg-dark-700">
                            Live Tracker
                        </Link>
                        <Link to="/best-practices" className="block px-3 py-2 rounded-md text-base font-medium text-dark-100 hover:text-white hover:bg-dark-700">
                            Best Practices
                        </Link>
                        <Link to="/submit-hack" className="block px-3 py-2 rounded-md text-base font-medium text-dark-100 hover:text-white hover:bg-dark-700">
                            Submit a Hack
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;