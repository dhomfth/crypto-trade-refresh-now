
import { useState, useEffect } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';

const cryptoPrices = {
  BTC: 43250,
  ETH: 2650,
  BNB: 315,
  ADA: 0.52,
  SOL: 98.5
};

export const CryptoCalculator = () => {
  const [fromCrypto, setFromCrypto] = useState('BTC');
  const [toCrypto, setToCrypto] = useState('USD');
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');

  useEffect(() => {
    calculateConversion();
  }, [fromCrypto, toCrypto, fromAmount]);

  const calculateConversion = () => {
    if (!fromAmount || isNaN(parseFloat(fromAmount))) {
      setToAmount('');
      return;
    }

    const amount = parseFloat(fromAmount);
    
    if (toCrypto === 'USD') {
      // Crypto to USD
      const price = cryptoPrices[fromCrypto as keyof typeof cryptoPrices];
      setToAmount((amount * price).toFixed(2));
    } else if (fromCrypto === 'USD') {
      // USD to Crypto
      const price = cryptoPrices[toCrypto as keyof typeof cryptoPrices];
      setToAmount((amount / price).toFixed(8));
    } else {
      // Crypto to Crypto
      const fromPrice = cryptoPrices[fromCrypto as keyof typeof cryptoPrices];
      const toPrice = cryptoPrices[toCrypto as keyof typeof cryptoPrices];
      setToAmount((amount * fromPrice / toPrice).toFixed(8));
    }
  };

  const swapCurrencies = () => {
    if (toCrypto !== 'USD' && fromCrypto !== 'USD') {
      setFromCrypto(toCrypto);
      setToCrypto(fromCrypto);
      setFromAmount(toAmount);
    }
  };

  const cryptoOptions = ['USD', ...Object.keys(cryptoPrices)];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Crypto Calculator
        </h2>
      </div>

      <div className="space-y-4">
        {/* From Currency */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">From</label>
            <select
              value={fromCrypto}
              onChange={(e) => setFromCrypto(e.target.value)}
              className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-1 text-white text-sm"
            >
              {cryptoOptions.map(crypto => (
                <option key={crypto} value={crypto}>{crypto}</option>
              ))}
            </select>
          </div>
          
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
          />
          
          {fromCrypto !== 'USD' && (
            <div className="text-sm text-gray-400 mt-1">
              1 {fromCrypto} = ${cryptoPrices[fromCrypto as keyof typeof cryptoPrices].toLocaleString()}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all transform hover:scale-105"
            disabled={fromCrypto === 'USD' || toCrypto === 'USD'}
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>
        </div>

        {/* To Currency */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">To</label>
            <select
              value={toCrypto}
              onChange={(e) => setToCrypto(e.target.value)}
              className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-1 text-white text-sm"
            >
              {cryptoOptions.map(crypto => (
                <option key={crypto} value={crypto}>{crypto}</option>
              ))}
            </select>
          </div>
          
          <div className="text-2xl font-bold text-white">
            {toAmount || '0.00'}
          </div>
          
          {toCrypto !== 'USD' && (
            <div className="text-sm text-gray-400 mt-1">
              1 {toCrypto} = ${cryptoPrices[toCrypto as keyof typeof cryptoPrices].toLocaleString()}
            </div>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {['0.1', '0.5', '1', '10'].map((amount) => (
            <button
              key={amount}
              onClick={() => setFromAmount(amount)}
              className="bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white py-2 rounded-lg text-sm transition-all"
            >
              {amount}
            </button>
          ))}
        </div>

        {/* Market Info */}
        <div className="bg-slate-700/20 rounded-lg p-3 mt-4">
          <div className="text-xs text-gray-400 mb-2">Market Information</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-300">
              <span className="text-gray-500">24h Volume: </span>
              $89.2B
            </div>
            <div className="text-gray-300">
              <span className="text-gray-500">Market Cap: </span>
              $2.1T
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
