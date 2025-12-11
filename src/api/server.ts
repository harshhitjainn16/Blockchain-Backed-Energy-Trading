import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { SellerService } from '../services/SellerService';
import { TradingService } from '../services/TradingService';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Services
const sellerService = new SellerService();
const tradingService = new TradingService(sellerService);

// Initialize with test data
async function initializeTestData() {
  try {
    console.log('📦 Initializing test data...');
    
    // Register seller
    await sellerService.registerSeller({
      name: "Green Solar Home",
      location: "San Francisco, CA",
      solarCapacity: 20,
      certifications: ["ISO 50001"],
      description: "Community solar energy provider"
    });
    
    // Create listings
    await tradingService.createListing({
      amount: 50,
      pricePerKwh: "0.00001",
      energySource: "solar",
      location: "San Francisco, CA",
      productionDate: "2025-12-10",
      certificateUri: "ipfs://certificate-1"
    });
    
    await tradingService.createListing({
      amount: 75,
      pricePerKwh: "0.00002",
      energySource: "solar",
      location: "Los Angeles, CA",
      productionDate: "2025-12-11",
      certificateUri: "ipfs://certificate-2"
    });
    
    await tradingService.createListing({
      amount: 100,
      pricePerKwh: "0.000015",
      energySource: "solar",
      location: "Austin, TX",
      productionDate: "2025-12-09",
      certificateUri: "ipfs://certificate-3"
    });
    
    console.log('✅ Test data initialized successfully\n');
  } catch (error) {
    console.error('⚠️  Warning: Could not initialize test data:', error);
  }
}

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Energy Trading API is running' });
});

// ===== SELLER ENDPOINTS =====

// Register seller
app.post('/api/sellers/register', async (req: Request, res: Response) => {
  try {
    const { name, location, capacity, certifications, description } = req.body;
    
    const result = await sellerService.registerSeller({
      name,
      location,
      solarCapacity: capacity,
      certifications,
      description
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all sellers
app.get('/api/sellers', async (req: Request, res: Response) => {
  try {
    const sellers = await sellerService.getAllSellers();
    res.json({
      success: true,
      data: sellers
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get seller by address
app.get('/api/sellers/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const seller = await sellerService.getSellerByAddress(address as any);
    
    if (!seller) {
      return res.status(404).json({
        success: false,
        error: 'Seller not found'
      });
    }
    
    res.json({
      success: true,
      data: seller
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== LISTING ENDPOINTS =====

// Create energy listing
app.post('/api/listings', async (req: Request, res: Response) => {
  try {
    const { amount, pricePerKwh, energySource, location, productionDate, certificateUri } = req.body;
    
    const result = await tradingService.createListing({
      amount,
      pricePerKwh,
      energySource,
      location,
      productionDate,
      certificateUri
    });
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all listings
app.get('/api/listings', async (req: Request, res: Response) => {
  try {
    const listings = await tradingService.getAllListings();
    
    res.json({
      success: true,
      data: listings
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Purchase energy
app.post('/api/purchase', async (req: Request, res: Response) => {
  try {
    const { listingId, amount, buyerAddress } = req.body;
    
    const result = await tradingService.purchaseEnergy(listingId, amount, buyerAddress);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get market statistics
app.get('/api/stats/market', async (req: Request, res: Response) => {
  try {
    const stats = await tradingService.getMarketStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`\n🚀 Energy Trading API Server`);
  console.log(`================================`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`================================\n`);
  
  // Initialize test data
  await initializeTestData();
});

export default app;
