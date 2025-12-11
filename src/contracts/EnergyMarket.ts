import { client } from '../config/client';
import { Address } from 'viem';

export interface EnergyAssetMetadata {
  name: string;
  description: string;
  energyType: 'solar' | 'wind' | 'hydro';
  capacity: number;
  location: string;
  certifications?: string[];
  productionDate?: string;
}

export interface LicenseTerms {
  commercialUse: boolean;
  derivativesAllowed: boolean;
  commercialAttribution: boolean;
  commercializerChecker: Address;
  commercialRevShare: number;
}

export class EnergyToken {
  
  /**
   * Register an NFT as an IP Asset using Story Protocol SDK
   * REAL BLOCKCHAIN TRANSACTION - Requires NFT contract and testnet ETH
   */
  async registerEnergyAsset(
    nftContract: Address,
    tokenId: bigint,
    metadata: EnergyAssetMetadata
  ): Promise<{
    ipId: Address;
    txHash: string;
  }> {
    try {
      console.log('🔄 Registering energy asset as IP...');
      console.log(`   NFT Contract: ${nftContract}`);
      console.log(`   Token ID: ${tokenId}`);
      console.log(`   Name: ${metadata.name}`);
      console.log(`   Type: ${metadata.energyType}`);
      console.log(`   Capacity: ${metadata.capacity} kW`);

      // ✅ REAL Story Protocol SDK Call
      const response = await client.ipAsset.register({
        nftContract,
        tokenId,
        ipMetadata: {
          ipMetadataURI: '', // Optional: Add IPFS URI for metadata
          ipMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`,
          nftMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`,
        }
      });

      console.log('✅ IP Asset registered on blockchain!');
      console.log(`   IP ID: ${response.ipId}`);
      console.log(`   Transaction: ${response.txHash}`);

      return {
        ipId: response.ipId as Address,
        txHash: response.txHash as string
      };

    } catch (error: any) {
      console.error('❌ Error registering energy asset:', error);
      throw new Error(`Failed to register IP Asset: ${error.message}`);
    }
  }

  /**
   * Get IP Asset information from blockchain
   * Note: Use block explorer or direct contract calls to query IP Asset data
   */
  async getAssetInfo(ipId: Address) {
    try {
      console.log('✅ IP Asset ID:', ipId);
      console.log('   View on Explorer: https://aeneid.storyscan.xyz/address/' + ipId);
      
      return { ipId };
    } catch (error: any) {
      console.error('Error getting asset info:', error);
      throw error;
    }
  }
}

export class EnergyMarketContract {
  
  /**
   * Attach PIL (Programmable IP License) to an IP Asset
   * REAL BLOCKCHAIN TRANSACTION
   */
  async attachLicenseToIPAsset(
    ipId: Address,
    licenseTermsId: string = '1'
  ): Promise<{
    txHash: string;
  }> {
    try {
      console.log('🔄 Attaching license terms to IP Asset...');
      console.log(`   IP Asset: ${ipId}`);
      console.log(`   License Terms ID: ${licenseTermsId}`);

      // PIL (Programmable IP License) Template Address on Story Aeneid Testnet
      const PIL_TEMPLATE = '0x58E2c909D557Cd23EF90D14f8fd21667A5Ae7a93';

      // ✅ REAL Story Protocol SDK Call
      const response = await client.license.attachLicenseTerms({
        ipId,
        licenseTemplate: PIL_TEMPLATE as Address,
        licenseTermsId: BigInt(licenseTermsId)
      });

      console.log('✅ License terms attached on blockchain!');
      console.log(`   Transaction: ${response.txHash}`);

      return {
        txHash: response.txHash as string
      };

    } catch (error: any) {
      console.error('❌ Error attaching license:', error);
      throw new Error(`Failed to attach license: ${error.message}`);
    }
  }

  /**
   * Mint License Tokens for energy trading
   * REAL BLOCKCHAIN TRANSACTION
   */
  async mintEnergyLicense(
    licenseTermsId: string,
    licensorIpId: Address,
    amount: number,
    receiver: Address
  ): Promise<{
    licenseTokenIds: string[];
    txHash: string;
  }> {
    try {
      console.log('🔄 Minting license tokens...');
      console.log(`   Licensor IP: ${licensorIpId}`);
      console.log(`   Amount: ${amount} tokens`);
      console.log(`   Receiver: ${receiver}`);

      // ✅ REAL Story Protocol SDK Call
      const response = await client.license.mintLicenseTokens({
        licenseTermsId: BigInt(licenseTermsId),
        licensorIpId,
        amount: BigInt(amount),
        receiver
      });

      console.log('✅ License tokens minted on blockchain!');
      console.log(`   Token IDs: ${response.licenseTokenIds}`);
      console.log(`   Transaction: ${response.txHash}`);

      return {
        licenseTokenIds: response.licenseTokenIds?.map(id => id.toString()) || [],
        txHash: response.txHash as string
      };

    } catch (error: any) {
      console.error('❌ Error minting license tokens:', error);
      throw new Error(`Failed to mint license tokens: ${error.message}`);
    }
  }

  /**
   * Create energy license (combines attach + mint)
   * REAL BLOCKCHAIN TRANSACTIONS (2 transactions)
   */
  async createEnergyLicense(
    ipId: Address,
    amount: number,
    price: string,
    receiver: Address
  ): Promise<{
    licenseTokenIds: string[];
    txHash: string;
  }> {
    try {
      console.log('🔄 Creating energy license...');
      console.log(`   IP Asset: ${ipId}`);
      console.log(`   Amount: ${amount} kWh`);
      console.log(`   Price: ${price} ETH/kWh`);

      // Step 1: Attach license terms (if not already attached)
      console.log('\nStep 1: Attaching license terms...');
      await this.attachLicenseToIPAsset(ipId, '1');

      // Step 2: Mint license tokens
      console.log('\nStep 2: Minting license tokens...');
      const result = await this.mintEnergyLicense('1', ipId, amount, receiver);

      console.log('✅ Energy license created successfully!');
      return result;

    } catch (error: any) {
      console.error('❌ Error creating license:', error);
      throw new Error(`Failed to create license: ${error.message}`);
    }
  }

  /**
   * Get license terms information
   * Note: getLicenseTerms API may vary by SDK version
   */
  async getLicenseTerms(licenseTermsId: string) {
    try {
      console.log('📝 License Terms ID:', licenseTermsId);
      console.log('   View on Explorer to see license details');
      return { licenseTermsId };
    } catch (error: any) {
      console.error('Error getting license terms:', error);
      throw error;
    }
  }
}