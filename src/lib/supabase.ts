import { createClient } from "@supabase/supabase-js";

// Anon (publishable) anahtar herkese açık olacak şekilde tasarlanmıştır;
// veri güvenliği Supabase tarafındaki RLS politikalarıyla sağlanır.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://smskjdvhbwbeeuvulwuj.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_ZZ1vsaMMy1NjXwGKmQf1jQ_C_06B5Em";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** GitHub Pages alt dizininde de çalışan public dosya yolu */
export function medyaYolu(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const kok = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${kok}/${url.replace(/^\//, "")}`;
}
