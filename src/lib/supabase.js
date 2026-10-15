import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://iptbexldjbgiavlmqhgh.supabase.co/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdGJleGxkamJnaWF2bG1xaGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5Njc3MTQsImV4cCI6MjEwNzU0MzcxNH0.pgyGBT_vew06fR0nk5DoVqKjKjseiyYM13KIBPXx5H8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);