tsx
import { supabase } from '@/lib/supabase';

export default async function Dashboard() {
  const { data } = await supabase 
    .from('queries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div>
      <h1>LIVE ACTIVITY</h1>
      {data?.map(query => (
        <div key={query.id}>
          [{query.agent}] {query.text}
        </div>
      ))}
    </div>
  );
}