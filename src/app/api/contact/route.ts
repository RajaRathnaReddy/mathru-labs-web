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
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

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
    // 1. ADMIN NOTIFICATION EMAIL (Delivered to mathrulabs@gmail.com)
    // ─────────────────────────────────────────────────────────────────────────────
    const adminSubject = `🔥 [New Client Lead] ${name} — ${business}`;
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Mathru Labs Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080C14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #EAEFF9;">
  <div style="max-width: 620px; margin: 30px auto; background-color: #0E1422; border: 1px solid #1B253D; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 48px rgba(0,0,0,0.6);">
    
    <!-- Top Gradient Bar -->
    <div style="background: linear-gradient(135deg, #0066FF 0%, #00D26A 50%, #FF6600 100%); padding: 3px;">
      <div style="background-color: #0E1422; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
          Mathru <span style="color: #38BDF8;">LABS</span>
        </h1>
        <p style="margin: 6px 0 0 0; font-size: 12px; color: #00D26A; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
          ★ New Client Consultation Inquiry ★
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div style="padding: 28px 24px;">
      <p style="margin-top: 0; font-size: 15px; line-height: 1.6; color: #8E99B2;">
        A new inquiry has been submitted through the contact form on <strong>mathrulabs.com</strong>:
      </p>

      <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin: 20px 0; background-color: #12192B; border: 1px solid #19233C; border-radius: 12px; overflow: hidden;">
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #8E99B2; border-bottom: 1px solid #19233C; width: 35%;">Client Name</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #FFFFFF; border-bottom: 1px solid #19233C;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #8E99B2; border-bottom: 1px solid #19233C;">Business / Industry</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #FF6600; border-bottom: 1px solid #19233C;">${business}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #8E99B2; border-bottom: 1px solid #19233C;">Email Address</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #38BDF8; border-bottom: 1px solid #19233C;">
            ${clientEmail ? `<a href="mailto:${clientEmail}" style="color: #38BDF8; text-decoration: none;">${clientEmail}</a>` : '<span style="color: #64748B;">Not provided</span>'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #8E99B2; border-bottom: 1px solid #19233C;">Phone / WhatsApp</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #00D26A; border-bottom: 1px solid #19233C;">
            <a href="tel:${cleanPhone}" style="color: #00D26A; text-decoration: none;">${phone}</a>
            &nbsp;·&nbsp;
            <a href="https://wa.me/${cleanPhone}" style="color: #38BDF8; text-decoration: underline; font-size: 12px;">Chat on WhatsApp →</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #8E99B2; border-bottom: 1px solid #19233C;">Received At</td>
          <td style="padding: 12px 16px; font-size: 13px; color: #8E99B2; border-bottom: 1px solid #19233C;">${timestamp}</td>
        </tr>
        <tr>
          <td style="padding: 14px 16px; font-size: 13px; color: #8E99B2; vertical-align: top;">Requirements</td>
          <td style="padding: 14px 16px; font-size: 13px; line-height: 1.6; color: #EAEFF9; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>

      <!-- Quick Action Buttons -->
      <div style="text-align: center; margin: 30px 0 10px 0;">
        <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)}!%20Thank%20you%20for%20contacting%20Mathru%20Labs%20regarding%20your%20${encodeURIComponent(business)}%20requirements."
           style="display: inline-block; background-color: #00D26A; color: #080C14; font-weight: 700; font-size: 14px; padding: 12px 22px; border-radius: 999px; text-decoration: none; margin: 4px;">
          🟢 Reply on WhatsApp
        </a>
        ${clientEmail ? `
        <a href="mailto:${clientEmail}?subject=Re:%20Mathru%20Labs%20Consultation%20—%20${encodeURIComponent(business)}"
           style="display: inline-block; background-color: #0066FF; color: #FFFFFF; font-weight: 700; font-size: 14px; padding: 12px 22px; border-radius: 999px; text-decoration: none; margin: 4px;">
          ✉️ Reply via Email
        </a>` : ''}
        <a href="tel:${cleanPhone}"
           style="display: inline-block; background-color: #19233C; color: #FFFFFF; font-weight: 600; font-size: 14px; padding: 12px 22px; border-radius: 999px; text-decoration: none; border: 1px solid #1B253D; margin: 4px;">
          📞 Call Client
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #080C14; padding: 16px 24px; text-align: center; border-top: 1px solid #1B253D;">
      <p style="margin: 0; font-size: 11px; color: #64748B;">
        Delivered automatically to <strong>${ADMIN_EMAIL}</strong> via Mathru Labs Mail Engine.
      </p>
    </div>
  </div>
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
        text: `New Lead from ${name} (${business})\nPhone: ${phone}\nEmail: ${clientEmail || 'N/A'}\nMessage:\n${message}`,
      });
      adminEmailSent = true;
      console.log(`[Contact API] Admin lead alert delivered to ${ADMIN_EMAIL}`);
    } catch (err) {
      console.error('[Contact API] Failed to send admin email:', err);
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // 2. CLIENT CONFIRMATION EMAIL (Delivered to client's email)
    // ─────────────────────────────────────────────────────────────────────────────
    if (clientEmail) {
      const clientSubject = `✨ We Received Your Inquiry — Mathru Labs Engineering Team`;
      const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Confirmation — Mathru Labs</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070B14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #EAEFF9;">
  <div style="max-width: 600px; margin: 30px auto; background-color: #0E1422; border: 1px solid #1C2740; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 50px rgba(0,0,0,0.5);">
    
    <!-- Top Aesthetic Ribbon -->
    <div style="background: linear-gradient(135deg, #0066FF 0%, #00D26A 50%, #FF6600 100%); padding: 3px;">
      <div style="background-color: #0E1422; padding: 28px 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px;">
          Mathru <span style="color: #38BDF8;">LABS</span>
        </h1>
        <p style="margin: 8px 0 0 0; font-size: 11px; color: #8E99B2; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
          AI Tools · Custom Software · Enterprise Automation
        </p>
      </div>
    </div>

    <!-- Body -->
    <div style="padding: 32px 28px;">
      <h2 style="margin-top: 0; font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.3px;">
        Hello ${name},
      </h2>
      
      <p style="font-size: 15px; line-height: 1.7; color: #C5CEE0; margin-bottom: 20px;">
        Thank you for reaching out to <strong>Mathru Labs</strong>. We have successfully received your inquiry regarding custom software, automated tools, and AI workflows for <strong>${business}</strong>.
      </p>

      <p style="font-size: 15px; line-height: 1.7; color: #C5CEE0; margin-bottom: 24px;">
        Our engineering team is currently reviewing your operational requirements to identify the highest-impact automation solutions tailored specifically to your business.
      </p>

      <!-- Inquiry Summary Card -->
      <div style="background-color: #12192B; border: 1px solid #1E2945; border-radius: 12px; padding: 18px 20px; margin-bottom: 28px;">
        <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #00D26A; text-transform: uppercase; letter-spacing: 1px;">
          ✓ Your Submission Details
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 4px 0; color: #8E99B2; width: 35%;">Business / Industry:</td>
            <td style="padding: 4px 0; color: #FFFFFF; font-weight: 600;">${business}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #8E99B2;">Contact Phone:</td>
            <td style="padding: 4px 0; color: #FFFFFF; font-weight: 600;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0 2px 0; color: #8E99B2; vertical-align: top;">Your Requirements:</td>
            <td style="padding: 6px 0 2px 0; color: #EAEFF9; line-height: 1.5; font-style: italic;">"${message}"</td>
          </tr>
        </table>
      </div>

      <!-- What Happens Next Section -->
      <h3 style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0; letter-spacing: -0.2px;">
        What Happens Next?
      </h3>

      <div style="margin-bottom: 28px;">
        <!-- Step 1 -->
        <div style="display: flex; margin-bottom: 14px;">
          <div style="background-color: rgba(0, 102, 255, 0.15); color: #38BDF8; font-weight: 800; font-size: 13px; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; flex-shrink: 0; margin-right: 14px; border: 1px solid rgba(0, 102, 255, 0.3);">1</div>
          <div style="font-size: 13px; line-height: 1.6; color: #8E99B2;">
            <strong style="color: #FFFFFF;">Workflow & Architecture Review</strong><br>
            Our core team reviews your routine processes to map out how custom software or AI agents can eliminate manual bottlenecks.
          </div>
        </div>

        <!-- Step 2 -->
        <div style="display: flex; margin-bottom: 14px;">
          <div style="background-color: rgba(0, 210, 106, 0.15); color: #00D26A; font-weight: 800; font-size: 13px; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; flex-shrink: 0; margin-right: 14px; border: 1px solid rgba(0, 210, 106, 0.3);">2</div>
          <div style="font-size: 13px; line-height: 1.6; color: #8E99B2;">
            <strong style="color: #FFFFFF;">System Blueprint & Roadmap</strong><br>
            We prepare a concrete architecture recommendation, showing expected delivery time (typically 2-week pilot) and outcome targets.
          </div>
        </div>

        <!-- Step 3 -->
        <div style="display: flex;">
          <div style="background-color: rgba(255, 107, 0, 0.15); color: #FF6B00; font-weight: 800; font-size: 13px; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; flex-shrink: 0; margin-right: 14px; border: 1px solid rgba(255, 107, 0, 0.3);">3</div>
          <div style="font-size: 13px; line-height: 1.6; color: #8E99B2;">
            <strong style="color: #FFFFFF;">Direct Consultation Follow-up</strong><br>
            A dedicated solution engineer will contact you via WhatsApp or phone within <strong>24 business hours</strong>.
          </div>
        </div>
      </div>

      <!-- Instant WhatsApp Assistance Box -->
      <div style="background: linear-gradient(135deg, rgba(0, 210, 106, 0.08) 0%, rgba(0, 102, 255, 0.05) 100%); border: 1px solid rgba(0, 210, 106, 0.25); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px;">
        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #FFFFFF;">
          Need an immediate response?
        </p>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #8E99B2;">
          If you have urgent project deadlines or questions, message our engineers directly on WhatsApp.
        </p>
        <a href="https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Mathru%20Labs%20Team!%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(business)}%20and%20would%20like%20to%20chat%20directly."
           style="display: inline-block; background-color: #00D26A; color: #070B14; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 999px; text-decoration: none; box-shadow: 0 4px 16px rgba(0, 210, 106, 0.35);">
          💬 Chat on WhatsApp (+91 97045 06779)
        </a>
      </div>

      <!-- Trust Badges -->
      <div style="border-top: 1px solid #1C2740; padding-top: 20px; margin-top: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; color: #8E99B2;">
          <tr>
            <td style="text-align: center; padding: 6px;">🔒 100% Data Confidentiality</td>
            <td style="text-align: center; padding: 6px;">🛡️ Zero Data Resale Guarantee</td>
            <td style="text-align: center; padding: 6px;">⚡ 2-Week Live Pilot Ready</td>
          </tr>
        </table>
      </div>

      <!-- Signature -->
      <div style="margin-top: 28px; font-size: 14px; line-height: 1.6; color: #8E99B2;">
        Warm regards,<br>
        <strong style="color: #FFFFFF; font-size: 15px;">The Engineering & Solutions Team</strong><br>
        <span style="color: #38BDF8;">Mathru Labs</span> — <span style="font-size: 12px; color: #64748B;">Custom Software & AI Systems for Every Industry</span><br>
        <span style="font-size: 12px; color: #64748B;">Website: <a href="https://mathrulabs.com" style="color: #38BDF8; text-decoration: none;">mathrulabs.com</a> · Email: <a href="mailto:hello@mathrulabs.com" style="color: #38BDF8; text-decoration: none;">hello@mathrulabs.com</a></span>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #070B14; padding: 18px 24px; text-align: center; border-top: 1px solid #1C2740;">
      <p style="margin: 0; font-size: 11px; color: #505D77;">
        © ${new Date().getFullYear()} Mathru Labs. Hyderabad, Telangana, India. All rights reserved.
      </p>
    </div>
  </div>
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
          text: `Hello ${name},\n\nThank you for contacting Mathru Labs regarding ${business}. We have received your inquiry and our engineering team will get in touch with you within 24 hours.\n\nSummary:\nBusiness: ${business}\nPhone: ${phone}\nRequirements: ${message}\n\nNeed immediate assistance? Message us on WhatsApp: +91 97045 06779\n\nWarm regards,\nMathru Labs Engineering Team\nhttps://mathrulabs.com`,
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
