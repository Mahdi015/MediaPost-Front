import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  "https://vgwhvsgnevpmuolydzce.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnd2h2c2duZXZwbXVvbHlkemNlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MjU5NTc0MCwiZXhwIjoxOTc4MTcxNzQwfQ.ZNqGsQEoEHm0CkpbWQUFaldjlrHyuAgMIFvPeMnyHss"
);
