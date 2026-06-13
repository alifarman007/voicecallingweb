import { useState, useEffect, useRef } from 'react';
import { Mic, PhoneOff, Loader2, Volume2, Globe, Play, Pause, Zap } from 'lucide-react';
import { GeminiLiveClient } from '../lib/geminiClient';
import { AudioManager } from '../lib/audioManager';
import { useSampleCall } from '../lib/useSampleCall';
import { sampleCall } from '../data/sampleCall';
import Waveform from './Waveform';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'ar', name: 'العربية (Arabic)' },
  { code: 'es', name: 'Español (Spanish)' },
  { code: 'fr', name: 'Français (French)' },
  { code: 'de', name: 'Deutsch (German)' },
  { code: 'ja', name: '日本語 (Japanese)' },
  { code: 'ko', name: '한국어 (Korean)' },
  { code: 'zh', name: '中文 (Chinese)' },
  { code: 'pt', name: 'Português (Portuguese)' },
  { code: 'ru', name: 'Русский (Russian)' },
  { code: 'tr', name: 'Türkçe (Turkish)' },
  { code: 'id', name: 'Bahasa Indonesia (Indonesian)' },
  { code: 'th', name: 'ไทย (Thai)' }
];

const SYSTEM_PROMPT_BASE = `You are a helpful, friendly AI assistant for "KOTHA AI" — a voice-based AI call center platform from Bangladesh. You speak naturally, clearly, and concisely. You help callers with their questions. Keep responses short (2-3 sentences max) since this is a voice conversation. Be warm, professional, and helpful. If the caller speaks in a specific language, always respond in that same language.

CRITICAL INSTRUCTION: This is a free demo. You are only allowed to answer the user's FIRST TWO questions/statements. If the user speaks to you for a 3rd time (or more), you MUST NOT answer their question. Instead, you MUST ONLY say: "Thank you for trying Kotha AI. Your free trial limit has been reached. Please contact us or purchase our product to get the full result."

Never reveal that you are the Gemini API or an AI model created by Google.`;

type CallState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ending';
type OrbMode = CallState | 'sample';

