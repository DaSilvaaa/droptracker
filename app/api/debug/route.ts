import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const envCheck = {
    url_set: !!url,
    url_value: url?.substring(0, 30) + "...",
    key_set: !!key,
    key_prefix: key?.substring(0, 20) + "...",
  };

  try {
    const { data, error } = await supabase.from("brands").select("slug").limit(3);
    return NextResponse.json({ env: envCheck, brands: data, error: error?.message ?? null });
  } catch (e: unknown) {
    return NextResponse.json({ env: envCheck, caught: String(e) });
  }
}
