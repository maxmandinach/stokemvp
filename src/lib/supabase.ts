import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lldtlysejtyvbbxmdfyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZHRseXNlanR5dmJieG1kZnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzQ3NTYsImV4cCI6MjA2MzUxMDc1Nn0.EagjF9ElGMU0i0fOxVOFKw74HODotKwFlFzJNawhk90';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-react-native',
    },
  },
}); 