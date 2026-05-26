import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroCar from "../assets/hero-car.jpg";
import modelTurbo from "../assets/model-turbo.jpg";
import modelGt from "../assets/model-gt.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Porsche | Precision. Performance. Passion." },
      {
        name: "description",
        content:
          "Experience the relentless pursuit of perfection. Explore the Porsche 911 lineup — Turbo, GT3, and more. Engineered in Stuttgart.",
      },
      { property: "og:title", content: "Porsche | Precision. Performance. Passion." },
      {
        property: "og:description",
        content: "The benchmark for visceral engineering. Explore the Porsche 911 lineup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function AnimatedNumber({
  value,
  suffix = "",
  isInView,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  isInView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1200;
    const startTime = performance.now() + delay;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value * 10) / 10);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, delay]);

  const formatted =
    value % 1 !== 0 ? display.toFixed(1) : Math.round(display).toString();

  return (
    <span className={isInView ? "animate-count" : "opacity-0"}>
      {formatted}
      {suffix && (
        <span className="text-lg font-mono text-muted-foreground ml-1">{suffix}</span>
      )}
    </span>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 h-16">
        <div className="font-extrabold tracking-tighter text-xl uppercase text-foreground">
          911 <span className="text-racing-red">.</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] font-mono tracking-widest uppercase">
          {["Models", "Engineering", "Configurator"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-foreground/70 hover:text-racing-red transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="px-4 py-1.5 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest hover:bg-racing-red hover:text-white transition-all duration-300">
          Inquiry
        </button>
      </div>
    </nav>
  );
}

function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 grid grid-cols-6 lg:grid-cols-12 px-6 lg:px-12 opacity-30">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="grid-line hidden lg:block" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`m-${i}`} className="grid-line lg:hidden" />
      ))}
    </div>
  );
}

