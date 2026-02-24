import { createClient } from '@supabase/supabase-js';

// Hardcoded fallbacks from provided configuration to ensure functionality if env injection fails
const FALLBACK_URL = 'https://dyrxksfiqlgypkebfidr.supabase.co';
const FALLBACK_KEY = 'sb_publishable_qtiv_Jtmmy5FHRBojdw1JQ_lKWiotge';

// Safely retrieve environment variables checking both Vite (import.meta.env) and Node/Process (process.env) contexts
const getEnvVar = (key: string, fallback: string): string => {
  // Check import.meta.env (Vite)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {
    // Ignore errors
  }

  // Check process.env
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      // @ts-ignore
      return process.env[key];
    }
  } catch (e) {
    // Ignore errors
  }

  return fallback;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', FALLBACK_URL);
const supabaseKey = getEnvVar('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY', FALLBACK_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);