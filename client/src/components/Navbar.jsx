import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700">
                    <Layout className="w-6 h-6" />
                    <span>ProjectManager</span>
                </Link>
                <div>
                    {/* Add user profile or other links here */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
