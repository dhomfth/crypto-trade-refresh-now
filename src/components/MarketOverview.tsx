
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketStats = [
  {
    label: 'Total Market Cap',
    value: '$2.1T',
    change: '+2.34%',
    isPositive: true
  },
  {
    label: '24h Volume',
    value: '$89.2B',
    change: '+5.67%',
    isPositive: true
  },
  {
    label: 'BTC Dominance',
    value: '51.2%',
    change: '-0.89%',
    isPositive: false
  },
  {
    label: 'Active Cryptocurrencies',
    value: '2,456',
    change: '+12',
    isPositive: true
  }
];

export const MarketOverview = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {marketStats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all"
        >
          <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
          <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
          <div className={`flex items-center text-sm ${
            stat.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {stat.isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
};
