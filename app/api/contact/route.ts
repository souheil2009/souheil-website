import { NextResponse } from "next/server";
import { resolveMx, resolve } from "node:dns/promises";

export async function POST(request: Request) {
  try {
    const data = await request.json().catch(() => ({}));
    const name = typeof data?.name === "string" ? data.name.trim() : "";
    const email = typeof data?.email === "string" ? data.email.trim() : "";
    const message = typeof data?.message === "string" ? data.message.trim() : "";
    const phone = typeof data?.phone === "string" ? data.phone.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // Domain derived from email
    const domain = email.split("@")[1] || "";
    
    // Denylist common placeholders (local parts and domains)
    {
      const local = email.split("@")[0].toLowerCase();
      const denyLocal = new Set([
        "xxx",
        "test",
        "asdf",
        "noemail",
        "dummy",
        "example",
      ]);
      const denyDomains = new Set([
        "xxx.com",
        "example.com",
        "test.com",
        "email.com",
        "domain.com",
      ]);
      if (denyLocal.has(local) || denyDomains.has(domain.toLowerCase())) {
        return NextResponse.json(
          { ok: false, error: "Placeholder email not allowed" },
          { status: 400 }
        );
      }
    }

    // Block disposable email domains (common providers)
    {
      const d = domain.toLowerCase();
      const disposableDomains = new Set([
        "mailinator.com",
        "yopmail.com",
        "10minutemail.com",
        "guerrillamail.com",
        "sharklasers.com",
        "temp-mail.org",
        "tempmail.com",
        "discard.email",
        "trashmail.com",
        "getnada.com",
        "moakt.com",
      ]);
      // match exact or subdomain (e.g., mx.yopmail.com → yopmail.com)
      const isDisposable = Array.from(disposableDomains).some((dom) => d === dom || d.endsWith(`.${dom}`));
      if (isDisposable) {
        return NextResponse.json(
          { ok: false, error: "Disposable email not allowed" },
          { status: 400 }
        );
      }
    }

    // Domain MX/A check to validate sender domain exists
    if (!domain) {
      return NextResponse.json(
        { ok: false, error: "Invalid email domain" },
        { status: 400 }
      );
    }
    try {
      const mx = await resolveMx(domain);
      if (!mx || mx.length === 0) {
        // Fallback: try A/AAAA record
        await resolve(domain);
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Unresolvable email domain" },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "souheil2009@gmail.com";
    const KICKBOX_API_KEY = process.env.KICKBOX_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Kickbox verification (optional but recommended)
    if (KICKBOX_API_KEY) {
      try {
        const kbResp = await fetch(
          `https://api.kickbox.com/v2/verify?email=${encodeURIComponent(email)}&apikey=${encodeURIComponent(KICKBOX_API_KEY)}`,
          { method: "GET" }
        );
        const kbJson: any = await kbResp.json().catch(() => ({}));
        // Accept only clearly deliverable; reject undeliverable/invalid/disposable/unknown/accept-all/role
        const result = (kbJson?.result || "").toString();
        const disposable = !!kbJson?.disposable;
        const acceptAll = !!kbJson?.accept_all;
        const role = !!kbJson?.role;
        const didYouMean = (kbJson?.did_you_mean || "").toString();

        if (result !== "deliverable") {
          return NextResponse.json(
            { ok: false, error: didYouMean ? `Email not deliverable. Did you mean ${didYouMean}?` : "Email address is not deliverable" },
            { status: 400 }
          );
        }
        if (disposable) {
          return NextResponse.json(
            { ok: false, error: "Disposable email not allowed" },
            { status: 400 }
          );
        }
        if (acceptAll) {
          return NextResponse.json(
            { ok: false, error: "This domain accepts all addresses. Please use a personal mailbox." },
            { status: 400 }
          );
        }
        if (role) {
          return NextResponse.json(
            { ok: false, error: "Role-based addresses are not allowed." },
            { status: 400 }
          );
        }
      } catch {
        // If Kickbox fails, keep going with existing checks (do not block on network error)
      }
    }

    const subject = `New message from ${name}`;
    const html = `
      <div>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Souheil Portfolio <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    const json = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return NextResponse.json(
        { ok: false, error: json?.message || "Failed to send" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("debug") === "1") {
      return NextResponse.json({ hasKey: !!process.env.RESEND_API_KEY });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
