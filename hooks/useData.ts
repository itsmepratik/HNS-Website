
import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS, MOCK_LOCATIONS } from '../services/mockData';
import { Product } from '../types';

// Generic data fetcher hook to simulate async API calls
function useAsyncData<T>(mockData: T, delay = 500) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [mockData, delay]);

  return { data, loading, error };
}

export const useProducts = () => {
  return useAsyncData<Product[]>(MOCK_PRODUCTS);
};

export const useBlogPosts = () => {
  return useAsyncData(MOCK_BLOG_POSTS);
};

export const useLocations = () => {
  return useAsyncData(MOCK_LOCATIONS);
};
