
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MarketOverview } from '@/components/MarketOverview';
import { TradingInterface } from '@/components/TradingInterface';
import { Portfolio } from '@/components/Portfolio';
import { PriceChart } from '@/components/PriceChart';
import { LivePriceList } from '@/components/LivePriceList';
import { NewsFeed } from '@/components/NewsFeed';
import { OrderHistory } from '@/components/OrderHistory';
import { PriceAlerts } from '@/components/PriceAlerts';
import { CryptoCalculator } from '@/components/CryptoCalculator';

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

        {/* Main Content - Updated Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-8">
          {/* Left Column - Price List & Calculator */}
          <div className="xl:col-span-1 space-y-6">
            <LivePriceList 
              selectedCrypto={selectedCrypto}
              onSelectCrypto={setSelectedCrypto}
            />
            <CryptoCalculator />
          </div>

          {/* Middle Column - Chart and Trading */}
          <div className="xl:col-span-2 space-y-6">
            <PriceChart selectedCrypto={selectedCrypto} />
            
            {/* Enhanced Tab Navigation */}
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
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'orders'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'alerts'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                Alerts
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'trading' && <TradingInterface selectedCrypto={selectedCrypto} />}
            {activeTab === 'portfolio' && <Portfolio />}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'alerts' && <PriceAlerts />}
          </div>

          {/* Right Column - News Feed */}
          <div className="xl:col-span-1">
            <NewsFeed />
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Fitur Lengkap Trading Platform
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 text-center hover:border-blue-500 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">📊</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Real-time Charts</h3>
              <p className="text-gray-400 text-sm">Advanced charting dengan data real-time</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 text-center hover:border-green-500 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Instant Trading</h3>
              <p className="text-gray-400 text-sm">Eksekusi order cepat dengan spread rendah</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 text-center hover:border-yellow-500 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🔔</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Price Alerts</h3>
              <p className="text-gray-400 text-sm">Notifikasi harga otomatis</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 text-center hover:border-purple-500 transition-all">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">📱</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Mobile Ready</h3>
              <p className="text-gray-400 text-sm">Fully responsive design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
