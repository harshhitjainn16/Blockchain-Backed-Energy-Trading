# 🚀 Quick Start Guide

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ npm installed
- ✅ Private key for Aeneid testnet wallet

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```bash
WALLET_PRIVATE_KEY=your_private_key_without_0x_prefix
RPC_PROVIDER_URL=https://aeneid.storyrpc.io
PORT=5000
```

The frontend `.env` is already configured at `frontend/.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Build Backend

```bash
npm run build
```

## Running the Application

### ⭐ Option 1: Use the Batch File (Windows - Recommended)

Double-click `start-all.bat` or run:

```bash
start-all.bat
```

This will open two command windows:
- Backend API Server on port 5000
- Frontend Dev Server on port 3000

### Option 2: Use npm script (Single Terminal)

```bash
npm run start:all
```

This uses `concurrently` to run both servers in one terminal.

### Option 3: Run Manually (Separate Terminals)

**Terminal 1 - Backend:**

```bash
# Option A: With auto-reload (recommended for development)
npm run api:dev

# Option B: Without auto-reload
npm run api
```

**Terminal 2 - Frontend:**

```bash
npm run frontend
```

## Accessing the Application

Once both servers are running:

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## Testing the Connection

### Test with npm script:

```bash
# Make sure backend is running first!
npm run test:connection
```

### Test with curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all listings
curl http://localhost:5000/api/listings

# Get all sellers
curl http://localhost:5000/api/sellers

# Market statistics
curl http://localhost:5000/api/stats/market
```

### Test in Browser:

1. Open http://localhost:3000
2. Navigate through the pages:
   - Home - Landing page
   - Marketplace - Browse energy listings
   - Dashboard - View statistics
   - Register Seller - Become a seller
   - Create Listing - List energy for sale
   - My Listings - Manage your listings
   - Purchase History - View your purchases

## Available npm Scripts

### Backend

```bash
npm run build           # Compile TypeScript to JavaScript
npm start               # Run compiled JavaScript
npm run dev             # Run TypeScript with ts-node
npm run api             # Start API server
npm run api:dev         # Start API server with auto-reload (nodemon)
npm run check-setup     # Verify SDK setup
npm run test:connection # Test backend API connection
```

### Frontend

```bash
npm run frontend         # Start frontend dev server
npm run frontend:build   # Build frontend for production
npm run frontend:install # Install frontend dependencies
```

### Full Stack

```bash
npm run start:all        # Run both servers concurrently
```

### Examples (Blockchain Operations)

```bash
npm run register-seller  # Example: Register a seller
npm run create-listing   # Example: Create energy listing
npm run purchase-energy  # Example: Purchase energy
```

## Project Structure

```
Blockchain-Backed Energy Trading/
├── src/                          # Backend source code
│   ├── api/
│   │   └── server.ts            # Express REST API server
│   ├── config/
│   │   └── client.ts            # Story SDK configuration
│   ├── contracts/
│   │   ├── EnergyToken.ts       # Energy tokenization
│   │   └── EnergyMarket.ts      # Marketplace logic
│   ├── services/
│   │   ├── SellerService.ts     # Seller management
│   │   └── TradingService.ts    # Trading operations
│   ├── types/                   # TypeScript types
│   ├── examples/                # Usage examples
│   └── index.ts                 # Entry point
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── pages/               # All UI pages
│   │   ├── services/
│   │   │   └── api.ts           # API client
│   │   ├── App.tsx              # Main React app
│   │   └── main.tsx             # Entry point
│   └── package.json
├── dist/                         # Compiled JavaScript
├── scripts/
│   └── test-connection.ts       # Connection test script
├── .env                          # Backend environment variables
├── package.json                  # Backend dependencies
├── start-all.bat                 # Windows batch file to start both servers
└── CONNECTION_GUIDE.md           # Detailed API documentation
```

## Troubleshooting

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use PowerShell
Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

### Backend Won't Start

1. Check `.env` file exists with valid values
2. Ensure dependencies are installed: `npm install`
3. Build the backend: `npm run build`
4. Check for TypeScript errors

### Frontend Can't Connect

1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check `frontend/.env` has: `VITE_API_URL=http://localhost:5000/api`
3. Restart frontend dev server after changing `.env`
4. Check browser console for errors

### CORS Errors

- Backend has CORS enabled by default
- Ensure you're accessing from `http://localhost:3000`
- Check network tab in browser DevTools

### Environment Variables Not Loading

**Backend:**
- Ensure `.env` is in project root
- Restart backend server after changes
- Verify `dotenv` is installed

**Frontend:**
- Ensure `frontend/.env` exists
- Environment variables must start with `VITE_`
- Restart Vite dev server after changes

## Next Steps

1. ✅ **Start the servers** using one of the methods above
2. ✅ **Test the connection** using the test script or curl
3. ✅ **Open the frontend** at http://localhost:3000
4. 📝 **Integrate API calls** - Replace mock data in frontend pages
5. 🎨 **Customize the UI** - Modify React components
6. 🔧 **Add features** - Extend backend services and API endpoints

## Important Notes

- The `.env` file contains a **placeholder private key** for testing
- **Replace it with your actual private key** for real transactions
- Never commit `.env` files to version control
- The private key should be for a testnet wallet with Aeneid testnet ETH

## Getting Help

- **Connection Guide**: See [CONNECTION_GUIDE.md](CONNECTION_GUIDE.md) for detailed API documentation
- **Backend Services**: Check `src/services/` for service implementations
- **Frontend Pages**: Check `frontend/src/pages/` for UI components
- **Examples**: Check `src/examples/` for usage examples

## Production Deployment

For production deployment:

1. Use environment-specific `.env` files
2. Build both backend and frontend:
   ```bash
   npm run build
   npm run frontend:build
   ```
3. Serve frontend static files from `frontend/dist`
4. Run backend with `npm start` or use a process manager like PM2
5. Use a reverse proxy (nginx) to serve both
6. Enable HTTPS
7. Configure proper CORS origins
8. Use real wallet with proper security

---

Happy Building! 🚀⚡
