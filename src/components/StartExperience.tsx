import { useEffect, useRef, useState, type CSSProperties } from "react";
import heroCar from "../assets/hero-car.jpg";
import modelTurbo from "../assets/model-turbo.jpg";
import modelGt from "../assets/model-gt.jpg";
import engineOpen from "../assets/engine-open.jpg";
import porscheFront from "../assets/porsche-front.jpg";
import porscheInterior from "../assets/porsche-interior.jpg";
import porscheRear from "../assets/porsche-rear.jpg";

/* ===================== LOADING SCREEN ===================== */
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 14 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(onDone, 500);
      }
      setProgress(Math.min(100, p));
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fade-in">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(227,6,19,0.25), transparent 60%)",
        }}
      />
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 120 120" className="animate-spin-slow">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#E30613"
            strokeWidth="2"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.2s linear", filter: "drop-shadow(0 0 8px #E30613)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-extrabold tracking-[0.45em] text-sm text-white">PORSCHE</div>
            <div className="mt-1 font-mono text-[10px] text-racing-red">{Math.floor(progress)}%</div>
          </div>
        </div>
      </div>
      <div className="mt-8 font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
        Initialising Cinematic Experience
      </div>
    </div>
  );
}

/* ===================== UTILS ===================== */
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Bell-curve weight peaking at center, falloff width `w`
const bell = (t: number, center: number, w = 0.18) =>
  clamp(1 - Math.abs(t - center) / w);

/* ===================== HOOKS ===================== */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setP(clamp(scrolled / Math.max(1, total)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Also catch the scroll on the nearest scrollable parent (main panel)
    const scrollParent = findScrollParent(el);
    scrollParent?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      scrollParent?.removeEventListener("scroll", onScroll);
    };
  }, [ref]);
  return p;
}

function findScrollParent(el: HTMLElement): HTMLElement | null {
  let n: HTMLElement | null = el.parentElement;
  while (n) {
    const s = getComputedStyle(n);
    if (/(auto|scroll|overlay)/.test(s.overflowY)) return n;
    n = n.parentElement;
  }
  return null;
}

function useMouseTilt() {
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setT({ x, y });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return t;
}

/* ===================== AMBIENT VISUALS ===================== */
function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full z-[60] mix-blend-screen will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(227,6,19,0.18), rgba(0,229,255,0.07) 40%, transparent 70%)",
      }}
    />
  );
}

function Particles({ count = 40 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-white/70 animate-particle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 30}px`,
            animationDuration: `${10 + Math.random() * 14}s`,
            animationDelay: `${Math.random() * 12}s`,
            opacity: Math.random() * 0.55 + 0.15,
          }}
        />
      ))}
    </div>
  );
}

function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center gap-2 transition-opacity duration-700 ${visible ? "opacity-80" : "opacity-0"}`}
    >
      <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/70">
        Scroll
      </div>
      <div className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent animate-scroll-line" />
    </div>
  );
}