function HeroSection() {
  const { ref, isInView } = useInView<HTMLElement>(0.1);

  return (
    <section ref={ref} className="relative pt-8 lg:pt-20 border-b border-white/5 overflow-hidden">
      <div className="px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <div
            className={`max-w-2xl ${isInView ? "animate-slide-up" : "opacity-0"}`}
          >
            <div className="font-mono text-racing-red text-xs tracking-widest mb-4">
              TYPE-911 // SPECIFICATION 2025
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tighter leading-none uppercase text-balance text-foreground">
              Precision <br />
              Instrument
            </h1>
          </div>
          <div
            className={`lg:w-1/3 text-muted-foreground text-sm font-mono tracking-tight pb-2 ${
              isInView ? "animate-slide-up delay-200" : "opacity-0"
            }`}
          >
            [REF: FLAT-SIX 4.0L] <br />
            Aerodynamic efficiency optimized for zero lift at high velocity. The
            benchmark for visceral engineering.
          </div>
        </div>

        <div
          className={`relative ${isInView ? "animate-slide-up delay-400" : "opacity-0"}`}
        >
          <div className="w-full aspect-[21/9] bg-neutral-900 border border-white/5 overflow-hidden relative">
            <img
              src={heroCar}
              alt="Porsche 911 side profile elevation"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <div className="absolute top-1/4 left-[15%] flex gap-4 items-center">
            <div
              className={`w-12 h-px bg-racing-red origin-left ${
                isInView ? "animate-line" : "scale-x-0"
              }`}
            />
            <span className="font-mono text-[9px] text-racing-red bg-background/80 px-1 backdrop-blur-sm">
              ACTIVE_AERO_01
            </span>
          </div>
          <div className="absolute bottom-1/3 right-[15%] flex gap-4 items-center flex-row-reverse">
            <div
              className={`w-12 h-px bg-racing-red origin-right ${
                isInView ? "animate-line delay-600" : "scale-x-0"
              }`}
            />
            <span className="font-mono text-[9px] text-racing-red bg-background/80 px-1 backdrop-blur-sm">
              CERAMIC_REAR_BRAKES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecGrid() {
  const { ref, isInView } = useInView<HTMLElement>();
  const specs = [
    { label: "Acceleration 0-100 km/h", value: 3.2, suffix: "s", barColor: "bg-racing-red" },
    { label: "Power Output (HP)", value: 518, suffix: "hp", barColor: "bg-foreground" },
    { label: "Top Velocity", value: 318, suffix: "km/h", barColor: "bg-foreground" },
  ];

  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
      {specs.map((spec, i) => (
        <div
          key={spec.label}
          className={`p-6 lg:p-12 ${
            i < specs.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
          } border-white/5 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-500`}
        >
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {spec.label}
          </span>
          <div className="mt-8 flex items-baseline gap-2">
            <span className="text-5xl lg:text-6xl font-bold tracking-tighter text-foreground">
              <AnimatedNumber
                value={spec.value}
                suffix={spec.suffix}
                isInView={isInView}
                delay={i * 200}
              />
            </span>
          </div>
          <div className="mt-4 w-full h-1 bg-neutral-900 overflow-hidden">
            <div
              className={`h-full ${spec.barColor} spec-bar-fill origin-left ${
                isInView ? "animate-line" : "scale-x-0"
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function ModelLineup() {
  const { ref, isInView } = useInView<HTMLElement>();

  const models = [
    {
      name: "911 Turbo",
      desc: "All-wheel drive, Twin-turbocharged",
      price: "FROM $230,000",
      img: modelTurbo,
      alt: "Porsche 911 Turbo front three quarter view",
    },
    {
      name: "911 GT3",
      desc: "Rear-wheel drive, Naturally aspirated",
      price: "FROM $224,000",
      img: modelGt,
      alt: "Porsche 911 GT3 rear view with wing",
    },
  ];

  return (
    <section ref={ref} className="p-6 lg:p-12 relative z-10">
      <div className="flex justify-between items-baseline mb-12">
        <h2 className="text-2xl font-bold uppercase tracking-tighter text-foreground">
          Lineup
        </h2>
        <div className="h-px flex-1 mx-8 bg-white/5" />
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Category: High Performance
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
        {models.map((model, i) => (
          <div
            key={model.name}
            className={`bg-background p-6 group cursor-default ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 150 + 200}ms` }}
          >
            <div className="w-full aspect-video bg-neutral-900 border border-white/5 overflow-hidden mb-6">
              <img
                src={model.img}
                alt={model.alt}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover model-card-img"
              />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                  {model.name}
                </h3>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  {model.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono border border-white/5 text-muted-foreground px-2 py-1 hover:border-racing-red hover:text-racing-red transition-colors duration-300">
                {model.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureSection() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase text-balance text-foreground mb-8 ${
            isInView ? "animate-slide-up" : "opacity-0"
          }`}
        >
          There is no <span className="text-racing-red">substitute</span>.
        </h2>
        <p
          className={`text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto font-mono leading-relaxed ${
            isInView ? "animate-slide-up delay-200" : "opacity-0"
          }`}
        >
          For over seven decades, Porsche has pursued a single objective: to build the perfect
          sports car. Every millimeter, every gram, every revolution per minute — obsessively
          refined.
        </p>
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 ${
            isInView ? "animate-slide-up delay-400" : "opacity-0"
          }`}
        >
          <button className="px-8 py-4 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-racing-red hover:text-white transition-all duration-300">
            Explore Configurator
          </button>
          <button className="px-8 py-4 border border-white/10 text-foreground text-xs font-bold uppercase tracking-widest hover:border-racing-red hover:text-racing-red transition-all duration-300">
            Locate Inventory
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 lg:px-12 bg-neutral-950 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="text-lg font-bold mb-4 tracking-tighter uppercase text-foreground">
            Engineered for the Pursuit
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed max-w-xs uppercase font-mono">
            Every Porsche vehicle is the result of rigorous computational fluid dynamics
            and thousands of hours on the asphalt. No compromise. No apologies.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-[10px] tracking-widest uppercase font-mono">
          <div className="flex flex-col gap-3">
            <span className="text-racing-red">Connect</span>
            {["Instagram", "YouTube", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-racing-red">Legal</span>
            {["Privacy", "Cookies", "Terms"].map((s) => (
              <a key={s} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-muted-foreground uppercase tracking-widest gap-2">
        <span> 2025 Dr. Ing. h.c. F. Porsche AG</span>
        <span>Designed in Stuttgart</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-racing-red selection:text-white">
      <GridOverlay />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <SpecGrid />
        <ModelLineup />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
