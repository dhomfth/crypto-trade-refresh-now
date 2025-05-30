
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  selectedCrypto: string;
}

// Generate mock chart data
const generateChartData = () => {
  const data = [];
  let basePrice = 43250;
  
  for (let i = 23; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 2000;
    const price = basePrice + variation;
    const time = new Date();
    time.setHours(time.getHours() - i);
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: price,
      volume: Math.random() * 1000000000
    });
    
    basePrice = price;
  }
  
  return data;
};

export const PriceChart = ({ selectedCrypto }: PriceChartProps) => {
  const [chartData, setChartData] = useState(generateChartData());
  const [timeframe, setTimeframe] = useState('24H');

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateChartData());
      console.log('Chart data updated for', selectedCrypto);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [selectedCrypto]);

  const currentPrice = chartData[chartData.length - 1]?.price || 43250;
  const previousPrice = chartData[chartData.length - 2]?.price || 43250;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300">{`Time: ${label}`}</p>
          <p className="text-white font-semibold">
            {`Price: $${payload[0].value.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {selectedCrypto.toUpperCase()} Price Chart
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-white">
              ${currentPrice.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              priceChange >= 0 
                ? 'bg-green-600/20 text-green-400' 
                : 'bg-red-600/20 text-red-400'
            }`}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg">
          {['1H', '24H', '7D', '30D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={['dataMin - 1000', 'dataMax + 1000']}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={priceChange >= 0 ? '#10B981' : '#EF4444'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: priceChange >= 0 ? '#10B981' : '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-gray-400">24h High</div>
          <div className="text-white font-semibold">
            ${Math.max(...chartData.map(d => d.price)).toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400">24h Low</div>
          <div className="text-white font-semibold">
            ${Math.min(...chartData.map(d => d.price)).toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400">24h Volume</div>
          <div className="text-white font-semibold">
            ${(chartData.reduce((sum, d) => sum + d.volume, 0) / 1e9).toFixed(1)}B
          </div>
        </div>
      </div>
    </div>
  );
};
