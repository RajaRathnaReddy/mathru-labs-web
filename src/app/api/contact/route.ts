import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.stackmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_SECURE = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) === 465 : true;
const SMTP_USER = process.env.SMTP_USER || 'hello@mathrulabs.com';
const SMTP_PASS = process.env.SMTP_PASS || 'Raja@777.';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mathrulabs@gmail.com';
const WHATSAPP_PHONE = '919704506779';

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
    // 1. STUNNING ADMIN NOTIFICATION TEMPLATE (Delivered to mathrulabs@gmail.com)
    // ─────────────────────────────────────────────────────────────────────────────
    const adminSubject = `🔥 [Priority Lead: ${referenceId}] ${name} · ${business}`;
    const adminHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Priority Lead Alert · Mathru Labs Command Center</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050811; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #E2E8F0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050811; padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #0A0F1D; border: 1px solid #162238; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.85);">
          
          <!-- Top Multi-Stop Cyber Gradient Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #0066FF 0%, #00D26A 50%, #FF6B00 100%); height: 5px; line-height: 5px; font-size: 1px;">&nbsp;</td>
          </tr>

          <!-- Command Center Brand Header -->
          <tr>
            <td style="padding: 28px 32px 22px 32px; border-bottom: 1px solid #131D2E;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <!-- Mathru Logo Typography -->
                    <span style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF;">
                      Mathru <span style="color: #38BDF8;">LABS</span>
                    </span>
                    <div style="font-size: 11px; font-weight: 700; color: #64748B; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">
                      Executive Lead Command Center
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <!-- Urgent Lead Pill -->
                    <span style="display: inline-block; padding: 6px 14px; background-color: rgba(0, 210, 106, 0.12); border: 1px solid rgba(0, 210, 106, 0.4); border-radius: 9999px; font-size: 11px; font-weight: 800; color: #00D26A; letter-spacing: 0.8px;">
                      ● HIGH PRIORITY LEAD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Profile Hero Card -->
          <tr>
            <td style="padding: 26px 32px 10px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0F172A 0%, #0B132B 100%); border: 1px solid #1E293B; border-radius: 16px; padding: 22px;">
                <tr>
                  <td width="58" valign="top">
                    <!-- Monogram Avatar -->
                    <div style="width: 54px; height: 54px; border-radius: 16px; background: linear-gradient(135deg, #0066FF 0%, #00D26A 100%); display: table; text-align: center; box-shadow: 0 10px 25px rgba(0, 102, 255, 0.35);">
                      <span style="display: table-cell; vertical-align: middle; font-size: 20px; font-weight: 900; color: #FFFFFF; letter-spacing: 0.5px;">
                        ${initials}
                      </span>
                    </div>
                  </td>
                  <td style="padding-left: 18px;">
                    <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.4px; line-height: 1.2;">
                      ${name}
                    </div>
                    <div style="margin-top: 6px;">
                      <span style="display: inline-block; padding: 4px 12px; background-color: rgba(255, 107, 0, 0.15); border: 1px solid rgba(255, 107, 0, 0.45); border-radius: 6px; font-size: 12px; font-weight: 800; color: #FF8A3D;">
                        🏢 ${business}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Data Matrix Table -->
          <tr>
            <td style="padding: 16px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0D1424; border: 1px solid #182338; border-radius: 14px; overflow: hidden;">
                <!-- Email Row -->
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #131D2E; width: 36%;">
                    ✉️ Client Email
                  </td>
                  <td style="padding: 14px 18px; font-size: 14px; font-weight: 700; color: #38BDF8; border-bottom: 1px solid #131D2E;">
                    ${clientEmail ? `<a href="mailto:${clientEmail}" style="color: #38BDF8; text-decoration: none;">${clientEmail}</a>` : '<span style="color: #64748B; font-weight: normal;">Not provided</span>'}
                  </td>
                </tr>
                <!-- Phone Row -->
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #131D2E;">
                    📱 Phone / WhatsApp
                  </td>
                  <td style="padding: 14px 18px; font-size: 14px; font-weight: 800; color: #00D26A; border-bottom: 1px solid #131D2E;">
                    <a href="tel:${cleanPhone}" style="color: #00D26A; text-decoration: none;">${phone}</a>
                    <span style="color: #334155; margin: 0 8px;">·</span>
                    <a href="https://wa.me/${cleanPhone}" style="color: #38BDF8; font-size: 12px; text-decoration: underline;">Chat on WhatsApp →</a>
                  </td>
                </tr>
                <!-- Submission Timestamp -->
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #64748B; border-bottom: 1px solid #131D2E;">
                    ⏰ Received On
                  </td>
                  <td style="padding: 14px 18px; font-size: 13px; color: #CBD5E1; border-bottom: 1px solid #131D2E;">
                    ${timestamp}
                  </td>
                </tr>
                <!-- Lead Tracking ID -->
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; font-weight: 600; color: #64748B;">
                    🔖 Tracking Reference
                  </td>
                  <td style="padding: 14px 18px; font-size: 13px; font-family: monospace; font-weight: 800; color: #F1F5F9;">
                    <span style="background-color: #1E293B; padding: 3px 8px; border-radius: 4px; border: 1px solid #334155;">${referenceId}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Requirements Block -->
          <tr>
            <td style="padding: 8px 32px 24px 32px;">
              <div style="font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
                Client Workflow & Project Requirements
              </div>
              <div style="background-color: #080D1A; border: 1px solid #1A263C; border-left: 4px solid #00D26A; border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.75; color: #F1F5F9; white-space: pre-wrap; font-family: inherit;">${message}</div>
            </td>
          </tr>

          <!-- Instant Executive Action Deck -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 14px; text-align: center;">
                Instant Lead Response Deck
              </div>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- WhatsApp Button -->
                    <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)}!%20Thank%20you%20for%20reaching%20out%20to%20Mathru%20Labs%20regarding%20your%20${encodeURIComponent(business)}%20software%20requirements.%20I%20have%20reviewed%20your%20inquiry%20(Ref:%20${referenceId})%20and%20would%20love%20to%20discuss%20how%20we%20can%20build%20a%20solution%20for%20your%20team."
                       style="display: inline-block; background-color: #00D26A; color: #050811; font-size: 13px; font-weight: 900; padding: 13px 22px; border-radius: 9999px; text-decoration: none; margin: 4px; box-shadow: 0 4px 20px rgba(0, 210, 106, 0.4);">
                      💬 Reply on WhatsApp
                    </a>
                    
                    ${clientEmail ? `
                    <!-- Email Button -->
                    <a href="mailto:${clientEmail}?subject=Mathru%20Labs%20Consultation%20—%20${encodeURIComponent(business)}%20(${referenceId})"
                       style="display: inline-block; background-color: #0066FF; color: #FFFFFF; font-size: 13px; font-weight: 800; padding: 13px 22px; border-radius: 9999px; text-decoration: none; margin: 4px; box-shadow: 0 4px 20px rgba(0, 102, 255, 0.4);">
                      ✉️ Reply via Email
                    </a>` : ''}

                    <!-- Phone Dial Button -->
                    <a href="tel:${cleanPhone}"
                       style="display: inline-block; background-color: #172238; color: #FFFFFF; font-size: 13px; font-weight: 700; padding: 13px 22px; border-radius: 9999px; text-decoration: none; border: 1px solid #2B3A55; margin: 4px;">
                      📞 Call Direct
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Handling SLA Protocol -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #080D1A; border: 1px dashed #1B2942; border-radius: 10px; padding: 14px 18px;">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 800; color: #38BDF8; letter-spacing: 1px; text-transform: uppercase;">
                      ⚡ Mathru Labs Lead Protocol:
                    </span>
                    <span style="font-size: 12px; color: #94A3B8; margin-left: 8px;">
                      Target SLA is contact within 2 hours. Review business workflow & propose a 2-week live pilot demonstration.
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #070B16; border-top: 1px solid #121A2A; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748B; line-height: 1.5;">
                Dispatched by <strong>Mathru Labs Web Core</strong> to <span style="color: #94A3B8;">${ADMIN_EMAIL}</span>.
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
    // 2. EXTRAORDINARY CLIENT CONFIRMATION TEMPLATE (Delivered to client's email)
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
<body style="margin: 0; padding: 0; background-color: #050811; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #E2E8F0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050811; padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #0A0F1D; border: 1px solid #162238; border-radius: 20px; overflow: hidden; box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.9);">
          
          <!-- Top Multi-Stop Cyber Ribbon Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #0066FF 0%, #00D26A 50%, #FF6B00 100%); height: 5px; line-height: 5px; font-size: 1px;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 34px 36px 24px 36px; text-align: center; border-bottom: 1px solid #131D2E;">
              <!-- Logo Typography -->
              <div style="font-size: 32px; font-weight: 900; letter-spacing: -0.8px; color: #FFFFFF;">
                Mathru <span style="color: #38BDF8;">LABS</span>
              </div>
              <div style="font-size: 11px; font-weight: 800; color: #00D26A; letter-spacing: 2.2px; text-transform: uppercase; margin-top: 6px;">
                AI Systems · Custom CRMs · Enterprise Automation
              </div>
            </td>
          </tr>

          <!-- Warm Personalized Opening -->
          <tr>
            <td style="padding: 34px 36px 12px 36px;">
              <!-- Verification Pill -->
              <div style="margin-bottom: 22px;">
                <span style="display: inline-block; padding: 6px 14px; background-color: rgba(0, 210, 106, 0.12); border: 1px solid rgba(0, 210, 106, 0.35); border-radius: 9999px; font-size: 11px; font-weight: 800; color: #00D26A; letter-spacing: 0.8px;">
                  ✓ INQUIRY REGISTERED & ARCHITECT ASSIGNED
                </span>
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 23px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.4px; line-height: 1.3;">
                Dear ${name},
              </h2>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.75; color: #CBD5E1;">
                Thank you for reaching out to <strong>Mathru Labs</strong>. We have successfully registered your inquiry regarding custom software, automated tools, and AI workflows for <strong>${business}</strong>.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.75; color: #94A3B8;">
                At Mathru Labs, we build technology that runs businesses quietly, reliably, and without friction. Every system we create is engineered specifically around your workflow to eliminate bottlenecks, cut operating hours, and scale your business without expanding headcount.
              </p>
            </td>
          </tr>

          <!-- Submission Snapshot Card -->
          <tr>
            <td style="padding: 0 36px 28px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0F172A 0%, #0A1124 100%); border: 1px solid #1C263B; border-radius: 14px; padding: 20px 22px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #192338;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="font-size: 11px; font-weight: 800; color: #38BDF8; letter-spacing: 1.5px; text-transform: uppercase;">
                          RECORD SNAPSHOT
                        </td>
                        <td align="right" style="font-family: monospace; font-size: 12px; font-weight: 800; color: #94A3B8;">
                          Ref: <span style="color: #F1F5F9;">${referenceId}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 6px 0; font-size: 13px; color: #64748B; width: 38%;">Industry / Domain:</td>
                  <td style="padding: 12px 0 6px 0; font-size: 13px; font-weight: 800; color: #FFFFFF;">${business}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748B;">Registered Phone:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #CBD5E1;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0 4px 0; font-size: 13px; color: #64748B; vertical-align: top;">Your Request:</td>
                  <td style="padding: 6px 0 4px 0; font-size: 13px; line-height: 1.6; color: #E2E8F0; font-style: italic;">
                    "${message}"
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps Roadmap Section -->
          <tr>
            <td style="padding: 0 36px 30px 36px;">
              <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.2px; margin-bottom: 18px;">
                What Happens While You Wait?
              </div>

              <!-- Step 1 -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                <tr>
                  <td width="38" valign="top">
                    <div style="width: 30px; height: 30px; border-radius: 50%; background-color: rgba(0, 102, 255, 0.15); border: 1px solid rgba(0, 102, 255, 0.4); color: #38BDF8; font-size: 13px; font-weight: 900; text-align: center; line-height: 30px;">
                      1
                    </div>
                  </td>
                  <td style="padding-left: 12px;">
                    <div style="font-size: 14px; font-weight: 800; color: #FFFFFF;">
                      Technical Workflow & Bottleneck Review
                    </div>
                    <div style="font-size: 13px; line-height: 1.55; color: #94A3B8; margin-top: 3px;">
                      Our engineering leadership analyzes your operational workflow to map out how custom software or AI agents can eliminate repetitive manual overhead.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                <tr>
                  <td width="38" valign="top">
                    <div style="width: 30px; height: 30px; border-radius: 50%; background-color: rgba(0, 210, 106, 0.15); border: 1px solid rgba(0, 210, 106, 0.4); color: #00D26A; font-size: 13px; font-weight: 900; text-align: center; line-height: 30px;">
                      2
                    </div>
                  </td>
                  <td style="padding-left: 12px;">
                    <div style="font-size: 14px; font-weight: 800; color: #FFFFFF;">
                      Custom Architecture Blueprint
                    </div>
                    <div style="font-size: 13px; line-height: 1.55; color: #94A3B8; margin-top: 3px;">
                      We formulate a concrete architecture recommendation, showing expected delivery time (typically a <strong>2-week live working pilot</strong>) and clear ROI metrics.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="38" valign="top">
                    <div style="width: 30px; height: 30px; border-radius: 50%; background-color: rgba(255, 107, 0, 0.15); border: 1px solid rgba(255, 107, 0, 0.4); color: #FF8A3D; font-size: 13px; font-weight: 900; text-align: center; line-height: 30px;">
                      3
                    </div>
                  </td>
                  <td style="padding-left: 12px;">
                    <div style="font-size: 14px; font-weight: 800; color: #FFFFFF;">
                      Direct Consultation & Live Demonstration
                    </div>
                    <div style="font-size: 13px; line-height: 1.55; color: #94A3B8; margin-top: 3px;">
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
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(0, 210, 106, 0.08) 0%, rgba(0, 102, 255, 0.04) 100%); border: 1px solid rgba(0, 210, 106, 0.28); border-radius: 14px; padding: 24px; text-align: center;">
                <tr>
                  <td>
                    <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; margin-bottom: 6px;">
                      Need immediate answers or have a launch deadline?
                    </div>
                    <div style="font-size: 13px; line-height: 1.6; color: #94A3B8; max-width: 440px; margin: 0 auto 18px auto;">
                      If you want to discuss your requirements right now with zero delay, connect directly with our founding engineering team on WhatsApp:
                    </div>
                    <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Mathru%20Labs%20Team!%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${referenceId})%20for%20${encodeURIComponent(business)}%20and%20would%20like%20to%20chat%20directly."
                       style="display: inline-block; background-color: #00D26A; color: #050811; font-size: 14px; font-weight: 900; padding: 13px 30px; border-radius: 9999px; text-decoration: none; box-shadow: 0 6px 22px rgba(0, 210, 106, 0.4);">
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
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #141E30; border-bottom: 1px solid #141E30; padding: 14px 0;">
                <tr>
                  <td align="center" style="font-size: 12px; font-weight: 700; color: #64748B; padding: 4px;">
                    🔒 100% Data Confidentiality
                  </td>
                  <td align="center" style="font-size: 12px; font-weight: 700; color: #64748B; padding: 4px;">
                    🛡️ Zero Third-Party Resale
                  </td>
                  <td align="center" style="font-size: 12px; font-weight: 700; color: #64748B; padding: 4px;">
                    ⚡ 2-Week Working Pilot
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Executive Sign-off -->
          <tr>
            <td style="padding: 0 36px 34px 36px;">
              <div style="font-size: 14px; line-height: 1.75; color: #94A3B8;">
                Warm regards,<br />
                <strong style="color: #FFFFFF; font-size: 16px;">The Engineering Leadership Team</strong><br />
                <span style="color: #38BDF8; font-weight: 700;">Mathru Labs</span> — <span style="font-size: 13px; color: #64748B;">Custom Software & AI Systems for Every Industry</span><br />
                <span style="font-size: 12px; color: #475569; margin-top: 4px; display: inline-block;">
                  Web: <a href="https://mathrulabs.com" style="color: #38BDF8; text-decoration: none;">mathrulabs.com</a> · Email: <a href="mailto:hello@mathrulabs.com" style="color: #38BDF8; text-decoration: none;">hello@mathrulabs.com</a> · Direct: <a href="tel:+919704506779" style="color: #38BDF8; text-decoration: none;">+91 97045 06779</a>
                </span>
              </div>
            </td>
          </tr>

          <!-- Legal / Compliance Footer -->
          <tr>
            <td style="padding: 22px 36px; background-color: #070B16; border-top: 1px solid #121A2A; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748B;">
                © ${new Date().getFullYear()} Mathru Labs. Hyderabad, Telangana, India. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                This automated confirmation was dispatched to <span style="color: #64748B;">${clientEmail}</span> for Reference Code ${referenceId}.
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
