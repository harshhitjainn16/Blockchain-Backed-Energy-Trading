# Deployment Checklist

## Pre-Deployment

### 1. Environment Setup
- [ ] Node.js 18+ installed
- [ ] npm 8+ installed
- [ ] Git installed
- [ ] Wallet created with private key

### 2. Testnet Preparation
- [ ] Private key added to `.env`
- [ ] RPC URL configured
- [ ] Testnet tokens obtained from faucet
- [ ] Test wallet funded with sufficient gas

### 3. Code Review
- [ ] All dependencies installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] Environment variables validated

## Testing Phase

### 4. Functional Testing
- [ ] Register seller works (`npm run register-seller`)
- [ ] Create listing works (`npm run create-listing`)
- [ ] Purchase energy works (`npm run purchase-energy`)
- [ ] Full demo runs (`npm run dev`)
- [ ] All transactions confirmed on testnet

### 5. Integration Testing
- [ ] Story SDK client connects
- [ ] IP Assets register successfully
- [ ] Transactions appear on block explorer
- [ ] Gas costs are reasonable
- [ ] Error handling works

### 6. Security Check
- [ ] `.env` file in `.gitignore`
- [ ] No private keys in code
- [ ] Input validation present
- [ ] Error messages don't leak sensitive info

## Production Preparation

### 7. Smart Contract Deployment
- [ ] NFT contract deployed (or use existing)
- [ ] Contract addresses added to `.env`
- [ ] Contracts verified on explorer
- [ ] Ownership configured correctly

### 8. Infrastructure
- [ ] IPFS gateway configured
- [ ] Metadata storage solution ready
- [ ] Database for off-chain data (optional)
- [ ] API endpoints secured (if applicable)

### 9. Monitoring
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics setup
- [ ] Transaction monitoring
- [ ] Alert system for failures

## Launch

### 10. Mainnet Deployment
- [ ] Switch to mainnet RPC
- [ ] Update contract addresses
- [ ] Fund production wallet
- [ ] Test with small amounts first
- [ ] Monitor initial transactions

### 11. Documentation
- [ ] README.md complete
- [ ] API documentation (if applicable)
- [ ] User guide created
- [ ] Support channels established

### 12. Post-Launch
- [ ] Monitor transactions
- [ ] Track gas costs
- [ ] Collect user feedback
- [ ] Plan for upgrades
- [ ] Security audit scheduled

## Rollback Plan

### If Issues Occur
1. Pause new registrations/listings
2. Document the issue
3. Revert to last stable version
4. Communicate with users
5. Fix and re-deploy

## Support Contacts

- Story Protocol Discord: [Join here](https://discord.gg/storyprotocol)
- Story Docs: https://docs.story.foundation/
- Block Explorer: https://testnet.storyscan.xyz/

## Notes

- Always test on testnet first
- Keep private keys secure
- Monitor gas prices
- Have a backup plan
- Document all changes
