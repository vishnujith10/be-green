import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function test() {
  const { data, error } = await supabase.from('products').select('*')
  console.log('Error:', error)
  console.log('Data count:', data?.length)
  console.log('Sample:', data?.[0])
}
test()
