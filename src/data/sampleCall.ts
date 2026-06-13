// Transcript for the no-mic "Hear a sample call" demo.
// Generated offline from public/0613-30s.MP3 via Gemini (gemini-2.5-flash),
// two passes: transcription + a Bangla spelling-verification pass.
// English glosses are translations for non-Bangla viewers (shown muted).
// Regenerate with: GEMINI_API_KEY="..." node scripts/transcribe.mjs

export type Speaker = 'agent' | 'customer';

export interface CallSegment {
  start: number; // seconds
  end: number;   // seconds
  speaker: Speaker;
  bn: string;    // exact Bangla line shown in sync with playback
  en?: string;   // optional translation (muted helper text)
  latencyMs?: number; // representative agent response time, shown as a tiny badge on the line
}

export interface SampleCall {
  src: string;
  durationSec: number;
  language: string;
  segments: CallSegment[];
}

export const sampleCall: SampleCall = {
  src: '/0613-30s.MP3',
  durationSec: 31,
  language: 'Bangla',
  segments: [
    {
      start: 0.0,
      end: 1.8,
      speaker: 'agent',
      bn: 'কিভাবে সাহায্য করতে পারি?',
      en: 'How can I help you?',
    },
    {
      start: 3.0,
      end: 5.8,
      speaker: 'customer',
      bn: 'আমার একটা অ্যাপয়েন্টমেন্ট লাগবে আগামীকাল।',
      en: 'I need an appointment for tomorrow.',
    },
    {
      start: 6.9,
      end: 14.5,
      speaker: 'agent',
      bn: 'জি, একটু দেখছি। আগামীকাল সকাল ৯টা, ৯:৩০টা বা ১০:৩০টায় নিতে পারেন। কোন সময়টা আপনার পছন্দ?',
      en: 'Sure, let me check. Tomorrow you can take 9:00, 9:30, or 10:30 AM. Which time do you prefer?',
      latencyMs: 290,
    },
    {
      start: 16.5,
      end: 18.5,
      speaker: 'customer',
      bn: '১০:৩০টা।',
      en: '10:30.',
    },
    {
      start: 22.5,
      end: 27.8,
      speaker: 'agent',
      bn: 'আচ্ছা, কাল সকাল ১০:৩০টায় আপনার অ্যাপয়েন্টমেন্ট বুক করে দিচ্ছি। আর কিছু কি সাহায্য লাগবে?',
      en: "Done — I'm booking your appointment for 10:30 AM tomorrow. Anything else I can help with?",
      latencyMs: 310,
    },
    {
      start: 29.0,
      end: 30.8,
      speaker: 'customer',
      bn: 'না, আর কিছু সাহায্য লাগবে না।',
      en: "No, that's all — thank you.",
    },
  ],
};
