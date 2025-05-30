
import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Filter } from 'lucide-react';

interface Order {
  id: string;
  type: 'buy' | 'sell';
  crypto: string;
  amount: number;
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  timestamp: Date;
}

const mockOrders: Order[] = [
  {
    id: '1',
    type: 'buy',
    crypto: 'BTC',
    amount: 0.125,
    price: 43250,
    total: 5406.25,
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: '2',
    type: 'sell',
    crypto: 'ETH',
    amount: 1.5,
    price: 2650,
    total: 3975,
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '3',
    type: 'buy',
    crypto: 'BNB',
    amount: 10,
    price: 315,
    total: 3150,
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
  },
  {
    id: '4',
    type: 'sell',
    crypto: 'ADA',
    amount: 1000,
    price: 0.52,
    total: 520,
    status: 'cancelled',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
  }
];

export const OrderHistory = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  const filteredOrders = orders.filter(order => {
    const typeMatch = filter === 'all' || order.type === filter;
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/20 text-green-400';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-600/20 text-red-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Order History</h2>
        <Filter className="h-5 w-5 text-gray-400" />
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg">
          {['all', 'buy', 'sell'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg">
          {['all', 'completed', 'pending', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  order.type === 'buy' ? 'bg-green-600/20' : 'bg-red-600/20'
                }`}>
                  {order.type === 'buy' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
                
                <div>
                  <div className="font-medium text-white">
                    {order.type.toUpperCase()} {order.crypto}
                  </div>
                  <div className="text-sm text-gray-400">
                    {order.amount} {order.crypto} @ ${order.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-white">
                  ${order.total.toLocaleString()}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(order.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No orders found</div>
          <div className="text-sm text-gray-500">Try adjusting your filters</div>
        </div>
      )}
    </div>
  );
};
