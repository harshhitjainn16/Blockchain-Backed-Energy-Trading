import { useState } from 'react'
import { UserPlus, Sun, MapPin, Award, Zap } from 'lucide-react'

export default function RegisterSeller() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    solarCapacity: '',
    description: '',
    certifications: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setSuccess(true)
    
    // Reset form
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        name: '',
        location: '',
        solarCapacity: '',
        description: '',
        certifications: '',
      })
    }, 3000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Register as Energy Seller</h1>
        <p className="text-gray-400">
          Register your solar installation and start selling energy on the blockchain
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400 font-semibold">✅ Registration successful!</p>
          <p className="text-sm text-gray-300 mt-1">Your IP Asset has been created on Story Protocol.</p>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-primary-500" />
                Seller Name *
              </div>
            </label>
            <input
              type="text"
              required
              className="input"
              placeholder="e.g., Green Solar Home"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                Location *
              </div>
            </label>
            <input
              type="text"
              required
              className="input"
              placeholder="e.g., San Francisco, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Solar Capacity */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-500" />
                Solar Capacity (kW) *
              </div>
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.1"
              className="input"
              placeholder="e.g., 10"
              value={formData.solarCapacity}
              onChange={(e) => setFormData({ ...formData, solarCapacity: e.target.value })}
            />
            <p className="text-sm text-gray-400 mt-1">Total installed solar panel capacity</p>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary-500" />
                Certifications
              </div>
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., ISO 50001, Solar Energy Certification"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            />
            <p className="text-sm text-gray-400 mt-1">Comma-separated list of certifications</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="input min-h-[100px]"
              placeholder="Tell buyers about your solar installation..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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
                <span>Registering...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                <span>Register as Seller</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 <strong>Note:</strong> Registration will create an IP Asset on Story Protocol representing your solar installation. 
            This will require a transaction fee (gas) paid in testnet tokens.
          </p>
        </div>
      </div>
    </div>
  )
}
