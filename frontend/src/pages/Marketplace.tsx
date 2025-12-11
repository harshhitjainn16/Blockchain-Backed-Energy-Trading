import { useState, useEffect } from 'react'
import { ShoppingCart, Zap, MapPin, Calendar, Filter } from 'lucide-react'
import { purchaseEnergy, getAllListings } from '../services/api'

interface Listing {
  id: string;
  seller: string;
  sellerName: string;
  energyAmount: number;
  pricePerKwh: string;
  location: string;
  energySource: string;
  productionDate: string;
  totalValue: string;
}

// Mock data for fallback
const mockListings: Listing[] = [
  {
    id: '1',
    seller: '0x1234...5678',
    sellerName: 'Green Solar Home',
    energyAmount: 50,
    pricePerKwh: '0.00001',
    location: 'San Francisco, CA',
    energySource: 'solar',
    productionDate: '2025-12-10',
    totalValue: '0.0005',
  },
  {
    id: '2',
    seller: '0x8765...4321',
    sellerName: 'EcoHome Solar',
    energyAmount: 75,
    pricePerKwh: '0.00002',
    location: 'Los Angeles, CA',
    energySource: 'solar',
    productionDate: '2025-12-11',
    totalValue: '0.0015',
  },
  {
    id: '3',
    seller: '0xabcd...ef01',
    sellerName: 'Sunny Acres',
    energyAmount: 100,
    pricePerKwh: '0.000015',
    location: 'Austin, TX',
    energySource: 'solar',
    productionDate: '2025-12-09',
    totalValue: '0.0015',
  },
]

export default function Marketplace() {
  const [selectedSource, setSelectedSource] = useState<string>('all')
  const [listings, setListings] = useState<Listing[]>([])
  const [purchasing, setPurchasing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch real listings from backend
  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    try {
      setLoading(true)
      const data = await getAllListings()
      
      // Transform backend data to frontend format
      const transformedListings = (data as any[]).map((listing: any) => ({
        id: listing.listingId,
        seller: listing.sellerAddress,
        sellerName: listing.sellerName || 'Anonymous Seller',
        energyAmount: listing.energyAmount,
        pricePerKwh: listing.pricePerKwh,
        location: listing.location,
        energySource: listing.energySource,
        productionDate: listing.productionDate,
        totalValue: listing.totalValue
      }))
      
      setListings(transformedListings)
    } catch (error) {
      console.error('Failed to load listings:', error)
      // Fallback to mock data if backend fails
      setListings(mockListings)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (listingId: string, amount: number) => {
    try {
      setPurchasing(listingId)
      const result = await purchaseEnergy({
        listingId,
        amount,
        buyerAddress: '0x66B2136CcF9D61399359c56b0dDB3247AC54dDC46'
      })
      
      alert(`✅ Purchase successful!\n\nPurchase ID: ${(result as any).purchaseId}\nEnergy: ${(result as any).energyAmount} kWh\nCost: ${(result as any).totalCost} ETH\nTransaction: ${(result as any).txHash}`)
      
      // Reload listings after purchase
      await loadListings()
    } catch (error: any) {
      alert(`❌ Purchase failed: ${error.message}`)
    } finally {
      setPurchasing(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading marketplace...</p>
        </div>
      </div>
    )
  }

  const filteredListings = selectedSource === 'all' 
    ? listings 
    : listings.filter(l => l.energySource === selectedSource)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Energy Marketplace</h1>
          <p className="text-gray-400">Browse and purchase available energy from solar producers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Filter by:</span>
          </div>
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSource === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            All Sources
          </button>
          <button
            onClick={() => setSelectedSource('solar')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSource === 'solar' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            ☀️ Solar
          </button>
          <button
            onClick={() => setSelectedSource('wind')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSource === 'wind' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            💨 Wind
          </button>
          <button
            onClick={() => setSelectedSource('hydro')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSource === 'hydro' 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            💧 Hydro
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="card text-center py-12">
          <Zap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No listings available</h3>
          <p className="text-gray-400">Check back later for new energy listings</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="card hover:border-primary-500 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{listing.sellerName}</h3>
                  <p className="text-sm text-gray-400">{listing.seller}</p>
                </div>
                <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                  ☀️ {listing.energySource}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-300">
                  <Zap className="w-4 h-4 mr-2 text-primary-500" />
                  <span className="text-2xl font-bold">{listing.energyAmount} kWh</span>
                </div>

                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{listing.location}</span>
                </div>

                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Produced: {new Date(listing.productionDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Price per kWh</p>
                    <p className="text-lg font-bold text-primary-400">{listing.pricePerKwh} ETH</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Value</p>
                    <p className="text-lg font-bold">{listing.totalValue} ETH</p>
                  </div>
                </div>

                <button 
                  onClick={() => handlePurchase(listing.id, listing.energyAmount)}
                  disabled={purchasing === listing.id}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{purchasing === listing.id ? 'Processing...' : 'Purchase Energy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Market Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Total Energy Available</p>
          <p className="text-3xl font-bold text-primary-500">
            {listings.reduce((sum, l) => sum + l.energyAmount, 0)} kWh
          </p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Average Price</p>
          <p className="text-3xl font-bold text-green-500">0.000015 ETH/kWh</p>
        </div>
        <div className="card">
          <p className="text-gray-400 text-sm mb-1">Active Listings</p>
          <p className="text-3xl font-bold text-blue-500">{filteredListings.length}</p>
        </div>
      </div>
    </div>
  )
}
