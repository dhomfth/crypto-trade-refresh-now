
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: Date;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  image?: string;
}

// Mock news data
const generateMockNews = (): NewsItem[] => [
  {
    id: '1',
    title: 'Bitcoin Reaches New Monthly High Amid Institutional Interest',
    summary: 'Major institutions continue to accumulate Bitcoin as regulatory clarity improves globally.',
    source: 'CryptNews',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    sentiment: 'bullish'
  },
  {
    id: '2',
    title: 'Ethereum 2.0 Staking Rewards Show Strong Performance',
    summary: 'ETH staking yields remain attractive as network upgrades continue to roll out successfully.',
    source: 'DeFi Daily',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    sentiment: 'bullish'
  },
  {
    id: '3',
    title: 'Market Analysis: Altcoin Season May Be Approaching',
    summary: 'Technical indicators suggest potential rotation from Bitcoin to alternative cryptocurrencies.',
    source: 'Market Watch',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    sentiment: 'neutral'
  },
  {
    id: '4',
    title: 'Regulatory Updates Could Impact Trading Volumes',
    summary: 'New compliance requirements may affect short-term market dynamics across major exchanges.',
    source: 'Regulatory News',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    sentiment: 'bearish'
  }
];

export const NewsFeed = () => {
  const [news, setNews] = useState<NewsItem[]>(generateMockNews());

  useEffect(() => {
    const interval = setInterval(() => {
      setNews(generateMockNews());
      console.log('News feed updated:', new Date().toLocaleTimeString());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Crypto News</h2>
        <div className="text-xs text-gray-400">Live Updates</div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getSentimentIcon(item.sentiment)}
                <span className="text-xs text-gray-400">{item.source}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                {formatTimeAgo(item.timestamp)}
              </div>
            </div>

            <h3 className="text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
              {item.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className={`text-xs px-2 py-1 rounded-full ${
                item.sentiment === 'bullish' 
                  ? 'bg-green-600/20 text-green-400'
                  : item.sentiment === 'bearish'
                  ? 'bg-red-600/20 text-red-400'
                  : 'bg-yellow-600/20 text-yellow-400'
              }`}>
                {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
              </div>
              
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
