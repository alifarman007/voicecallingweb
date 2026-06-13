// One-off offline transcription of public/0613-30s.MP3 into timestamped Bangla.
// Run:  GEMINI_API_KEY="..." node scripts/transcribe.mjs
// The key is read from the environment only — never hardcode or commit it.
// Writes: scripts/transcript.pass1.json (raw) and scripts/transcript.out.json (verified).
import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync } from 'node:fs';

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('Missing GEMINI_API_KEY in environment.');
  process.exit(1);
}

const AUDIO_PATH = 'public/0613-30s.MP3';
const audioPart = {
  inlineData: { mimeType: 'audio/mp3', data: readFileSync(AUDIO_PATH).toString('base64') },
};

const PASS1 = `You are a professional Bengali (Bangla) transcriptionist with native fluency.
The attached audio is a ~30 second phone call (likely customer support) in Bangla. It may contain two speakers and Banglish (Bangla-English code-switching).

Transcribe it with these rules:
1. Write Bangla in correct, natural Bengali (Unicode) script with ACCURATE spelling and proper conjuncts (যুক্তাক্ষর). Do not anglicize Bangla words.
2. Keep genuinely English words (brand names, "account", "okay", etc.) in Latin script only if they are actually spoken in English.
3. Split into segments at natural sentence / speaker-turn boundaries.
4. For each segment, estimate start and end time in SECONDS (numbers), and label the speaker as "agent" or "customer" based on role/context.
5. Do NOT translate. Do NOT add commentary.

Return ONLY valid JSON (no markdown fences), exactly this shape:
{"durationSec": <number>, "segments": [{"start": <number>, "end": <number>, "speaker": "agent"|"customer", "bn": "<text>"}]}`;

const pass2Prompt = (draft) => `Below is a DRAFT transcription of the attached Bangla audio. Listen to the audio again very carefully and CORRECT it:
- Fix any misheard words.
- Fix any Bangla spelling or conjunct (যুক্তাক্ষর) errors so spelling is standard and correct.
- Keep timings and speaker labels; adjust only if clearly wrong.
- Do NOT translate; keep Bangla in Bengali script.

DRAFT JSON:
${draft}

Return ONLY the corrected JSON in the exact same schema, no markdown fences.`;

const MODELS = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.0-flash', 'gemini-2.5-pro'];
const API_VERSIONS = [undefined, 'v1alpha', 'v1beta'];

function clean(t) {
  return (t || '').replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
}

async function generate(ai, model, parts) {
  const r = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts }],
    config: { responseMimeType: 'application/json', temperature: 0 },
  });
  return r.text;
}

async function run() {
  let lastErr;
  for (const apiVersion of API_VERSIONS) {
    const ai = new GoogleGenAI(
      apiVersion ? { apiKey: KEY, httpOptions: { apiVersion } } : { apiKey: KEY }
    );
    for (const model of MODELS) {
      try {
        console.error(`[try] apiVersion=${apiVersion ?? 'default'} model=${model}`);
        const text1 = clean(await generate(ai, model, [audioPart, { text: PASS1 }]));
        JSON.parse(text1); // validate
        writeFileSync('scripts/transcript.pass1.json', text1);
        console.error('[ok] pass 1 transcription succeeded');

        let finalText = text1;
        try {
          const text2 = clean(await generate(ai, model, [audioPart, { text: pass2Prompt(text1) }]));
          JSON.parse(text2);
          finalText = text2;
          console.error('[ok] pass 2 spelling verification succeeded');
        } catch (e2) {
          console.error('[warn] pass 2 failed, keeping pass 1:', e2?.message || e2);
        }

        writeFileSync('scripts/transcript.out.json', finalText);
        console.error(`\n[done] config: apiVersion=${apiVersion ?? 'default'} model=${model}`);
        console.log(finalText);
        return;
      } catch (e) {
        lastErr = e;
        console.error(`[fail] ${model}: ${e?.message || e}`);
      }
    }
  }
  console.error('\nAll attempts failed. Last error:');
  console.error(lastErr?.message || lastErr);
  process.exit(2);
}

run();
