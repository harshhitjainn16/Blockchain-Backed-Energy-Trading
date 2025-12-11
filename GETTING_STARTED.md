# Getting Started with Blockchain Energy Trading

This guide will help you set up and run your blockchain-backed energy trading platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your wallet private key (without `0x` prefix):

```
WALLET_PRIVATE_KEY=your_private_key_here
RPC_PROVIDER_URL=https://aeneid.storyrpc.io
```

⚠️ **Important**: 
- Never commit your `.env` file to version control
- Get testnet tokens from [Story Faucet](https://faucet.story.foundation/)

### 3. Build the Project

```bash
npm run build
```

### 4. Run the Demo

```bash
npm run dev
```

This will run a complete demonstration of the platform including:
- Seller registration
- Creating energy listings
- Purchasing energy
- Viewing market statistics

## 📖 Step-by-Step Usage

### Register as a Seller

```bash
npm run register-seller
```

This registers you as an energy seller with your solar installation details.

### Create an Energy Listing

```bash
npm run create-listing
```

This creates a new listing to sell your excess solar energy.

### Purchase Energy

```bash
npm run purchase-energy
```

This allows you to buy energy from available listings in the marketplace.

## 🔧 Customization

### Modify Seller Information

Edit [src/examples/registerSeller.ts](src/examples/registerSeller.ts):

```typescript
await sellerService.registerSeller(
  "Your Solar Home",     // Your name
  "Your Location",        // Your location
  {
    solarCapacity: 20,    // Your solar capacity in kW
    certifications: ["Your Certifications"],
    description: "Your description"
  }
);
```

### Adjust Energy Pricing

Edit [src/examples/createListing.ts](src/examples/createListing.ts):

```typescript
const energyAmount = 50;        // kWh to sell
const pricePerKwh = "0.00001";  // Price in ETH
```

### Customize Purchase Amount

Edit [src/examples/purchaseEnergy.ts](src/examples/purchaseEnergy.ts):

```typescript
const amountToPurchase = 10;  // kWh to buy
```

## 🏗️ Architecture

```
┌─────────────────┐
│   Wallet/User   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Story SDK Client      │
│   (Aeneid Testnet)      │
└────────┬────────────────┘
         │
         ├──► SellerService    → Register sellers, track production
         │
         ├──► TradingService   → Manage listings, purchases
         │
         ├──► EnergyToken      → IP Asset management
         │
         └──► EnergyMarket     → Marketplace logic
```

## 📝 Key Concepts

### IP Assets
Each energy production facility is registered as an IP Asset on Story Protocol. This provides:
- Ownership verification
- Production tracking
- License management
- Royalty distribution

### Energy Tokens
Energy production is tokenized, allowing it to be:
- Traded on the marketplace
- Tracked on-chain
- Verified for authenticity
- Automatically settled via smart contracts

### Smart Contracts
Handle:
- Pricing mechanisms
- Transaction settlement
- Ownership transfers
- Market statistics

## 🌐 Resources

- [Story Protocol Docs](https://docs.story.foundation/)
- [TypeScript SDK](https://docs.story.foundation/docs/typescript-sdk-setup)
- [Aeneid Testnet](https://testnet.storyscan.xyz/)
- [Get Testnet Tokens](https://faucet.story.foundation/)

## 🔍 Troubleshooting

### "WALLET_PRIVATE_KEY is not set"
Make sure you've created a `.env` file and added your private key.

### "Insufficient funds"
Get testnet tokens from the [Story Faucet](https://faucet.story.foundation/).

### Build errors
Ensure you have Node.js 18+ and run `npm install` again.

## 📄 License

MIT
