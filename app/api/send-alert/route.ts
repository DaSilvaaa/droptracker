import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";
import type { Drop, Subscriber } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { dropId } = await req.json();
    if (!dropId) return NextResponse.json({ error: "dropId required" }, { status: 400 });

    const supabase = createServiceClient();

    const { data: drop } = await supabase
      .from("drops")
      .select("*, brands(name, slug, logo_emoji)")
      .eq("id", dropId)
      .single();

    if (!drop) return NextResponse.json({ error: "Drop not found" }, { status: 404 });

    const typedDrop = drop as Drop & { brands: { name: string; slug: string; logo_emoji: string } };

    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("email")
      .eq("confirmed", true)
      .contains("brands", [typedDrop.brands.slug]);

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ sent: 0 });
    }

    const emails = (subscribers as Pick<Subscriber, "email">[]).map((s) => s.email);
    const brandUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/brands/${typedDrop.brands.slug}`;

    let sent = 0;
    for (const email of emails) {
      await resend.emails.send({
        from: "DropTracker <alertas@droptracker.com>",
        to: email,
        subject: `DROP PUBLICADO — ${typedDrop.brands.name}`,
        html: `
          <div style="background:#080808;color:#fafafa;font-family:'Space Grotesk',sans-serif;padding:40px;max-width:480px;margin:0 auto;">
            <p style="color:#e8ff00;font-size:20px;font-weight:800;margin:0 0 24px;">DROP//TRACKER</p>
            <h1 style="font-size:28px;font-weight:800;margin:0 0 12px;">${typedDrop.brands.logo_emoji} ${typedDrop.brands.name}</h1>
            <p style="color:#a1a1aa;margin:0 0 24px;">${typedDrop.title}</p>
            ${typedDrop.discount_range ? `<p style="font-size:36px;font-weight:800;color:#e8ff00;font-family:monospace;margin:0 0 24px;">${typedDrop.discount_range} OFF</p>` : ""}
            <a href="${brandUrl}" style="display:inline-block;background:#e8ff00;color:#080808;font-weight:800;padding:14px 28px;text-decoration:none;font-size:13px;letter-spacing:0.1em;">VER AGORA →</a>
          </div>
        `,
      });
      sent++;
    }

    return NextResponse.json({ sent });
  } catch (err) {
    console.error("[send-alert]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
