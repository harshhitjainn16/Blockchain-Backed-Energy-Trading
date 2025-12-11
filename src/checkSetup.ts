import * as fs from "fs";
import * as path from "path";

/**
 * Setup Checker
 * Verifies that the project is properly configured
 */

console.log("\n" + "=".repeat(80));
console.log("🔍 BLOCKCHAIN ENERGY TRADING - SETUP VERIFICATION");
console.log("=".repeat(80) + "\n");

let allChecksPassed = true;

// Check 1: Node.js version
console.log("1️⃣  Checking Node.js version...");
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);
if (majorVersion >= 18) {
  console.log(`   ✅ Node.js ${nodeVersion} (requirement: 18+)\n`);
} else {
  console.log(`   ❌ Node.js ${nodeVersion} - Need version 18 or higher\n`);
  allChecksPassed = false;
}

// Check 2: Environment file
console.log("2️⃣  Checking .env file...");
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  console.log("   ✅ .env file exists");
  
  // Read and check for required variables
  const envContent = fs.readFileSync(envPath, "utf-8");
  
  // Check WALLET_PRIVATE_KEY
  if (envContent.includes("WALLET_PRIVATE_KEY=") && 
      !envContent.includes("WALLET_PRIVATE_KEY=your_private_key")) {
    console.log("   ✅ WALLET_PRIVATE_KEY is configured");
  } else {
    console.log("   ❌ WALLET_PRIVATE_KEY not configured");
    console.log("      → Add your wallet private key to .env file");
    allChecksPassed = false;
  }
  
  // Check RPC_PROVIDER_URL
  if (envContent.includes("RPC_PROVIDER_URL=")) {
    console.log("   ✅ RPC_PROVIDER_URL is configured\n");
  } else {
    console.log("   ❌ RPC_PROVIDER_URL not configured\n");
    allChecksPassed = false;
  }
} else {
  console.log("   ❌ .env file not found");
  console.log("      → Run: copy .env.example .env");
  console.log("      → Then add your wallet private key\n");
  allChecksPassed = false;
}

// Check 3: Dependencies
console.log("3️⃣  Checking dependencies...");
const nodeModulesPath = path.join(process.cwd(), "node_modules");
if (fs.existsSync(nodeModulesPath)) {
  console.log("   ✅ node_modules exists");
  
  // Check for key packages
  const storySDK = path.join(nodeModulesPath, "@story-protocol", "core-sdk");
  const viem = path.join(nodeModulesPath, "viem");
  
  if (fs.existsSync(storySDK)) {
    console.log("   ✅ @story-protocol/core-sdk installed");
  } else {
    console.log("   ❌ @story-protocol/core-sdk not found");
    allChecksPassed = false;
  }
  
  if (fs.existsSync(viem)) {
    console.log("   ✅ viem installed\n");
  } else {
    console.log("   ❌ viem not found\n");
    allChecksPassed = false;
  }
} else {
  console.log("   ❌ node_modules not found");
  console.log("      → Run: npm install\n");
  allChecksPassed = false;
}

// Check 4: Build output
console.log("4️⃣  Checking build output...");
const distPath = path.join(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  console.log("   ✅ dist/ directory exists");
  console.log("   ✅ Project has been built\n");
} else {
  console.log("   ⚠️  dist/ directory not found");
  console.log("      → Run: npm run build\n");
  // Not a critical error for first-time setup
}

// Check 5: Source files
console.log("5️⃣  Checking source files...");
const srcPath = path.join(process.cwd(), "src");
const requiredFiles = [
  "config/client.ts",
  "contracts/EnergyToken.ts",
  "contracts/EnergyMarket.ts",
  "services/SellerService.ts",
  "services/TradingService.ts",
  "index.ts",
];

let allFilesPresent = true;
for (const file of requiredFiles) {
  const filePath = path.join(srcPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} not found`);
    allFilesPresent = false;
    allChecksPassed = false;
  }
}

if (allFilesPresent) {
  console.log("   ✅ All source files present\n");
} else {
  console.log();
}

// Summary
console.log("=".repeat(80));
if (allChecksPassed) {
  console.log("✅ ALL CHECKS PASSED!");
  console.log("=".repeat(80));
  console.log("\n🎉 Your project is ready to use!\n");
  console.log("Next steps:");
  console.log("  1. Get testnet tokens: https://faucet.story.foundation/");
  console.log("  2. Run the demo: npm run dev");
  console.log("  3. Or try individual examples:");
  console.log("     - npm run register-seller");
  console.log("     - npm run create-listing");
  console.log("     - npm run purchase-energy\n");
} else {
  console.log("⚠️  SOME CHECKS FAILED");
  console.log("=".repeat(80));
  console.log("\n📝 Please fix the issues above before running the project.\n");
  console.log("Quick fixes:");
  console.log("  • Missing .env? → copy .env.example .env");
  console.log("  • Missing dependencies? → npm install");
  console.log("  • Need to build? → npm run build\n");
  console.log("See QUICKSTART.md for detailed setup instructions.\n");
}

console.log("=".repeat(80) + "\n");
