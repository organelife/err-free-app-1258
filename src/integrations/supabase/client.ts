import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://rcuxvvpagdiaslaeofdb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjdXh2dnBhZ2RpYXNsYWVvZmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjE4MDMsImV4cCI6MjA2OTc5NzgwM30.zd93PYN-5FBm6LswykCyF8Byhml1-LvDprpd2Gn3eMI'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)