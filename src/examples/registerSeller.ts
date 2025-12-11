import { SellerService } from "../services/SellerService";
import { account } from "../config/client";
import dotenv from "dotenv";

dotenv.config();

/**
 * Example: Register as an Energy Seller
 * This script demonstrates how to register a solar household as an energy seller
 */
async function main() {
  try {
    console.log("\n" + "=".repeat(80));
    console.log("🌞 REGISTER AS ENERGY SELLER - EXAMPLE");
    console.log("=".repeat(80) + "\n");

    const sellerService = new SellerService();

    // Register the seller
    const result = await sellerService.registerSeller({
      name: "Green Solar Home",
      location: "San Francisco, CA",
      solarCapacity: 10,
      certifications: ["Solar Energy Certification 2024"],
      description: "Residential solar installation providing clean energy to the community"
    });

    if (result) {
      console.log("\n🎉 SUCCESS! You are now registered as an energy seller.");
      console.log(`\n✅ Seller Address: ${result.address}`);
      console.log(`✅ IP Asset ID: ${result.ipId}`);
      console.log(`✅ Transaction: ${result.registrationTx}`);
      console.log("\nNext Steps:");
      console.log("1. Run 'npm run create-listing' to list energy for sale");
      console.log("2. Monitor your sales and production statistics");
      console.log("3. Buyers can now purchase energy from your listings");
    }

    console.log("\n" + "=".repeat(80) + "\n");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Run the example
main();
