import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3.1-flash-live-preview';
const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

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
    const ai = new GoogleGenAI({ apiKey });
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(Date.now() + TOKEN_TTL_MS).toISOString(),
        liveConnectConstraints: {
          model: MODEL,
        },
      },
    });

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ token: token.name, model: MODEL });
  } catch (err: any) {
    console.error('Token creation failed', err);
    res.status(500).json({ error: 'Failed to create session token' });
  }
}
