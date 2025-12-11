# 🔐 Wallet Connection Guide

## How to Connect Your Wallet

The "Connect Wallet" button in the top-right corner now works! Here's how to use it:

### Prerequisites

1. **Install MetaMask**
   - If you don't have MetaMask installed, clicking "Connect Wallet" will prompt you to install it
   - Download from: https://metamask.io/download/
   - Install the browser extension for Chrome, Firefox, or Brave

### Connecting Steps

1. **Click "Connect Wallet"** in the top navigation
2. **MetaMask popup will appear** asking for permission
3. **Select your account** and click "Connect"
4. **Auto-add Aeneid Network**: The app will automatically try to switch to Story Protocol Aeneid Testnet
   - If the network isn't in your MetaMask, it will ask to add it
   - Click "Approve" to add the network

### Network Details (Added Automatically)

- **Network Name**: Story Protocol Aeneid Testnet
- **Chain ID**: 715501 (0xAE8ED in hex)
- **RPC URL**: https://aeneid.storyrpc.io
- **Currency Symbol**: IP
- **Block Explorer**: https://aeneid.storyscan.xyz

### After Connecting

Once connected, you'll see:
- Your wallet address (shortened) in the top-right: `0x1234...5678`
- A green wallet icon indicating connection
- A "Disconnect" button to disconnect

### Getting Testnet Funds

To perform transactions, you'll need testnet IP tokens:
1. Visit the Aeneid testnet faucet (check Story Protocol Discord/docs)
2. Enter your wallet address
3. Request testnet tokens

### Features Enabled After Connection

With your wallet connected, you can:
- ✅ Register as an energy seller
- ✅ Create energy listings
- ✅ Purchase energy from other sellers
- ✅ View your transaction history
- ✅ Sign blockchain transactions

### Troubleshooting

**MetaMask not detected:**
- Make sure MetaMask extension is installed and enabled
- Refresh the page
- Check that you're not in private/incognito mode

**Connection rejected:**
- Click "Connect Wallet" again
- In MetaMask popup, click "Connect"
- Make sure you select at least one account

**Wrong network:**
- The app will prompt to switch to Aeneid testnet
- Click "Switch Network" or "Add Network" in MetaMask
- If manual setup needed, use the network details above

**Already connected but showing "Connect Wallet":**
- Refresh the page
- Check MetaMask shows the site as connected
- Try disconnecting and reconnecting

### Security Tips

- ✅ Only connect to trusted sites
- ✅ Verify you're on the correct URL
- ✅ Never share your private key or seed phrase
- ✅ Use testnet for development/testing
- ✅ Keep MetaMask locked when not in use

### Technical Details

The wallet connection:
- Uses `window.ethereum` Web3 provider
- Requests account access via `eth_requestAccounts`
- Automatically adds/switches to Aeneid testnet
- Persists connection state in component
- Detects if MetaMask is already connected on page load

## Next Steps

Once connected:
1. Go to **Register Seller** to register your solar household
2. Navigate to **Create Listing** to list excess energy
3. Browse **Marketplace** to purchase energy
4. Check **Dashboard** for market statistics

Your wallet address is used for all blockchain transactions!
