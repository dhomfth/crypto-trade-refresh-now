
import { useState } from 'react';
import { Bitcoin, DollarSign, TrendingUp, User, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
              <Bitcoin className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CryptoTrader</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Markets</span>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Trading</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">News</a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Balance: <span className="text-green-400 font-semibold">$12,456.78</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-white py-2">Markets</a>
              <a href="#" className="text-gray-300 hover:text-white py-2">Trading</a>
              <a href="#" className="text-gray-300 hover:text-white py-2">Portfolio</a>
              <a href="#" className="text-gray-300 hover:text-white py-2">News</a>
              <div className="pt-2 border-t border-slate-700">
                <div className="text-sm text-gray-400 py-2">
                  Balance: <span className="text-green-400 font-semibold">$12,456.78</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
                  Login
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
