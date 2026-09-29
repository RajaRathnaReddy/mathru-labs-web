import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.stackmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_SECURE = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) === 465 : true;
const SMTP_USER = process.env.SMTP_USER || 'hello@mathrulabs.com';
const SMTP_PASS = process.env.SMTP_PASS || 'Raja@777.';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mathrulabs@gmail.com';
const WHATSAPP_PHONE = '919704506779';
const BRAND_ICON_URL = 'https://mathrulabs.com/brand/mathru-icon-3d-clean.png';
const FOUNDER_NAME = 'Aravind Raja';
const FOUNDER_TITLE = 'Founder & Engineering Lead';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, business, phone, message } = body;

    // Validation
    if (!name || !business || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, business, phone, and requirements are required' },
        { status: 400 }
      );
    }

    const clientEmail = (email && typeof email === 'string' && email.includes('@'))
      ? email.trim()
      : null;

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const referenceId = `ML-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Extract initials for avatar
    const nameParts = name.trim().split(/\s+/);
    const initials = nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

    // Configure SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let adminEmailSent = false;
    let clientEmailSent = false;

    // ─────────────────────────────────────────────────────────────────────────────
    // 1. ADMIN LEAD NOTIFICATION (Delivered to mathrulabs@gmail.com)
    // ─────────────────────────────────────────────────────────────────────────────
    const adminSubject = `New Lead · ${referenceId} · ${name} — ${business}`;
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
                  <td style="background-color: #0066FF; height: 3px; line-height: 3px; font-size: 1px;">&nbsp;</td>
                </tr>

                <!-- Card Body -->
                <tr>
                  <td style="padding: 40px 40px 36px 40px;">

                    <!-- Title -->
                    <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #18181b; letter-spacing: -0.3px;">
                      New inquiry from ${name}
                    </h1>
                    <p style="margin: 0 0 32px 0; font-size: 14px; color: #71717a; line-height: 1.5;">
                      ${business} · ${timestamp}
                    </p>

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
                            ${name}
                          </div>
                          <div style="font-size: 13px; color: #71717a; margin-top: 2px;">
                            ${business}${clientEmail ? ` · ${clientEmail}` : ''}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Data Table -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5; width: 120px;">Email</td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">
                          ${clientEmail ? `<a href="mailto:${clientEmail}" style="color: #0066FF; text-decoration: none;">${clientEmail}</a>` : '<span style="color: #a1a1aa;">Not provided</span>'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Phone</td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">
                          <a href="tel:${cleanPhone}" style="color: #18181b; text-decoration: none;">${phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Reference</td>
                        <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; font-family: 'SF Mono', 'Fira Code', monospace; border-bottom: 1px solid #f4f4f5;">${referenceId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13px; color: #71717a;">Received</td>
                        <td style="padding: 12px 16px; font-size: 13px; color: #18181b;">${timestamp}</td>
                      </tr>
                    </table>

                    <!-- Requirements -->
                    <div style="margin-bottom: 32px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">Requirements</div>
                      <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px 18px; font-size: 14px; line-height: 1.7; color: #27272a; white-space: pre-wrap;">${message}</div>
                    </div>

                    <!-- Action Buttons -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)}!%20This%20is%20${encodeURIComponent(FOUNDER_NAME)}%20from%20Mathru%20Labs.%20Thank%20you%20for%20your%20inquiry%20(Ref:%20${referenceId}).%20I'd%20love%20to%20discuss%20your%20requirements%20for%20${encodeURIComponent(business)}."
                             style="display: inline-block; background-color: #18181b; color: #ffffff; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
                            Reply on WhatsApp
                          </a>
                          ${clientEmail ? `
                          <a href="mailto:${clientEmail}?subject=Re:%20Your%20Inquiry%20—%20Mathru%20Labs%20(${referenceId})"
                             style="display: inline-block; background-color: #ffffff; color: #18181b; font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 8px; text-decoration: none; border: 1px solid #d4d4d8;">
                            Reply via Email
                          </a>` : ''}
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
        replyTo: clientEmail ? `${name} <${clientEmail}>` : SMTP_USER,
        subject: adminSubject,
        html: adminHtml,
        text: `New Lead: ${name}\nIndustry: ${business}\nPhone: ${phone}\nEmail: ${clientEmail || 'N/A'}\nTracking Code: ${referenceId}\n\nRequirements:\n${message}`,
      });
      adminEmailSent = true;
      console.log(`[Contact API] Admin lead notification delivered to ${ADMIN_EMAIL}`);
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
                  <td style="background-color: #0066FF; height: 3px; line-height: 3px; font-size: 1px;">&nbsp;</td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 44px 40px 40px 40px;">

                    <!-- Greeting -->
                    <h1 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #18181b; letter-spacing: -0.4px; line-height: 1.3;">
                      Hello ${name},
                    </h1>

                    <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.75; color: #3f3f46;">
                      Thank you for reaching out to Mathru Labs. We've received your inquiry about <strong style="color: #18181b;">${business}</strong> and a dedicated engineer has been assigned to review your requirements.
                    </p>

                    <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.75; color: #52525b;">
                      Every system we build is purpose-engineered around your workflow — designed to eliminate bottlenecks, reduce operating hours, and scale operations without expanding headcount.
                    </p>

                    <!-- Divider -->
                    <div style="height: 1px; background-color: #e4e4e7; margin-bottom: 32px;"></div>

                    <!-- Inquiry Summary -->
                    <div style="margin-bottom: 32px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px;">Your Inquiry Summary</div>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden;">
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5; width: 120px;">Reference</td>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; font-family: 'SF Mono', 'Fira Code', monospace; border-bottom: 1px solid #f4f4f5;">${referenceId}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; border-bottom: 1px solid #f4f4f5;">Industry</td>
                          <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #18181b; border-bottom: 1px solid #f4f4f5;">${business}</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 16px; font-size: 13px; color: #71717a; vertical-align: top;">Requirements</td>
                          <td style="padding: 12px 16px; font-size: 13px; line-height: 1.65; color: #3f3f46; font-style: italic;">"${message}"</td>
                        </tr>
                      </table>
                    </div>

                    <!-- What Happens Next -->
                    <div style="margin-bottom: 36px;">
                      <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 18px;">What Happens Next</div>

                      <!-- Step 1 -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #f4f4f5; border: 1px solid #d4d4d8; color: #52525b; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">1</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 3px;">Workflow Analysis</div>
                            <div style="font-size: 13px; line-height: 1.6; color: #71717a;">We study your operations to identify where custom software and AI can have the highest impact.</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 2 -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #f4f4f5; border: 1px solid #d4d4d8; color: #52525b; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">2</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 3px;">Architecture & Pilot Plan</div>
                            <div style="font-size: 13px; line-height: 1.6; color: #71717a;">We prepare a solution blueprint with a 2-week working pilot timeline and clear ROI projection.</div>
                          </td>
                        </tr>
                      </table>

                      <!-- Step 3 -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="32" valign="top">
                            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #f4f4f5; border: 1px solid #d4d4d8; color: #52525b; font-size: 12px; font-weight: 700; text-align: center; line-height: 24px;">3</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 3px;">Personal Consultation</div>
                            <div style="font-size: 13px; line-height: 1.6; color: #71717a;">A solution architect will reach out within 24 hours to walk you through the proposal and demo.</div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- CTA -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 36px;">
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 14px 0; font-size: 14px; color: #52525b; text-align: center;">
                            Need to discuss something urgently?
                          </p>
                          <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Mathru%20Labs!%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${referenceId})%20for%20${encodeURIComponent(business)}%20and%20would%20like%20to%20connect."
                             style="display: inline-block; background-color: #18181b; color: #ffffff; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
                            Chat with us on WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <div style="height: 1px; background-color: #e4e4e7; margin-bottom: 32px;"></div>

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
                Ref ${referenceId} · Sent to ${clientEmail}
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
          text: `Hello ${name},\n\nThank you for reaching out to Mathru Labs regarding ${business}. We have received your inquiry [Ref: ${referenceId}] and our engineering team will get in touch with you within 24 hours.\n\nSummary:\n- Reference Code: ${referenceId}\n- Business / Industry: ${business}\n- Contact Phone: ${phone}\n- Your Request: ${message}\n\nNeed immediate assistance? Message us on WhatsApp: +91 97045 06779\n\nWarm regards,\n${FOUNDER_NAME}\n${FOUNDER_TITLE}, Mathru Labs\nhttps://mathrulabs.com`,
        });
        clientEmailSent = true;
        console.log(`[Contact API] Confirmation email delivered to client: ${clientEmail}`);
      } catch (err) {
        console.error('[Contact API] Failed to send client confirmation email:', err);
      }
    }

    // Forward to webhook (n8n / Zapier) if configured
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referenceId,
            name,
            email: clientEmail,
            business,
            phone,
            message,
            timestamp: new Date().toISOString(),
            source: 'mathrulabs-website',
          }),
        });
      } catch (whError) {
        console.error('[Contact API] Webhook forwarding failed:', whError);
      }
    }

    console.log('[Mathru Labs Form Processing Complete]:', {
      referenceId,
      name,
      business,
      phone,
      clientEmail,
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
