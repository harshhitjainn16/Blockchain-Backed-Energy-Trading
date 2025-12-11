import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testConnection() {
  console.log('🔌 Testing Backend API Connection...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Market Stats
    console.log('2️⃣ Testing Market Stats Endpoint...');
    const statsResponse = await axios.get(`${API_URL}/stats/market`);
    console.log('✅ Market Stats:', statsResponse.data);
    console.log('');

    // Test 3: Get All Listings
    console.log('3️⃣ Testing Get All Listings...');
    const listingsResponse = await axios.get(`${API_URL}/listings`);
    console.log('✅ Listings Count:', listingsResponse.data.listings?.length || 0);
    console.log('');

    // Test 4: Get All Sellers
    console.log('4️⃣ Testing Get All Sellers...');
    const sellersResponse = await axios.get(`${API_URL}/sellers`);
    console.log('✅ Sellers Count:', sellersResponse.data.sellers?.length || 0);
    console.log('');

    console.log('✨ All API tests passed! Backend is connected and responding.\n');
    
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection Failed: Backend server is not running!');
      console.log('\n💡 Start the backend server with: npm run api\n');
    } else {
      console.error('❌ Test Failed:', error.message);
      if (error.response) {
        console.log('Response Status:', error.response.status);
        console.log('Response Data:', error.response.data);
      }
    }
  }
}

testConnection();
