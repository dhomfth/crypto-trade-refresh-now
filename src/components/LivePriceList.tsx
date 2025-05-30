
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bitcoin, DollarSign } from 'lucide-react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
}

interface LivePriceListProps {
  selectedCrypto: string;
  onSelectCrypto: (crypto: string) => void;
}

// Mock data untuk simulasi live prices
const generateMockData = (): CryptoData[] => [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250 + (Math.random() - 0.5) * 1000,
    change: -2.34 + (Math.random() - 0.5) * 4,
    volume: 28500000000,
    marketCap: 845000000000
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2650 + (Math.random() - 0.5) * 100,
    change: 3.67 + (Math.random() - 0.5) * 4,
    volume: 15200000000,
    marketCap: 318000000000
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    price: 315 + (Math.random() - 0.5) * 20,
    change: 1.23 + (Math.random() - 0.5) * 4,
    volume: 1800000000,
    marketCap: 48500000000
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.52 + (Math.random() - 0.5) * 0.1,
    change: -1.89 + (Math.random() - 0.5) * 4,
    volume: 890000000,
    marketCap: 18200000000
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.5 + (Math.random() - 0.5) * 10,
    change: 4.12 + (Math.random() - 0.5) * 4,
    volume: 2100000000,
    marketCap: 42800000000
  }
];

export const LivePriceList = ({ selectedCrypto, onSelectCrypto }: LivePriceListProps) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(generateMockData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(generateMockData());
      setLastUpdate(new Date());
      console.log('Crypto prices updated:', new Date().toLocaleTimeString());
    }, 15000); // Update setiap 15 detik

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 4 : 2
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`;
    return `$${volume.toLocaleString()}`;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Live Prices</h2>
          <div className="text-xs text-gray-400">
            Updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            onClick={() => onSelectCrypto(crypto.id)}
            className={`p-4 border-b border-slate-700/50 cursor-pointer transition-all hover:bg-slate-700/30 ${
              selectedCrypto === crypto.id ? 'bg-blue-600/20 border-blue-500/50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  {crypto.symbol === 'BTC' ? (
                    <Bitcoin className="h-4 w-4 text-white" />
                  ) : (
                    <DollarSign className="h-4 w-4 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">{crypto.symbol}</div>
                  <div className="text-xs text-gray-400">{crypto.name}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-white">{formatPrice(crypto.price)}</div>
                <div className={`flex items-center text-xs ${
                  crypto.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {crypto.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div>
                <span className="text-gray-500">Vol: </span>
                {formatVolume(crypto.volume)}
              </div>
              <div>
                <span className="text-gray-500">MCap: </span>
                {formatVolume(crypto.marketCap)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
