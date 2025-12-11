import { Link } from 'react-router-dom'
import { Sun, Zap, TrendingUp, Shield, Globe, ArrowRight, ShoppingCart } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-500/20 rounded-full mb-6">
          <Sun className="w-12 h-12 text-primary-500" />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Blockchain-Backed Energy Trading
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Sell your excess solar energy as tokens. Smart contracts handle everything.
          Join the decentralized energy revolution.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/marketplace" className="btn-primary flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Browse Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/register-seller" className="btn-secondary flex items-center space-x-2">
            <Sun className="w-5 h-5" />
            <span>Become a Seller</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-full mb-4">
            <Zap className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Instant Trading</h3>
          <p className="text-gray-400">
            Buy and sell energy instantly through smart contracts. No intermediaries needed.
          </p>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Secure & Transparent</h3>
          <p className="text-gray-400">
            All transactions recorded on blockchain. Full transparency and security guaranteed.
          </p>
        </div>

        <div className="card text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-4">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Decentralized</h3>
          <p className="text-gray-400">
            Peer-to-peer energy trading. Connect directly with buyers and sellers.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="card">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h4 className="font-bold mb-2">Register</h4>
            <p className="text-sm text-gray-400">Sign up as an energy seller with your solar details</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h4 className="font-bold mb-2">List Energy</h4>
            <p className="text-sm text-gray-400">Create listings for your excess solar energy</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h4 className="font-bold mb-2">Get Purchased</h4>
            <p className="text-sm text-gray-400">Buyers purchase your energy through smart contracts</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h4 className="font-bold mb-2">Get Paid</h4>
            <p className="text-sm text-gray-400">Receive payment automatically in your wallet</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-500 mb-2">1,234</div>
          <div className="text-gray-400">Total Energy Traded (kWh)</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-500 mb-2">56</div>
          <div className="text-gray-400">Active Sellers</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-500 mb-2">892</div>
          <div className="text-gray-400">Successful Transactions</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
          <div className="text-gray-400">Platform Availability</div>
        </div>
      </section>

      {/* CTA */}
      <section className="card bg-gradient-to-r from-primary-600 to-primary-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="text-lg mb-6 opacity-90">
          Join thousands of solar households revolutionizing energy distribution
        </p>
        <Link to="/register-seller" className="btn-secondary inline-flex items-center space-x-2">
          <Sun className="w-5 h-5" />
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
