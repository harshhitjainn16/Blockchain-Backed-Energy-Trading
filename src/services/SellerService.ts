import { client, account } from '../config/client';
import { SPG_NFT_CONTRACT } from '../config/nft-config';
import { Address, zeroHash, parseEther } from 'viem';

const ZERO_HASH = zeroHash as `0x${string}`;

export interface SellerData {
  name: string;
  location: string;
  solarCapacity: number;
  certifications?: string[];
  description?: string;
}

export interface RegisteredSeller {
  address: Address;
  ipId: Address;
  name: string;
  location: string;
  capacity: number;
  registrationTx: string;
}

export class SellerService {
  private sellers: Map<Address, RegisteredSeller>;
  private readonly NFT_CONTRACT: Address = SPG_NFT_CONTRACT;
  private nftCollectionAddress: Address | null = null;

  constructor() {
    this.sellers = new Map();
  }

  // Create NFT collection for energy sellers (only needed once)
  private async ensureNFTCollection(): Promise<Address> {
    if (this.nftCollectionAddress) {
      return this.nftCollectionAddress;
    }

    console.log('📦 Creating Energy Seller NFT Collection...');
    
    const response = await client.nftClient.createNFTCollection({
      name: 'Energy Sellers',
      symbol: 'ENERGY',
      isPublicMinting: true,
      mintOpen: true,
      mintFeeRecipient: account.address,
      contractURI: '',
      maxSupply: 10000,
      owner: account.address
    });

    this.nftCollectionAddress = response.spgNftContract!;
    console.log(`✅ NFT Collection created at: ${this.nftCollectionAddress}`);
    
    return this.nftCollectionAddress;
  }

  // Register seller as IP Asset on Story Protocol blockchain
  async registerSeller(sellerData: SellerData): Promise<RegisteredSeller> {
    try {
      console.log('📝 Registering energy seller on Story Protocol blockchain...');
      console.log(`   Seller: ${sellerData.name}`);
      console.log(`   Location: ${sellerData.location}`);
      console.log(`   Solar Capacity: ${sellerData.solarCapacity} kW`);

      // Ensure we have an NFT collection
      const nftContract = await this.ensureNFTCollection();

      // Create NFT metadata for the energy seller
      const metadata = {
        name: `Energy Seller: ${sellerData.name}`,
        description: `Solar energy producer in ${sellerData.location} with ${sellerData.solarCapacity} kW capacity`,
        attributes: [
          { trait_type: 'Seller Name', value: sellerData.name },
          { trait_type: 'Location', value: sellerData.location },
          { trait_type: 'Solar Capacity', value: `${sellerData.solarCapacity} kW` },
          { trait_type: 'Registration Date', value: new Date().toISOString() }
        ]
      };

      console.log('🔗 Calling Story Protocol SDK...');
      
      // Mint NFT and register as IP Asset with license terms in one transaction
      const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
        spgNftContract: nftContract, // Use our created NFT collection
        ipMetadata: {
          ipMetadataURI: `data:application/json,${encodeURIComponent(JSON.stringify(metadata))}`,
          ipMetadataHash: ZERO_HASH,
          nftMetadataURI: `data:application/json,${encodeURIComponent(JSON.stringify(metadata))}`,
          nftMetadataHash: ZERO_HASH
        },
        licenseTermsData: [{
          terms: {
            transferable: true,
            commercialUse: true, // Enable commercial use for energy trading
            commercialAttribution: false,
            commercializerChecker: '0x0000000000000000000000000000000000000000' as Address,
            commercializerCheckerData: '0x0000000000000000000000000000000000000000' as Address,
            commercialRevShare: 10,
            derivativesAllowed: true,
            derivativesAttribution: false,
            derivativesApproval: false,
            derivativesReciprocal: false,
            defaultMintingFee: 0, // No minting fee
            expiration: 0,
            commercialRevCeiling: 0,
            derivativeRevCeiling: 0,
            currency: '0xF2104833d386a2734a4eB3B8ad6FC6812F29E38E' as Address, // MERC20 (whitelisted)
            uri: ''
          }
        }]
      });

      const registeredSeller: RegisteredSeller = {
        address: account.address,
        ipId: (response.ipId || '0x0000000000000000000000000000000000000000') as Address,
        name: sellerData.name,
        location: sellerData.location,
        capacity: sellerData.solarCapacity,
        registrationTx: (response.txHash || '0x0') as string
      };

      this.sellers.set(account.address, registeredSeller);

      console.log('✅ Seller registered on Story Protocol blockchain!');
      console.log(`   IP Asset ID: ${registeredSeller.ipId}`);
      console.log(`   NFT Token ID: ${response.tokenId}`);
      console.log(`   License Terms IDs: ${response.licenseTermsIds?.join(', ')}`);
      console.log(`   Transaction: ${registeredSeller.registrationTx}`);
      console.log(`   View on Explorer: https://aeneid.storyscan.xyz/tx/${registeredSeller.registrationTx}`);

      return registeredSeller;

    } catch (error: any) {
      console.error('❌ Error registering seller:', error);
      
      if (error.message?.includes('insufficient funds')) {
        console.error('\n💡 You need testnet ETH!');
        console.error('   Visit: https://faucet.story.foundation/');
        console.error(`   Your address: ${account.address}`);
      }
      
      throw new Error(`Failed to register seller: ${error.message}`);
    }
  }

  async getSellerByAddress(address: Address): Promise<RegisteredSeller | null> {
    return this.sellers.get(address) || null;
  }

  async getAllSellers(): Promise<RegisteredSeller[]> {
    return Array.from(this.sellers.values());
  }

  async updateSeller(address: Address, updates: Partial<SellerData>): Promise<RegisteredSeller> {
    const seller = this.sellers.get(address);
    if (!seller) {
      throw new Error('Seller not found');
    }

    const updatedSeller: RegisteredSeller = {
      ...seller,
      name: updates.name || seller.name,
      location: updates.location || seller.location,
      capacity: updates.solarCapacity || seller.capacity
    };

    this.sellers.set(address, updatedSeller);
    return updatedSeller;
  }
}
