
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-purple-900 tracking-tight">BharatCarbon</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering Indian citizens to understand and reduce their climate impact through localized data and AI.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Calculate</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><a href="#" className="hover:text-purple-600">Household Impact</a></li>
              <li><a href="#" className="hover:text-purple-600">Travel Emissions</a></li>
              <li><a href="#" className="hover:text-purple-600">Diet Footprint</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><a href="#" className="hover:text-purple-600">Emission Factors</a></li>
              <li><a href="#" className="hover:text-purple-600">Climate Action India</a></li>
              <li><a href="#" className="hover:text-purple-600">Solar Subsidies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Stay Informed</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white border border-gray-300 text-sm rounded-l-md px-4 py-2 focus:ring-purple-500 focus:border-purple-500 w-full"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:row justify-between items-center text-xs text-gray-400">
          <p>© 2024 BharatCarbon. Built for a sustainable India.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
