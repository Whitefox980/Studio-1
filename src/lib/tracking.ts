export async function trackEvent(event: string, path: string) {
  await supabase
    .from('analytics')
    .insert([{ event, page_path: path }]);
}