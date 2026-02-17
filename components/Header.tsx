
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-purple-900 text-white text-center py-2 text-sm font-medium tracking-wide">
        Made By - AJIT NARAYAN JHA
      </div>
      <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold text-purple-900 tracking-tight">BharatCarbon</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-purple-600 transition-colors">Calculator</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Indian Standards</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Resources</a>
          </nav>
          <div className="text-xs font-bold text-purple-600 border border-purple-600 px-3 py-1 rounded-full uppercase tracking-tighter">
            India Edition
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
