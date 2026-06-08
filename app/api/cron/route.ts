import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";
import type { Drop, Subscriber } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  const dateStr = targetDate.toISOString().split("T")[0];

  const { data: drops } = await supabase
    .from("drops")
    .select("*, brands(name, slug, logo_emoji)")
    .eq("status", "confirmed")
    .eq("predicted_date", dateStr);

  if (!drops || drops.length === 0) {
    console.log(`[cron] No confirmed drops for ${dateStr}`);
    return NextResponse.json({ sent: 0 });
  }

  let totalSent = 0;

  for (const drop of drops as (Drop & { brands: { name: string; slug: string; logo_emoji: string } })[]) {
    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("email")
      .eq("confirmed", true)
      .contains("brands", [drop.brands.slug]);

    if (!subscribers || subscribers.length === 0) continue;

    const emails = (subscribers as Pick<Subscriber, "email">[]).map((s) => s.email);

    const brandUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/brands/${drop.brands.slug}`;

    for (const email of emails) {
      await resend.emails.send({
        from: "DropTracker <onboarding@resend.dev>",
        to: email,
        subject: `🚨 DROP EM 48H — ${drop.brands.name}`,
        html: `
          <div style="background:#080808;color:#fafafa;font-family:'Space Grotesk',sans-serif;padding:40px;max-width:480px;margin:0 auto;">
            <p style="color:#e8ff00;font-size:20px;font-weight:800;letter-spacing:-0.5px;margin:0 0 24px;">DROP//TRACKER</p>
            <p style="color:#e8ff00;font-size:11px;font-family:monospace;letter-spacing:0.2em;margin:0 0 16px;">🚨 ALERTA ATIVO</p>
            <h1 style="font-size:32px;font-weight:800;margin:0 0 8px;line-height:1.1;">
              ${drop.brands.logo_emoji} ${drop.brands.name}
            </h1>
            <p style="font-size:16px;color:#a1a1aa;margin:0 0 24px;">${drop.title}</p>
            ${drop.discount_range ? `<p style="font-size:40px;font-weight:800;color:#e8ff00;margin:0 0 24px;font-family:monospace;">${drop.discount_range} OFF</p>` : ""}
            <p style="color:#71717a;font-size:14px;margin:0 0 32px;">
              Previsto para <strong style="color:#fafafa;">${new Date(drop.predicted_date!).toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}</strong>. Fica preparado.
            </p>
            <a href="${brandUrl}" style="display:inline-block;background:#e8ff00;color:#080808;font-weight:800;padding:14px 28px;text-decoration:none;font-size:13px;letter-spacing:0.1em;">
              VER DETALHES →
            </a>
          </div>
        `,
      });
      totalSent++;
    }

    console.log(`[cron] Sent ${emails.length} alerts for ${drop.brands.name}`);
  }

  return NextResponse.json({ sent: totalSent, drops: drops.length });
}
