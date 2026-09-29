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

    // Extract initials for executive avatar
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
    // 1. CLEAN EXECUTIVE ADMIN LEAD ALERT (Delivered to mathrulabs@gmail.com)
    // ─────────────────────────────────────────────────────────────────────────────
    const adminSubject = `🔥 [Priority Lead: ${referenceId}] ${name} · ${business}`;
    const adminHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Priority Lead Alert · Mathru Labs</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F1F5F9; padding: 40px 14px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);">
          
          <!-- Signature Brand Ribbon -->
          <tr>
            <td style="background: linear-gradient(90deg, #0066FF 0%, #00D26A 50%, #FF6B00 100%); height: 4px; line-height: 4px; font-size: 1px;">&nbsp;</td>
          </tr>

          <!-- Brand Header -->
          <tr>
            <td style="padding: 28px 32px 22px 32px; border-bottom: 1px solid #F1F5F9;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle" style="padding-right: 12px;">
                          <img src="${BRAND_ICON_URL}" alt="Mathru Labs" width="38" height="38" style="display: block; border-radius: 8px;" />
                        </td>
                        <td valign="middle">
                          <span style="font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #0F172A;">
                            Mathru <span style="color: #0066FF;">LABS</span>
                          </span>
                          <div style="font-size: 10px; font-weight: 800; color: #64748B; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 2px;">
                            Command Center · New Lead Alert
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 6px 12px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 9999px; font-size: 11px; font-weight: 800; color: #047857; letter-spacing: 0.5px;">
                      ● HIGH PRIORITY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Profile Header Card -->
          <tr>
            <td style="padding: 24px 32px 12px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px;">
                <tr>
                  <td width="52" valign="top">
                    <!-- Initials Avatar -->
                    <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #0066FF 0%, #00D26A 100%); display: table; text-align: center; box-shadow: 0 4px 12px rgba(0, 102, 255, 0.2);">
                      <span style="display: table-cell; vertical-align: middle; font-size: 18px; font-weight: 900; color: #FFFFFF;">
                        ${initials}
                      </span>
                    </div>
                  </td>
                  <td style="padding-left: 16px;" valign="middle">
                    <div style="font-size: 20px; font-weight: 800; color: #0F172A; letter-spacing: -0.3px;">
                      ${name}
                    </div>
                    <div style="margin-top: 6px;">
                      <span style="display: inline-block; padding: 3px 10px; background-color: #FFF7ED; border: 1px solid #FED7AA; border-radius: 6px; font-size: 12px; font-weight: 700; color: #C2410C;">
                        🏢 ${business}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Structured Data Matrix -->
          <tr>
            <td style="padding: 12px 32px 18px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
                <!-- Email Row -->
                <tr>
                  <td style="padding: 13px 18px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #F1F5F9; width: 34%;">
                    ✉️ Client Email
                  </td>
                  <td style="padding: 13px 18px; font-size: 14px; font-weight: 700; color: #0066FF; border-bottom: 1px solid #F1F5F9;">
                    ${clientEmail ? `<a href="mailto:${clientEmail}" style="color: #0066FF; text-decoration: none;">${clientEmail}</a>` : '<span style="color: #94A3B8; font-weight: normal;">Not provided</span>'}
                  </td>
                </tr>
                <!-- Phone Row -->
                <tr>
                  <td style="padding: 13px 18px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #F1F5F9;">
                    📱 Phone / WhatsApp
                  </td>
                  <td style="padding: 13px 18px; font-size: 14px; font-weight: 800; color: #059669; border-bottom: 1px solid #F1F5F9;">
                    <a href="tel:${cleanPhone}" style="color: #059669; text-decoration: none;">${phone}</a>
                    <span style="color: #CBD5E1; margin: 0 8px;">·</span>
                    <a href="https://wa.me/${cleanPhone}" style="color: #0066FF; font-size: 12px; text-decoration: underline;">Chat on WhatsApp →</a>
                  </td>
                </tr>
                <!-- Timestamp -->
                <tr>
                  <td style="padding: 13px 18px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #F1F5F9;">
                    ⏰ Received On
                  </td>
                  <td style="padding: 13px 18px; font-size: 13px; color: #334155; border-bottom: 1px solid #F1F5F9;">
                    ${timestamp}
                  </td>
                </tr>
                <!-- Tracking ID -->
                <tr>
                  <td style="padding: 13px 18px; font-size: 13px; font-weight: 600; color: #64748B;">
                    🔖 Tracking Code
                  </td>
                  <td style="padding: 13px 18px; font-size: 13px; font-family: monospace; font-weight: 800; color: #0F172A;">
                    <span style="background-color: #F1F5F9; border: 1px solid #CBD5E1; padding: 3px 8px; border-radius: 4px;">${referenceId}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Requirements Quote Block -->
          <tr>
            <td style="padding: 4px 32px 24px 32px;">
              <div style="font-size: 11px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;">
                Client Requirements & Scope Brief
              </div>
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #00D26A; border-radius: 10px; padding: 18px 20px; font-size: 14px; line-height: 1.75; color: #0F172A; white-space: pre-wrap; font-family: inherit;">${message}</div>
            </td>
          </tr>

          <!-- Instant Action Deck -->
          <tr>
            <td style="padding: 0 32px 26px 32px;" align="center">
              <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 14px; text-align: center;">
                Instant Lead Response Deck
              </div>
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- WhatsApp Button -->
                    <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)}!%20Thank%20you%20for%20reaching%20out%20to%20Mathru%20Labs%20regarding%20your%20${encodeURIComponent(business)}%20software%20requirements.%20I%20have%20reviewed%20your%20inquiry%20(Ref:%20${referenceId})%20and%20would%20love%20to%20connect."
                       style="display: inline-block; background-color: #00D26A; color: #FFFFFF; font-size: 13px; font-weight: 800; padding: 12px 22px; border-radius: 9999px; text-decoration: none; margin: 4px; box-shadow: 0 3px 12px rgba(0, 210, 106, 0.35);">
                      💬 Reply on WhatsApp
                    </a>

                    ${clientEmail ? `
                    <!-- Email Button -->
                    <a href="mailto:${clientEmail}?subject=Mathru%20Labs%20Consultation%20—%20${encodeURIComponent(business)}%20(${referenceId})"
                       style="display: inline-block; background-color: #0066FF; color: #FFFFFF; font-size: 13px; font-weight: 800; padding: 12px 22px; border-radius: 9999px; text-decoration: none; margin: 4px; box-shadow: 0 3px 12px rgba(0, 102, 255, 0.35);">
                      ✉️ Reply via Email
                    </a>` : ''}

                    <!-- Phone Dial Button -->
                    <a href="tel:${cleanPhone}"
                       style="display: inline-block; background-color: #FFFFFF; color: #0F172A; font-size: 13px; font-weight: 700; padding: 11px 20px; border-radius: 9999px; text-decoration: none; border: 1.5px solid #CBD5E1; margin: 4px;">
                      📞 Call Direct
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Operational SLA Reminder -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 12px 16px;">
                <tr>
                  <td style="font-size: 12px; color: #1E40AF; line-height: 1.5;">
                    <strong style="color: #1D4ED8;">⚡ Mathru Labs Lead Protocol:</strong> Reach out within 2 hours. Review current operational workflow and offer a 2-week live working pilot demonstration.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748B;">
                Automated lead notification dispatched to <strong style="color: #334155;">${ADMIN_EMAIL}</strong> via Mathru Labs Web Engine.
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
    // 2. WORLD-CLASS CLIENT CONFIRMATION EMAIL (Delivered to client's email)
    // ─────────────────────────────────────────────────────────────────────────────
    if (clientEmail) {
      const clientSubject = `✨ Inquiry Confirmed [${referenceId}] — Mathru Labs Engineering Team`;
      const clientHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Inquiry Has Been Received — Mathru Labs</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F1F5F9; padding: 40px 14px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);">
          
          <!-- Top Multi-Stop Cyber Ribbon Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #0066FF 0%, #00D26A 50%, #FF6B00 100%); height: 4px; line-height: 4px; font-size: 1px;">&nbsp;</td>
          </tr>

          <!-- Brand Header Section -->
          <tr>
            <td style="padding: 32px 36px 24px 36px; text-align: center; border-bottom: 1px solid #F1F5F9;">
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td align="center">
                    <img src="${BRAND_ICON_URL}" alt="Mathru Labs Logo" width="46" height="46" style="display: block; margin: 0 auto 10px auto; border-radius: 10px;" />
                    <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.6px; color: #0F172A;">
                      Mathru <span style="color: #0066FF;">LABS</span>
                    </div>
                    <div style="font-size: 11px; font-weight: 800; color: #059669; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">
                      AI Systems · Custom CRMs · Enterprise Automation
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Warm Executive Greeting -->
          <tr>
            <td style="padding: 32px 36px 12px 36px;">
              <!-- Verification Pill -->
              <div style="margin-bottom: 20px;">
                <span style="display: inline-block; padding: 6px 14px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 9999px; font-size: 11px; font-weight: 800; color: #047857; letter-spacing: 0.6px;">
                  ✓ INQUIRY REGISTERED & ARCHITECT ASSIGNED
                </span>
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 900; color: #0F172A; letter-spacing: -0.4px;">
                Dear ${name},
              </h2>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.75; color: #334155;">
                Thank you for reaching out to <strong>Mathru Labs</strong>. We have successfully registered your inquiry regarding custom software, automated tools, and AI workflows for <strong>${business}</strong>.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.75; color: #475569;">
                At Mathru Labs, we build technology that runs businesses quietly, reliably, and without friction. Every system we create is engineered specifically around your workflow to eliminate bottlenecks, cut operating hours, and scale your operations without expanding headcount.
              </p>
            </td>
          </tr>

          <!-- Submission Snapshot Card -->
          <tr>
            <td style="padding: 0 36px 28px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size: 11px; font-weight: 800; color: #0066FF; letter-spacing: 1.5px; text-transform: uppercase;">
                          RECORD SNAPSHOT
                        </td>
                        <td align="right" style="font-family: monospace; font-size: 12px; font-weight: 800; color: #0F172A;">
                          Ref: <span style="background-color: #FFFFFF; border: 1px solid #CBD5E1; padding: 2px 6px; border-radius: 4px;">${referenceId}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 6px 0; font-size: 13px; color: #64748B; width: 36%;">Industry / Domain:</td>
                  <td style="padding: 12px 0 6px 0; font-size: 13px; font-weight: 800; color: #0F172A;">${business}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748B;">Registered Phone:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #0F172A;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0 4px 0; font-size: 13px; color: #64748B; vertical-align: top;">Your Request:</td>
                  <td style="padding: 6px 0 4px 0; font-size: 13px; line-height: 1.6; color: #0F172A; font-style: italic;">
                    "${message}"
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps Roadmap Section -->
          <tr>
            <td style="padding: 0 36px 28px 36px;">
              <div style="font-size: 15px; font-weight: 900; color: #0F172A; letter-spacing: -0.2px; margin-bottom: 16px;">
                What Happens While You Wait?
              </div>

              <!-- Step 1 -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                <tr>
                  <td width="38" valign="top">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #EFF6FF; border: 1px solid #BFDBFE; color: #1D4ED8; font-size: 13px; font-weight: 900; text-align: center; line-height: 28px;">
                      1
                    </div>
                  </td>
                  <td style="padding-left: 12px;">
                    <div style="font-size: 14px; font-weight: 800; color: #0F172A;">
                      Technical Workflow & Bottleneck Review
                    </div>
                    <div style="font-size: 13px; line-height: 1.55; color: #475569; margin-top: 3px;">
                      Our engineering leadership analyzes your operational workflow to map out how custom software or AI agents can eliminate repetitive manual overhead.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                <tr>
                  <td width="38" valign="top">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; font-size: 13px; font-weight: 900; text-align: center; line-height: 28px;">
                      2
                    </div>
                  </td>
                  <td style="padding-left: 12px;">
                    <div style="font-size: 14px; font-weight: 800; color: #0F172A;">
                      Custom Architecture Blueprint & Pilot Plan
                    </div>
                    <div style="font-size: 13px; line-height: 1.55; color: #475569; margin-top: 3px;">
                      We formulate a concrete architecture recommendation, showing expected delivery time (typically a <strong>2-week live working pilot</strong>) and clear ROI metrics.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="38" valign="top">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFF7ED; border: 1px solid #FED7AA; color: #C2410C; font-size: 13px; font-weight: 900; text-align: center; line-height: 28px;">
                      3
                    </div>
                  </td>
                  <td style="padding-left: 12px;">
                    <div style="font-size: 14px; font-weight: 800; color: #0F172A;">
                      Direct Consultation & Live Demonstration
                    </div>
                    <div style="font-size: 13px; line-height: 1.55; color: #475569; margin-top: 3px;">
                      A dedicated solution architect will contact you directly via WhatsApp or phone within <strong>24 business hours</strong> to present the demo.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Priority WhatsApp VIP Box -->
          <tr>
            <td style="padding: 0 36px 30px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%); border: 1px solid #A7F3D0; border-radius: 12px; padding: 22px; text-align: center;">
                <tr>
                  <td>
                    <div style="font-size: 15px; font-weight: 900; color: #065F46; margin-bottom: 6px;">
                      Need immediate answers or have an urgent timeline?
                    </div>
                    <div style="font-size: 13px; line-height: 1.6; color: #047857; max-width: 440px; margin: 0 auto 16px auto;">
                      If you want to discuss your requirements right now with zero delay, connect directly with our founding engineering team on WhatsApp:
                    </div>
                    <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Mathru%20Labs%20Team!%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${referenceId})%20for%20${encodeURIComponent(business)}%20and%20would%20like%20to%20chat%20directly."
                       style="display: inline-block; background-color: #00D26A; color: #FFFFFF; font-size: 14px; font-weight: 900; padding: 12px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 14px rgba(0, 210, 106, 0.35);">
                      💬 Chat Directly on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trust & Governance Guarantees -->
          <tr>
            <td style="padding: 0 36px 26px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; padding: 14px 0;">
                <tr>
                  <td align="center" style="font-size: 12px; font-weight: 700; color: #475569; padding: 4px;">
                    🔒 100% Data Confidentiality
                  </td>
                  <td align="center" style="font-size: 12px; font-weight: 700; color: #475569; padding: 4px;">
                    🛡️ Zero Third-Party Resale
                  </td>
                  <td align="center" style="font-size: 12px; font-weight: 700; color: #475569; padding: 4px;">
                    ⚡ 2-Week Working Pilot
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Executive Sign-off -->
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <div style="font-size: 14px; line-height: 1.75; color: #475569;">
                Warm regards,<br />
                <strong style="color: #0F172A; font-size: 16px;">The Engineering Leadership Team</strong><br />
                <span style="color: #0066FF; font-weight: 700;">Mathru Labs</span> — <span style="font-size: 13px; color: #64748B;">Custom Software & AI Systems for Every Industry</span><br />
                <span style="font-size: 12px; color: #64748B; margin-top: 4px; display: inline-block;">
                  Web: <a href="https://mathrulabs.com" style="color: #0066FF; text-decoration: none;">mathrulabs.com</a> · Email: <a href="mailto:hello@mathrulabs.com" style="color: #0066FF; text-decoration: none;">hello@mathrulabs.com</a> · Direct: <a href="tel:+919704506779" style="color: #0066FF; text-decoration: none;">+91 97045 06779</a>
                </span>
              </div>
            </td>
          </tr>

          <!-- Legal / Compliance Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #64748B;">
                © ${new Date().getFullYear()} Mathru Labs. Hyderabad, Telangana, India. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94A3B8;">
                Dispatched to <span style="color: #64748B;">${clientEmail}</span> for Reference Code ${referenceId}.
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
          text: `Hello ${name},\n\nThank you for reaching out to Mathru Labs regarding ${business}. We have received your inquiry [Ref: ${referenceId}] and our engineering team will get in touch with you within 24 hours.\n\nSummary:\n- Reference Code: ${referenceId}\n- Business / Industry: ${business}\n- Contact Phone: ${phone}\n- Your Request: ${message}\n\nNeed immediate assistance? Message us on WhatsApp: +91 97045 06779\n\nWarm regards,\nMathru Labs Engineering Team\nhttps://mathrulabs.com`,
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

    console.log('✅ [Mathru Labs Form Processing Complete]:', {
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
