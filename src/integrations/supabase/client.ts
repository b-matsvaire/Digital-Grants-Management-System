
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = "https://glvdbwcvmkcjagbqrbxh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdmRid2N2bWtjamFnYnFyYnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxOTczMTgsImV4cCI6MjA1OTc3MzMxOH0.ZmyN55haF8rV_FXUB6a0pQy0oMsyCVtfrxS0PvDFyuk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
