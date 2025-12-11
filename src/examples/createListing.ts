import { SellerService } from "../services/SellerService";
import { TradingService } from "../services/TradingService";
import { account } from "../config/client";

/**
 * Example: Create an Energy Listing
 * This script demonstrates how to list energy for sale on the marketplace
 */
async function main() {
  try {
    console.log("\n" + "=".repeat(80));
    console.log("⚡ CREATE ENERGY LISTING - EXAMPLE");
    console.log("=".repeat(80) + "\n");

    const sellerService = new SellerService();
    const tradingService = new TradingService(sellerService);

    // First, verify seller is registered
    const seller = await sellerService.getSellerByAddress(account.address);
    if (!seller) {
      console.log("❌ You must register as a seller first!");
      console.log("   Run: npm run register-seller");
      process.exit(1);
    }

    console.log(`✅ Seller verified: ${seller.name}\n`);

    // Create an energy listing
    const energyAmount = 50; // 50 kWh
    const pricePerKwh = "0.00001"; // 0.00001 ETH per kWh (adjust as needed)

    const listing = await tradingService.createListing({
      amount: energyAmount,
      pricePerKwh,
      energySource: "solar",
      location: seller.location,
      productionDate: new Date().toISOString(),
      certificateUri: "ipfs://example-certificate-hash", // In production, upload to IPFS
    });

    console.log("\n🎉 SUCCESS! Your energy is now listed for sale.");
    
    const totalValue = (Number(pricePerKwh) * energyAmount).toFixed(6);
    
    console.log("\n📋 Listing Details:");
    console.log(`   Listing ID: ${listing.listingId}`);
    console.log(`   Energy Amount: ${energyAmount} kWh`);
    console.log(`   Price per kWh: ${pricePerKwh} ETH`);
    console.log(`   Total Value: ${totalValue} ETH`);
    console.log(`   Energy Source: ${listing.energySource}`);
    console.log(`   Production Date: ${new Date(listing.productionDate).toLocaleString()}`);

    console.log("\n📊 Marketplace Overview:");
    const allListings = await tradingService.getAllListings();
    console.log(`   Total Listings: ${allListings.length}`);
    console.log(`   Active Listings: ${allListings.filter(l => l.status === 'active').length}`);

    console.log("\n💡 Tip: Buyers can now purchase your energy!");
    console.log("   They can run: npm run purchase-energy")

    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the example
main();
