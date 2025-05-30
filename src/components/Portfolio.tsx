
import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const portfolioData = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.15432,
    value: 6678.24,
    change: 2.34,
    allocation: 45.2
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 2.8954,
    value: 7671.31,
    change: -1.67,
    allocation: 51.9
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    amount: 12.4567,
    value: 3924.86,
    change: 0.89,
    allocation: 26.5
  }
];

export const Portfolio = () => {
  const [hideBalance, setHideBalance] = useState(false);

  const totalValue = portfolioData.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = portfolioData.reduce((sum, asset) => sum + (asset.value * asset.change / 100), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  const formatValue = (value: number) => {
    if (hideBalance) return '****';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatAmount = (amount: number) => {
    if (hideBalance) return '****';
    return amount.toFixed(6);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Portfolio</h2>
        <button
          onClick={() => setHideBalance(!hideBalance)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {hideBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {formatValue(totalValue)}
          </div>
          <div className={`flex items-center justify-center text-sm ${
            totalChangePercent >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {totalChangePercent >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {totalChangePercent >= 0 ? '+' : ''}{formatValue(totalChange)} ({totalChangePercent.toFixed(2)}%)
          </div>
          <div className="text-xs text-gray-400 mt-1">24h Change</div>
        </div>
      </div>

      {/* Holdings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Holdings</h3>
        
        {portfolioData.map((asset) => (
          <div
            key={asset.symbol}
            className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{asset.symbol}</span>
                </div>
                <div>
                  <div className="font-medium text-white">{asset.symbol}</div>
                  <div className="text-sm text-gray-400">{asset.name}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-white">{formatValue(asset.value)}</div>
                <div className={`text-sm ${
                  asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Amount</div>
                <div className="text-white">{formatAmount(asset.amount)} {asset.symbol}</div>
              </div>
              <div>
                <div className="text-gray-400">Allocation</div>
                <div className="text-white">{asset.allocation}%</div>
              </div>
            </div>

            {/* Allocation Bar */}
            <div className="mt-2">
              <div className="w-full bg-slate-600 rounded-full h-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-1 rounded-full transition-all"
                  style={{ width: `${asset.allocation}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all">
          Deposit
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-all">
          Withdraw
        </button>
      </div>
    </div>
  );
};
