import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LiveTracker from './pages/LiveTracker';
import BestPractices from './pages/BestPractices';
import Contribute from './pages/Contribute';
import SubmitHack from './pages/SubmitHack';
import './styles/globals.css'; 

const App = () => {
    // Apply dark mode to body element
    useEffect(() => {
        document.body.classList.add('bg-dark-900');
        document.documentElement.classList.add('dark');
    }, []);

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-dark-900 text-white">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 overflow-x-hidden">
                        <div className="max-w-7xl mx-auto">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/live-tracker" element={<LiveTracker />} />
                                <Route path="/best-practices" element={<BestPractices />} />
                                <Route path="/contribute" element={<Contribute />} />
                                <Route path="/submit-hack" element={<SubmitHack />} />
                            </Routes>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;