function ProgressRail({ p, chapters }: { p: number; chapters: string[] }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[55] hidden md:flex flex-col gap-4">
      {chapters.map((c, i) => {
        const at = i / (chapters.length - 1);
        const active = Math.abs(p - at) < 0.5 / (chapters.length - 1);
        return (
          <div key={c} className="flex items-center gap-3 justify-end group">
            <span
              className={`font-mono text-[9px] tracking-[0.3em] uppercase transition-all duration-500 ${active ? "text-white opacity-100" : "text-white/30 opacity-0 group-hover:opacity-100"}`}
            >
              {c}
            </span>
            <span
              className={`block rounded-full transition-all duration-500 ${active ? "w-2.5 h-2.5 bg-racing-red shadow-[0_0_12px_#E30613]" : "w-1.5 h-1.5 bg-white/30"}`}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ===================== CINEMATIC STAGE ===================== */
type Chapter = {
  id: string;
  label: string;
  title: string;
  accent: string;
  copy: string;
  feature: string;
  src: string;
};

const CHAPTERS: Chapter[] = [
  { id: "hero", label: "01 · Reveal", title: "911 GT3 RS", accent: "The Apex Predator", copy: "Engineered in Stuttgart. Distilled at Weissach. A family of extreme performance cars.", feature: "Cinematic Reveal", src: heroCar },
  { id: "front", label: "02 · Headlights", title: "Matrix Vision", accent: "Iconic Front", copy: "Adaptive LED Matrix headlights carve the night, sculpting the road in luminous precision.", feature: "Iconic LED Matrix Headlights", src: porscheFront },
  { id: "performance", label: "03 · Velocity", title: "Pure Speed", accent: "0–100 in 2.7 s", copy: "525 hp · 9,000 rpm flat-six. A relentless surge that bends the horizon toward you.", feature: "0–100 km/h in 2.7 Seconds", src: modelTurbo },
  { id: "interior", label: "04 · Cockpit", title: "Pilot's Sanctum", accent: "Driver-Centric Luxury", copy: "Carbon-shell race buckets, race-tex steering, ambient glow tuned for total focus.", feature: "Driver-Centric Luxury Interior", src: porscheInterior },
  { id: "engine", label: "05 · Heart", title: "Twin-Turbo Soul", accent: "Twin-Turbo Flat-Six", copy: "Race-bred 4.0 L flat-six, derived from the GT3 R. Symphonic, ferocious, alive.", feature: "Twin-Turbo Flat-Six Performance", src: engineOpen },
  { id: "aero", label: "06 · Aerodynamics", title: "Air Becomes Force", accent: "Active Aerodynamics", copy: "DRS, swan-neck wing, underbody venturis — 860 kg of downforce at terminal velocity.", feature: "Active Aerodynamic System", src: modelGt },
  { id: "final", label: "07 · Departure", title: "Vanishing Point", accent: "Experience Porsche", copy: "The taillights bleed into the night. The road becomes memory.", feature: "Become the Driver", src: porscheRear },
];

function CinematicStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(containerRef);
  const tilt = useMouseTilt();
  const n = CHAPTERS.length;
  const segment = 1 / (n - 1);

  // overall "camera" zoom oscillation across journey
  const camZoom = 1 + Math.sin(p * Math.PI * (n - 1)) * 0.04;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${n * 100}vh` }}
    >
      {/* Pinned cinematic stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 bg-gradient-radial-aurora animate-aurora" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Layered car images, crossfaded by scroll */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1400px" }}
        >
          {CHAPTERS.map((c, i) => {
            const center = i / (n - 1);
            const weight = bell(p, center, segment * 0.9);
            const local = clamp((p - (center - segment / 2)) / segment, 0, 1);
            const isHero = i === 0;
            const isFinal = i === n - 1;

            // per-chapter "camera move"
            let scale = lerp(1.12, 0.98, local);
            let rotY = isHero ? p * 360 * 0.18 + tilt.x * 8 : (local - 0.5) * 12 + tilt.x * 6;
            let rotX = -tilt.y * 4;
            let translateX = 0;
            let translateY = 0;
            let blur = lerp(8, 0, Math.min(1, weight * 2));
            const brightness = lerp(0.45, 1, weight);

            if (isFinal) {
              // Accelerate into darkness
              scale = lerp(1, 1.6, local);
              translateY = local * 40;
              blur = lerp(0, 12, local);
            }
            if (c.id === "performance") translateX = (local - 0.5) * 80;
            if (c.id === "engine") scale = lerp(1.2, 1.05, local);

            return (
              <div
                key={c.id}
                className="absolute inset-0 will-change-transform"
                style={{
                  opacity: weight,
                  transition: "opacity 0.35s linear",
                  zIndex: 10 + i,
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale * camZoom}) rotateY(${rotY}deg) rotateX(${rotX}deg)`,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
              >
                <img
                  src={c.src}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
                {/* Glowing floor reflection beneath car */}
                <div
                  className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[55%] h-32 rounded-full blur-3xl"
                  style={{
                    background:
                      i === n - 1
                        ? "rgba(227,6,19,0.6)"
                        : "rgba(227,6,19,0.35)",
                    opacity: weight * 0.9,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Light streak sweep */}
        <div className="absolute inset-0 pointer-events-none z-[20]">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-streak opacity-50" />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-[22]">
          <Particles />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 z-[25] pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black" />
        <div className="absolute inset-0 z-[25] pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Chapter text overlays */}
        <div className="absolute inset-0 z-[30] pointer-events-none">
          {CHAPTERS.map((c, i) => {
            const center = i / (n - 1);
            const weight = bell(p, center, segment * 0.55);
            const local = (p - center) / segment;
            const ty = local * -40;
            const style: CSSProperties = {
              opacity: weight,
              transform: `translateY(${ty}px)`,
              filter: `blur(${(1 - weight) * 6}px)`,
              transition: "opacity 0.25s linear",
            };
            return (
              <div
                key={c.id}
                className="absolute inset-0 flex flex-col justify-between px-6 lg:px-16 py-16 lg:py-24"
                style={style}
              >
                <div className="flex items-start justify-between">
                  <div className="font-mono text-[10px] tracking-[0.45em] uppercase text-cyan-300/80">
                    ◢ {c.label}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50">
                    {c.accent}
                  </div>
                </div>

                <div className="max-w-3xl pointer-events-auto">
                  <h2 className="font-black uppercase tracking-[-0.05em] leading-[0.85] text-5xl sm:text-7xl lg:text-[8rem]">
                    <span className="bg-gradient-to-r from-white via-white to-racing-red bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]">
                      {c.title}
                    </span>
                  </h2>
                  <p className="mt-6 max-w-md text-sm lg:text-base text-white/70 font-mono leading-relaxed">
                    {c.copy}
                  </p>

                  {/* CTA only on hero */}
                  {i === 0 && (
                    <div className="mt-10 flex flex-wrap gap-4">
                      <button className="group relative px-8 py-4 bg-racing-red text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all hover:scale-105">
                        <span className="relative z-10">Explore</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-racing-red via-pink-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      <button className="px-8 py-4 backdrop-blur-md bg-white/5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all">
                        Configure
                      </button>
                      <button className="px-8 py-4 border border-cyan-400/40 text-cyan-300 text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-cyan-400/10 transition-all">
                        ◉ Test Drive
                      </button>
                    </div>
                  )}

                  {/* Final CTA */}
                  {i === n - 1 && (
                    <div className="mt-10">
                      <button className="group relative px-12 py-5 bg-racing-red text-white text-xs font-bold uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:scale-105">
                        <span className="relative z-10">Experience Porsche</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-racing-red to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  )}

                  {/* Feature tag */}
                  {i !== 0 && i !== n - 1 && (
                    <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-full">
                      <span className="block w-2 h-2 rounded-full bg-racing-red animate-pulse" />
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/80">
                        {c.feature}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-end justify-between">
                  <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
                    Chapter {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </div>
                  <div className="hidden lg:flex items-center gap-3">
                    <div className="h-px w-16 bg-racing-red" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/70">
                      Porsche AG · Stuttgart
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hero hotspots (interactive points) — visible only at start */}
        <HeroHotspots opacity={bell(p, 0, segment * 0.6)} />

        {/* Progress bar bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[35] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-racing-red via-pink-500 to-cyan-400"
            style={{ width: `${p * 100}%`, transition: "width 0.1s linear" }}
          />
        </div>
      </div>

      <ProgressRail p={p} chapters={CHAPTERS.map((c) => c.label.split("·")[1]?.trim() || c.id)} />
      <ScrollHint visible={p < 0.04} />
    </div>
  );
}

/* ===================== HOTSPOTS ===================== */
function HeroHotspots({ opacity }: { opacity: number }) {
  const [active, setActive] = useState<number | null>(null);
  const spots = [
    { x: "32%", y: "52%", label: "Carbon Body", spec: "Lightweight CFRP · Sculpted in Weissach" },
    { x: "68%", y: "44%", label: "Swan-Neck Wing", spec: "DRS · 860 kg downforce" },
    { x: "52%", y: "72%", label: "Forged Wheels", spec: "Center-lock · Magnesium" },
  ];
  return (
    <div
      className="absolute inset-0 z-[28]"
      style={{ opacity, transition: "opacity 0.3s linear", pointerEvents: opacity > 0.4 ? "auto" : "none" }}
    >
      {/* blur backdrop when active */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/40 transition-opacity duration-500"
        style={{ opacity: active !== null ? 1 : 0, pointerEvents: active !== null ? "auto" : "none" }}
        onClick={() => setActive(null)}
      />
      {spots.map((s, i) => (
        <div key={i} className="absolute" style={{ left: s.x, top: s.y, transform: "translate(-50%, -50%)" }}>
          <button
            onClick={() => setActive(active === i ? null : i)}
            className="relative w-5 h-5 rounded-full bg-racing-red shadow-[0_0_20px_#E30613] hover:scale-125 transition-transform"
            aria-label={s.label}
          >
            <span className="absolute inset-0 rounded-full bg-racing-red animate-ping opacity-60" />
            <span className="absolute inset-1 rounded-full bg-white" />
          </button>
          {active === i && (
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 backdrop-blur-xl bg-black/70 border border-white/10 rounded-xl p-4 animate-scale-in z-50">
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-racing-red mb-1">Feature</div>
              <div className="font-bold text-white text-lg">{s.label}</div>
              <div className="mt-1 font-mono text-[10px] text-white/60">{s.spec}</div>
              <div className="mt-3 h-px bg-gradient-to-r from-racing-red to-transparent" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ===================== EXPORT ===================== */
export function StartExperience() {
  return (
    <div className="relative w-full h-full overflow-x-hidden overflow-y-auto bg-black smooth-scroll">
      <MouseLight />
      <CinematicStage />
      <footer className="relative py-6 px-6 lg:px-16 text-center border-t border-white/5 bg-black z-50">
        <div className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
          © Porsche AG · Stuttgart · 2026
        </div>
      </footer>
    </div>
  );
}
