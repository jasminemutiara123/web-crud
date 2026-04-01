import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eskadediujnthletgout.supabase.co'
const supabaseKey = 'sb_publishable_qRrOzfMpAi8tN0bdGUAcHg_V3TcBiva'

export const supabase = createClient(supabaseUrl, supabaseKey)