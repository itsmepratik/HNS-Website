import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product } from '../types';

export const useCategories = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.categories.list();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

export const useProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.products.list();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export const useBlogPosts = () => {
  // Using direct api call pattern similar to products
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
       const res = await api.content.getBlogPosts();
       setData(res);
       setLoading(false);
    };
    fetchData();
  }, []);
  
  return { data, loading };
};

export const useLocations = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
       const res = await api.content.getLocations();
       setData(res);
       setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading };
};