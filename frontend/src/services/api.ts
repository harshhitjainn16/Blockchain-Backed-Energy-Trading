const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class EnergyTradingAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data: ApiResponse<T> = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'API request failed');
      }

      return data.data as T;
    } catch (error: any) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // ===== HEALTH CHECK =====

  async healthCheck() {
    return this.request<{ status: string; message: string; timestamp: string }>('/health', {
      method: 'GET',
    });
  }

  // ===== SELLER METHODS =====

  async registerSeller(data: {
    name: string;
    location: string;
    solarCapacity: number;
    certifications?: string[];
    description?: string;
  }) {
    return this.request('/sellers/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAllSellers() {
    return this.request('/sellers', {
      method: 'GET',
    });
  }

  async getSellerByAddress(address: string) {
    return this.request(`/sellers/${address}`, {
      method: 'GET',
    });
  }

  async getSellerStats(address: string) {
    return this.request(`/sellers/${address}/stats`, {
      method: 'GET',
    });
  }

  // ===== LISTING METHODS =====

  async createListing(data: {
    energyAmount: number;
    pricePerKwh: string;
    energySource: string;
    location: string;
    productionDate: string;
    certificateUri?: string;
  }) {
    return this.request('/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAllListings() {
    return this.request('/listings', {
      method: 'GET',
    });
  }

  async getSellerListings(address: string) {
    return this.request(`/sellers/${address}/listings`, {
      method: 'GET',
    });
  }

  async cancelListing(listingId: string, sellerAddress: string) {
    return this.request(`/listings/${listingId}`, {
      method: 'DELETE',
      body: JSON.stringify({ sellerAddress }),
    });
  }

  // ===== TRADING METHODS =====

  async purchaseEnergy(data: {
    listingId: string;
    energyAmount: number;
    buyerAddress: string;
  }) {
    return this.request('/purchase', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPurchaseHistory(address: string) {
    return this.request(`/purchases/${address}`, {
      method: 'GET',
    });
  }

  // ===== STATISTICS METHODS =====

  async getMarketStatistics() {
    return this.request('/stats/market', {
      method: 'GET',
    });
  }
}

export const api = new EnergyTradingAPI();
export default api;
