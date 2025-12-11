import { SellerService } from './services/SellerService';
import { TradingService } from './services/TradingService';
import { account } from './config/client';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    console.log('✅ Story SDK Client initialized successfully');
    console.log(`📍 Chain: Aeneid Testnet`);
    console.log(`🔑 Account Address: ${account.address}\n`);

    const sellerService = new SellerService();
    const tradingService = new TradingService(sellerService);

    console.log('='.repeat(80));
    console.log('🌍 BLOCKCHAIN-BACKED ENERGY TRADING PLATFORM');
    console.log('='.repeat(80));
    console.log();
    console.log(`🔑 Connected Wallet: ${account.address}`);
    console.log(`⛓️  Network: Story Aeneid Testnet\n`);

    console.log('='.repeat(80));
    console.log('DEMONSTRATION WORKFLOW');
    console.log('='.repeat(80));
    console.log();

    // STEP 1: Register Seller
    console.log('📍 STEP 1: Register Energy Seller\n');
    
    const sellerResult = await sellerService.registerSeller({
      name: "EcoHome Solar",
      location: "Los Angeles, CA",
      solarCapacity: 15,
      certifications: ["ISO 50001", "LEED Certified"],
      description: "Eco-friendly home with advanced solar panel system"
    });

    console.log(`✅ Seller Address: ${sellerResult.address}`);
    console.log(`✅ IP Asset ID: ${sellerResult.ipId}`);
    console.log(`✅ Transaction: ${sellerResult.registrationTx}\n`);

    // STEP 2: Create Energy Listing
    console.log('📍 STEP 2: Create Energy Listing\n');
    const listingResult = await tradingService.createListing({
      amount: 100,
      pricePerKwh: "0.00002",
      energySource: "solar",
      location: "Los Angeles, CA",
      productionDate: new Date().toISOString(),
      certificateUri: "ipfs://energy-certificate-abc123"
    });

    console.log(`✅ Listing ID: ${listingResult.listingId}`);
    console.log(`✅ Energy Amount: ${listingResult.amount} kWh`);
    console.log(`✅ Price: ${listingResult.pricePerKwh} ETH/kWh`);
    console.log(`✅ Total Value: ${listingResult.totalValue} ETH\n`);

    // STEP 3: Purchase Energy
    console.log('📍 STEP 3: Purchase Energy\n');
    const purchaseResult = await tradingService.purchaseEnergy(
      listingResult.listingId,
      25,
      account.address
    );

    console.log(`✅ Purchase ID: ${purchaseResult.purchaseId}`);
    console.log(`✅ Energy Purchased: ${purchaseResult.energyAmount} kWh`);
    console.log(`✅ Total Cost: ${purchaseResult.totalPrice} ETH`);
    console.log(`✅ Transaction: ${purchaseResult.txHash}\n`);

    // STEP 4: View Market Statistics
    console.log('📍 STEP 4: Market Statistics\n');
    const marketStats = await tradingService.getMarketStatistics();

    console.log('📊 Market Overview:');
    console.log(`   Total Listings: ${marketStats.totalListings}`);
    console.log(`   Active Listings: ${marketStats.activeListings}`);
    console.log(`   Total Energy Available: ${marketStats.totalEnergyAvailable} kWh`);
    console.log(`   Total Traded: ${marketStats.totalEnergyTraded} kWh`);
    console.log(`   Average Price: ${marketStats.averagePrice} ETH/kWh\n`);

    console.log('='.repeat(80));
    console.log('✅ DEMONSTRATION COMPLETED SUCCESSFULLY');
    console.log('='.repeat(80));
    console.log();

  } catch (error: any) {
    console.error('\n❌ Error in main workflow:', error.message);
    console.error('Stack:', error.stack);
  }
}

main();

