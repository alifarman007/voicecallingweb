import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3.1-flash-live-preview';
const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes — total token lifetime
const NEW_SESSION_TTL_MS = 5 * 60 * 1000; // 5 min — window to start the WS

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    res.status(500).json({ error: 'Server misconfigured' });
    return;
  }

  try {
    // authTokens.create is a v1alpha-only endpoint; default v1 returns 404.
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { apiVersion: 'v1alpha' },
    });
    // Note: we intentionally do NOT set `liveConnectConstraints` here.
    // Passing only `model` in the constraint (without a full LiveConnectConfig)
    // causes Google to close the WS with a generic "Internal error encountered"
    // (close code 1011), because the client's runtime config doesn't match an
    // (implicitly-empty) constraint config. With `uses: 1` + short TTL the
    // blast radius of a leaked token is already tiny.
    const now = Date.now();
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(now + TOKEN_TTL_MS).toISOString(),
        newSessionExpireTime: new Date(now + NEW_SESSION_TTL_MS).toISOString(),
      },
    });

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ token: token.name, model: MODEL });
  } catch (err: any) {
    // Log structured fields so the full error survives Vercel's log table.
    console.error('Token creation failed', JSON.stringify({
      message: err?.message,
      name: err?.name,
      status: err?.status ?? err?.code,
      details: err?.details ?? err?.cause,
    }));
    res.status(500).json({ error: 'Failed to create session token' });
  }
}
