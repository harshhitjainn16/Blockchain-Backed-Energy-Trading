import { ReactNode, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Zap, Home, LayoutDashboard, ShoppingCart, UserPlus, PlusCircle, List, History, Wallet } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const isActive = (path: string) => location.pathname === path

  // Check if wallet is already connected on load
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any
      if (!ethereum) {
        console.log('MetaMask not installed')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any
      
      if (!ethereum) {
        alert('Please install MetaMask to connect your wallet!')
        window.open('https://metamask.io/download/', '_blank')
        return
      }

      setIsConnecting(true)
      
      const accounts = await ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        
        // Add Aeneid testnet network if not already added
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xAE8ED' }], // Aeneid testnet chain ID (715501 in hex)
          })
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xAE8ED',
                  chainName: 'Story Protocol Aeneid Testnet',
                  nativeCurrency: {
                    name: 'IP',
                    symbol: 'IP',
                    decimals: 18
                  },
                  rpcUrls: ['https://aeneid.storyrpc.io'],
                  blockExplorerUrls: ['https://aeneid.storyscan.xyz']
                }]
              })
            } catch (addError) {
              console.error('Error adding network:', addError)
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      if (error.code === 4001) {
        alert('Please connect to MetaMask.')
      } else {
        alert('Error connecting to wallet. Please try again.')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sun className="w-8 h-8 text-primary-500" />
              <div>
                <h1 className="text-xl font-bold">Energy Trading</h1>
                <p className="text-xs text-gray-400">Powered by Story Protocol</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`flex items-center space-x-1 hover:text-primary-500 transition-colors ${isActive('/') ? 'text-primary-500' : ''}`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/marketplace" 
                className={`flex items-center space-x-1 hover:text-primary-500 transition-colors ${isActive('/marketplace') ? 'text-primary-500' : ''}`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Marketplace</span>
              </Link>
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 hover:text-primary-500 transition-colors ${isActive('/dashboard') ? 'text-primary-500' : ''}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </nav>

            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <Wallet className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-mono">{shortenAddress(walletAddress)}</span>
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="btn-secondary text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary-500" />
                Quick Actions
              </h3>
              <nav className="space-y-2">
                <Link 
                  to="/register-seller" 
                  className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 transition-colors ${isActive('/register-seller') ? 'bg-gray-700' : ''}`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register as Seller</span>
                </Link>
                <Link 
                  to="/create-listing" 
                  className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 transition-colors ${isActive('/create-listing') ? 'bg-gray-700' : ''}`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Listing</span>
                </Link>
                <Link 
                  to="/my-listings" 
                  className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 transition-colors ${isActive('/my-listings') ? 'bg-gray-700' : ''}`}
                >
                  <List className="w-4 h-4" />
                  <span>My Listings</span>
                </Link>
                <Link 
                  to="/purchase-history" 
                  className={`flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 transition-colors ${isActive('/purchase-history') ? 'bg-gray-700' : ''}`}
                >
                  <History className="w-4 h-4" />
                  <span>Purchase History</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>Built with ❤️ using Story Protocol • Aeneid Testnet</p>
            <p className="mt-1">Revolutionizing renewable energy trading</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
