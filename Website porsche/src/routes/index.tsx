import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import modelTurbo from "../assets/model-turbo.jpg";
import engineClosed from "../assets/engine-closed.jpg";
import engineOpen from "../assets/engine-open.jpg";
import { LoadingScreen, StartExperience } from "../components/StartExperience";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Porsche 911 GT3 RS | The Apex Predator" },
      {
        name: "description",
        content:
          "The Porsche 911 GT3 RS — a family of extreme performance cars. Engineered in Stuttgart for the relentless pursuit of perfection.",
      },
      { property: "og:title", content: "Porsche 911 GT3 RS | The Apex Predator" },
      { property: "og:description", content: "Extreme performance, distilled." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type SectionId = "start" | "design" | "engine";

const TABS: { id: SectionId; label: string; num: string }[] = [
  { id: "start", num: "01", label: "Start" },
  { id: "design", num: "02", label: "Design" },
  { id: "engine", num: "03", label: "Engine" },
];

function Index() {
  const [active, setActive] = useState<SectionId>("start");
  const [prev, setPrev] = useState<SectionId>("start");
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  const change = (id: SectionId) => {
    if (id === active) return;
    setPrev(active);
    setTransitioning(true);
    setActive(id);
    setTimeout(() => setTransitioning(false), 700);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-racing-red selection:text-white overflow-hidden">
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <ScanlineOverlay />
      <Navbar active={active} onChange={change} />
      <main className={`relative w-full ${active === "start" ? "h-[calc(100vh-4rem)]" : "h-[calc(100vh-4rem)]"}`}>
        <SectionStage active={active} prev={prev} transitioning={transitioning} />
      </main>
    </div>
  );
}

function Navbar({
  active,
  onChange,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
}) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-6 lg:px-12 h-16">
        <div className="flex items-center gap-2">
          <PorscheCrest />
          <span className="font-extrabold tracking-[0.3em] text-sm uppercase text-foreground">
            Porsche
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-full px-2 py-1">
          {TABS.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`relative px-4 py-1.5 text-[10px] font-mono tracking-[0.25em] uppercase transition-colors duration-300 ${
                  isActive ? "text-background" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-foreground rounded-full -z-0" />
                )}
                <span className="relative z-10">
                  {t.num} {t.label}
                </span>
              </button>
            );
          })}
        </div>

        <button className="px-4 py-2 bg-racing-red text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-white hover:text-background transition-all duration-300">
          Inquire Now
        </button>
      </div>
    </nav>
  );
}

function PorscheCrest() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L22 7 L20 19 L12 22 L4 19 L2 7 Z"
        fill="var(--racing-red, #E30613)"
        stroke="#fff"
        strokeWidth="0.5"
      />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="6"
        fontWeight="900"
        fill="#fff"
        fontFamily="Inter, sans-serif"
      >
        911
      </text>
    </svg>
  );
}

function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.035]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0, transparent 2px, #fff 2px, #fff 3px)",
      }}
    />
  );
}

function SectionStage({
  active,
  prev,
  transitioning,
}: {
  active: SectionId;
  prev: SectionId;
  transitioning: boolean;
}) {
  return (
    <div className="relative w-full h-full">
      {transitioning && <Wipe key={`${prev}-${active}`} />}
      <div
        key={active}
        className="absolute inset-0 animate-section-in"
      >
        {active === "start" && <StartExperience />}
        {active === "design" && <DesignSection />}
        {active === "engine" && <EngineSection />}
      </div>
    </div>
  );
}

function Wipe() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <div className="absolute inset-0 bg-racing-red animate-wipe-out origin-left" />
    </div>
  );
}

/* StartSection replaced by StartExperience component */


/* ---------------- DESIGN ---------------- */
function DesignSection() {
  return (
    <section className="relative w-full h-full overflow-hidden">
      <BackdropGrid />
      <div className="absolute inset-0 bg-black z-0" />

      <img
        src={modelTurbo}
        alt="Porsche 911 Turbo silhouette"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 z-10 animate-pan-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/80 z-20" />

      <div className="relative z-30 h-full px-6 lg:px-16 py-10 lg:py-16 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] text-racing-red uppercase animate-fade-up">
            Aero-sculpted in Weissach
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/50 uppercase animate-fade-up delay-100">
            Cd 0.32 · Downforce 860 kg
          </span>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-7xl lg:text-[10rem] font-black uppercase tracking-[-0.05em] leading-[0.8] text-foreground animate-title-in">
            De<span className="text-racing-red">si</span>gn
          </h2>
          <p className="mt-6 max-w-md text-sm text-foreground/60 font-mono leading-relaxed animate-fade-up delay-200">
            Form dictated by airflow. Every crease, vent, and diffuser is the
            product of thousands of CFD iterations — beauty as a consequence of
            physics.
          </p>
        </div>

        {/* float spec strip */}
        <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/5 max-w-2xl">
          {[
            { k: "Drag Coefficient", v: "0.32" },
            { k: "Active Aero", v: "DRS · 3-Stage" },
            { k: "Kerb Weight", v: "1,450 KG" },
          ].map((s, i) => (
            <div
              key={s.k}
              className="bg-background/80 backdrop-blur px-4 py-4 animate-fade-up"
              style={{ animationDelay: `${300 + i * 120}ms` }}
            >
              <div className="text-[9px] font-mono uppercase tracking-widest text-foreground/40">
                {s.k}
              </div>
              <div className="text-lg font-bold mt-1 text-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ENGINE ---------------- */
function EngineSection() {
  const specs = [
    { top: "20%", side: "right-[8%]", k: "Flat-6", v: "FLAT-6" },
    { top: "36%", side: "right-[8%]", k: "Displacement", v: "3996 cc" },
    { top: "55%", side: "right-[8%]", k: "Top Speed", v: "> 312 km/h" },
    { top: "72%", side: "right-[8%]", k: "Power", v: "525 hp" },
  ];

  return (
    <section className="relative w-full h-full overflow-hidden">
      <BackdropGrid />
      <div className="absolute inset-0 bg-black z-0" />

      {/* OPEN engine bay revealed underneath */}
      <img
        src={engineOpen}
        alt="Porsche 911 engine bay open"
        className="absolute inset-0 w-full h-full object-cover object-center z-10 animate-engine-reveal"
      />

      {/* CLOSED car on top - lifts/fades away to "open" the hood */}
      <img
        src={engineClosed}
        alt="Porsche 911 rear closed"
        className="absolute inset-0 w-full h-full object-cover object-center z-15 animate-hood-open"
        style={{ transformOrigin: "50% 75%" }}
      />

      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/10 to-black/80 z-20" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-20" />

      <div className="relative z-30 h-full px-6 lg:px-16 py-10 lg:py-16 flex flex-col justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-racing-red uppercase animate-fade-up">
          Drew on Le Mans experience
        </span>

        <div className="max-w-2xl">
          <h2 className="text-7xl lg:text-[11rem] font-black uppercase tracking-[-0.05em] leading-[0.8] text-foreground/95 animate-title-in">
            En<span className="text-racing-red">gi</span>ne
          </h2>
          <p className="mt-6 max-w-md text-sm text-foreground/60 font-mono leading-relaxed animate-fade-up delay-200">
            Derived from the GT3 R race car, the naturally aspirated 4.0 L
            flat-six revs to 9,000 rpm — symphonic, ferocious, alive.
          </p>
        </div>

        {/* floating spec callouts */}
        {specs.map((s, i) => (
          <div
            key={s.k}
            className={`absolute ${s.side} flex items-center gap-3 animate-fade-up`}
            style={{ top: s.top, animationDelay: `${250 + i * 150}ms` }}
          >
            <span className="block h-px bg-racing-red animate-line-grow origin-right" style={{ width: 80, animationDelay: `${250 + i * 150}ms` }} />
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 text-right">
                {s.k}
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground text-right">
                {s.v}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BackdropGrid() {
  return (
    <div
      className="absolute inset-0 z-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  );
}

