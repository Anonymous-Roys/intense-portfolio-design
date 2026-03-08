import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    const EMAIL_USER = Deno.env.get('EMAIL_USER');
    const EMAIL_PASSWORD = Deno.env.get('EMAIL_PASSWORD');

    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      throw new Error('Email credentials not configured');
    }

    const client = new SmtpClient();

    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: EMAIL_USER,
      password: EMAIL_PASSWORD,
    });

    // Send notification to you
    await client.send({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      content: `text/html`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #9b87f5;">New Contact Message</h2>
          <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #e4e4e7;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #71717a; font-size: 12px;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    // Send confirmation to the sender
    await client.send({
      from: EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      content: `text/html`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #9b87f5;">Thank You for Your Message!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible. Here's a copy of what you sent:</p>
          <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p>Best regards,<br><strong>David Arhin</strong></p>
          <hr style="border: 1px solid #e4e4e7;">
          <p style="color: #71717a; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
        </div>
      `,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
