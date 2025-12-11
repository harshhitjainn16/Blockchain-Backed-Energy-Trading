import { History, Zap, Calendar, ExternalLink } from 'lucide-react'

const mockPurchases = [
  {
    id: '1',
    seller: '0x1234...5678',
    sellerName: 'EcoHome Solar',
    energyAmount: 25,
    pricePerKwh: '0.00002',
    totalCost: '0.0005',
    timestamp: '2025-12-11T10:30:00Z',
    txHash: '0xabcd...ef01',
  },
  {
    id: '2',
    seller: '0x8765...4321',
    sellerName: 'Green Solar Home',
    energyAmount: 10,
    pricePerKwh: '0.00001',
    totalCost: '0.0001',
    timestamp: '2025-12-10T15:45:00Z',
    txHash: '0x1234...5678',
  },
  {
    id: '3',
    seller: '0xfede...cba9',
    sellerName: 'Sunny Acres',
    energyAmount: 50,
    pricePerKwh: '0.000015',
    totalCost: '0.00075',
    timestamp: '2025-12-09T08:20:00Z',
    txHash: '0x9876...5432',
  },
]

export default function PurchaseHistory() {
  const totalPurchased = mockPurchases.reduce((sum, p) => sum + p.energyAmount, 0)
  const totalSpent = mockPurchases.reduce((sum, p) => sum + parseFloat(p.totalCost), 0)

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
        <p className="text-gray-400">View all your energy purchases</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Total Purchases</p>
          <p className="text-3xl font-bold text-primary-500">{mockPurchases.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Total Energy Purchased</p>
          <p className="text-3xl font-bold text-green-500">{totalPurchased} kWh</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-blue-500">{totalSpent.toFixed(6)} ETH</p>
        </div>
      </div>

      {/* Purchase History */}
      <div className="card">
        {mockPurchases.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No purchases yet</h3>
            <p className="text-gray-400 mb-4">Browse the marketplace to buy energy</p>
            <a href="/marketplace" className="btn-primary inline-block">
              Go to Marketplace
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {mockPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{purchase.sellerName}</h3>
                    <p className="text-sm text-gray-400">{purchase.seller}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Cost</p>
                    <p className="text-xl font-bold text-primary-400">{purchase.totalCost} ETH</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Energy Amount</p>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary-500" />
                      <p className="font-medium">{purchase.energyAmount} kWh</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Price per kWh</p>
                    <p className="font-medium">{purchase.pricePerKwh} ETH</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="font-medium text-sm">
                        {new Date(purchase.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Time</p>
                    <p className="font-medium text-sm">
                      {new Date(purchase.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-400">Transaction:</p>
                    <code className="text-xs bg-gray-800 px-2 py-1 rounded">{purchase.txHash}</code>
                  </div>
                  <a
                    href={`https://testnet.storyscan.xyz/tx/${purchase.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm"
                  >
                    View on Explorer
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
