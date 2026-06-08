import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/?confirmed=false", req.url));
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("subscribers")
    .update({ confirmed: true, confirmation_token: null })
    .eq("confirmation_token", token);

  if (error) {
    return NextResponse.redirect(new URL("/?confirmed=false", req.url));
  }

  return NextResponse.redirect(new URL("/?confirmed=true", req.url));
}
