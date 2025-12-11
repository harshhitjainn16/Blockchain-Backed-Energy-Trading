# 🌞⚡ Blockchain-Backed Energy Trading Platform

> A decentralized peer-to-peer energy marketplace built on **Story Protocol's Aeneid Testnet**, enabling solar households to tokenize and trade excess electricity.

[![Built with Story Protocol](https://img.shields.io/badge/Built%20with-Story%20Protocol-blue)](https://story.foundation/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📚 Quick Links

- **[QUICK_START.md](QUICK_START.md)** - Get the application running in 5 minutes
- **[CONNECTION_GUIDE.md](CONNECTION_GUIDE.md)** - Detailed API documentation and architecture
- **[Frontend](frontend/)** - React application source code
- **[Backend](src/)** - TypeScript services and API server

---

## 🎯 Overview

This platform revolutionizes energy trading by:
- **Tokenizing electricity** as IP Assets on the blockchain
- **Automating transactions** through smart contracts
- **Enabling P2P trading** between producers and consumers
- **Ensuring transparency** with on-chain records

### The Problem
Solar households produce excess energy but lack efficient ways to sell it to neighbors or the grid.

### Our Solution
A full-stack blockchain-based marketplace where:
1. Solar households register as energy sellers
2. Excess electricity is tokenized as tradable assets
3. Smart contracts handle pricing and settlements
4. Buyers purchase energy directly from producers
5. React frontend provides intuitive UI for all operations

---

## ✨ Features

### For Energy Producers (Sellers)
- ✅ Register solar installations as IP Assets
- ✅ List excess energy for sale (kWh units)
- ✅ Set custom pricing per kWh
- ✅ Track production and sales statistics
- ✅ Receive automated payments

### For Energy Consumers (Buyers)
- ✅ Browse available energy listings
- ✅ Purchase energy at transparent prices
- ✅ View transaction history
- ✅ Support renewable energy producers

### Platform Features
- ✅ Full-stack application with React frontend
- ✅ REST API backend with Express
- ✅ Decentralized marketplace
- ✅ Smart contract automation
- ✅ Real-time market statistics
- ✅ On-chain transaction records
- ✅ Responsive UI with Tailwind CSS
- ✅ IP Asset ownership verification

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm** 8+
- A **crypto wallet** (MetaMask recommended)
- **Testnet tokens** from [Story Faucet](https://faucet.story.foundation/)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
copy .env.example .env
# Edit .env and add your WALLET_PRIVATE_KEY

# 3. Build the project
npm run build

# 4. Run the demo
npm run dev
```

**That's it!** 🎉 The demo will walk you through the complete workflow.

---

## 📖 Documentation

| Guide | Description |
|-------|-------------|
| [**QUICKSTART.md**](QUICKSTART.md) | 5-minute setup guide |
| [**GETTING_STARTED.md**](GETTING_STARTED.md) | Comprehensive usage tutorial |
| [**ARCHITECTURE.md**](ARCHITECTURE.md) | System design & architecture |
| [**ADVANCED.md**](ADVANCED.md) | Production deployment guide |
| [**DEPLOYMENT.md**](DEPLOYMENT.md) | Pre-launch checklist |
| [**PROJECT_SUMMARY.md**](PROJECT_SUMMARY.md) | Complete project overview |

---

## 💻 Usage Examples

### Register as an Energy Seller

```bash
npm run register-seller
```

**What it does:**
- Creates your seller profile
- Registers your solar installation as an IP Asset on Story Protocol
- Sets up your capacity and certifications

### Create an Energy Listing

```bash
npm run create-listing
```

**What it does:**
- Lists your excess energy for sale (e.g., 50 kWh)
- Sets your price per kWh (e.g., 0.00001 ETH)
- Makes it available in the marketplace

### Purchase Energy

```bash
npm run purchase-energy
```

**What it does:**
- Browses available energy listings
- Purchases energy from a seller
- Transfers payment and energy tokens

---

## 🏗️ Architecture

```
Solar Household → Register IP Asset → Create Listing
                                           ↓
                                    Marketplace
                                           ↓
                                   Buyer Purchases
                                           ↓
                              Smart Contract Settlement
                                           ↓
                         Energy Token Transfer Complete
```

**Tech Stack:**
- **Blockchain:** Story Protocol (Aeneid Testnet)
- **SDK:** @story-protocol/core-sdk
- **Language:** TypeScript
- **Web3 Library:** viem

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed diagrams.

---

## 📁 Project Structure

```
src/
├── config/
│   └── client.ts              # Story SDK configuration
├── contracts/
│   ├── EnergyToken.ts         # Energy tokenization & IP Assets
│   └── EnergyMarket.ts        # Marketplace & trading logic
├── services/
│   ├── SellerService.ts       # Seller registration & mgmt
│   └── TradingService.ts      # Energy trading operations
├── types/
│   └── index.ts               # TypeScript interfaces
├── examples/
│   ├── registerSeller.ts      # Example: Register seller
│   ├── createListing.ts       # Example: Create listing
│   └── purchaseEnergy.ts      # Example: Purchase energy
└── index.ts                   # Full demo workflow
```

---

## 🔧 Configuration

### Environment Variables

Edit `.env` file:

```bash
# Required: Your wallet private key (without 0x)
WALLET_PRIVATE_KEY=your_private_key_here

# Required: Story RPC endpoint
RPC_PROVIDER_URL=https://aeneid.storyrpc.io

# Optional: Custom NFT contract (for production)
NFT_CONTRACT_ADDRESS=0x...
```

### Customize Settings

**Energy Amount:** Edit [src/examples/createListing.ts](src/examples/createListing.ts)
```typescript
const energyAmount = 100; // kWh
```

**Pricing:** Edit [src/examples/createListing.ts](src/examples/createListing.ts)
```typescript
const pricePerKwh = "0.00002"; // ETH per kWh
```

**Seller Info:** Edit [src/examples/registerSeller.ts](src/examples/registerSeller.ts)
```typescript
await sellerService.registerSeller(
  "Your Solar Company",
  "Your Location",
  { solarCapacity: 15 }
);
```

---

## 🌐 Story Protocol Integration

This project leverages Story Protocol's powerful IP Asset framework:

### IP Assets
Each solar installation is registered as an **IP Asset**, providing:
- Verifiable ownership on-chain
- Immutable production records
- License and royalty capabilities
- Metadata storage

### Smart Contracts
Automated handling of:
- Energy listing creation
- Price calculation
- Transaction settlement
- Token transfers

### Aeneid Testnet
Testing environment for:
- Zero-cost transactions
- Safe experimentation
- Production preparation

---

## 📊 Example Output

```
🌍 BLOCKCHAIN-BACKED ENERGY TRADING PLATFORM
================================================

🔑 Connected Wallet: 0x1234...5678
⛓️  Network: Story Aeneid Testnet

📍 STEP 1: Register Energy Seller
✅ Seller registered!
   IP Asset ID: 0xabcd...ef01

📍 STEP 2: Create Energy Listing
✅ Energy listed for sale!
   Amount: 100 kWh
   Price: 0.00002 ETH/kWh
   Total Value: 0.002 ETH

📍 STEP 3: Purchase Energy
✅ Purchase completed!
   Energy: 25 kWh
   Cost: 0.0005 ETH

📊 Market Statistics:
   Active Listings: 1
   Total Energy Available: 75 kWh
   Total Purchases: 1
   Total Energy Traded: 25 kWh
```

---

## 🛠️ Development

### Available Scripts

```bash
npm run build          # Compile TypeScript
npm run dev            # Run full demo
npm run register-seller # Register as seller
npm run create-listing  # Create energy listing
npm run purchase-energy # Purchase energy
```

### Testing
```bash
# Get testnet tokens
Visit: https://faucet.story.foundation/

# Check transaction on explorer
Visit: https://testnet.storyscan.xyz/
```

---

## 🔒 Security

- ⚠️ **Never commit `.env` file** - Contains private keys
- ✅ Use testnet for development
- ✅ Audit smart contracts before production
- ✅ Implement multi-sig for high-value transactions
- ✅ Keep dependencies updated

---

## 🚀 Future Enhancements

- [ ] Frontend UI (React/Next.js)
- [ ] Multiple energy sources (wind, hydro, geothermal)
- [ ] Dynamic pricing algorithms
- [ ] IoT integration for real-time data
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Production mainnet deployment
- [ ] Cross-chain compatibility

---

## 🔗 Resources

- **Story Protocol:** [https://story.foundation/](https://story.foundation/)
- **Documentation:** [https://docs.story.foundation/](https://docs.story.foundation/)
- **TypeScript SDK:** [SDK Docs](https://docs.story.foundation/docs/typescript-sdk-setup)
- **Testnet Explorer:** [https://testnet.storyscan.xyz/](https://testnet.storyscan.xyz/)
- **Faucet:** [https://faucet.story.foundation/](https://faucet.story.foundation/)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 💡 Support

Need help?
- 📖 Read the [Getting Started Guide](GETTING_STARTED.md)
- 🔍 Check the [Architecture Docs](ARCHITECTURE.md)
- 💬 Join Story Protocol Discord
- 🐛 Open an issue on GitHub

---

## ⭐ Acknowledgments

Built with [Story Protocol](https://story.foundation/) - The World's IP Blockchain

---

<div align="center">
  
**Ready to revolutionize energy trading?**

[Get Started](QUICKSTART.md) | [View Docs](GETTING_STARTED.md) | [See Architecture](ARCHITECTURE.md)

Made with ❤️ for a sustainable energy future

</div>
