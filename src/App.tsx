import React from 'react';
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
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-grow">
                    <Sidebar />
                    <main className="flex-grow p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/live-tracker" element={<LiveTracker />} />
                            <Route path="/best-practices" element={<BestPractices />} />
                            <Route path="/contribute" element={<Contribute />} />
                            <Route path="/submit-hack" element={<SubmitHack />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;