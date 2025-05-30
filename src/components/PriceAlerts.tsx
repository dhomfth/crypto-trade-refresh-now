
import { useState } from 'react';
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PriceAlert {
  id: string;
  crypto: string;
  symbol: string;
  targetPrice: number;
  currentPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: Date;
}

const mockAlerts: PriceAlert[] = [
  {
    id: '1',
    crypto: 'Bitcoin',
    symbol: 'BTC',
    targetPrice: 45000,
    currentPrice: 43250,
    condition: 'above',
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: '2',
    crypto: 'Ethereum',
    symbol: 'ETH',
    targetPrice: 2500,
    currentPrice: 2650,
    condition: 'below',
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12)
  }
];

export const PriceAlerts = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockAlerts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crypto: 'BTC',
    targetPrice: '',
    condition: 'above' as 'above' | 'below'
  });
  const { toast } = useToast();

  const addAlert = () => {
    if (!newAlert.targetPrice) {
      toast({
        title: "Error",
        description: "Please enter a target price",
        variant: "destructive"
      });
      return;
    }

    const alert: PriceAlert = {
      id: Date.now().toString(),
      crypto: newAlert.crypto === 'BTC' ? 'Bitcoin' : 'Ethereum',
      symbol: newAlert.crypto,
      targetPrice: parseFloat(newAlert.targetPrice),
      currentPrice: newAlert.crypto === 'BTC' ? 43250 : 2650,
      condition: newAlert.condition,
      isActive: true,
      createdAt: new Date()
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ crypto: 'BTC', targetPrice: '', condition: 'above' });
    setShowAddForm(false);

    toast({
      title: "Alert Created",
      description: `Price alert set for ${alert.crypto} ${alert.condition} $${alert.targetPrice}`,
    });
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Removed",
      description: "Price alert has been deleted",
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Price Alerts
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add Alert Form */}
      {showAddForm && (
        <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
          <h3 className="text-white font-medium mb-4">Create New Alert</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Cryptocurrency</label>
              <select
                value={newAlert.crypto}
                onChange={(e) => setNewAlert({ ...newAlert, crypto: e.target.value })}
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Condition</label>
              <select
                value={newAlert.condition}
                onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as 'above' | 'below' })}
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Target Price ($)</label>
              <input
                type="number"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                placeholder="0.00"
                className="w-full bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              onClick={addAlert}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create Alert
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-slate-700/30 rounded-lg p-4 border-l-4 ${
              alert.isActive 
                ? alert.condition === 'above' 
                  ? 'border-green-500' 
                  : 'border-red-500'
                : 'border-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  alert.condition === 'above' ? 'bg-green-600/20' : 'bg-red-600/20'
                }`}>
                  {alert.condition === 'above' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>

                <div>
                  <div className="font-medium text-white">
                    {alert.crypto} {alert.condition} ${alert.targetPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    Current: ${alert.currentPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    alert.isActive
                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                      : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                  }`}
                >
                  {alert.isActive ? 'Active' : 'Paused'}
                </button>
                
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <div className="text-gray-400 mb-2">No price alerts set</div>
          <div className="text-sm text-gray-500">Create your first alert to get notified</div>
        </div>
      )}
    </div>
  );
};
