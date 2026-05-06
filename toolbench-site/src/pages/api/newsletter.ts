import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = import.meta.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL = import.meta.env.RESEND_FROM_EMAIL || 'newsletter@toolbench.netlify.app';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    return jsonResponse({ error: 'Newsletter is not configured yet.' }, 503);
  }

  let email = '';
  let source = '';
  const contentType = request.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      const body = await request.json();
      email = String(body.email ?? '').trim();
      source = String(body.source ?? 'footer').trim();
    } else {
      const form = await request.formData();
      email = String(form.get('email') ?? '').trim();
      source = String(form.get('source') ?? 'footer').trim();
      // Honeypot: any non-empty value means a bot
      if (form.get('botfield')) return jsonResponse({ ok: true }, 200);
    }
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  if (!email || !isValidEmail(email)) {
    return jsonResponse({ error: 'Please provide a valid email address.' }, 400);
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.contacts.create({
      email,
      audienceId: RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    await resend.emails.send({
      from: `ToolBench <${FROM_EMAIL}>`,
      to: email,
      subject: 'Welcome to ToolBench',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
          <h1 style="font-size: 24px; margin: 0 0 16px;">Welcome aboard.</h1>
          <p>You're now on the ToolBench list. Each week we ship one short email with:</p>
          <ul>
            <li>The single best AI tool we tested</li>
            <li>One brutal verdict on a hyped tool</li>
            <li>Links to fresh side-by-side comparisons</li>
          </ul>
          <p>No vendor sponsorships. No affiliate kickbacks. Reply with anything you want us to test.</p>
          <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">Source: ${source}</p>
        </div>
      `,
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return jsonResponse({ error: `Could not subscribe: ${message}` }, 500);
  }
};

export const GET: APIRoute = () =>
  jsonResponse({ error: 'Use POST to subscribe.' }, 405);
