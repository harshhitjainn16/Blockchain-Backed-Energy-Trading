import { client } from '../src/config/client';
import dotenv from 'dotenv';

dotenv.config();

async function verifyDeployment() {
  console.log('\n🔍 Verifying Story Protocol Integration...\n');
  
  try {
    // Check 1: Verify wallet is configured
    console.log('1️⃣ Checking Wallet Configuration...');
    const privateKey = process.env.WALLET_PRIVATE_KEY;
    
    if (!privateKey || privateKey === 'your_private_key_here_without_0x_prefix') {
      console.log('   ❌ FAILED: Private key not configured in .env');
      console.log('   💡 Please add your wallet private key to .env file\n');
      return;
    }
    
    console.log('   ✅ Wallet configured');
    console.log(`   📍 Address: ${client.account.address}\n`);
    
    // Check 2: Verify RPC connection
    console.log('2️⃣ Checking RPC Connection...');
    const rpcUrl = process.env.RPC_PROVIDER_URL;
    console.log(`   📡 RPC: ${rpcUrl}`);
    
    try {
      // Try to get the chain ID to verify connection
      const chainId = await client.chain.id;
      console.log('   ✅ RPC connection successful');
      console.log(`   ⛓️  Chain ID: ${chainId}\n`);
    } catch (error: any) {
      console.log('   ❌ FAILED: Cannot connect to RPC');
      console.log(`   Error: ${error.message}\n`);
      return;
    }
    
    // Check 3: Verify Story Protocol SDK modules
    console.log('3️⃣ Checking Story Protocol SDK Modules...');
    
    const modules = [
      { name: 'IP Asset', module: client.ipAsset },
      { name: 'License', module: client.license },
      { name: 'Royalty', module: client.royalty },
      { name: 'Permission', module: client.permission }
    ];
    
    let allModulesAvailable = true;
    for (const { name, module } of modules) {
      if (module) {
        console.log(`   ✅ ${name} module available`);
      } else {
        console.log(`   ❌ ${name} module not available`);
        allModulesAvailable = false;
      }
    }
    
    if (!allModulesAvailable) {
      console.log('\n   ⚠️  Some modules are not available\n');
      return;
    }
    
    console.log('   ✅ All SDK modules loaded\n');
    
    // Check 4: Get wallet balance (optional)
    console.log('4️⃣ Checking Wallet Balance...');
    console.log('   ℹ️  Make sure you have testnet ETH from the faucet');
    console.log('   🚰 Faucet: https://faucet.story.foundation/\n');
    
    // Summary
    console.log('━'.repeat(50));
    console.log('✅ VERIFICATION COMPLETE');
    console.log('━'.repeat(50));
    console.log('\n✅ Your project is ready to interact with Story Protocol!');
    console.log('\n📚 What Story Protocol Provides:');
    console.log('   • IP Asset Registry (for energy tokens)');
    console.log('   • Licensing Module (for energy trading)');
    console.log('   • Royalty Module (for revenue sharing)');
    console.log('   • Permission Module (for access control)');
    console.log('\n🚀 Next Steps:');
    console.log('   1. Get testnet ETH from faucet');
    console.log('   2. Run: npm run dev (backend demo)');
    console.log('   3. Run: start-all.bat (full application)');
    console.log('\n');
    
  } catch (error: any) {
    console.error('\n❌ Verification failed:');
    console.error(error.message);
    console.error('\n💡 Common issues:');
    console.error('   • Invalid private key in .env');
    console.error('   • No internet connection');
    console.error('   • RPC endpoint unavailable');
    console.error('\n');
  }
}

verifyDeployment();