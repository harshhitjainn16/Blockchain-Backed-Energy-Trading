import { TrendingUp, Zap, DollarSign, Users, BarChart3 } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Track your energy trading activity and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Energy Produced</p>
          <p className="text-3xl font-bold">150 kWh</p>
          <p className="text-sm text-green-500 mt-2">+12% from last month</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">0.0023 ETH</p>
          <p className="text-sm text-green-500 mt-2">+8% from last month</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Sales</p>
          <p className="text-3xl font-bold">23</p>
          <p className="text-sm text-gray-400 mt-2">Successful transactions</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Active Listings</p>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-gray-400 mt-2">Currently on market</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Energy Production (7 days)</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>Chart visualization would go here</p>
              <p className="text-sm">(Using Recharts library)</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>Chart visualization would go here</p>
              <p className="text-sm">(Using Recharts library)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'sale', desc: 'Sold 10 kWh to 0x1234...5678', time: '2 hours ago', amount: '+0.0001 ETH' },
            { type: 'listing', desc: 'Created new listing: 50 kWh', time: '5 hours ago', amount: '' },
            { type: 'sale', desc: 'Sold 25 kWh to 0x8765...4321', time: '1 day ago', amount: '+0.00025 ETH' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'sale' ? 'bg-green-500/20' : 'bg-blue-500/20'
                }`}>
                  {activity.type === 'sale' ? (
                    <DollarSign className="w-5 h-5 text-green-500" />
                  ) : (
                    <Zap className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{activity.desc}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
              {activity.amount && (
                <p className="font-bold text-green-400">{activity.amount}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Seller Profile */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Your Seller Profile</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Seller Name</p>
            <p className="font-medium">Green Solar Home</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Location</p>
            <p className="font-medium">San Francisco, CA</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Solar Capacity</p>
            <p className="font-medium">10 kW</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Member Since</p>
            <p className="font-medium">December 2025</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">IP Asset ID</p>
            <p className="font-medium text-xs break-all">0xabcd...ef01</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Sales Rate</p>
            <p className="font-medium">92.5%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
