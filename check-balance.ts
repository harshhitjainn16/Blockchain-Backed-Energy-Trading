import { createPublicClient, http, formatEther } from 'viem';
import { defineChain } from 'viem';
import { account } from './src/config/client';

const aeneidTestnet = defineChain({
  id: 715501,
  name: 'Story Aeneid Testnet',
  network: 'story-aeneid',
  nativeCurrency: {
    decimals: 18,
    name: 'IP',
    symbol: 'IP',
  },
  rpcUrls: {
    default: { http: ['https://aeneid.storyrpc.io'] },
  },
});

async function checkBalance() {
  try {
    const publicClient = createPublicClient({
      chain: aeneidTestnet,
      transport: http()
    });

    console.log('🔍 Checking wallet and network...\n');
    console.log('📍 Network: Story Aeneid Testnet (Chain ID: 715501)');
    console.log(`📍 Address: ${account.address}\n`);
    
    const balance = await publicClient.getBalance({ 
      address: account.address 
    });

    const ethBalance = formatEther(balance);
    
    console.log('💰 Balance:');
    console.log(`   ${ethBalance} IP\n`);

    if (parseFloat(ethBalance) === 0) {
      console.log('❌ You have 0 testnet ETH!');
      console.log('\n📝 Get testnet ETH from:');
      console.log('   https://faucet.story.foundation/\n');
    } else if (parseFloat(ethBalance) < 0.01) {
      console.log('⚠️  Low balance! You may need more for transactions');
      console.log('   Get more from: https://faucet.story.foundation/\n');
    } else {
      console.log('✅ You have enough testnet ETH!\n');
    }

    console.log('🔗 Explorer:');
    console.log(`   https://aeneid.storyscan.xyz/address/${account.address}\n`);

    // Check if we can read the SPG contract
    const SPG_NFT = '0x041330350c7297d8224c84a1d35163ff1ad4ea14';
    console.log('📋 Checking SPG NFT Contract...');
    console.log(`   Address: ${SPG_NFT}`);
    
    try {
      const code = await publicClient.getBytecode({ address: SPG_NFT });
      if (code && code !== '0x') {
        console.log('   ✅ Contract exists on network\n');
      } else {
        console.log('   ❌ Contract does not exist or has no code\n');
      }
    } catch (err) {
      console.log('   ⚠️  Could not verify contract\n');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

checkBalance();
