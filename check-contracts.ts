import { createPublicClient, http, Address } from 'viem';
import { defineChain } from 'viem';

const aeneidTestnet = defineChain({
  id: 715501,
  name: 'Story Aeneid Testnet',
  network: 'aeneid-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IP',
    symbol: 'IP',
  },
  rpcUrls: {
    default: {
      http: ['https://aeneid.storyrpc.io'],
    },
    public: {
      http: ['https://aeneid.storyrpc.io'],
    },
  },
  blockExplorers: {
    default: { name: 'StoryScan', url: 'https://aeneid.storyscan.xyz' },
  },
});

const client = createPublicClient({
  chain: aeneidTestnet,
  transport: http()
});

async function checkContracts() {
  console.log('\n🔍 CHECKING CONTRACT DEPLOYMENTS\n');
  console.log('='.repeat(80));

  // NFT Collection from the recent deployment
  const nftCollection = '0x4204e3b4D54419A7a7945158478D6b99edb296Ef' as Address;
  
  // IP Asset from the recent deployment
  const ipAsset = '0xC80DF5db1046B0a6dD55FcE4336a5b481b826D07' as Address;
  
  // Transaction hash
  const txHash = '0x613fab794afc6dcb5ef6f21c7a9f50005d9df75b8ce7376bf54e74ff64371a8b' as `0x${string}`;

  console.log('\n📦 1. NFT Collection Contract');
  console.log('-'.repeat(80));
  try {
    const code = await client.getBytecode({ address: nftCollection });
    if (code && code !== '0x') {
      console.log('✅ Status: DEPLOYED');
      console.log(`   Address: ${nftCollection}`);
      console.log(`   Bytecode Length: ${code.length} characters`);
      console.log(`   Explorer: https://aeneid.storyscan.xyz/address/${nftCollection}`);
    } else {
      console.log('❌ Status: NOT DEPLOYED (No bytecode found)');
    }
  } catch (error: any) {
    console.log('❌ Error checking NFT Collection:', error.message);
  }

  console.log('\n🎨 2. IP Asset (NFT Token)');
  console.log('-'.repeat(80));
  try {
    const code = await client.getBytecode({ address: ipAsset });
    if (code && code !== '0x') {
      console.log('✅ Status: DEPLOYED (IP Account Contract)');
      console.log(`   Address: ${ipAsset}`);
      console.log(`   Bytecode Length: ${code.length} characters`);
      console.log(`   Explorer: https://aeneid.storyscan.xyz/address/${ipAsset}`);
    } else {
      console.log('ℹ️  Status: EOA or not a contract (This is normal for IP Assets)');
      console.log(`   Address: ${ipAsset}`);
    }
  } catch (error: any) {
    console.log('ℹ️  Note:', error.message);
  }

  console.log('\n📝 3. Registration Transaction');
  console.log('-'.repeat(80));
  try {
    const receipt = await client.getTransactionReceipt({ hash: txHash });
    console.log('✅ Status: CONFIRMED');
    console.log(`   Transaction Hash: ${txHash}`);
    console.log(`   Block Number: ${receipt.blockNumber}`);
    console.log(`   Gas Used: ${receipt.gasUsed}`);
    console.log(`   Status: ${receipt.status === 'success' ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Explorer: https://aeneid.storyscan.xyz/tx/${txHash}`);
    console.log(`\n   📊 Logs: ${receipt.logs.length} events emitted`);
  } catch (error: any) {
    console.log('❌ Transaction not found or error:', error.message);
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Contract Verification Complete\n');
}

checkContracts().catch(console.error);
