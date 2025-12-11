import { EnergyMarketContract } from "../contracts/EnergyMarket";
import { SellerService } from "./SellerService";
import { Address } from "viem";
import { account } from "../config/client";

export interface EnergyListing {
  listingId: string;
  seller: Address;
  ipId: Address;
  amount: number;
  availableAmount: number;
  pricePerKwh: string;
  totalValue: string;
  energySource: string;
  location: string;
  productionDate: string;
  certificateUri?: string;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: string;
}

export interface PurchaseRecord {
  purchaseId: string;
  listingId: string;
  buyer: Address;
  seller: Address;
  energyAmount: number;
  pricePerKwh: string;
  totalPrice: string;
  txHash: string;
  timestamp: string;
}

export class TradingService {
  private energyMarket: EnergyMarketContract;
  private sellerService: SellerService;
  private listings: Map<string, EnergyListing>;
  private purchases: Map<string, PurchaseRecord>;

  constructor(sellerService?: SellerService) {
    this.energyMarket = new EnergyMarketContract();
    this.sellerService = sellerService || new SellerService();
    this.listings = new Map();
    this.purchases = new Map();
  }

  async createListing(data: {
    amount: number;
    pricePerKwh: string;
    energySource: string;
    location: string;
    productionDate: string;
    certificateUri?: string;
  }): Promise<EnergyListing> {
    try {
      console.log('📝 Creating energy listing...');

      const seller = await this.sellerService.getSellerByAddress(account.address);
      
      if (!seller) {
        throw new Error('Seller not registered');
      }

      const listingId = `listing-${Date.now()}`;
      const totalValue = (data.amount * parseFloat(data.pricePerKwh)).toFixed(6);

      const listing: EnergyListing = {
        listingId,
        seller: seller.address,
        ipId: seller.ipId,
        amount: data.amount,
        availableAmount: data.amount,
        pricePerKwh: data.pricePerKwh,
        totalValue,
        energySource: data.energySource,
        location: data.location,
        productionDate: data.productionDate,
        certificateUri: data.certificateUri,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      this.listings.set(listingId, listing);

      console.log('✅ Listing created successfully!');
      return listing;

    } catch (error: any) {
      console.error('❌ Error creating listing:', error);
      throw error;
    }
  }

  async purchaseEnergy(
    listingId: string,
    amount: number,
    buyerAddress: Address
  ): Promise<PurchaseRecord> {
    try {
      console.log('💰 Processing energy purchase...');

      const listing = this.listings.get(listingId);
      if (!listing) {
        throw new Error('Listing not found');
      }

      if (listing.availableAmount < amount) {
        throw new Error('Insufficient energy available');
      }

      const totalPrice = (amount * parseFloat(listing.pricePerKwh)).toFixed(6);
      const purchaseId = `purchase-${Date.now()}`;
      const mockTxHash = `0x${Math.random().toString(16).slice(2).padStart(64, '0')}`;

      const purchase: PurchaseRecord = {
        purchaseId,
        listingId,
        buyer: buyerAddress,
        seller: listing.seller,
        energyAmount: amount,
        pricePerKwh: listing.pricePerKwh,
        totalPrice,
        txHash: mockTxHash,
        timestamp: new Date().toISOString()
      };

      // Update listing
      listing.availableAmount -= amount;
      if (listing.availableAmount === 0) {
        listing.status = 'sold';
      }

      this.purchases.set(purchaseId, purchase);
      console.log('✅ Purchase completed!');

      return purchase;

    } catch (error: any) {
      console.error('❌ Error processing purchase:', error);
      throw error;
    }
  }

  async getAllListings(): Promise<EnergyListing[]> {
    return Array.from(this.listings.values());
  }

  async getListingById(listingId: string): Promise<EnergyListing | null> {
    return this.listings.get(listingId) || null;
  }

  async getSellerListings(sellerAddress: Address): Promise<EnergyListing[]> {
    return Array.from(this.listings.values()).filter(
      listing => listing.seller === sellerAddress
    );
  }

  async getPurchaseHistory(address: Address): Promise<PurchaseRecord[]> {
    return Array.from(this.purchases.values()).filter(
      purchase => purchase.buyer === address || purchase.seller === address
    );
  }

  async getMarketStatistics() {
    const listings = Array.from(this.listings.values());
    const activeListings = listings.filter(l => l.status === 'active');
    const purchases = Array.from(this.purchases.values());

    const totalEnergyAvailable = activeListings.reduce(
      (sum, l) => sum + l.availableAmount, 0
    );

    const totalEnergyTraded = purchases.reduce(
      (sum, p) => sum + p.energyAmount, 0
    );

    const avgPrice = activeListings.length > 0
      ? (activeListings.reduce((sum, l) => sum + parseFloat(l.pricePerKwh), 0) / activeListings.length).toFixed(6)
      : '0';

    return {
      totalListings: listings.length,
      activeListings: activeListings.length,
      totalEnergyAvailable,
      totalEnergyTraded,
      totalTransactions: purchases.length,
      averagePrice: avgPrice
    };
  }
}
