
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MarketOverview } from '@/components/MarketOverview';
import { TradingInterface } from '@/components/TradingInterface';
import { Portfolio } from '@/components/Portfolio';
import { PriceChart } from '@/components/PriceChart';
import { LivePriceList } from '@/components/LivePriceList';

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [activeTab, setActiveTab] = useState('trading');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            CryptoTrader Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Platform trading cryptocurrency terdepan dengan harga real-time dan fitur trading canggih
          </p>
        </div>

        <MarketOverview />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Price List */}
          <div className="lg:col-span-1">
            <LivePriceList 
              selectedCrypto={selectedCrypto}
              onSelectCrypto={setSelectedCrypto}
            />
          </div>

          {/* Middle Column - Chart and Trading */}
          <div className="lg:col-span-2 space-y-6">
            <PriceChart selectedCrypto={selectedCrypto} />
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('trading')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'trading'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Trading
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Portfolio
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'trading' && <TradingInterface selectedCrypto={selectedCrypto} />}
            {activeTab === 'portfolio' && <Portfolio />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
