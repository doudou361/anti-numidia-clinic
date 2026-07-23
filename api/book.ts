import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const algerianPhoneRegex = /^(?:\+213|00213|0)([5-7]\d{8})$/;

const serverSchema = z.object({
  serviceId: z.string(),
  serviceName: z.string().optional(),
  date: z.string(),
  time: z.string(),
  fullName: z.string().min(3),
  phone: z.string().transform(val => val.replace(/[\s.-]/g, '')).refine(val => algerianPhoneRegex.test(val)),
  message: z.string().optional(),
  consent: z.boolean(),
  locale: z.string(),
  source: z.string(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const payload = serverSchema.parse(req.body);

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

    if (!webhookUrl || !webhookSecret) {
      // Mock mode
      console.log("[MOCK MODE] Booking payload:", payload);
      await new Promise(resolve => setTimeout(resolve, 700));
      return res.status(200).json({ ok: true, reference: `NDH-${Math.floor(Math.random() * 900000) + 100000}` });
    }

    const n8nRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': webhookSecret
      },
      body: JSON.stringify(payload)
    });

    if (!n8nRes.ok) {
      throw new Error(`n8n webhook failed with status ${n8nRes.status}`);
    }

    const data = await n8nRes.json();

    return res.status(200).json({ 
      ok: true, 
      reference: data.reference || `NDH-${Math.floor(Math.random() * 900000) + 100000}` 
    });

  } catch (error) {
    console.error("Booking submission error:", error);
    return res.status(400).json({ ok: false, error: "Invalid request or submission failed" });
  }
}
