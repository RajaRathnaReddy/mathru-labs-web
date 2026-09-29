import { NextRequest, NextResponse } from 'next/server';

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

    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('WEBHOOK_URL is not configured. Form submission logged but not forwarded.');
      console.log('Contact form submission:', { name, business, phone, message });
      return NextResponse.json({ success: true });
    }

    // Forward to n8n webhook
    const webhookResponse = await fetch(webhookUrl, {
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

    if (!webhookResponse.ok) {
      throw new Error(`Webhook responded with ${webhookResponse.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
