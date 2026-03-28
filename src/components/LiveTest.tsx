import React, { useState, useEffect, useRef } from 'react';
import { Mic, PhoneOff, Loader2, Volume2, Globe } from 'lucide-react';
import { GeminiLiveClient } from '../lib/geminiClient';
import { AudioManager } from '../lib/audioManager';

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

export default function LiveTest() {
  const [language, setLanguage] = useState('বাংলা (Bengali)');
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'ending'>('idle');
  const isCancelledRef = useRef(false);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startCall = async () => {
    isCancelledRef.current = false;
    setError('');
    setCallState('connecting');
    setDuration(0);

    // Safely access process.env which is injected by AI Studio at runtime
    let apiKey = '';
    try {
      if (typeof process !== 'undefined' && process.env) {
        apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
      }
    } catch (e) {
      // Ignore process undefined errors
    }
    
    // Fallback to Vite env vars if running locally, or the provided key
    if (!apiKey) {
      apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || 'AIzaSyC3UdIgVbI5_48pQb4p0oGgv059QYWYYZs';
    }

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      setError('API Key is missing. Please ensure it is provided in the environment.');
      setCallState('idle');
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

    const client = new GeminiLiveClient(apiKey);
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
    setTimeout(() => {
      setCallState('idle');
      setDuration(0);
    }, 1000);
  };

  const getButtonContent = () => {
    switch (callState) {
      case 'idle':
        return <><Mic size={32} className="mb-2" /><span className="font-bold text-lg">Tap to Talk</span></>;
      case 'connecting':
        return <><Loader2 size={32} className="mb-2 animate-spin" /><span className="font-bold text-lg">Connecting...</span></>;
      case 'listening':
        return <><Mic size={32} className="mb-2 animate-pulse" /><span className="font-bold text-lg">Listening...</span></>;
      case 'speaking':
        return <><Volume2 size={32} className="mb-2 animate-bounce" /><span className="font-bold text-lg">Agent Speaking...</span></>;
      case 'ending':
        return <><PhoneOff size={32} className="mb-2" /><span className="font-bold text-lg">Ending...</span></>;
    }
  };

  const getButtonClass = () => {
    const base = "w-40 h-40 rounded-full flex flex-col items-center justify-center text-white transition-all duration-500 shadow-xl relative z-10 ";
    switch (callState) {
      case 'idle':
        return base + "bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]";
      case 'connecting':
        return base + "bg-[var(--accent-amber)] animate-pulse shadow-[0_0_40px_rgba(245,158,11,0.5)]";
      case 'listening':
        return base + "bg-[var(--accent-green)] shadow-[0_0_50px_rgba(16,185,129,0.6)] scale-105";
      case 'speaking':
        return base + "bg-[var(--accent-cyan)] shadow-[0_0_50px_rgba(34,211,238,0.6)] scale-105";
      case 'ending':
        return base + "bg-[var(--accent-red)]";
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-3xl p-8 card-glow relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(108,92,231,0.05)] to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 font-cabinet">Test Our AI Agent</h3>
          <p className="text-[var(--text-secondary)] text-sm">Experience real-time AI voice conversation</p>
        </div>

        <div className="w-full mb-8 relative">
          <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2 block text-center">Select Language</label>
          <div className="relative max-w-[240px] mx-auto">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={16} />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={callState !== 'idle'}
              className="w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--accent-primary)] appearance-none cursor-pointer disabled:opacity-50"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative mb-8">
          {/* Ripple effects */}
          {(callState === 'listening' || callState === 'speaking') && (
            <>
              <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" style={{ color: callState === 'listening' ? 'var(--accent-green)' : 'var(--accent-cyan)', animationDuration: '2s' }}></div>
              <div className="absolute inset-[-20px] rounded-full bg-current opacity-10 animate-ping" style={{ color: callState === 'listening' ? 'var(--accent-green)' : 'var(--accent-cyan)', animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
            </>
          )}
          
          <button 
            onClick={callState === 'idle' ? startCall : undefined}
            disabled={callState === 'connecting' || callState === 'ending'}
            className={getButtonClass()}
          >
            {getButtonContent()}
          </button>
        </div>

        {(callState === 'listening' || callState === 'speaking') && (
          <div className="flex items-center justify-center gap-1.5 mb-6 h-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 audio-wave-bar"
                style={{ 
                  color: callState === 'listening' ? 'var(--accent-green)' : 'var(--accent-cyan)',
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        )}

        {(callState === 'listening' || callState === 'speaking' || callState === 'connecting') && (
          <div className="flex flex-col items-center animate-fadeInUp">
            <div className="text-3xl font-mono font-bold text-[var(--text-primary)] mb-6 tracking-wider">
              {formatTime(duration)}
            </div>
            
            <button 
              onClick={endCall}
              className="bg-[rgba(239,68,68,0.1)] hover:bg-[var(--accent-red)] text-[var(--accent-red)] hover:text-white border border-[rgba(239,68,68,0.3)] px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2"
            >
              <PhoneOff size={16} />
              End Call
            </button>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-xl text-[var(--accent-red)] text-sm text-center animate-fadeInUp">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
