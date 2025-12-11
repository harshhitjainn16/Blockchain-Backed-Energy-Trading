import { TradingService } from '../services/TradingService';
import { SellerService } from '../services/SellerService';

async function seedListings() {
  try {
    console.log('🌱 Seeding marketplace with test data...\n');

    const sellerService = new SellerService();
    const tradingService = new TradingService(sellerService);

    // First, register as a seller
    console.log('📝 Step 1: Registering as seller...');
    const seller = await sellerService.registerSeller({
      name: "Green Solar Home",
      location: "San Francisco, CA",
      solarCapacity: 20,
      certifications: ["ISO 50001"],
      description: "Community solar energy provider"
    });
    
    console.log(`✅ Registered seller: ${seller.address}`);
    console.log(`   IP Asset ID: ${seller.ipId}\n`);

    // Now create listings
    console.log('📝 Step 2: Creating test listings...\n');

    // Create 3 test listings
    const listings = [
      {
        amount: 50,
        pricePerKwh: "0.00001",
        energySource: "solar",
        location: "San Francisco, CA",
        productionDate: "2025-12-10",
        certificateUri: "ipfs://certificate-1"
      },
      {
        amount: 75,
        pricePerKwh: "0.00002",
        energySource: "solar",
        location: "Los Angeles, CA",
        productionDate: "2025-12-11",
        certificateUri: "ipfs://certificate-2"
      },
      {
        amount: 100,
        pricePerKwh: "0.000015",
        energySource: "solar",
        location: "Austin, TX",
        productionDate: "2025-12-09",
        certificateUri: "ipfs://certificate-3"
      }
    ];

    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i];
      console.log(`Creating listing ${i + 1}/3...`);
      
      const result = await tradingService.createListing(listing);
      
      console.log(`✅ Created listing: ${result.listingId}`);
      console.log(`   Energy: ${result.amount} kWh`);
      console.log(`   Price: ${result.pricePerKwh} ETH/kWh`);
      console.log(`   Location: ${listing.location}\n`);
    }

    console.log('✅ Successfully seeded marketplace with test listings!');
    console.log('\n🌐 Open http://localhost:3001 to see the listings\n');

  } catch (error: any) {
    console.error('❌ Error seeding listings:', error.message);
  }
}

seedListings();
