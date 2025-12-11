# Advanced Configuration Guide

## Environment Variables

### Required Variables

```bash
# Your wallet's private key (DO NOT share!)
WALLET_PRIVATE_KEY=your_private_key_without_0x_prefix

# Story RPC endpoint
RPC_PROVIDER_URL=https://aeneid.storyrpc.io
```

### Optional Variables

```bash
# NFT Contract Address (if you have a custom NFT contract)
NFT_CONTRACT_ADDRESS=0x...

# Custom Gas Settings
GAS_LIMIT=3000000
GAS_PRICE=20000000000

# IPFS Configuration (for metadata storage)
IPFS_GATEWAY=https://ipfs.io/ipfs/
IPFS_API_KEY=your_api_key
```

## Story Protocol Integration

### IP Asset Registration

The platform uses Story Protocol's IP Asset system to represent energy production facilities:

```typescript
import { client } from "./config/client";

// Register an IP Asset
const response = await client.ipAsset.registerIpAsset({
  nftContract: "0x...",
  tokenId: 1n,
  metadata: {
    metadataURI: "ipfs://...",
    metadataHash: "0x...",
    nftMetadataHash: "0x...",
  },
});
```

### License Terms

You can attach license terms to energy assets:

```typescript
// Example: Attach PIL terms for energy trading
await client.license.attachLicenseTerms({
  ipId: ipAssetId,
  licenseTermsId: "1", // PIL license terms ID
});
```

### Royalty Configuration

Set up royalties for energy sales:

```typescript
await client.royalty.payRoyaltyOnBehalf({
  receiverIpId: sellerIpAssetId,
  payerIpId: buyerIpAssetId,
  token: "0x...", // Payment token
  amount: royaltyAmount,
});
```

## Production Deployment

### 1. Smart Contract Deployment

For production, you'll need to deploy:

1. **ERC-721 NFT Contract** for energy assets
2. **Marketplace Contract** for trading logic
3. **Payment Contract** for settlements

### 2. IPFS Integration

Store metadata on IPFS:

```typescript
import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001' });

// Upload metadata
const { cid } = await ipfs.add(JSON.stringify(metadata));
const metadataURI = `ipfs://${cid}`;
```

### 3. Oracle Integration

For real-world energy data:

```typescript
// Integrate with Chainlink or similar oracle
// to verify actual energy production
```

### 4. Security Best Practices

- Use hardware wallets for production keys
- Implement multi-sig for high-value transactions
- Add rate limiting to prevent spam
- Implement access control for admin functions
- Regular security audits

## Custom Extensions

### Add New Energy Sources

Extend the `energySource` type in [src/types/index.ts](src/types/index.ts):

```typescript
export type EnergySource = "solar" | "wind" | "hydro" | "nuclear" | "geothermal";
```

### Implement Dynamic Pricing

Create a pricing strategy in [src/contracts/EnergyMarket.ts](src/contracts/EnergyMarket.ts):

```typescript
class DynamicPricing {
  calculatePrice(supply: number, demand: number): bigint {
    // Implement your pricing algorithm
    const basePrice = parseEther("0.00001");
    const demandMultiplier = demand / supply;
    return basePrice * BigInt(Math.floor(demandMultiplier * 100)) / 100n;
  }
}
```

### Add Energy Certificates

Implement renewable energy certificates (RECs):

```typescript
interface EnergyCertificate {
  id: string;
  energyAmount: number;
  certificationType: "REC" | "GO" | "I-REC";
  issuanceDate: string;
  expiryDate: string;
  verificationUri: string;
}
```

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```typescript
// Example test
describe("Energy Trading", () => {
  it("should register seller and create listing", async () => {
    const seller = await sellerService.registerSeller(...);
    expect(seller.success).toBe(true);
    
    const listing = await tradingService.listEnergy(...);
    expect(listing.success).toBe(true);
  });
});
```

### Testnet Testing

1. Get testnet tokens from faucet
2. Test all workflows
3. Monitor gas costs
4. Verify transactions on explorer

## Monitoring & Analytics

### Track Metrics

```typescript
class Analytics {
  trackSale(sale: EnergyPurchase) {
    // Log to analytics service
    console.log(`Sale: ${sale.energyAmount} kWh for ${sale.totalPrice}`);
  }
  
  getMarketTrends() {
    // Calculate trends
  }
}
```

### Error Tracking

Integrate with error tracking services:

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: "..." });
```

## Performance Optimization

### Batch Operations

```typescript
// Process multiple listings at once
async function batchCreateListings(listings: ListingParams[]) {
  return Promise.all(
    listings.map(listing => tradingService.listEnergy(...))
  );
}
```

### Caching

```typescript
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 });

function getCachedListings() {
  const cached = cache.get("listings");
  if (cached) return cached;
  
  const listings = market.getActiveListings();
  cache.set("listings", listings);
  return listings;
}
```

## Support

For issues or questions:
- Check [Story Protocol Docs](https://docs.story.foundation/)
- Join Story Protocol Discord
- Open an issue on GitHub
