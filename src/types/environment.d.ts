export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_SUPABASE_URL: string;
      VUE_APP_SUPABASE_ANON_KEY: string;
    }
  }
}
