import { useCallback, useEffect, useRef, useState } from 'react';
import { sampleCall } from '../data/sampleCall';

/**
 * Drives the no-mic "Hear a sample call" demo: plays the bundled MP3 through a
 * Web Audio graph so a real AnalyserNode can feed the waveform, and tracks the
 * currently-spoken transcript line via the audio clock. Playback needs no
 * microphone permission, so this works for 100% of visitors.
 */
export function useSampleCall() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0); // 0..1
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const stopRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  };

  const tick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = audio.currentTime;
    const segs = sampleCall.segments;
    let idx = -1;
    for (let i = 0; i < segs.length; i++) {
      if (t + 0.12 >= segs[i].start) idx = i; // keep the last line lit through gaps
      else break;
    }
    setActiveIndex(idx);
    setProgress(audio.duration ? Math.min(1, t / audio.duration) : 0);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const ensureGraph = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio(sampleCall.src);
      a.preload = 'auto';
      a.addEventListener('ended', () => {
        setIsPlaying(false);
        setActiveIndex(-1);
        setProgress(1);
        stopRaf();
      });
      audioRef.current = a;
    }
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const srcNode = ctx.createMediaElementSource(audioRef.current);
      const an = ctx.createAnalyser();
      an.fftSize = 256;
      an.smoothingTimeConstant = 0.8;
      srcNode.connect(an);
      an.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = an;
      setAnalyser(an);
    }
  }, []);

  const play = useCallback(async () => {
    ensureGraph();
    const audio = audioRef.current!;
    const ctx = ctxRef.current!;
    if (ctx.state === 'suspended') await ctx.resume();
    if (audio.ended || audio.currentTime >= (audio.duration || Infinity)) {
      audio.currentTime = 0;
    }
    try {
      await audio.play();
      setIsPlaying(true);
      stopRaf();
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      setIsPlaying(false);
    }
  }, [ensureGraph, tick]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    stopRaf();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveIndex(-1);
    setProgress(0);
    stopRaf();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  useEffect(() => {
    return () => {
      stopRaf();
      audioRef.current?.pause();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return { isPlaying, activeIndex, progress, analyser, play, pause, stop, toggle };
}
