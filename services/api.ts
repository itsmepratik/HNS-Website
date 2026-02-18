import { BookingRequest, QuoteRequest, Product } from '../types';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS, MOCK_LOCATIONS } from './mockData';
import { supabase } from './supabase';

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Booking related endpoints
  bookings: {
    create: async (data: BookingRequest): Promise<{ success: boolean; id: string; message: string }> => {
      console.log('[API] Creating Booking:', JSON.stringify(data, null, 2));
      // TODO: Replace with actual fetch:
      // const response = await fetch('/api/bookings', { method: 'POST', body: JSON.stringify(data) });
      await delay(1500);
      
      // Simulate success
      return { 
        success: true, 
        id: `BKG-${Date.now()}`,
        message: 'Booking confirmed successfully' 
      };
    }
  },

  // Quote related endpoints
  quotes: {
    create: async (data: QuoteRequest): Promise<{ success: boolean; id: string; message: string }> => {
      console.log('[API] Creating Quote:', JSON.stringify(data, null, 2));
      // TODO: Replace with actual fetch:
      // const response = await fetch('/api/quotes', { method: 'POST', body: JSON.stringify(data) });
      await delay(1500);

      return {
        success: true,
        id: `QTE-${Date.now()}`,
        message: 'Quote request received'
      };
    }
  },

  // Catalogue/Products endpoints
  products: {
    list: async (): Promise<Product[]> => {
      try {
        // Fetch products with related category, brand, and inventory information
        const { data, error } = await supabase
          .from('product')
          .select(`
            id,
            name,
            image_url,
            category:category(name),
            brand:brands(name),
            inventory(selling_price)
          `);

        if (error) {
          console.error('Supabase fetch error:', error);
          throw error;
        }

        if (!data) return [];

        // Map Supabase response to Product interface
        return data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          brand: item.brand?.name || 'Generic',
          price: item.inventory?.[0]?.selling_price || 0,
          category: (item.category?.name as any) || 'Oil',
          // Extract viscosity from name if present (e.g., 5W-30) as it's not currently in schema
          viscosity: item.name.match(/\d+W-\d+/)?.[0] || 'Standard',
          image: item.image_url,
          rating: 4.8, // Placeholder
          reviews: Math.floor(Math.random() * 150) + 20 // Placeholder
        }));
      } catch (err) {
        console.warn('Falling back to mock data due to API error:', err);
        return MOCK_PRODUCTS;
      }
    },
    get: async (id: string): Promise<Product | undefined> => {
      const products = await api.products.list();
      return products.find(p => p.id === id);
    }
  },

  // Content endpoints (Blog, Locations)
  content: {
    getBlogPosts: async () => {
      await delay(600);
      return MOCK_BLOG_POSTS;
    },
    getLocations: async () => {
      await delay(400);
      return MOCK_LOCATIONS;
    }
  }
};