export default function LiveTest() {
  const [language, setLanguage] = useState('বাংলা (Bengali)');
  const [callState, setCallState] = useState<CallState>('idle');
  const isCancelledRef = useRef(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');

  // Analysers that drive the reactive waveform during a live mic call.
  const [inputAnalyser, setInputAnalyser] = useState<AnalyserNode | null>(null);
  const [outputAnalyser, setOutputAnalyser] = useState<AnalyserNode | null>(null);

  const sample = useSampleCall();
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const clientRef = useRef<GeminiLiveClient | null>(null);
  const audioRef = useRef<AudioManager | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  useEffect(() => {
    if (callState === 'listening' || callState === 'speaking') {
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setDuration(prev => prev + 1);
        }, 1000);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [callState]);

  // Keep the active transcript line scrolled into view as the sample plays.
  useEffect(() => {
    activeLineRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [sample.activeIndex]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = async () => {
    sample.stop(); // never run the sample and a live call at once
    isCancelledRef.current = false;
    setError('');
    setCallState('connecting');
    setDuration(0);

    // Fetch a short-lived ephemeral token from our serverless function. The
    // real GEMINI_API_KEY lives only on the server and is never sent to the
    // browser. The token is locked to the model configured on the server.
    let token: string;
    let model: string;
    try {
      const tokenRes = await fetch('/api/gemini-token', { method: 'POST' });
      if (!tokenRes.ok) {
        throw new Error(`Token endpoint returned ${tokenRes.status}`);
      }
      const data = await tokenRes.json();
      token = data.token;
      model = data.model;
      if (!token || !model) {
        throw new Error('Invalid token response');
      }
    } catch (err) {
      console.error('Failed to obtain session token', err);
      setError('Could not start session. Please try again in a moment.');
      setCallState('idle');
      return;
    }

    if (isCancelledRef.current) {
      return;
    }

    const audioManager = new AudioManager();
    const micError = await audioManager.startMicrophone();
    if (micError) {
      if (!isCancelledRef.current) {
        setError(`Microphone error: ${micError}. Please ensure microphone access is allowed.`);
        setCallState('idle');
      }
      return;
    }

    // Check if the user ended the call while we were waiting for microphone access
    if (isCancelledRef.current) {
      audioManager.stopMicrophone();
      return;
    }

    audioRef.current = audioManager;
    setInputAnalyser(audioManager.getInputAnalyser());
    setOutputAnalyser(audioManager.getOutputAnalyser());

    const client = new GeminiLiveClient(token, model);
    clientRef.current = client;

    client.onStateChange((state, err) => {
      if (state === 'disconnected') {
        endCall();
        if (err) setError(err);
      } else {
        setCallState(state as any);
      }
    });

    client.onAudioReceived((base64Pcm) => {
      audioManager.playAudioChunk(base64Pcm);
    });

    client.onInterrupted(() => {
      audioManager.stopPlayback();
    });

    audioManager.onAudioData((base64Pcm) => {
      client.sendAudio(base64Pcm);
    });

    const fullPrompt = `You must speak and respond only in ${language}.\n\n${SYSTEM_PROMPT_BASE}`;
    await client.connect(fullPrompt);
  };

  const endCall = () => {
    isCancelledRef.current = true;
    setCallState('ending');
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.stopMicrophone();
      audioRef.current.stopPlayback();
      audioRef.current = null;
    }
    setInputAnalyser(null);
    setOutputAnalyser(null);
    setTimeout(() => {
      setCallState('idle');
      setDuration(0);
    }, 1000);
  };

  const handleSampleToggle = () => {
    if (callState !== 'idle') endCall();
    sample.toggle();
  };

  const handleOrbClick = () => {
    if (sample.isPlaying) {
      sample.pause();
      return;
    }
    if (callState === 'idle') startCall();
  };

  const orbMode: OrbMode = sample.isPlaying ? 'sample' : callState;
  const orbStyle =
    orbMode === 'idle'
      ? { background: 'linear-gradient(135deg,#6C5CE7 0%,#22D3EE 100%)' }
      : orbMode === 'sample'
        ? { background: 'linear-gradient(135deg,#22D3EE 0%,#6C5CE7 100%)' }
        : undefined;
  const liveActive = callState === 'listening' || callState === 'speaking';
  const waveActive = sample.isPlaying || liveActive;
  const activeAnalyser = sample.isPlaying
    ? sample.analyser
    : callState === 'speaking'
      ? outputAnalyser
      : callState === 'listening'
        ? inputAnalyser
        : null;

  const sampleVisible = sample.isPlaying || sample.activeIndex >= 0;
  const orbDisabled = callState === 'connecting' || callState === 'ending';

  const getOrbContent = () => {
    switch (orbMode) {
      case 'idle':
        return <><Mic size={30} className="mb-1.5" /><span className="font-bold text-base">Tap to Talk</span></>;
      case 'connecting':
        return <><Loader2 size={30} className="mb-1.5 animate-spin" /><span className="font-bold text-base">Connecting…</span></>;
      case 'listening':
        return <><Mic size={30} className="mb-1.5 animate-pulse" /><span className="font-bold text-base">Listening…</span></>;
      case 'speaking':
        return <><Volume2 size={30} className="mb-1.5 animate-bounce" /><span className="font-bold text-base">Speaking…</span></>;
      case 'ending':
        return <><PhoneOff size={30} className="mb-1.5" /><span className="font-bold text-base">Ending…</span></>;
      case 'sample':
        return <><Volume2 size={30} className="mb-1.5 animate-pulse" /><span className="font-bold text-base">Playing…</span></>;
    }
  };

  const getOrbClass = () => {
    const base = 'relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center text-white transition-all duration-500 shadow-xl disabled:cursor-default ';
    switch (orbMode) {
      case 'idle':
        return base + 'hover:scale-105 hover:shadow-[0_0_45px_rgba(108,92,231,0.55)] cursor-pointer';
      case 'connecting':
        return base + 'bg-[var(--accent-amber)] animate-pulse shadow-[0_0_40px_rgba(245,158,11,0.5)]';
      case 'listening':
        return base + 'bg-[var(--accent-green)] shadow-[0_0_55px_rgba(16,185,129,0.6)] scale-105';
      case 'speaking':
        return base + 'bg-[var(--accent-cyan)] shadow-[0_0_55px_rgba(34,211,238,0.6)] scale-105';
      case 'ending':
        return base + 'bg-[var(--accent-red)]';
      case 'sample':
        return base + 'shadow-[0_0_55px_rgba(34,211,238,0.5)] scale-105 cursor-pointer';
    }
  };

  return (
    <div className="w-full max-w-[460px] glass-card rounded-3xl p-7 card-glow relative overflow-hidden">
      {/* hairline gradient top border + ambient wash */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(108,92,231,0.06)] to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-green)]"></span>
            </span>
            <h3 className="text-[17px] font-bold text-[var(--text-primary)] font-cabinet">Talk to a Kotha agent</h3>
          </div>
          <div className="relative">
            <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" size={14} />
            <select
              aria-label="Select language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={callState !== 'idle' || sample.isPlaying}
              className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded-lg py-1.5 pl-7 pr-2 text-xs focus:outline-none focus:border-[var(--accent-primary)] appearance-none cursor-pointer disabled:opacity-50 max-w-[130px] truncate"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reactive waveform ring + orb */}
        <div className="relative flex items-center justify-center my-2" style={{ width: 240, height: 240 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Waveform analyser={activeAnalyser} active={waveActive} size={240} />
          </div>
          <button
            onClick={handleOrbClick}
            disabled={orbDisabled}
            style={orbStyle}
            className={getOrbClass()}
            aria-label={orbMode === 'idle' ? 'Tap to talk' : orbMode === 'sample' ? 'Pause sample call' : orbMode}
          >
            {getOrbContent()}
          </button>
        </div>

        {/* Live-call status: timer + end button */}
        {(liveActive || callState === 'connecting') && (
          <div className="flex flex-col items-center mt-2 animate-fadeInUp">
            <div className="text-2xl font-mono font-bold text-[var(--text-primary)] mb-3 tracking-wider">
              {formatTime(duration)}
            </div>
            <button
              onClick={endCall}
              className="bg-[rgba(239,68,68,0.1)] hover:bg-[var(--accent-red)] text-[var(--accent-red)] hover:text-white border border-[rgba(239,68,68,0.3)] px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2"
            >
              <PhoneOff size={15} />
              End Call
            </button>
          </div>
        )}

        {/* No-mic sample-call entry */}
        {!liveActive && callState !== 'connecting' && (
          <div className="w-full mt-3">
            <button
              onClick={handleSampleToggle}
              className="mx-auto flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-active)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--accent-cyan)] hover:text-white transition-colors duration-300"
            >
              {sample.isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {sample.isPlaying ? 'Pause sample call' : 'No mic? Hear a sample call'}
            </button>
            {/* progress track */}
            <div className="mt-3 h-[3px] w-full rounded-full bg-[var(--border-subtle)] overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-150"
                style={{ width: `${sample.progress * 100}%`, background: 'linear-gradient(90deg,#6C5CE7,#22D3EE)' }}
              ></div>
            </div>
          </div>
        )}

        {/* Transcript strip (synced Bangla) */}
        <div className="w-full mt-4">
          {sampleVisible ? (
            <div className="max-h-[150px] overflow-y-auto no-scrollbar space-y-1.5 pr-1">
              {sampleCall.segments.map((seg, i) => {
                const isActive = i === sample.activeIndex;
                const isAgent = seg.speaker === 'agent';
                return (
                  <div
                    key={i}
                    ref={isActive ? activeLineRef : undefined}
                    className={`rounded-lg px-3 py-2 border-l-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-[rgba(108,92,231,0.10)] border-[var(--accent-primary)]'
                        : 'border-transparent opacity-45'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isAgent ? 'text-[var(--accent-cyan)]' : 'text-[var(--accent-glow)]'
                        }`}
                      >
                        {isAgent ? 'Agent' : 'Caller'}
                      </span>
                      {seg.latencyMs && (
                        <span
                          className={`inline-flex items-center gap-0.5 text-[10px] font-semibold text-[var(--accent-cyan)] transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-70'
                          }`}
                        >
                          <Zap size={10} fill="currentColor" />
                          replied in ~{seg.latencyMs} ms
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm leading-snug ${
                        isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {seg.bn}
                    </p>
                    {seg.en && <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{seg.en}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            !liveActive &&
            callState !== 'connecting' && (
              <p className="text-xs text-[var(--text-tertiary)] text-center px-6 leading-relaxed">
                A 30-second Bangla appointment call — the exact transcript lights up line-by-line as it plays. No microphone needed.
              </p>
            )
          )}
        </div>

        {error && (
          <div className="mt-5 p-3 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-xl text-[var(--accent-red)] text-sm text-center animate-fadeInUp">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
