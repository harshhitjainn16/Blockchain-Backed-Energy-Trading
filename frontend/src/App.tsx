import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import RegisterSeller from './pages/RegisterSeller'
import CreateListing from './pages/CreateListing'
import MyListings from './pages/MyListings'
import PurchaseHistory from './pages/PurchaseHistory'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
