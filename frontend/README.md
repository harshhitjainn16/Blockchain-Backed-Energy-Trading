# 🎨 React Frontend

This is the React frontend for the Blockchain Energy Trading Platform.

## 🚀 Quick Start

### Install Dependencies

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Main layout with header, sidebar, footer
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── Marketplace.tsx     # Browse energy listings
│   │   ├── RegisterSeller.tsx  # Register as seller
│   │   ├── CreateListing.tsx   # Create energy listing
│   │   ├── MyListings.tsx      # Manage your listings
│   │   └── PurchaseHistory.tsx # View purchase history
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## ✨ Features

### Pages
- **Home** - Hero section, features, how it works
- **Marketplace** - Browse and filter energy listings
- **Dashboard** - View stats, charts, recent activity
- **Register Seller** - Form to register as energy seller
- **Create Listing** - Form to list energy for sale
- **My Listings** - Manage your energy listings
- **Purchase History** - View all your purchases

### UI Components
- Responsive navigation
- Sidebar with quick actions
- Modern card-based design
- Form validation
- Loading states
- Success/error messages

### Styling
- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- Custom color scheme (orange/primary theme)
- Dark mode by default
- Fully responsive design

## 🔧 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🔗 Integration with Backend

The frontend is currently using mock data. To connect with the backend:

1. Import backend services:
```typescript
import { SellerService } from '../../src/services/SellerService'
import { TradingService } from '../../src/services/TradingService'
```

2. Replace mock data with actual API calls
3. Add wallet connection (see below)

## 💼 Wallet Integration

To add wallet functionality:

1. Install wagmi & viem (already in package.json)
2. Configure wagmi provider
3. Add wallet connect button
4. Use wallet address for transactions

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#f0770b',  // Change this
  }
}
```

### Pages
Add new pages in `src/pages/` and update routes in `App.tsx`

### Components
Create reusable components in `src/components/`

## 🌐 Environment Variables

Create `.env` in frontend folder:
```
VITE_API_URL=http://localhost:3001
VITE_RPC_URL=https://aeneid.storyrpc.io
```

## 📦 Dependencies

### Core
- react, react-dom - UI framework
- react-router-dom - Routing
- viem - Ethereum interactions
- @story-protocol/core-sdk - Story Protocol SDK

### UI
- lucide-react - Icons
- tailwindcss - Styling

### Dev
- vite - Build tool
- typescript - Type checking
- @vitejs/plugin-react - React support

## 🚀 Deployment

### Vercel / Netlify
```bash
npm run build
# Upload dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Add new features in `src/pages/` or `src/components/`
2. Follow TypeScript best practices
3. Use Tailwind CSS for styling
4. Test responsiveness

## 📄 License

MIT
