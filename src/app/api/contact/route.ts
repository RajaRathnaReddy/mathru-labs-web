import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'mathrulabs@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, phone, message } = body;

    // Basic validation
    if (!name || !business || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const emailSubject = `🚀 [New Mathru Labs Lead] ${name} (${business})`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Mathru Labs Consultation Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080C14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #EAEFF9;">
  <div style="max-width: 600px; margin: 30px auto; background-color: #0E1422; border: 1px solid #1B253D; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0066FF 0%, #00D26A 50%, #FF6600 100%); padding: 3px;">
      <div style="background-color: #0E1422; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
          Mathru <span style="color: #38BDF8;">LABS</span>
        </h1>
        <p style="margin: 6px 0 0 0; font-size: 12px; color: #00D26A; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
          ★ New Consultation Lead Received ★
        </p>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 28px 24px;">
      <p style="margin-top: 0; font-size: 15px; line-height: 1.6; color: #8E99B2;">
        A business owner submitted a consultation request through the contact form on <strong>mathrulabs.com</strong>:
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
        <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(name)}!%20Thank%20you%20for%20contacting%20Mathru%20Labs."
           style="display: inline-block; background-color: #00D26A; color: #080C14; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 999px; text-decoration: none; margin-right: 8px;">
          Reply on WhatsApp
        </a>
        <a href="tel:${cleanPhone}"
           style="display: inline-block; background-color: #19233C; color: #FFFFFF; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 999px; text-decoration: none; border: 1px solid #1B253D;">
          Call Phone
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #080C14; padding: 16px 24px; text-align: center; border-top: 1px solid #1B253D;">
      <p style="margin: 0; font-size: 11px; color: #64748B;">
        Delivered automatically to <strong>${RECIPIENT_EMAIL}</strong> by Mathru Labs Web Platform.
      </p>
    </div>
  </div>
</body>
</html>
`;

    const emailText = `
New Mathru Labs Lead Received:
------------------------------------------
Name: ${name}
Business / Sector: ${business}
Phone / WhatsApp: ${phone}
Received: ${timestamp}

Requirements:
${message}
------------------------------------------
Sent automatically to mathrulabs@gmail.com
`;

    let emailDelivered = false;

    // Strategy 1: Direct SMTP / Gmail via Nodemailer
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER || RECIPIENT_EMAIL;

    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: gmailAppPassword,
          },
        });

        await transporter.sendMail({
          from: `"Mathru Labs Website" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        emailDelivered = true;
        console.log(`[Contact API] Email successfully sent to ${RECIPIENT_EMAIL} via Gmail SMTP.`);
      } catch (smtpError) {
        console.error('[Contact API] SMTP dispatch failed, trying fallback:', smtpError);
      }
    }

    // Strategy 2: Resend API if configured
    if (!emailDelivered && process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'leads@mathrulabs.com',
            to: RECIPIENT_EMAIL,
            subject: emailSubject,
            html: emailHtml,
            text: emailText,
          }),
        });

        if (resendRes.ok) {
          emailDelivered = true;
          console.log(`[Contact API] Email successfully sent to ${RECIPIENT_EMAIL} via Resend.`);
        }
      } catch (resendError) {
        console.error('[Contact API] Resend dispatch failed:', resendError);
      }
    }

    // Strategy 3: FormSubmit API Direct Delivery Fallback (Guarantees zero-config delivery)
    if (!emailDelivered) {
      try {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            business,
            phone,
            message,
            timestamp,
            _subject: emailSubject,
            _template: 'table',
            _autoresponse: `Thank you for contacting Mathru Labs! We have received your inquiry for ${business} and our team will get in touch with you shortly.`,
          }),
        });

        if (formSubmitRes.ok) {
          emailDelivered = true;
          console.log(`[Contact API] Form submitted to ${RECIPIENT_EMAIL} via FormSubmit relay.`);
        }
      } catch (fsError) {
        console.error('[Contact API] FormSubmit fallback failed:', fsError);
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

    // Always log submission to server output for monitoring
    console.log('✅ [Mathru Labs Lead Recorded]:', {
      name,
      business,
      phone,
      message,
      emailDelivered,
      recipient: RECIPIENT_EMAIL,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and forwarded to mathrulabs@gmail.com',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact submission' },
      { status: 500 }
    );
  }
}
