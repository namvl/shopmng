import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // load from .env.local
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;// load from .env.local

export const supabase = createClient(supabaseUrl, supabaseKey);