
import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TradingInterfaceProps {
  selectedCrypto: string;
}

export const TradingInterface = ({ selectedCrypto }: TradingInterfaceProps) => {
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('43250.00');
  const [orderMode, setOrderMode] = useState<'market' | 'limit'>('market');
  const { toast } = useToast();

  const currentPrice = 43250.00;
  const balance = 12456.78;

  const handleTrade = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const total = parseFloat(amount) * (orderMode === 'market' ? currentPrice : parseFloat(price));
    
    if (orderType === 'buy' && total > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this trade",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trade Executed",
      description: `${orderType.toUpperCase()} order for ${amount} ${selectedCrypto.toUpperCase()} at $${orderMode === 'market' ? currentPrice : price}`,
    });

    // Reset form
    setAmount('');
  };

  const calculateTotal = () => {
    if (!amount) return 0;
    return parseFloat(amount) * (orderMode === 'market' ? currentPrice : parseFloat(price));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Trading Interface</h2>
        <div className="text-right">
          <div className="text-sm text-gray-400">Current Price</div>
          <div className="text-lg font-bold text-white">${currentPrice.toLocaleString()}</div>
        </div>
      </div>

      {/* Order Type Toggle */}
      <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg mb-6">
        <button
          onClick={() => setOrderType('buy')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            orderType === 'buy'
              ? 'bg-green-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <TrendingUp className="h-4 w-4 inline mr-2" />
          Buy
        </button>
        <button
          onClick={() => setOrderType('sell')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            orderType === 'sell'
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <TrendingDown className="h-4 w-4 inline mr-2" />
          Sell
        </button>
      </div>

      {/* Order Mode */}
      <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg mb-6">
        <button
          onClick={() => setOrderMode('market')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            orderMode === 'market'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderMode('limit')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            orderMode === 'limit'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Limit
        </button>
      </div>

      {/* Amount Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount ({selectedCrypto.toUpperCase()})
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-sm text-gray-400">{selectedCrypto.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Price Input (for limit orders) */}
        {orderMode === 'limit' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        )}

        {/* Total */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total:</span>
            <span className="text-lg font-semibold text-white">
              ${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">Available:</span>
            <span className="text-sm text-gray-300">${balance.toLocaleString()}</span>
          </div>
        </div>

        {/* Trade Button */}
        <button
          onClick={handleTrade}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
            orderType === 'buy'
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
          }`}
        >
          {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedCrypto.toUpperCase()}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-4 gap-2">
        {['25%', '50%', '75%', '100%'].map((percentage) => (
          <button
            key={percentage}
            onClick={() => {
              const maxAmount = orderType === 'buy' 
                ? balance / currentPrice 
                : 1.5; // Assume user has 1.5 of the crypto
              const percentValue = parseInt(percentage) / 100;
              setAmount((maxAmount * percentValue).toFixed(6));
            }}
            className="py-2 px-3 bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white rounded-lg text-sm transition-all"
          >
            {percentage}
          </button>
        ))}
      </div>
    </div>
  );
};
