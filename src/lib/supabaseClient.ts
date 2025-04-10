import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_SUPABASE_URL
const supabasekey = process.env.NEXT_SUPABASE_KEY

export const supabase = createClient(supabaseUrl as string, supabasekey as string)