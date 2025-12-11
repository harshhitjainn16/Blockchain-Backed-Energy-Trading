/**
 * Energy Listing Interface
 * Represents an energy listing in the marketplace
 */
export interface EnergyListing {
  id: string;
  seller: string;
  ipAssetId: string;
  energyAmount: number; // in kWh
  pricePerKwh: bigint; // in wei
  timestamp: number;
  isActive: boolean;
  metadata: {
    location?: string;
    energySource: "solar" | "wind" | "hydro" | "other";
    productionDate: string;
    certificateUri?: string;
  };
}

/**
 * Energy Seller Interface
 * Represents a registered energy seller
 */
export interface EnergySeller {
  address: string;
  ipAssetId: string;
  name: string;
  location: string;
  totalEnergyProduced: number;
  totalEnergySold: number;
  registrationDate: number;
  metadata: {
    solarCapacity?: number; // in kW
    certifications?: string[];
    description?: string;
  };
}

/**
 * Energy Purchase Interface
 * Represents an energy purchase transaction
 */
export interface EnergyPurchase {
  id: string;
  buyer: string;
  seller: string;
  listingId: string;
  energyAmount: number;
  totalPrice: bigint;
  timestamp: number;
  transactionHash: string;
}

/**
 * IP Asset Metadata for Energy
 */
export interface EnergyIPMetadata {
  name: string;
  description: string;
  energyType: "solar" | "wind" | "hydro" | "other";
  capacity: number;
  location: string;
  installationDate?: string;
  certifications?: string[];
  image?: string;
}

/**
 * Transaction Response
 */
export interface TransactionResponse {
  success: boolean;
  txHash?: string;
  ipAssetId?: string;
  error?: string;
  data?: any;
}
