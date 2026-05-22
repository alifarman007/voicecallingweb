import { useState, useEffect, useRef } from 'react';
import type { ComponentType, ReactNode } from 'react';
import {
  LayoutDashboard,
  Bot,
  Wrench,
  Hash,
  PhoneOutgoing,
  Megaphone,
  Clock,
  Settings as SettingsIcon,
  Phone,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  Play,
  Sparkles,
  Building2,
  Briefcase,
  Headphones,
  CalendarCheck,
  Timer,
  ArrowUpRight,
  ArrowDownLeft,
  LogOut,
} from 'lucide-react';

type IconType = ComponentType<{ size?: number; className?: string }>;
type ViewId = 'overview' | 'playground' | 'campaigns' | 'history';

type StatusKind = 'completed' | 'in-progress' | 'dialing' | 'pending' | 'draft';

const STATUS: Record<StatusKind, { cls: string; label: string; pulse?: boolean }> = {
  completed:    { cls: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',      label: 'Done' },
  'in-progress':{ cls: 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30',      label: 'Live', pulse: true },
  dialing:      { cls: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30',      label: 'Dial', pulse: true },
  pending:      { cls: 'bg-white/5 text-[var(--text-secondary)] border-white/10', label: 'Wait' },
  draft:        { cls: 'bg-white/5 text-[var(--text-secondary)] border-white/10', label: 'Draft' },
};

function MiniPill({ kind }: { kind: StatusKind }) {
  const s = STATUS[kind];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[8px] font-mono font-medium ${s.cls}`}>
      {s.pulse && <span className="w-1 h-1 rounded-full bg-current animate-pulse" />}
      {s.label}
    </span>
  );
}

const NAV: Array<{ id: string; label: string; icon: IconType; view?: ViewId }> = [
  { id: 'overview',   label: 'Dashboard',         icon: LayoutDashboard, view: 'overview' },
  { id: 'playground', label: 'Agent Playground',  icon: Bot,             view: 'playground' },
  { id: 'tools',      label: 'Tools',             icon: Wrench           },
  { id: 'number',     label: 'Number',            icon: Hash             },
  { id: 'outbound',   label: 'Outbound',          icon: PhoneOutgoing    },
  { id: 'campaigns',  label: 'Campaigns',         icon: Megaphone,       view: 'campaigns' },
  { id: 'history',    label: 'Call History',      icon: Clock,           view: 'history' },
  { id: 'settings',   label: 'Settings',          icon: SettingsIcon     },
];

const VIEWS: ViewId[] = ['overview', 'playground', 'campaigns', 'history'];

const VIEW_INFO: Record<
  ViewId,
  {
    icon: IconType;
    title: string;
    body: string;
    stats: Array<{ label: string; value: string }>;
    accent: string;
  }
> = {
  overview: {
    icon: LayoutDashboard,
    title: 'Real-time Overview',
    body: 'Every active call, every agent — surfaced live with KPIs that actually move.',
    stats: [
      { label: 'Total',  value: '47'      },
      { label: 'Active', value: '0 / 4'   },
      { label: 'Avg',    value: '1m 38s'  },
    ],
    accent: '#6C5CE7',
  },
  playground: {
    icon: Bot,
    title: 'Agent Playground',
    body: 'Build, version and A/B-test voice agents in minutes. Hot-swap models, prompts and tools.',
    stats: [
      { label: 'Agents', value: '4'        },
      { label: 'Model',  value: 'Gemini'   },
      { label: 'Setup',  value: '~ 2 min'  },
    ],
    accent: '#22D3EE',
  },
  campaigns: {
    icon: Megaphone,
    title: 'Outbound Campaigns',
    body: 'Concurrency-controlled dialers with retries, pacing, and live progress at every step.',
    stats: [
      { label: 'Concurrency', value: 'Tunable' },
      { label: 'Retries',     value: 'Auto'    },
      { label: 'Control',     value: 'Mid-run' },
    ],
    accent: '#F59E0B',
  },
  history: {
    icon: Clock,
    title: 'Call History',
    body: 'Audit every conversation. Listen back, filter by agent or direction, export anytime.',
    stats: [
      { label: 'Recorded',  value: 'Auto'      },
      { label: 'Retention', value: '90 days'   },
      { label: 'Export',    value: 'CSV / API' },
    ],
    accent: '#EF4444',
  },
};

export default function DashboardShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance: cycle through all 4 views, one at a time. Pause on hover.
  useEffect(() => {
    if (!mounted || paused) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % VIEWS.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [mounted, paused]);

  const activeView = VIEWS[activeIdx];
  const info = VIEW_INFO[activeView];

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* color-reactive ambient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] blur-3xl transition-all duration-[1200ms] ease-out"
          style={{
            background: `radial-gradient(circle, ${info.accent}26 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,36,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,36,0.4)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.06]" />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* Header — compact */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 text-[11px] text-[var(--accent-glow)] font-medium tracking-wider mb-4">
            <Sparkles size={11} />
            MISSION CONTROL
          </span>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-3 font-cabinet leading-[1.05]">
            One console for your <span className="gradient-text">entire voice fleet</span>.
          </h2>
          <p className="text-[var(--text-secondary)] text-[15px] md:text-base">
            Every surface of KOTHA AI — fanned out, animated, and never more than a glance away.
          </p>
        </div>

        {/* Body — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left: fanned stack */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <FanStack
              activeIdx={activeIdx}
              mounted={mounted}
              onSelect={setActiveIdx}
              onPauseChange={setPaused}
            />
          </div>

          {/* Right: synced copy */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-2">
            <ViewInfoPanel info={info} viewId={activeView} />

            {/* Indicator dots */}
            <div className="flex items-center gap-1.5 mt-7">
              {VIEWS.map((v, i) => {
                const active = i === activeIdx;
                return (
                  <button
                    key={v}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      active ? 'w-10' : 'w-1.5 bg-white/15 hover:bg-white/30 hover:w-3'
                    }`}
                    style={
                      active
                        ? { background: info.accent, boxShadow: `0 0 14px ${info.accent}80` }
                        : undefined
                    }
                    aria-label={`Show ${VIEW_INFO[v].title}`}
                  />
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- right column: synced copy ---------- */

function ViewInfoPanel({
  info,
  viewId,
}: {
  info: (typeof VIEW_INFO)[ViewId];
  viewId: ViewId;
}) {
  const Icon = info.icon;
  return (
    <div key={viewId} className="animate-fadeInUp">
      <div className="mb-4">
        <div
          className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${info.accent}28, ${info.accent}10)`,
            boxShadow: `0 0 28px ${info.accent}30`,
          }}
        >
          <Icon size={19} />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-white font-cabinet mb-3 leading-[1.1]">
        {info.title}
      </h3>
      <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed mb-5 max-w-[440px]">
        {info.body}
      </p>

      <div className="grid grid-cols-3 gap-2">
        {info.stats.map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="text-[9px] text-[var(--text-tertiary)] tracking-[0.12em] uppercase mb-1">
              {s.label}
            </div>
            <div className="text-[14px] font-bold text-white font-cabinet leading-none truncate">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- left column: fanned stack ---------- */

// Resting positions: only depths 0 (front) and 1 (back) are visible.
// Depths 2+ live off-stage to the left at opacity 0 and pop in when promoted.
function getPosition(depth: number) {
  if (depth === 0) return { dx:    0, dy:   0, rot:   0, scale: 1.00, opacity: 1 };
  if (depth === 1) return { dx:  -64, dy: -34, rot:  -5, scale: 0.95, opacity: 1 };
  // off-stage (depth 2, 3, ...)
  return            { dx: -280, dy: -60, rot: -14, scale: 0.86, opacity: 0 };
}

function FanStack({
  activeIdx,
  mounted,
  onSelect,
  onPauseChange,
}: {
  activeIdx: number;
  mounted: boolean;
  onSelect: (i: number) => void;
  onPauseChange: (paused: boolean) => void;
}) {
  return (
    <div
      className="relative mx-auto h-[230px] sm:h-[300px] md:h-[340px] lg:h-[400px] overflow-visible"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 origin-top scale-[0.52] sm:scale-[0.72] md:scale-[0.84] lg:scale-100"
        style={{ width: 600, height: 400 }}
      >
        {/* soft floor shadow */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 bottom-[40px] w-[420px] h-[40px] rounded-full blur-2xl"
          style={{
            background: `${VIEW_INFO[VIEWS[activeIdx]].accent}30`,
            opacity: mounted ? 1 : 0,
            transition: 'background 600ms ease-out, opacity 600ms ease-out 400ms',
          }}
        />

        {VIEWS.map((view, i) => {
          const depth = (i - activeIdx + VIEWS.length) % VIEWS.length;
          const pos = getPosition(depth);
          const z = 40 - depth * 10;
          const isFront = depth === 0;
          const isVisible = pos.opacity > 0;

          // Entrance: back card lands a hair before the front card
          const entranceDelay = depth === 0 ? 120 : 0;

          const outerTransform = `translate(calc(-50% + ${pos.dx}px), calc(-50% + ${pos.dy}px)) rotate(${pos.rot}deg) scale(${pos.scale})`;

          return (
            <div
              key={view}
              onClick={() => onSelect(i)}
              className="absolute top-1/2 left-1/2 cursor-pointer will-change-transform"
              style={{
                transform: outerTransform,
                opacity: pos.opacity,
                zIndex: z,
                pointerEvents: isVisible ? 'auto' : 'none',
                transition:
                  'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out',
              }}
            >
              <div
                style={
                  mounted
                    ? {
                        animation: `slideInLeftFade 700ms cubic-bezier(0.22, 1, 0.36, 1) ${entranceDelay}ms both`,
                        willChange: 'transform, opacity',
                      }
                    : { opacity: 0 }
                }
              >
                <DashboardScreen view={view} isFront={isFront} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- one mini dashboard screen ---------- */

function DashboardScreen({ view, isFront }: { view: ViewId; isFront: boolean }) {
  const accent = VIEW_INFO[view].accent;
  return (
    <div
      className="w-[440px] h-[300px] bg-[#0f0d1a] border rounded-2xl overflow-hidden flex flex-col transition-[border-color,box-shadow] duration-500"
      style={{
        borderColor: isFront ? `${accent}55` : 'rgba(255,255,255,0.08)',
        boxShadow: isFront
          ? `0 24px 50px -16px rgba(0,0,0,0.65), 0 0 0 1px ${accent}25, 0 0 48px ${accent}30`
          : '0 18px 40px -16px rgba(0,0,0,0.55)',
      }}
    >
      {/* chrome */}
      <div className="flex items-center px-3 py-1.5 border-b border-white/5 bg-black/40 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]/60" />
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]/60" />
          <span className="w-2 h-2 rounded-full bg-[#10B981]/60" />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <Sidebar activeView={view} />
        <div className="flex-1 min-w-0 p-2.5 overflow-hidden">
          {view === 'overview'   && <OverviewContent />}
          {view === 'playground' && <PlaygroundContent />}
          {view === 'campaigns'  && <CampaignsContent />}
          {view === 'history'    && <HistoryContent />}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ activeView }: { activeView: ViewId }) {
  return (
    <aside className="w-[112px] shrink-0 border-r border-white/5 bg-black/25 py-2 px-1.5 flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 px-1.5 mb-2">
        <img src="/logo-symbol.svg" alt="" aria-hidden="true" className="w-4 h-4" />
        <img src="/kotha_ai_logo_wordmark_white.svg" alt="KOTHA AI" className="h-2.5" />
      </div>

      {NAV.map((item) => {
        const Icon = item.icon;
        const isActive = item.view === activeView;
        return (
          <div
            key={item.id}
            className={`flex items-center gap-1.5 px-1.5 py-1 rounded-md text-[9px] font-medium leading-none ${
              isActive
                ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-glow)] shadow-[inset_0_0_0_1px_rgba(108,92,231,0.25)]'
                : 'text-[var(--text-tertiary)]'
            }`}
          >
            <Icon size={10} />
            <span className="truncate">{item.label}</span>
          </div>
        );
      })}

      <div className="flex-1" />

      <div className="mt-1.5 pt-1.5 px-0.5 border-t border-white/5 flex items-center gap-1.5">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#22D3EE] flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-white" />
        </div>
        <span className="text-[6.5px] text-[#10B981] flex items-center gap-0.5">
          <span className="w-0.5 h-0.5 rounded-full bg-[#10B981] animate-pulse" />Online
        </span>
        <LogOut size={8} className="ml-auto text-[var(--text-tertiary)]" />
      </div>
    </aside>
  );
}

/* ---------- per-view content ---------- */

function MicroKpi({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: ReactNode;
  icon: IconType;
  tint: string;
}) {
  return (
    <div className="relative bg-white/[0.03] border border-white/5 rounded-md p-1.5 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-5 -right-5 w-12 h-12 rounded-full blur-xl opacity-80"
        style={{ background: `radial-gradient(circle, ${tint}40 0%, transparent 70%)` }}
      />
      <div className="relative flex items-center justify-between mb-1">
        <span className="text-[6.5px] text-[var(--text-tertiary)] tracking-[0.12em] font-semibold uppercase">{label}</span>
        <Icon size={9} />
      </div>
      <div className="relative text-[12px] font-bold text-white font-cabinet leading-none">{value}</div>
    </div>
  );
}

function OverviewContent() {
  return (
    <div className="h-full flex flex-col gap-2">
      <div>
        <div className="text-[12px] font-bold text-white font-cabinet leading-none">Dashboard</div>
        <div className="text-[7.5px] text-[var(--text-tertiary)] mt-0.5">Overview of your voice agent operations</div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        <MicroKpi label="TOTAL"  value="47"     icon={Phone}      tint="#EF4444" />
        <MicroKpi label="TODAY"  value="1"      icon={BarChart3}  tint="#10B981" />
        <MicroKpi label="AGENTS" value="0/4"    icon={Bot}        tint="#6C5CE7" />
        <MicroKpi label="AVG"    value="1m 38s" icon={Timer}      tint="#F59E0B" />
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-md p-2 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[9px] font-bold text-white">Recent Calls</div>
          <div className="text-[7px] text-[var(--text-tertiary)] font-mono flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse" />live
          </div>
        </div>
        <ul className="space-y-0.5">
          {[
            { p: '+170 ••• ••42', w: 'Just now', d: '1m 43s', s: 'completed'   as StatusKind },
            { p: '+170 ••• ••77', w: '2m ago',   d: '—',      s: 'in-progress' as StatusKind },
            { p: '+170 ••• ••77', w: '5m ago',   d: '26s',    s: 'completed'   as StatusKind },
            { p: '+170 ••• ••11', w: '8m ago',   d: '—',      s: 'dialing'     as StatusKind },
          ].map((r, i) => (
            <li key={i} className="flex items-center gap-1.5 px-1 py-0.5">
              <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-[#6C5CE7]/30 to-[#22D3EE]/20 flex items-center justify-center shrink-0">
                <Phone size={6} className="text-[var(--accent-glow)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[8.5px] font-mono text-white truncate">{r.p}</div>
                <div className="text-[6.5px] text-[var(--text-tertiary)]">{r.w}</div>
              </div>
              <span className="text-[7px] font-mono text-[var(--text-tertiary)] w-6 text-right">{r.d}</span>
              <MiniPill kind={r.s} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PlaygroundContent() {
  const agents: Array<{ name: string; icon: IconType; calls: number; accent: string; testCls: string }> = [
    { name: 'Receptionist', icon: Building2,     calls: 21, accent: 'from-[#6C5CE7]/40 to-[#A78BFA]/20', testCls: 'bg-[#6C5CE7] text-white' },
    { name: 'Sales',        icon: Briefcase,     calls: 11, accent: 'from-[#F59E0B]/40 to-[#EF4444]/20', testCls: 'bg-[#F59E0B] text-black' },
    { name: 'Support',      icon: Headphones,    calls:  5, accent: 'from-[#22D3EE]/40 to-[#10B981]/20', testCls: 'bg-[#22D3EE] text-black' },
    { name: 'Booking',      icon: CalendarCheck, calls:  3, accent: 'from-[#10B981]/40 to-[#22D3EE]/20', testCls: 'bg-[#10B981] text-white' },
  ];

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] font-bold text-white font-cabinet leading-none">Agent Playground</div>
          <div className="text-[7.5px] text-[var(--text-tertiary)] mt-0.5">4 agents configured</div>
        </div>
        <button className="inline-flex items-center gap-1 bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-[var(--accent-glow)] text-[8px] font-medium px-1.5 py-0.5 rounded">
          <Plus size={8} />New
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {agents.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.name} className="bg-white/[0.02] border border-white/5 rounded-md p-1.5 flex flex-col">
              <div className="flex items-start gap-1 mb-1">
                <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${a.accent} border border-white/5 flex items-center justify-center shrink-0`}>
                  <Icon size={11} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <div className="text-[9px] font-bold text-white font-cabinet truncate">{a.name}</div>
                    <MiniPill kind="draft" />
                  </div>
                  <div className="text-[6.5px] font-mono text-[var(--text-tertiary)]">voice agent</div>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-[6.5px] font-mono text-[var(--text-tertiary)]">{a.calls} calls</span>
                <div className="flex items-center gap-0.5">
                  <Trash2 size={8} className="text-[var(--text-tertiary)]" />
                  <button className="inline-flex items-center gap-0.5 px-1 py-0.5 text-[7px] font-medium rounded border border-white/10 text-white">
                    <Pencil size={7} />Edit
                  </button>
                  <button className={`px-1 py-0.5 text-[7px] font-bold rounded ${a.testCls}`}>Test</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CampaignsContent() {
  const kpis: Array<{ label: string; value: string; tint: string }> = [
    { label: 'TOTAL',  value: '10', tint: 'text-white'     },
    { label: 'DONE',   value: '0',  tint: 'text-[#10B981]' },
    { label: 'NO ANS', value: '0',  tint: 'text-[#F59E0B]' },
    { label: 'FAIL',   value: '0',  tint: 'text-[#EF4444]' },
    { label: 'WAIT',   value: '10', tint: 'text-[#6C5CE7]' },
  ];
  const contacts: Array<{ p: string; n: string; s: StatusKind }> = [
    { p: '+170 ••• ••11', n: 'Lead 01', s: 'pending' },
    { p: '+170 ••• ••12', n: 'Lead 02', s: 'pending' },
    { p: '+170 ••• ••13', n: 'Lead 03', s: 'dialing' },
  ];

  return (
    <div className="h-full flex flex-col gap-1.5">
      <button className="flex items-center gap-0.5 text-[7px] text-[var(--text-secondary)] self-start">
        <ChevronLeft size={8} />Back
      </button>

      <div className="bg-white/[0.02] border border-white/5 rounded-md p-1.5">
        <div className="flex items-start justify-between mb-1.5">
          <div>
            <div className="flex items-center gap-1">
              <div className="text-[11px] font-bold text-white font-cabinet leading-none">Outreach Q2</div>
              <MiniPill kind="draft" />
            </div>
            <div className="text-[7px] text-[var(--text-tertiary)] mt-0.5 font-mono">
              camp-013fef9ab8c0
            </div>
          </div>
          <button className="inline-flex items-center gap-0.5 bg-[#10B981] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-[0_0_12px_rgba(16,185,129,0.5)]">
            <Play size={7} className="fill-white" />Start
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1 mb-1.5">
          {kpis.map((k) => (
            <div key={k.label} className="bg-black/30 border border-white/5 rounded p-0.5 text-center">
              <div className={`text-[10px] font-bold font-cabinet leading-none ${k.tint}`}>{k.value}</div>
              <div className="text-[6px] text-[var(--text-tertiary)] tracking-widest mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[0%] bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE]" />
        </div>
      </div>

      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-md overflow-hidden">
        <div className="px-1.5 py-1 border-b border-white/5 text-[8px] font-bold text-white">
          Contacts <span className="text-[var(--text-tertiary)] font-normal">(10)</span>
        </div>
        <table className="w-full text-left">
          <tbody>
            {contacts.map((c, i) => (
              <tr key={c.p} className={`border-t border-white/5 ${i % 2 ? 'bg-white/[0.01]' : ''}`}>
                <td className="px-1.5 py-0.5 font-mono text-[8px] text-white">{c.p}</td>
                <td className="px-1.5 py-0.5 text-[8px] text-[var(--text-secondary)]">{c.n}</td>
                <td className="px-1.5 py-0.5 text-right"><MiniPill kind={c.s} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryContent() {
  const rows: Array<{ t: string; a: string; dir: 'in' | 'out'; dur: string; s: StatusKind }> = [
    { t: '22 May, 13:00', a: 'Receptionist', dir: 'in',  dur: '1m 43s', s: 'completed'   },
    { t: '21 May, 16:09', a: 'Sales',        dir: 'out', dur: '—',      s: 'in-progress' },
    { t: '21 May, 16:08', a: 'Sales',        dir: 'out', dur: '—',      s: 'dialing'     },
    { t: '21 May, 16:08', a: 'Sales',        dir: 'out', dur: '26s',    s: 'completed'   },
    { t: '21 May, 04:42', a: 'Sales',        dir: 'in',  dur: '42s',    s: 'completed'   },
  ];

  return (
    <div className="h-full flex flex-col gap-1.5">
      <div>
        <div className="text-[12px] font-bold text-white font-cabinet leading-none">Call History</div>
        <div className="text-[7.5px] text-[var(--text-tertiary)] mt-0.5">84 total calls recorded</div>
      </div>

      <div className="flex items-center gap-1">
        {['All Agents', 'All Sources', 'All Dir'].map((f) => (
          <div key={f} className="px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] text-[7px] text-[var(--text-secondary)]">
            {f}
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/30">
            <tr className="text-[6px] text-[var(--text-tertiary)] tracking-widest uppercase">
              <th className="px-1.5 py-1 font-medium">Time</th>
              <th className="px-1.5 py-1 font-medium">Agent</th>
              <th className="px-1.5 py-1 font-medium">Dir</th>
              <th className="px-1.5 py-1 font-medium text-right">Dur</th>
              <th className="px-1.5 py-1 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-white/5">
                <td className="px-1.5 py-0.5 text-[7.5px] text-white font-mono">{r.t}</td>
                <td className="px-1.5 py-0.5 text-[7.5px] text-[var(--text-secondary)]">{r.a}</td>
                <td className="px-1.5 py-0.5">
                  {r.dir === 'in' ? (
                    <span className="inline-flex items-center gap-0.5 text-[7px] text-[#10B981]">
                      <ArrowDownLeft size={7} />In
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-[7px] text-[#6C5CE7]">
                      <ArrowUpRight size={7} />Out
                    </span>
                  )}
                </td>
                <td className="px-1.5 py-0.5 text-right text-[7px] font-mono text-[var(--text-tertiary)]">{r.dur}</td>
                <td className="px-1.5 py-0.5 text-right"><MiniPill kind={r.s} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
