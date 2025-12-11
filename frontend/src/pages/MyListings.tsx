import { List, Zap, MapPin, Calendar, Trash2, Edit } from 'lucide-react'

const mockListings = [
  {
    id: '1',
    energyAmount: 50,
    pricePerKwh: '0.00001',
    location: 'San Francisco, CA',
    energySource: 'solar',
    productionDate: '2025-12-10',
    totalValue: '0.0005',
    isActive: true,
    createdAt: '2025-12-10T10:00:00Z',
  },
  {
    id: '2',
    energyAmount: 75,
    pricePerKwh: '0.00002',
    location: 'San Francisco, CA',
    energySource: 'solar',
    productionDate: '2025-12-09',
    totalValue: '0.0015',
    isActive: true,
    createdAt: '2025-12-09T14:00:00Z',
  },
  {
    id: '3',
    energyAmount: 100,
    pricePerKwh: '0.000015',
    location: 'San Francisco, CA',
    energySource: 'solar',
    productionDate: '2025-12-08',
    totalValue: '0.0015',
    isActive: false,
    createdAt: '2025-12-08T09:00:00Z',
  },
]

export default function MyListings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Listings</h1>
          <p className="text-gray-400">Manage your energy listings</p>
        </div>
        <a href="/create-listing" className="btn-primary">
          + Create New Listing
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Active Listings</p>
          <p className="text-3xl font-bold text-green-500">
            {mockListings.filter(l => l.isActive).length}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Total Energy Listed</p>
          <p className="text-3xl font-bold text-primary-500">
            {mockListings.filter(l => l.isActive).reduce((sum, l) => sum + l.energyAmount, 0)} kWh
          </p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Potential Revenue</p>
          <p className="text-3xl font-bold text-blue-500">
            {mockListings.filter(l => l.isActive).reduce((sum, l) => sum + parseFloat(l.totalValue), 0).toFixed(4)} ETH
          </p>
        </div>
      </div>

      {/* Listings Table */}
      <div className="card">
        {mockListings.length === 0 ? (
          <div className="text-center py-12">
            <List className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No listings yet</h3>
            <p className="text-gray-400 mb-4">Create your first energy listing to start selling</p>
            <a href="/create-listing" className="btn-primary inline-block">
              Create Listing
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Energy</th>
                  <th className="text-left py-3 px-4">Price/kWh</th>
                  <th className="text-left py-3 px-4">Total Value</th>
                  <th className="text-left py-3 px-4">Source</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{listing.energyAmount} kWh</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{listing.pricePerKwh} ETH</td>
                    <td className="py-4 px-4 font-medium">{listing.totalValue} ETH</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-sm">
                        ☀️ {listing.energySource}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      {new Date(listing.productionDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      {listing.isActive ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded text-sm">
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-600 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-600 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
