import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.stackmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_SECURE = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) === 465 : true;
const SMTP_USER = process.env.SMTP_USER || 'hello@mathrulabs.com';
const SMTP_PASS = process.env.SMTP_PASS; // Strictly from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mathrulabs@gmail.com';
const WHATSAPP_PHONE = '919704506779';
const BRAND_ICON_URL = 'https://mathrulabs.com/brand/mathru-icon-3d-clean.png';
const FOUNDER_NAME = 'Aravind Raja';
const FOUNDER_TITLE = 'Founder & Engineering Lead';

// ── In-Memory Rate Limiting (Token Bucket / Sliding Window) ───────────────────
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 inquiries per IP per minute
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Periodic cleanup if map grows too large
  if (ipRateLimitMap.size > 1000) {
    for (const [key, val] of ipRateLimitMap.entries()) {
      if (val.resetAt < now) {
        ipRateLimitMap.delete(key);
      }
    }
  }

  const record = ipRateLimitMap.get(ip);
  if (!record || record.resetAt < now) {
    ipRateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// ── Security Helper: HTML Entity Escaping (Prevents Stored Email XSS / Injection) ─
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Security Helper: PII Masking for DPDP Act 2023 & GDPR Compliance ────────
function maskPii(str: string | null | undefined, visibleChars = 2): string {
  if (!str) return 'N/A';
  const trimmed = str.trim();
  if (trimmed.length <= visibleChars * 2) return '***';
  return `${trimmed.slice(0, visibleChars)}****${trimmed.slice(-visibleChars)}`;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Rate Limit Check (Mitigates DoS / Flood Attacks)
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded
      ? forwarded.split(',')[0].trim()
      : (request.headers.get('x-real-ip') || 'unknown-ip');

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, business, phone, message, website } = body;

    // 2. Server-side Honeypot Check (Silently drop automated spam bots)
    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Inquiry processed successfully.',
        referenceId: `ML-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        adminEmailSent: true,
        clientEmailSent: false,
      });
    }

    // 3. Strict Input Type & Length Validation
    if (
      !name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100 ||
      !business || typeof business !== 'string' || business.trim().length === 0 || business.length > 100 ||
      !phone || typeof phone !== 'string' || phone.trim().length === 0 || phone.length > 30 ||
      !message || typeof message !== 'string' || message.trim().length === 0 || message.length > 3000
    ) {
      return NextResponse.json(
        { error: 'Invalid or oversized input provided. Name, business, phone, and requirements are required.' },
        { status: 400 }
      );
    }

    // 4. Strict Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const clientEmail = (email && typeof email === 'string' && email.length <= 120 && emailRegex.test(email.trim()))
      ? email.trim()
      : null;

    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(0, 15);
    const referenceId = `ML-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // 5. Sanitize all dynamic inputs before HTML interpolation
    const safeName = escapeHtml(name.trim());
    const safeBusiness = escapeHtml(business.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeMessage = escapeHtml(message.trim());
    const safeEmail = clientEmail ? escapeHtml(clientEmail) : null;

    // Extract initials for avatar safely
    const nameParts = safeName.split(/\s+/);
    const initials = nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : safeName.slice(0, 2).toUpperCase();

    // 6. Verify SMTP Secrets Configuration
    if (!SMTP_PASS) {
      console.error('[Contact API] SMTP_PASS environment variable is missing.');
      return NextResponse.json(
        { error: 'Email service currently unavailable. Please connect with us directly on WhatsApp.' },
        { status: 503 }
      );
    }

    // 7. Configure SMTP Transporter with Strict TLS Enforcement
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: true, // Enforce strict TLS certificate verification
      },
    });

    let adminEmailSent = false;
    let clientEmailSent = false;

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. ADMIN LEAD NOTIFICATION (Delivered to mathrulabs@gmail.com)
    // ─────────────────────────────────────────────────────────────────────────────
    const adminSubject = `New Lead · ${referenceId} · ${safeName} — ${safeBusiness}`;
    const adminHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Lead · ${referenceId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #18181b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px;">

          <!-- Brand Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img src="${BRAND_ICON_URL}" alt="Mathru Labs" width="44" height="44" style="display: block; border-radius: 12px;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);">

                <!-- Accent Line -->
                <tr>
                  <td style="background: linear-gradient(90deg, #0066FF 0%, #00D26A 50%, #FF6B00 100%); height: 3px; line-height: 3px; font-size: 1px;">&nbsp;</td>
                </tr>

                <!-- Card Body -->
                <tr>
                  <td style="padding: 40px 40px 36px 40px;">

                    <!-- Title & Priority Badge -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                      <tr>
                        <td>
                          <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #18181b; letter-spacing: -0.3px;">
                            New inquiry from ${safeName}
                          </h1>
                          <p style="margin: 0; font-size: 14px; color: #71717a; line-height: 1.5;">
                            ${safeBusiness} · ${timestamp}
                          </p>
                        </td>
                        <td width="90" align="right" valign="top">
                          <span style="display: inline-block; padding: 4px 10px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 11px; font-weight: 700; color: #166534; letter-spacing: 0.3px;">NEW LEAD</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Client Profile -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #0066FF; text-align: center; line-height: 44px; font-size: 16px; font-weight: 700; color: #ffffff;">
                            ${initials}
                          </div>
                        </td>
                        <td style="padding-left: 14px;" valign="middle">
                          <div style="font-size: 16px; font-weight: 700; color: #18181b; line-height: 1.3;">
                            ${safeName}
                          </div>
                          <div style="font-size: 13px; color: #71717a; margin-top: 2px;">
                            ${safeBusiness}${safeEmail ? ` · ${safeEmail}` : ''}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Data Table -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5; width: 120px;">Email</td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">
                          ${safeEmail ? `<a href="mailto:${encodeURIComponent(clientEmail!)}" style="color: #0066FF; text-decoration: none;">${safeEmail}</a>` : '<span style="color: #a1a1aa;">Not provided</span>'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Phone</td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">
                          <a href="tel:${cleanPhone}" style="color: #18181b; text-decoration: none;">${safePhone}</a>
                          &nbsp;&nbsp;
                          <a href="https://wa.me/${cleanPhone}" style="color: #0066FF; font-size: 12px; text-decoration: none;">WhatsApp →</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Reference</td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; font-family: 'SF Mono', 'Fira Code', monospace; border-bottom: 1px solid #f4f4f5;">${referenceId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Received</td>
                        <td style="padding: 12px 16px; font-size: 13px; color: #18181b; border-bottom: 1px solid #f4f4f5;">${timestamp}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a;">Source</td>
                        <td style="padding: 12px 16px; font-size: 13px; color: #18181b;">mathrulabs.com — Contact Form</td>
                      </tr>
                    </table>

                    <!-- Requirements -->
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">Client Requirements</div>
                      <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-left: 3px solid #0066FF; border-radius: 8px; padding: 16px 18px; font-size: 14px; line-height: 1.7; color: #27272a; white-space: pre-wrap;">${safeMessage}</div>
                    </div>

                    <!-- SLA & Action Protocol -->
                    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px;">
                      <div style="font-size: 13px; font-weight: 700; color: #1e40af; margin-bottom: 6px;">
                        🎯 Rapid Response & Lead Protocol:
                      </div>
                      <div style="font-size: 12px; color: #1e3a8a; line-height: 1.6;">
                        1. <strong>Target Contact Window:</strong> Within 2 hours via WhatsApp.<br />
                        2. <strong>Reference Industry:</strong> Review <em>${safeBusiness}</em> workflows on <a href="https://mathrulabs.com/#industries" style="color: #1d4ed8; text-decoration: underline;">mathrulabs.com/#industries</a>.<br />
                        3. <strong>Primary Offer:</strong> 2-week live working pilot on client VPC or local premise.<br />
                        4. <strong>Data Sovereignty Reassurance:</strong> Zero third-party training, 100% private data isolation.
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name.trim())}!%20This%20is%20${encodeURIComponent(FOUNDER_NAME)}%20from%20Mathru%20Labs.%20Thank%20you%20for%20your%20inquiry%20(Ref:%20${referenceId}).%20I'd%20love%20to%20discuss%20your%20requirements%20for%20${encodeURIComponent(business.trim())}."
                             style="display: inline-block; background-color: #18181b; color: #ffffff; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
                            Reply on WhatsApp
                          </a>
                          ${clientEmail ? `
                          <a href="mailto:${encodeURIComponent(clientEmail)}?subject=Re:%20Your%20Inquiry%20—%20Mathru%20Labs%20(${referenceId})"
                             style="display: inline-block; background-color: #ffffff; color: #18181b; font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 8px; text-decoration: none; border: 1px solid #d4d4d8;">
                            Reply via Email
                          </a>` : ''}
                          <a href="tel:${cleanPhone}"
                             style="display: inline-block; background-color: #ffffff; color: #18181b; font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 8px; text-decoration: none; border: 1px solid #d4d4d8; margin-left: 8px;">
                            Call Direct
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0 0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
                Lead notification · Mathru Labs · ${new Date().getFullYear()}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    try {
      await transporter.sendMail({
        from: `Mathru Labs Leads <${SMTP_USER}>`,
        to: ADMIN_EMAIL,
        replyTo: clientEmail ? `${safeName} <${clientEmail}>` : SMTP_USER,
        subject: adminSubject,
        html: adminHtml,
        text: `New Lead: ${name}\nIndustry: ${business}\nPhone: ${phone}\nEmail: ${clientEmail || 'N/A'}\nTracking Code: ${referenceId}\n\nRequirements:\n${message}`,
      });
      adminEmailSent = true;
    } catch (err) {
      console.error('[Contact API] Failed to send admin email:', err);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. CLIENT CONFIRMATION EMAIL (Delivered to client's email)
    // ─────────────────────────────────────────────────────────────────────────────
    if (clientEmail) {
      const clientSubject = `Your inquiry has been received — ${referenceId}`;
      const clientHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inquiry Received — Mathru Labs</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; color: #18181b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px;">

          <!-- Brand Logo -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <img src="${BRAND_ICON_URL}" alt="Mathru Labs" width="44" height="44" style="display: block; border-radius: 12px;" />
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);">

                <!-- Accent Line -->
                <tr>
                  <td style="background: linear-gradient(90deg, #0066FF 0%, #00D26A 50%, #FF6B00 100%); height: 3px; line-height: 3px; font-size: 1px;">&nbsp;</td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 44px 40px 40px 40px;">

                    <!-- Status Badge -->
                    <div style="margin-bottom: 20px;">
                      <span style="display: inline-block; padding: 5px 12px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 11px; font-weight: 700; color: #166534; letter-spacing: 0.3px;">INQUIRY CONFIRMED</span>
                    </div>

                    <!-- Greeting -->
                    <h1 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 700; color: #18181b; letter-spacing: -0.4px; line-height: 1.3;">
                      Hello ${safeName},
                    </h1>

                    <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.75; color: #3f3f46;">
                      Thank you for reaching out to <strong style="color: #18181b;">Mathru Labs</strong>. We've received your inquiry about <strong style="color: #18181b;">${safeBusiness}</strong> and a dedicated solution architect has been assigned to review your requirements.
                    </p>

                    <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.75; color: #52525b;">
                      We build custom AI tools, enterprise CRMs, workflow automation systems, and full-stack software — purpose-engineered around your specific business operations to eliminate bottlenecks, reduce operating hours, and scale without expanding headcount.
                    </p>

                    <!-- Divider -->
                    <div style="height: 1px; background-color: #e4e4e7; margin-bottom: 28px;"></div>

                    <!-- Inquiry Summary -->
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px;">Your Inquiry Details</div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden;">
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5; width: 130px;">Reference ID</td>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; font-family: 'SF Mono', 'Fira Code', monospace; border-bottom: 1px solid #f4f4f5;">${referenceId}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Name</td>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">${safeName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Industry</td>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">${safeBusiness}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Phone</td>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">${safePhone}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Submitted On</td>
                          <td style="padding: 12px 16px; font-size: 13px; color: #18181b; border-bottom: 1px solid #f4f4f5;">${timestamp}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; vertical-align: top;">Requirements</td>
                          <td style="padding: 12px 16px; font-size: 13px; line-height: 1.65; color: #3f3f46; font-style: italic;">"${safeMessage}"</td>
                        </tr>
                      </table>
                    </div>

                    <!-- What Happens Next -->
                    <div style="margin-bottom: 32px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 18px;">Your 3-Step Pilot Onboarding Roadmap</div>

                      <!-- Step 1 -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">1</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 3px;">Workflow & Bottleneck Deconstruction (Within 12 Hours)</div>
                            <div style="font-size: 13px; line-height: 1.6; color: #71717a;">Our engineering team analyzes your operational workflow and requirement specifications to determine where AI agents, automation, and custom tooling will yield the greatest operational leverage.</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 2 -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">2</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 3px;">Custom Solution Architecture & 2-Week Pilot Plan</div>
                            <div style="font-size: 13px; line-height: 1.6; color: #71717a;">We formulate a custom technical architecture tailored to <strong style="color: #18181b;">${safeBusiness}</strong>, with database schema, WhatsApp/CRM workflows, and a concrete <strong style="color: #18181b;">2-Week Working Pilot</strong> implementation roadmap.</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 3 -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">3</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 3px;">Direct Solution Architect Walkthrough & Live Demo</div>
                            <div style="font-size: 13px; line-height: 1.6; color: #71717a;">A dedicated founding solution architect will reach out to you within <strong style="color: #18181b;">24 business hours</strong> via WhatsApp or phone to walk you through the proposal and demonstrate a live simulation tailored to your business.</div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- What We Build Section -->
                    <div style="margin-bottom: 32px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px;">Mathru Labs Solution Capabilities</div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px 18px;">
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <div style="font-size: 13px; font-weight: 700; color: #18181b; margin-bottom: 2px;">⚡ Custom CRMs & Operating Dashboards</div>
                            <div style="font-size: 12px; color: #71717a; line-height: 1.5;">Tailored to your exact staff roles, multi-branch visibility, client records, and automated invoicing.</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <div style="font-size: 13px; font-weight: 700; color: #18181b; margin-bottom: 2px;">💬 Autonomous WhatsApp & Omnichannel Engines</div>
                            <div style="font-size: 12px; color: #71717a; line-height: 1.5;">24/7 instant client replies, appointment booking, automated PDF bills, and payment reminders.</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <div style="font-size: 13px; font-weight: 700; color: #18181b; margin-bottom: 2px;">🤖 Domain-Trained AI Agents & Copilots</div>
                            <div style="font-size: 12px; color: #71717a; line-height: 1.5;">Private internal assistants trained exclusively on your SOPs, pricing catalogs, and customer inquiries.</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="font-size: 13px; font-weight: 700; color: #18181b; margin-bottom: 2px;">🔄 Legacy Software & ERP Integration</div>
                            <div style="font-size: 12px; color: #71717a; line-height: 1.5;">Seamless two-way sync with Tally Prime, Zoho Books, SAP, custom SQL databases, and Excel sheets.</div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Fast Track WhatsApp CTA -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                      <tr>
                        <td align="center">
                          <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 10px; padding: 22px 24px; text-align: center;">
                            <div style="font-size: 15px; font-weight: 700; color: #18181b; margin-bottom: 6px;">
                              Prefer to connect immediately?
                            </div>
                            <div style="font-size: 13px; color: #71717a; margin-bottom: 16px; line-height: 1.5;">
                              Connect directly with our Founding Engineer on WhatsApp for an instant response.
                            </div>
                            <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Mathru%20Labs!%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${referenceId})%20for%20${encodeURIComponent(business.trim())}%20and%20would%20like%20to%20connect."
                               style="display: inline-block; background-color: #18181b; color: #ffffff; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
                              Chat with us on WhatsApp →
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Explore Systems Box -->
                    <div style="margin-bottom: 28px; padding: 14px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                      <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Explore Live Systems While You Wait:</div>
                      <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
                        See interactive workflow simulations for 25+ industries at 
                        <a href="https://mathrulabs.com/#industries" style="color: #0066FF; text-decoration: underline; font-weight: 600;">mathrulabs.com/#industries</a> · 
                        <a href="https://mathrulabs.com/#pilot" style="color: #0066FF; text-decoration: underline; font-weight: 600;">2-Week Pilot Details</a>
                      </div>
                    </div>

                    <!-- Trust Signals -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                      <tr>
                        <td align="center" style="font-size: 12px; color: #71717a; padding: 4px 6px; border-right: 1px solid #e4e4e7;">🛡️ 100% Data Confidentiality</td>
                        <td align="center" style="font-size: 12px; color: #71717a; padding: 4px 6px; border-right: 1px solid #e4e4e7;">🔒 Zero Public AI Training</td>
                        <td align="center" style="font-size: 12px; color: #71717a; padding: 4px 6px;">⚡ On-Prem / Private Cloud</td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <div style="height: 1px; background-color: #e4e4e7; margin-bottom: 28px;"></div>

                    <!-- Founder Sign-off -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="48" valign="top">
                          <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #0066FF; text-align: center; line-height: 40px; font-size: 15px; font-weight: 700; color: #ffffff;">AR</div>
                        </td>
                        <td style="padding-left: 14px;" valign="top">
                          <div style="font-size: 14px; font-weight: 700; color: #18181b;">${FOUNDER_NAME}</div>
                          <div style="font-size: 13px; color: #71717a; margin-top: 1px;">${FOUNDER_TITLE}, Mathru Labs</div>
                          <div style="margin-top: 6px; font-size: 12px; color: #a1a1aa;">
                            <a href="https://mathrulabs.com" style="color: #71717a; text-decoration: none;">mathrulabs.com</a>
                            <span style="margin: 0 6px;">·</span>
                            <a href="mailto:hello@mathrulabs.com" style="color: #71717a; text-decoration: none;">hello@mathrulabs.com</a>
                            <span style="margin: 0 6px;">·</span>
                            <a href="tel:+919704506779" style="color: #71717a; text-decoration: none;">+91 97045 06779</a>
                          </div>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 28px 0 0 0; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #a1a1aa;">
                © ${new Date().getFullYear()} Mathru Labs · Hyderabad, India
              </p>
              <p style="margin: 0; font-size: 11px; color: #d4d4d8;">
                Ref ${referenceId} · Sent to ${safeEmail}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      try {
        await transporter.sendMail({
          from: `Mathru Labs <${SMTP_USER}>`,
          to: clientEmail,
          replyTo: `Mathru Labs <${SMTP_USER}>`,
          subject: clientSubject,
          html: clientHtml,
          text: `Hello ${name},\n\nThank you for reaching out to Mathru Labs regarding ${business}. We have received your inquiry [Ref: ${referenceId}] and our engineering team will get in touch with you within 24 hours.\n\nInquiry Details:\n- Reference Code: ${referenceId}\n- Name: ${name}\n- Business / Industry: ${business}\n- Contact Phone: ${phone}\n- Submitted On: ${timestamp}\n- Your Request: ${message}\n\nWhat Happens Next:\n1. Workflow & Bottleneck Analysis — We study your operations\n2. Custom Architecture & Pilot Plan — 2-week live working pilot\n3. Direct Consultation & Live Demo — Within 24 business hours\n\nNeed immediate assistance? Message us on WhatsApp: +91 97045 06779\n\nWarm regards,\n${FOUNDER_NAME}\n${FOUNDER_TITLE}, Mathru Labs\nhttps://mathrulabs.com · hello@mathrulabs.com · +91 97045 06779`,
        });
        clientEmailSent = true;
      } catch (err) {
        console.error('[Contact API] Failed to send client confirmation email:', err);
      }
    }

    // 8. Secure Outbound Webhook Dispatch (SSRF Protected)
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const parsedUrl = new URL(webhookUrl);
        if (parsedUrl.protocol !== 'https:') {
          throw new Error('Webhook URL must use HTTPS');
        }

        const hostname = parsedUrl.hostname.toLowerCase();
        const isInternalHost =
          hostname === 'localhost' ||
          hostname === '127.0.0.1' ||
          hostname === '0.0.0.0' ||
          hostname.startsWith('10.') ||
          hostname.startsWith('192.168.') ||
          hostname.startsWith('172.16.') ||
          hostname.startsWith('169.254.') ||
          hostname.endsWith('.internal') ||
          hostname.endsWith('.local');

        if (isInternalHost) {
          throw new Error('Webhook URL cannot target internal private network addresses');
        }

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceId,
            name: safeName,
            email: clientEmail,
            business: safeBusiness,
            phone: cleanPhone,
            message: safeMessage,
            timestamp: new Date().toISOString(),
            source: 'mathrulabs-website',
          }),
        });
      } catch (whError) {
        console.error('[Contact API] Webhook forwarding error:', whError);
      }
    }

    // 9. Compliance-Safe Masked Logging (DPDP Act 2023 & GDPR)
    console.log('[Mathru Labs Form Processing Complete]:', {
      referenceId,
      nameMasked: maskPii(name),
      businessMasked: maskPii(business),
      phoneMasked: maskPii(cleanPhone),
      clientEmailMasked: maskPii(clientEmail),
      adminEmailSent,
      clientEmailSent,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry processed successfully.',
      referenceId,
      adminEmailSent,
      clientEmailSent,
    });
  } catch (error) {
    console.error('[Contact API] Critical error processing form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process contact submission' },
      { status: 500 }
    );
  }
}
