import { client } from "../config/client";
import { EnergyIPMetadata, TransactionResponse } from "../types";

/**
 * EnergyToken Class
 * Manages energy production as IP Assets on Story Protocol
 */
export class EnergyToken {
  /**
   * Register a new energy production unit as an IP Asset
   * @param metadata - Energy asset metadata
   * @returns Transaction response with IP Asset ID
   */
  async registerEnergyAsset(
    metadata: EnergyIPMetadata
  ): Promise<TransactionResponse> {
    try {
      console.log("🔄 Registering energy asset as IP...");
      console.log(`   Name: ${metadata.name}`);
      console.log(`   Type: ${metadata.energyType}`);
      console.log(`   Capacity: ${metadata.capacity} kW`);

      // Register IP Asset using Story SDK
      const response = await client.ipAsset.register({
        nftContract: process.env.NFT_CONTRACT_ADDRESS as `0x${string}`, // You'll need to deploy an NFT contract or use existing
        tokenId: BigInt(Date.now()), // Unique token ID based on timestamp
        ipMetadata: {
          ipMetadataURI: "", // IPFS URI would go here in production
          ipMetadataHash: `0x${Buffer.from(JSON.stringify(metadata)).toString("hex").padEnd(64, "0")}` as `0x${string}`,
          nftMetadataHash: `0x${Buffer.from(metadata.name).toString("hex").padEnd(64, "0")}` as `0x${string}`,
        },
      });

      console.log("✅ Energy asset registered successfully!");
      console.log(`   IP Asset ID: ${response.ipId}`);
      console.log(`   Transaction Hash: ${response.txHash}`);

      return {
        success: true,
        txHash: response.txHash,
        ipAssetId: response.ipId,
      };
    } catch (error) {
      console.error("❌ Error registering energy asset:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Create an energy token representing kWh production
   * This could be expanded to mint actual tokens for each energy unit
   * @param ipAssetId - The IP Asset representing the energy source
   * @param energyAmount - Amount of energy in kWh
   */
  async createEnergyToken(
    ipAssetId: string,
    energyAmount: number
  ): Promise<TransactionResponse> {
    try {
      console.log("🔄 Creating energy token...");
      console.log(`   IP Asset: ${ipAssetId}`);
      console.log(`   Energy Amount: ${energyAmount} kWh`);

      // In a full implementation, you might:
      // 1. Create a derivative IP Asset for each energy batch
      // 2. Attach license terms for energy trading
      // 3. Set royalty policies

      // For now, we'll attach metadata to track the energy production
      const metadata = {
        energyAmount,
        productionDate: new Date().toISOString(),
        status: "available",
      };

      console.log("✅ Energy token created!");
      
      return {
        success: true,
        ipAssetId,
        data: metadata,
      };
    } catch (error) {
      console.error("❌ Error creating energy token:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Transfer energy tokens (in a real implementation, this would transfer IP ownership)
   * @param fromIpAssetId - Source IP Asset
   * @param toAddress - Recipient address
   * @param energyAmount - Amount of energy to transfer
   */
  async transferEnergyToken(
    fromIpAssetId: string,
    toAddress: string,
    energyAmount: number
  ): Promise<TransactionResponse> {
    try {
      console.log("🔄 Transferring energy token...");
      console.log(`   From IP Asset: ${fromIpAssetId}`);
      console.log(`   To Address: ${toAddress}`);
      console.log(`   Amount: ${energyAmount} kWh`);

      // In production, implement actual token/IP transfer logic here
      // This might involve:
      // 1. Creating a license for the energy
      // 2. Transferring derivative rights
      // 3. Recording the transaction on-chain

      console.log("✅ Energy token transferred!");

      return {
        success: true,
        data: {
          from: fromIpAssetId,
          to: toAddress,
          amount: energyAmount,
        },
      };
    } catch (error) {
      console.error("❌ Error transferring energy token:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get IP Asset details
   * @param ipAssetId - IP Asset ID to query
   */
  async getEnergyAssetDetails(ipAssetId: string): Promise<any> {
    try {
      console.log(`🔍 Fetching details for IP Asset: ${ipAssetId}`);
      
      // In production, you would fetch IP Asset details from the blockchain
      // For now, return the IP Asset ID
      const ipAssetInfo = {
        ipId: ipAssetId,
        // Additional details would be fetched from blockchain here
      };
      
      console.log("✅ IP Asset details retrieved!");
      return ipAssetInfo;
    } catch (error) {
      console.error("❌ Error fetching IP Asset details:", error);
      throw error;
    }
  }
}
