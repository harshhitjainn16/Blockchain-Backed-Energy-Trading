# 🚀 Quick Setup Guide

## ⚡ Fast Start (5 minutes)

### Step 1: Setup Environment

1. **Copy the environment template:**
   ```bash
   copy .env.example .env
   ```

2. **Get your wallet private key:**
   - Open MetaMask (or your wallet)
   - Go to Account Details → Export Private Key
   - Copy the private key (without `0x`)

3. **Edit `.env` file:**
   ```
   WALLET_PRIVATE_KEY=your_private_key_here_without_0x
   RPC_PROVIDER_URL=https://aeneid.storyrpc.io
   ```

### Step 2: Get Testnet Tokens

1. Visit [Story Faucet](https://faucet.story.foundation/)
2. Enter your wallet address
3. Request testnet tokens
4. Wait for confirmation

### Step 3: Run the Demo

```bash
npm run dev
```

This will demonstrate the complete workflow!

## 📚 Next Steps

### Run Individual Examples

**Register as a seller:**
```bash
npm run register-seller
```

**Create energy listing:**
```bash
npm run create-listing
```

**Purchase energy:**
```bash
npm run purchase-energy
```

## 🔍 What You'll See

The demo will:
1. ✅ Register you as an energy seller
2. ✅ Create your IP Asset on Story Protocol
3. ✅ List 100 kWh of solar energy for sale
4. ✅ Simulate a purchase transaction
5. ✅ Show market statistics

## ⚙️ Configuration

### Adjust Energy Amount

Edit [src/examples/createListing.ts](src/examples/createListing.ts):
```typescript
const energyAmount = 50;  // Change this value
```

### Change Pricing

Edit [src/examples/createListing.ts](src/examples/createListing.ts):
```typescript
const pricePerKwh = "0.00001";  // Price in ETH
```

### Customize Seller Info

Edit [src/examples/registerSeller.ts](src/examples/registerSeller.ts):
```typescript
await sellerService.registerSeller(
  "Your Name",
  "Your Location",
  {
    solarCapacity: 15,  // Your capacity in kW
    certifications: ["Your Certs"],
    description: "Your description"
  }
);
```

## 🛠️ Project Structure

```
src/
├── config/
│   └── client.ts          # Story SDK setup
├── contracts/
│   ├── EnergyToken.ts     # Token management
│   └── EnergyMarket.ts    # Marketplace logic
├── services/
│   ├── SellerService.ts   # Seller operations
│   └── TradingService.ts  # Trading operations
├── examples/
│   ├── registerSeller.ts  # Example scripts
│   ├── createListing.ts
│   └── purchaseEnergy.ts
└── index.ts               # Main demo
```

## 🐛 Troubleshooting

**"WALLET_PRIVATE_KEY is not set"**
→ Make sure `.env` file exists and has your private key

**"Insufficient funds"**
→ Get tokens from the faucet

**Build errors**
→ Run `npm install` again

## 📖 Documentation

- [Getting Started Guide](GETTING_STARTED.md) - Detailed setup
- [Advanced Guide](ADVANCED.md) - Production features
- [Deployment Checklist](DEPLOYMENT.md) - Launch guide

## 🔗 Resources

- [Story Protocol Docs](https://docs.story.foundation/)
- [TypeScript SDK](https://docs.story.foundation/docs/typescript-sdk-setup)
- [Testnet Explorer](https://testnet.storyscan.xyz/)
- [Faucet](https://faucet.story.foundation/)

## 💡 Tips

- Start with the demo (`npm run dev`)
- Check transaction hashes on the explorer
- Monitor gas costs during testing
- Join Story Protocol Discord for support

## 🎯 What's Next?

1. Customize seller information
2. Adjust pricing strategies
3. Add more energy sources (wind, hydro)
4. Implement dynamic pricing
5. Deploy to production

---

**Need Help?** Check the [Getting Started Guide](GETTING_STARTED.md) for detailed instructions!
