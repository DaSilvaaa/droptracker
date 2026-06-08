import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email("Email inválido"),
  brands: z.array(z.string()).min(1, "Seleciona pelo menos uma marca"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Dados inválidos" },
        { status: 400 }
      );
    }

    const { email, brands } = parsed.data;
    const supabase = createServiceClient();

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, brands")
      .eq("email", email)
      .single();

    if (existing) {
      const merged = Array.from(new Set([...existing.brands, ...brands]));
      await supabase
        .from("subscribers")
        .update({ brands: merged })
        .eq("id", existing.id);

      return NextResponse.json({ success: true, updated: true });
    }

    const token = crypto.randomUUID();
    await supabase.from("subscribers").insert({
      email,
      brands,
      confirmed: false,
      confirmation_token: token,
    });

    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?token=${token}`;

    await resend.emails.send({
      from: "DropTracker <alertas@droptracker.com>",
      to: email,
      subject: "Confirma o teu email — DropTracker",
      html: `
        <div style="background:#080808;color:#fafafa;font-family:'Space Grotesk',sans-serif;padding:40px;max-width:480px;margin:0 auto;">
          <p style="color:#e8ff00;font-size:20px;font-weight:800;letter-spacing:-0.5px;margin:0 0 24px;">DROP//TRACKER</p>
          <h1 style="font-size:28px;font-weight:800;margin:0 0 12px;line-height:1.2;">Confirma o teu email.</h1>
          <p style="color:#71717a;font-size:14px;margin:0 0 32px;line-height:1.6;">
            Estás a um passo de receber alertas 48h antes de cada drop das ${brands.length} marca${brands.length !== 1 ? "s" : ""} que escolheste.
          </p>
          <a href="${confirmUrl}" style="display:inline-block;background:#e8ff00;color:#080808;font-weight:800;padding:14px 28px;text-decoration:none;font-size:13px;letter-spacing:0.1em;">
            CONFIRMAR EMAIL →
          </a>
          <p style="color:#3f3f46;font-size:11px;margin:32px 0 0;">Se não pediste isto, ignora este email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
