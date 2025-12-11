import { SellerService } from "../services/SellerService";
import { TradingService } from "../services/TradingService";
import { account } from "../config/client";

/**
 * Example: Purchase Energy
 * This script demonstrates how to purchase energy from the marketplace
 */
async function main() {
  try {
    console.log("\n" + "=".repeat(80));
    console.log("💳 PURCHASE ENERGY - EXAMPLE");
    console.log("=".repeat(80) + "\n");

    const sellerService = new SellerService();
    const tradingService = new TradingService(sellerService);

    // Browse available listings
    console.log("📋 Browsing available energy listings...\n");
    const listings = await tradingService.getAllListings();

    if (listings.length === 0) {
      console.log("\n❌ No energy listings available!");
      console.log("   Create a listing first by running: npm run create-listing");
      process.exit(1);
    }

    // For this example, purchase from the first listing
    const selectedListing = listings[0];
    const amountToPurchase = Math.min(10, selectedListing.amount); // Purchase 10 kWh or max available

    console.log(`\n🎯 Selected Listing: ${selectedListing.listingId}`);
    console.log(`   Purchasing ${amountToPurchase} kWh\n`);

    // Make the purchase
    const purchase = await tradingService.purchaseEnergy(
      selectedListing.listingId,
      amountToPurchase,
      account.address
    );

    console.log("\n🎉 SUCCESS! Energy purchased successfully.");
    
    const totalCostEth = Number(purchase.totalPrice) / 1e18;
    
    console.log("\n📦 Purchase Details:");
    console.log(`   Purchase ID: ${purchase.purchaseId}`);
    console.log(`   Energy Amount: ${purchase.energyAmount} kWh`);
    console.log(`   Total Cost: ${totalCostEth.toFixed(6)} ETH`);
    console.log(`   Seller: ${purchase.seller}`);
    console.log(`   Transaction Hash: ${purchase.txHash}`);
    console.log(`   Timestamp: ${new Date(purchase.timestamp).toLocaleString()}`);

    console.log("\n📊 Updated Market Statistics:");
    const stats = await tradingService.getMarketStatistics();
    console.log(`   Total Listings: ${stats.totalListings}`);
    console.log(`   Active Listings: ${stats.activeListings}`);
    console.log(`   Total Energy Available: ${stats.totalEnergyAvailable} kWh`);
    console.log(`   Total Energy Traded: ${stats.totalEnergyTraded} kWh`);

    console.log("\n✅ Energy has been transferred to your account!");
    console.log("   You can now use this energy or trade it further.")

    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the example
main();
