import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                {/* Replace image with text logo if needed */}
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold mr-3">S</div>
                <h1 className="text-xl font-bold">Superteam Security Dashboard</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/best-practices" className="hover:underline">Resources</Link>
                    </li>
                    <li>
                        <Link to="/contribute" className="hover:underline">Contribute</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;