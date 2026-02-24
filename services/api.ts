import { BookingRequest, QuoteRequest, Product } from "../types";
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS, MOCK_LOCATIONS } from "./mockData";
import { supabase } from "./supabase";

// Simulated delay to mimic network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Booking related endpoints
  bookings: {
    create: async (
      data: BookingRequest,
    ): Promise<{ success: boolean; id?: string; message: string }> => {
      try {
        console.log("[API] Creating Booking:", JSON.stringify(data, null, 2));

        const { data: result, error } = await supabase
          .from("appointments")
          .insert([
            {
              customer_name: data.name,
              customer_phone: data.phone,
              service_type: data.serviceType,
              appointment_date: data.preferredDate,
              vehicle_model: data.vehicle,
              status: "pending",
            },
          ])
          .select()
          .single();

        if (error) throw error;

        return {
          success: true,
          id: result.id,
          message: "Booking confirmed successfully",
        };
      } catch (err) {
        console.error("Supabase booking creation error:", err);
        return {
          success: false,
          message:
            err instanceof Error ? err.message : "Unknown error occurred",
        };
      }
    },
  },

  // Quote related endpoints
  quotes: {
    create: async (
      data: QuoteRequest,
    ): Promise<{ success: boolean; id: string; message: string }> => {
      try {
        console.log(
          "[API] Creating Quote Request:",
          JSON.stringify(data, null, 2),
        );

        // Map packageType to the specific service names requested by the user
        const serviceTypeMap: Record<string, string> = {
          Premium: "Premium Package Quote",
          Standard: "Standard Package Quote",
          Fleet: "Fleet Package Quote",
        };

        const serviceType =
          serviceTypeMap[data.packageType] ||
          `${data.packageType} Package Quote`;

        // Combine vehicle and notes if notes exist for cleaner DB record
        const vehicleInfo = data.notes
          ? `${data.vehicle} | Notes: ${data.notes}`
          : data.vehicle;

        const { data: result, error } = await supabase
          .from("appointments")
          .insert([
            {
              customer_name: data.name,
              customer_phone: data.phone,
              service_type: serviceType,
              appointment_date: new Date().toISOString().split("T")[0],
              vehicle_model: vehicleInfo,
              status: "pending",
            },
          ])
          .select()
          .single();

        if (error) throw error;

        return {
          success: true,
          id: result.id.toString(),
          message: "Quote request received successfully",
        };
      } catch (err) {
        console.error("Supabase quote creation error:", err);
        return {
          success: false,
          id: `QTE-ERR-${Date.now()}`,
          message:
            err instanceof Error ? err.message : "Unknown error occurred",
        };
      }
    },
  },

  // Categories endpoint
  categories: {
    list: async (): Promise<string[]> => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("name")
          .order("name");

        if (error) {
          console.error("Supabase categories fetch error:", error);
          throw error;
        }

        return data?.map((c: any) => c.name) || [];
      } catch (err) {
        console.warn("Failed to fetch categories:", err);
        return ["Lubricants", "Filters", "Additives & Fluids", "Parts"];
      }
    },
  },

  // Catalogue/Products endpoints
  products: {
    list: async (): Promise<Product[]> => {
      try {
        // Fetch products with related category, brand, and inventory information
        const { data, error } = await supabase.from("products").select(`
            id,
            name,
            image_url,
            specification,
            categories ( name ),
            brands ( name, image_url ),
            inventory ( selling_price )
          `);

        if (error) {
          console.error("Supabase fetch error:", error);
          throw error;
        }

        if (!data) return [];

        // Deduplicate: a product can appear with multiple inventory rows (one per location)
        // Use a Map keyed by product ID to collect unique products with the minimum selling price
        const productMap = new Map<string, Product>();

        for (const item of data as any[]) {
          const productId = item.id.toString();

          // Get the minimum selling price across all inventory locations
          const prices = (item.inventory || [])
            .map((inv: any) => parseFloat(inv.selling_price))
            .filter((p: number) => !isNaN(p) && p > 0);
          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

          // Only add or update if we haven't seen this product, or if we find a lower price
          if (!productMap.has(productId)) {
            // Use brand image as fallback if product has no image
            const productImage = item.image_url || item.brands?.image_url || "";

            productMap.set(productId, {
              id: productId,
              name: item.name,
              brand: item.brands?.name || "Generic",
              price: minPrice,
              category: item.categories?.name || "Uncategorized",
              specification: item.specification || undefined,
              viscosity: item.name.match(/\d+W-\d+/)?.[0] || undefined,
              image: productImage,
              rating: 4.8,
              reviews: Math.floor(Math.random() * 150) + 20,
            });
          }
        }

        return Array.from(productMap.values());
      } catch (err) {
        console.warn("Falling back to mock data due to API error:", err);
        return MOCK_PRODUCTS;
      }
    },
    get: async (id: string): Promise<Product | undefined> => {
      const products = await api.products.list();
      return products.find((p) => p.id === id);
    },
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
    },
  },
};
