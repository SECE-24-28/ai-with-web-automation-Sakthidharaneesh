import { useEffect, useRef, useState } from "react";
import heroCar from "../assets/hero-car.jpg";
import modelTurbo from "../assets/model-turbo.jpg";
import modelGt from "../assets/model-gt.jpg";

/* ---------------- Loading Screen ---------------- */
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(onDone, 600);
      }
      setProgress(Math.min(100, p));
    }, 110);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fade-in">
      <div className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(227,6,19,0.25), transparent 60%)",
        }}
      />
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120" className="animate-spin-slow">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle
            cx="60" cy="60" r="54" fill="none"
            stroke="#E30613" strokeWidth="2"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-extrabold tracking-[0.4em] text-xs text-white">PORSCHE</div>
            <div className="mt-1 font-mono text-[10px] text-racing-red">{Math.floor(progress)}%</div>
          </div>
        </div>
      </div>
      <div className="mt-8 font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
        Initialising Experience
      </div>
    </div>
  );
}

/* ---------------- Mouse Light ---------------- */
function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-30 mix-blend-screen will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(227,6,19,0.18), rgba(0,200,255,0.06) 40%, transparent 70%)",
      }}
    />
  );
}

/* ---------------- Particles ---------------- */
function Particles() {
  const particles = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-white/50 animate-particle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}px`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Animated Counter ---------------- */
function Counter({ to, suffix = "", duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * to));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ---------------- Reveal on scroll ---------------- */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVis(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${vis ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Speedometer ---------------- */
function Speedometer() {
  const [angle, setAngle] = useState(-120);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let a = -120;
        const id = setInterval(() => {
          a += 6;
          setAngle(a);
          if (a >= 120) clearInterval(id);
        }, 30);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative w-56 h-56">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="60%" stopColor="#E30613" />
            <stop offset="100%" stopColor="#ff00aa" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        {Array.from({ length: 21 }).map((_, i) => {
          const a = (-120 + i * 12) * (Math.PI / 180);
          const x1 = 100 + Math.cos(a) * 78;
          const y1 = 100 + Math.sin(a) * 78;
          const x2 = 100 + Math.cos(a) * (i % 5 === 0 ? 68 : 73);
          const y2 = 100 + Math.sin(a) * (i % 5 === 0 ? 68 : 73);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.4)" strokeWidth={i % 5 === 0 ? 2 : 1} />;
        })}
        <path
          d="M 26.34 158.66 A 85 85 0 0 1 173.66 158.66"
          fill="none"
          stroke="url(#speedGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: 400 - ((angle + 120) / 240) * 280,
            transition: "stroke-dashoffset 0.1s linear",
            filter: "drop-shadow(0 0 8px #E30613)",
          }}
        />
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 0.1s linear" }}>
          <line x1="100" y1="100" x2="100" y2="30" stroke="#E30613" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill="#E30613" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-3xl font-extrabold text-white mt-12">
          <Counter to={Math.floor(((angle + 120) / 240) * 340)} />
        </div>
        <div className="text-[9px] font-mono tracking-[0.3em] text-white/40">KM/H</div>
      </div>
    </div>
  );
}

/* ---------------- Glass Card ---------------- */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden group hover:border-racing-red/40 transition-all duration-500 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(227,6,19,0.4), transparent 60%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - r.left) / r.width - 0.5) * 20,
          y: ((e.clientY - r.top) / r.height - 0.5) * 10,
        });
      }}
    >
      {/* animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial-aurora animate-aurora" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />
      </div>

      <Particles />

      {/* Car */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <img
            src={heroCar}
            alt="Porsche 911 GT3 RS"
            className="absolute inset-0 w-full h-full object-cover object-center animate-zoom-slow"
          />
          {/* glowing reflection under car */}
          <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[60%] h-32 rounded-full blur-3xl bg-racing-red/40 animate-pulse-slow" />
        </div>
      </div>

      {/* light streak */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-streak opacity-60" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-20" />

      {/* Content */}
      <div className="relative z-30 w-full px-6 lg:px-16">
        <div className="flex items-start justify-between mb-12">
          <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-300/70 uppercase animate-fade-up">
            ◢ The Apex Predator · Stuttgart 2026
          </div>
          <div className="text-right animate-fade-up delay-100">
            <div className="text-3xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-racing-red bg-clip-text text-transparent">
              € 285,000
            </div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mt-1">
              Configured from
            </div>
          </div>
        </div>

        <h1 className="font-extrabold tracking-[-0.05em] leading-[0.82] uppercase">
          <span className="block text-7xl sm:text-9xl lg:text-[11rem] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)] animate-title-in">
            Porsche
          </span>
          <span className="block text-7xl sm:text-9xl lg:text-[11rem] italic font-black animate-title-in delay-150">
            <span className="bg-gradient-to-r from-white via-racing-red to-cyan-400 bg-clip-text text-transparent">
              911 GT3 RS
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
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

        {/* speedometer corner */}
        <div className="hidden lg:block absolute right-16 bottom-8 animate-fade-up delay-500">
          <Speedometer />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Performance ---------------- */
function Performance() {
  const stats = [
    { v: 525, s: " HP", k: "Power Output" },
    { v: 312, s: " KM/H", k: "Top Speed" },
    { v: 3, s: ".2 S", k: "0–100 KM/H" },
    { v: 9000, s: " RPM", k: "Redline" },
  ];
  return (
    <section className="relative py-32 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080812] to-black" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(0,229,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.6) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative max-w-7xl mx-auto">
        <Reveal>
          <div className="font-mono text-[10px] tracking-[0.4em] text-racing-red uppercase mb-4">
            ◢ 02 — Performance
          </div>
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white">
            Engineered for <span className="italic bg-gradient-to-r from-racing-red to-cyan-400 bg-clip-text text-transparent">Velocity</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 100}>
              <GlassCard className="p-8">
                <div className="text-5xl lg:text-6xl font-extrabold text-white">
                  <Counter to={s.v} />{s.s}
                </div>
                <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                  {s.k}
                </div>
                <div className="mt-4 h-px bg-gradient-to-r from-racing-red via-cyan-400 to-transparent" />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 360 Viewer ---------------- */
function Viewer360() {
  const [frame, setFrame] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startFrame = useRef(0);

  return (
    <section className="relative py-32 px-6 lg:px-16 overflow-hidden bg-black">
      <Reveal>
        <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-400 uppercase mb-4">
          ◢ 03 — 360° Showcase
        </div>
        <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white">
          Drag to <span className="italic text-racing-red">Rotate</span>
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <div
          className="relative mt-16 aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 cursor-grab active:cursor-grabbing select-none"
          onPointerDown={(e) => {
            dragging.current = true;
            startX.current = e.clientX;
            startFrame.current = frame;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            const delta = (e.clientX - startX.current) * 0.5;
            setFrame((startFrame.current + delta) % 360);
          }}
          onPointerUp={() => (dragging.current = false)}
        >
          <div className="absolute inset-0 bg-gradient-radial-aurora opacity-40" />
          <img
            src={heroCar}
            alt="360 view"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-200"
            style={{
              transform: `rotateY(${frame}deg) scale(1.1)`,
              filter: `hue-rotate(${frame / 4}deg) brightness(0.95)`,
            }}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 backdrop-blur-md bg-black/40 border border-white/10 rounded-full font-mono text-[10px] tracking-[0.3em] text-white/70">
            ← DRAG ROTATE — {Math.abs(Math.floor(frame))}° →
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Interior ---------------- */
function Interior() {
  return (
    <section className="relative py-32 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0507] to-black" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="font-mono text-[10px] tracking-[0.4em] text-racing-red uppercase mb-4">
            ◢ 04 — Cockpit
          </div>
          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-white">
            Pilot's <span className="italic bg-gradient-to-r from-cyan-300 to-racing-red bg-clip-text text-transparent">Sanctum</span>
          </h2>
          <p className="mt-8 text-white/60 font-mono text-sm leading-relaxed max-w-md">
            Carbon-shell race buckets, Alcantara dressed in race-red contrast,
            a half-cage of titanium. Every surface engineered for purpose.
          </p>
          <div className="mt-10 space-y-4">
            {["Carbon Fibre Bucket Seats", "Race-Tex Steering Wheel", "Digital Curved Display", "Burmester 3D Audio"].map((f, i) => (
              <Reveal key={f} delay={i * 80}>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <span className="w-8 h-px bg-racing-red group-hover:w-16 transition-all" />
                  <span className="font-mono text-xs tracking-[0.2em] text-white/80 uppercase group-hover:text-white">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <GlassCard>
            <img src={modelTurbo} alt="Interior" className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-1000" />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Driving Modes ---------------- */
function DrivingModes() {
  const modes = [
    { n: "Normal", c: "from-white/20 to-white/5", t: "Daily refinement" },
    { n: "Sport", c: "from-amber-500/30 to-transparent", t: "Sharpened throttle" },
    { n: "Sport+", c: "from-racing-red/40 to-transparent", t: "Track-ready" },
    { n: "Wet", c: "from-cyan-400/30 to-transparent", t: "Wet-weather safety" },
  ];
  const [active, setActive] = useState(2);
  return (
    <section className="relative py-32 px-6 lg:px-16 overflow-hidden bg-black">
      <Reveal>
        <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-400 uppercase mb-4">
          ◢ 05 — Driving Modes
        </div>
        <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white">
          Four <span className="italic text-racing-red">Personalities</span>
        </h2>
      </Reveal>
      <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {modes.map((m, i) => (
          <Reveal key={m.n} delay={i * 100}>
            <button
              onClick={() => setActive(i)}
              className={`w-full text-left group relative h-72 rounded-2xl border overflow-hidden transition-all duration-500 ${active === i ? "border-racing-red scale-[1.03]" : "border-white/10 hover:border-white/30"}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${m.c}`} />
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="relative p-6 h-full flex flex-col justify-between">
                <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">0{i + 1}</div>
                <div>
                  <div className="text-3xl font-extrabold text-white uppercase">{m.n}</div>
                  <div className="text-xs font-mono text-white/50 mt-1">{m.t}</div>
                </div>
              </div>
              {active === i && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-racing-red animate-pulse" />
              )}
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const imgs = [heroCar, modelTurbo, modelGt, heroCar, modelGt, modelTurbo];
  return (
    <section className="relative py-32 px-6 lg:px-16 bg-gradient-to-b from-black via-[#080812] to-black">
      <Reveal>
        <div className="font-mono text-[10px] tracking-[0.4em] text-racing-red uppercase mb-4">
          ◢ 06 — Gallery
        </div>
        <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white">
          Frame by <span className="italic bg-gradient-to-r from-cyan-300 to-racing-red bg-clip-text text-transparent">Frame</span>
        </h2>
      </Reveal>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {imgs.map((src, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-white/80 uppercase">
                Frame · 0{i + 1}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-40 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-aurora animate-aurora" />
      <div className="absolute inset-0 bg-black/60" />
      <Particles />
      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-400 uppercase mb-6">◢ Begin the Journey</div>
          <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-white">
            Become the <span className="italic bg-gradient-to-r from-racing-red via-pink-400 to-cyan-400 bg-clip-text text-transparent">Driver</span>
          </h2>
          <p className="mt-8 text-white/60 font-mono text-sm tracking-wide max-w-xl mx-auto">
            Reserve your private viewing at the Porsche Experience Centre.
            Engineering perfection awaits your command.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="group px-10 py-5 bg-racing-red text-white text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all relative overflow-hidden">
              <span className="relative z-10">Reserve Yours</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="px-10 py-5 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all">
              Download Brochure
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Main Start Experience ---------------- */
export function StartExperience() {
  return (
    <div className="relative w-full overflow-x-hidden overflow-y-auto h-full">
      <MouseLight />
      <Hero />
      <Performance />
      <Viewer360 />
      <Interior />
      <DrivingModes />
      <Gallery />
      <FinalCTA />
      <footer className="relative py-8 px-6 lg:px-16 text-center border-t border-white/5 bg-black">
        <div className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
          © Porsche AG · Stuttgart · 2026
        </div>
      </footer>
    </div>
  );
}
