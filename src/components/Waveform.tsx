import { useEffect, useRef } from 'react';

interface WaveformProps {
  /** Live AnalyserNode to read amplitude from. When null/active=false, the ring idles. */
  analyser: AnalyserNode | null;
  /** Whether real audio is flowing (mic listening, agent speaking, or sample playing). */
  active: boolean;
  /** Canvas size in CSS px (square). */
  size?: number;
  /** Number of radial bars. */
  bars?: number;
}

/**
 * A radial waveform ring rendered on a canvas. It wraps the mic orb and reacts
 * to real audio amplitude (brand purple -> violet -> cyan gradient). When no
 * audio is flowing it breathes gently. Drawing happens entirely in a rAF loop
 * via refs, so prop changes never restart or re-mount the canvas.
 */
export default function Waveform({ analyser, active, size = 240, bars = 72 }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const levelsRef = useRef<number[]>(new Array(bars).fill(0.1));
  const analyserRef = useRef(analyser);
  const activeRef = useRef(active);
  // Keep the loop reading fresh values without depending on them in useEffect.
  analyserRef.current = analyser;
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const center = size / 2;
    const innerR = size * 0.34;
    const maxBar = size * 0.135;
    const freq = new Uint8Array(128);
    const levels = levelsRef.current;

    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#6C5CE7');
    grad.addColorStop(0.5, '#A78BFA');
    grad.addColorStop(1, '#22D3EE');
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(2, size * 0.014);
    ctx.lineCap = 'round';

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      const an = analyserRef.current;
      const isActive = activeRef.current && !!an;
      if (isActive) an!.getByteFrequencyData(freq);

      for (let i = 0; i < bars; i++) {
        let target: number;
        if (isActive) {
          // Emphasise the voice band; mirror around the circle for symmetry.
          const half = bars / 2;
          const m = i < half ? i : bars - i;
          const bin = Math.floor((m / half) * 48) + 2;
          target = Math.min(1, (freq[bin] / 255) * 1.5);
        } else {
          target = reduce ? 0.12 : 0.1 + 0.07 * (0.5 + 0.5 * Math.sin(t * 0.0016 + i * 0.32));
        }
        levels[i] += (target - levels[i]) * 0.32;
        const len = maxBar * levels[i];
        const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(center + cos * innerR, center + sin * innerR);
        ctx.lineTo(center + cos * (innerR + 2 + len), center + sin * (innerR + 2 + len));
        ctx.stroke();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, bars]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
