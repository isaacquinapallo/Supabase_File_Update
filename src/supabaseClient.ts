import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'tus_credenciales',
  'tus_credenciales'
);
