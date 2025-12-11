import { useState } from 'react'
import { PlusCircle, Zap, DollarSign, Calendar, MapPin } from 'lucide-react'

export default function CreateListing() {
  const [formData, setFormData] = useState({
    energyAmount: '',
    pricePerKwh: '',
    energySource: 'solar',
    location: '',
    productionDate: new Date().toISOString().split('T')[0],
    certificateUri: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const totalValue = formData.energyAmount && formData.pricePerKwh
    ? (parseFloat(formData.energyAmount) * parseFloat(formData.pricePerKwh)).toFixed(6)
    : '0'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setSuccess(true)
    
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        energyAmount: '',
        pricePerKwh: '',
        energySource: 'solar',
        location: '',
        productionDate: new Date().toISOString().split('T')[0],
        certificateUri: '',
      })
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Energy Listing</h1>
        <p className="text-gray-400">
          List your excess solar energy for sale on the marketplace
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400 font-semibold">✅ Listing created successfully!</p>
          <p className="text-sm text-gray-300 mt-1">Your energy is now available in the marketplace.</p>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Energy Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-500" />
                Energy Amount (kWh) *
              </div>
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="input"
              placeholder="e.g., 50"
              value={formData.energyAmount}
              onChange={(e) => setFormData({ ...formData, energyAmount: e.target.value })}
            />
            <p className="text-sm text-gray-400 mt-1">Amount of energy you want to sell</p>
          </div>

          {/* Price per kWh */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary-500" />
                Price per kWh (ETH) *
              </div>
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.000001"
              className="input"
              placeholder="e.g., 0.00001"
              value={formData.pricePerKwh}
              onChange={(e) => setFormData({ ...formData, pricePerKwh: e.target.value })}
            />
            <p className="text-sm text-gray-400 mt-1">Price in ETH for each kWh</p>
          </div>

          {/* Total Value Display */}
          {totalValue !== '0' && (
            <div className="p-4 bg-primary-500/10 border border-primary-500/30 rounded-lg">
              <p className="text-sm text-gray-400">Total Listing Value</p>
              <p className="text-2xl font-bold text-primary-400">{totalValue} ETH</p>
            </div>
          )}

          {/* Energy Source */}
          <div>
            <label className="block text-sm font-medium mb-2">Energy Source *</label>
            <select
              required
              className="input"
              value={formData.energySource}
              onChange={(e) => setFormData({ ...formData, energySource: e.target.value })}
            >
              <option value="solar">☀️ Solar</option>
              <option value="wind">💨 Wind</option>
              <option value="hydro">💧 Hydro</option>
              <option value="other">🔋 Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                Location
              </div>
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., San Francisco, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Production Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                Production Date *
              </div>
            </label>
            <input
              type="date"
              required
              className="input"
              value={formData.productionDate}
              onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
            />
          </div>

          {/* Certificate URI */}
          <div>
            <label className="block text-sm font-medium mb-2">Certificate URI (IPFS)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g., ipfs://Qm..."
              value={formData.certificateUri}
              onChange={(e) => setFormData({ ...formData, certificateUri: e.target.value })}
            />
            <p className="text-sm text-gray-400 mt-1">Optional: IPFS link to energy certificate</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Listing...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                <span>Create Listing</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 <strong>Note:</strong> Creating a listing requires a blockchain transaction. 
            Make sure you have enough testnet tokens for gas fees.
          </p>
        </div>
      </div>
    </div>
  )
}
