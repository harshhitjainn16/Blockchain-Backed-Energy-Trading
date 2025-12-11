# Frontend-Backend Connection Guide

## 🏗️ Architecture Overview

This application uses a **separated full-stack architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
│                  Port: 3000                             │
│  - Pages: Home, Marketplace, Dashboard, etc.           │
│  - API Client: frontend/src/services/api.ts            │
└────────────────┬────────────────────────────────────────┘
                 │ HTTP REST API
                 │ (fetch requests)
┌────────────────▼────────────────────────────────────────┐
│              Backend API Server (Express)               │
│                  Port: 5000                             │
│  - REST Endpoints: /api/*                              │
│  - Server: src/api/server.ts                           │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│         Backend Services (TypeScript)                   │
│  - SellerService: Manage sellers                        │
│  - TradingService: Handle listings & purchases         │
│  - Story Protocol SDK: Blockchain integration          │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│          Story Protocol Aeneid Testnet                  │
│        RPC: https://aeneid.storyrpc.io                 │
└─────────────────────────────────────────────────────────┘
```

## 📡 API Endpoints

### Seller Endpoints

#### POST /api/sellers/register
Register a new solar household seller.

**Request:**
```json
{
  "name": "John's Solar Farm",
  "location": "California, USA",
  "capacity": "50",
  "certifications": ["Solar Cert A", "Green Energy B"]
}
```

**Response:**
```json
{
  "success": true,
  "seller": {
    "address": "0x...",
    "name": "John's Solar Farm",
    "ipAssetId": "0x...",
    "licenseTermsId": "1",
    "isActive": true
  },
  "txHash": "0x..."
}
```

#### GET /api/sellers
Get all registered sellers.

**Response:**
```json
{
  "success": true,
  "sellers": [...]
}
```

#### GET /api/sellers/:address
Get seller by wallet address.

**Response:**
```json
{
  "success": true,
  "seller": {...}
}
```

### Listing Endpoints

#### POST /api/listings/create
Create a new energy listing.

**Request:**
```json
{
  "energyAmount": "100",
  "pricePerUnit": "0.15",
  "description": "Clean solar energy from rooftop panels",
  "certificationURI": "ipfs://..."
}
```

**Response:**
```json
{
  "success": true,
  "listing": {
    "listingId": "1",
    "seller": "0x...",
    "energyAmount": "100",
    "pricePerUnit": "0.15",
    "isActive": true
  },
  "txHash": "0x..."
}
```

#### GET /api/listings
Get all active energy listings.

**Response:**
```json
{
  "success": true,
  "listings": [...]
}
```

#### GET /api/listings/:listingId
Get specific listing by ID.

**Response:**
```json
{
  "success": true,
  "listing": {...}
}
```

#### GET /api/listings/seller/:sellerAddress
Get all listings from a specific seller.

**Response:**
```json
{
  "success": true,
  "listings": [...]
}
```

### Trading Endpoints

#### POST /api/purchase
Purchase energy from a listing.

**Request:**
```json
{
  "listingId": "1",
  "buyer": "0x...",
  "amount": "50"
}
```

**Response:**
```json
{
  "success": true,
  "purchase": {
    "purchaseId": "1",
    "listingId": "1",
    "buyer": "0x...",
    "amount": "50",
    "totalPrice": "7.5",
    "timestamp": 1234567890
  },
  "txHash": "0x..."
}
```

#### GET /api/purchases/buyer/:buyerAddress
Get purchase history for a buyer.

**Response:**
```json
{
  "success": true,
  "purchases": [...]
}
```

#### GET /api/purchases/seller/:sellerAddress
Get sales history for a seller.

**Response:**
```json
{
  "success": true,
  "purchases": [...]
}
```

### Statistics Endpoints

#### GET /api/stats/market
Get overall market statistics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalSellers": 10,
    "totalListings": 25,
    "totalEnergyAvailable": "5000 kWh",
    "totalTrades": 50,
    "totalVolume": "1000 kWh"
  }
}
```

#### GET /api/stats/seller/:sellerAddress
Get statistics for a specific seller.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalListings": 5,
    "totalSales": 10,
    "totalRevenue": "150.00 ETH",
    "averagePrice": "0.15 ETH/kWh"
  }
}
```

### Health Check

#### GET /api/health
Check if the API server is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "blockchain": "Story Protocol Aeneid Testnet"
}
```

## 🔧 Setup Instructions

### 1. Environment Configuration

**Backend (.env):**
```bash
PRIVATE_KEY=your_private_key_here
RPC_URL=https://aeneid.storyrpc.io
PORT=5000
```

**Frontend (frontend/.env):**
```bash
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Build Backend

```bash
npm run build
```

## 🚀 Running the Application

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run start:all
```

This starts:
- Backend API server on `http://localhost:5000`
- Frontend dev server on `http://localhost:3000`

### Option 2: Run Servers Separately

**Terminal 1 - Backend:**
```bash
npm run api
# or for auto-reload during development:
npm run api:dev
```

**Terminal 2 - Frontend:**
```bash
npm run frontend
```

### Option 3: Production Mode

```bash
# Build backend
npm run build

# Build frontend
npm run frontend:build

# Start backend
npm start
```

## 🧪 Testing the Connection

### Method 1: Using the Test Script

```bash
npm run test:connection
```

This will test:
- ✅ Health endpoint
- ✅ Market stats
- ✅ Listings retrieval
- ✅ Sellers retrieval

### Method 2: Manual Browser Test

1. Start both servers: `npm run start:all`
2. Open browser to `http://localhost:3000`
3. Navigate to different pages
4. Check browser console for API calls
5. Check backend terminal for request logs

### Method 3: Using cURL

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test get all listings
curl http://localhost:5000/api/listings

# Test get all sellers
curl http://localhost:5000/api/sellers

# Test market stats
curl http://localhost:5000/api/stats/market
```

## 📁 Key Files

### Backend

- **src/api/server.ts** - Express API server with all endpoints
- **src/services/SellerService.ts** - Seller management logic
- **src/services/TradingService.ts** - Trading and listing logic
- **src/config/client.ts** - Story Protocol SDK configuration

### Frontend

- **frontend/src/services/api.ts** - API client for making requests to backend
- **frontend/src/App.tsx** - Main React app with routing
- **frontend/src/pages/** - All UI pages

### Testing

- **scripts/test-connection.ts** - Connection test script

## 🐛 Troubleshooting

### Backend server won't start

**Error:** `Address already in use :::5000`

**Solution:** Port 5000 is already in use. Either:
- Stop the process using port 5000
- Change the PORT in `.env` file
- Use `netstat -ano | findstr :5000` to find and kill the process

### Frontend can't connect to backend

**Error:** `Network Error` or `Failed to fetch`

**Solutions:**
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check `frontend/.env` has correct `VITE_API_URL=http://localhost:5000/api`
3. Restart frontend dev server after changing .env
4. Check browser console for CORS errors

### CORS errors in browser

**Error:** `Access-Control-Allow-Origin`

**Solution:** Backend already has CORS enabled. If still seeing errors:
- Restart the backend server
- Check that requests use `http://localhost:5000` (not IP address)
- Verify `cors` package is installed: `npm list cors`

### TypeScript compilation errors

**Error:** Various TS errors

**Solutions:**
1. Clean and rebuild: `rm -rf dist && npm run build`
2. Check TypeScript version: `npm list typescript`
3. Verify all dependencies installed: `npm install`

### Environment variables not loading

**Error:** `undefined` values from `.env`

**Solutions:**
1. Check `.env` file exists in root directory
2. Restart the server after modifying `.env`
3. Verify `dotenv` is imported at top of entry files
4. For frontend, env vars must start with `VITE_`

### Connection test fails

**Error:** `ECONNREFUSED`

**Solution:** 
```bash
# Start the backend first
npm run api

# Then in another terminal, run the test
npm run test:connection
```

## 🔄 Data Flow Example

### User Creates a Listing

1. **Frontend**: User fills form in `CreateListing` page
2. **Frontend**: `api.createListing()` sends POST to `/api/listings/create`
3. **Backend**: Express receives request at `/api/listings/create`
4. **Backend**: Validates request data
5. **Backend**: Calls `TradingService.createListing()`
6. **Service**: Interacts with Story Protocol SDK
7. **Blockchain**: Transaction sent to Aeneid testnet
8. **Service**: Returns listing data and tx hash
9. **Backend**: Sends JSON response to frontend
10. **Frontend**: Displays success message and updates UI

### User Purchases Energy

1. **Frontend**: User clicks "Purchase" in `Marketplace` page
2. **Frontend**: `api.purchaseEnergy()` sends POST to `/api/purchase`
3. **Backend**: Express receives request
4. **Backend**: Calls `TradingService.purchaseEnergy()`
5. **Service**: Verifies listing availability
6. **Service**: Processes blockchain transaction
7. **Service**: Updates listing state
8. **Backend**: Returns purchase confirmation
9. **Frontend**: Shows success and redirects to purchase history

## 📊 Monitoring

### Backend Logs

The backend server logs all requests:
```
POST /api/sellers/register 200 - 1234ms
GET /api/listings 200 - 45ms
POST /api/purchase 200 - 2345ms
```

### Frontend Network Tab

Open browser DevTools > Network to see:
- Request URLs
- Request/Response headers
- Response data
- Request timing

## 🔐 Security Notes

1. **Never commit .env files** - Use `.env.example` as template
2. **Private keys** - Keep your PRIVATE_KEY secure
3. **CORS** - Currently allows all origins for development
4. **Input validation** - Backend validates all incoming data
5. **Error handling** - Sensitive errors not exposed to frontend

## 🚀 Next Steps

1. **Integrate API calls in frontend pages** - Replace mock data with real API calls
2. **Add loading states** - Show spinners during API requests
3. **Error handling** - Display user-friendly error messages
4. **Authentication** - Add wallet connection and auth
5. **Real-time updates** - Consider WebSockets for live data
6. **Caching** - Implement frontend caching for better performance

## 📚 Additional Resources

- [Story Protocol Docs](https://docs.story.foundation/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Router](https://reactrouter.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
