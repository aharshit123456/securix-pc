import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch'; // Import fetch for Node.js environment

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

const supabaseUrl = 'https://urhyatzqruojxqxyygks.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaHlhdHpxcnVvanhxeHl5Z2tzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NjQ3MTYsImV4cCI6MjA0MzA0MDcxNn0.aGM8tVX0JKKNEXnZtrTwBaG4cUduaYVwQ1oQpXkIbPA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
