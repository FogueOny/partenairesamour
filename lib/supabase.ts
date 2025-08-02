import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://utscyqrkxqpuzceggowa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0c2N5cXJreHFwdXpjZWdnb3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNTE0NjcsImV4cCI6MjA2OTYyNzQ2N30.2xK7yqHZVPB8ZzI878KIIZLyfB3IFUaVfgLk5Z6hlDM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type LoveMessage = {
  id: string
  recipient_name: string
  love_message: string
  sender_name?: string
  created_at: string
}