import Link from "next/link";

import AuroraBackground from "@/components/AuroraBackground";
import EqualizerBars from "@/components/EqualizerBars";
import Navbar from "@/components/Navbar";

const GENRES = [
  "LO-FI",
  "CINEMATIC",
  "AMBIENT",
  "SYNTHWAVE",
  "ORCHESTRAL",
  "DREAM POP",
  "JAZZ",
  "ELECTRONIC",
];

const FEATURES = [
  {
    tag: "01",
    title: "Emotion Intelligence",
    body: "Gemini 2.5 reads your words and maps their emotional fingerprint — primary feeling, undertones, intensity and valence.",
    glow: "from-neon-violet/25",
    accent: "text-neon-violet",
  },
  {
    tag: "02",
    title: "Prompt Alchemy",
    body: "Feelings are transmuted into a producer-grade brief: genre, tempo, instrumentation and dynamics tuned to your mood.",
    glow: "from-neon-pink/25",
    accent: "text-neon-pink",
  },
  {
    tag: "03",
    title: "Lyria Sound Engine",
    body: "Google Lyria composes an original instrumental and hands you a studio-quality WAV in under a minute.",
    glow: "from-neon-cyan/25",
    accent: "text-neon-cyan",
  },
];

const STEPS = [
  { n: "1", title: "Describe", body: "Type any scene, memory or mood — a sentence is enough." },
  { n: "2", title: "Feel", body: "The agent pipeline dissects the emotion behind every word." },
  { n: "3", title: "Listen", body: "Lyria turns that feeling into a track you can keep." },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AuroraBackground />
      <Navbar />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-28 text-center">
        <div className="animate-fade-up glass mb-8 flex items-center gap-3 rounded-full px-5 py-2 text-xs tracking-[0.28em] text-white/60 uppercase">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon-cyan" />
          Gemini 3.5 · Lyria 002 · Google ADK
        </div>

        <h1
          className="animate-fade-up font-display text-[13vw] leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.08s" }}
        >
          Type a feeling.
          <br />
          <span className="text-gradient">Hear it alive.</span>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
          style={{ animationDelay: "0.16s" }}
        >
          Resonance reads the emotion inside your words and composes original music around
          them — from lo-fi solace to cinematic thunder. No instruments. Just sentences.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.24s" }}
        >
          <Link
            href="/studio"
            className="group relative rounded-full bg-gradient-to-r from-neon-violet via-neon-pink to-neon-cyan px-9 py-4 font-display text-sm font-bold tracking-widest text-ink uppercase shadow-[0_0_40px_rgba(167,139,250,0.5)] transition hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(244,114,182,0.65)]"
          >
            Start composing
          </Link>
          <a
            href="#how"
            className="glass rounded-full px-9 py-4 font-display text-sm font-bold tracking-widest text-white/80 uppercase transition hover:bg-white/10"
          >
            See the magic
          </a>
        </div>

        <EqualizerBars
          bars={36}
          className="animate-floaty mt-16 h-20 w-full max-w-md opacity-80"
        />
      </section>

      <section aria-hidden className="relative overflow-hidden border-y border-white/8 py-5">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...GENRES, ...GENRES].map((g, i) => (
            <span
              key={i}
              className="font-display flex items-center gap-10 text-sm font-semibold tracking-[0.35em] text-white/30"
            >
              {g} <span className="text-gradient">✦</span>
            </span>
          ))}
        </div>
      </section>

      <section id="how" className="relative mx-auto max-w-6xl px-6 py-28">
        <p className="font-display text-xs font-bold tracking-[0.35em] text-neon-cyan uppercase">
          The pipeline
        </p>
        <h2 className="font-display mt-4 max-w-2xl text-4xl font-bold md:text-5xl">
          Three agents. One <span className="text-gradient">emotional</span> symphony.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.tag}
              className={`glass group relative overflow-hidden rounded-3xl p-8 transition duration-300 hover:-translate-y-1.5 hover:border-white/20`}
            >
              <div
                className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${f.glow} to-transparent blur-2xl transition duration-500 group-hover:scale-150`}
              />
              <span className={`font-display text-sm font-bold ${f.accent}`}>{f.tag}</span>
              <h3 className="font-display mt-4 text-xl font-bold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{f.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-panel/90 p-8">
              <span className="text-gradient font-display text-5xl font-bold">{s.n}</span>
              <h4 className="font-display mt-4 text-lg font-bold">{s.title}</h4>
              <p className="mt-2 text-sm text-white/50">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] p-12 text-center md:p-16">
          <div className="absolute -top-24 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.28),transparent_65%)] blur-2xl" />
          <EqualizerBars bars={18} className="mx-auto h-10 w-48" />
          <h2 className="font-display relative mt-8 text-3xl font-bold md:text-5xl">
            Your next soundtrack is <span className="text-gradient">one sentence away.</span>
          </h2>
          <Link
            href="/studio"
            className="relative mt-10 inline-block rounded-full bg-white px-10 py-4 font-display text-sm font-bold tracking-widest text-ink uppercase transition hover:scale-105 hover:bg-neon-violet"
          >
            Open the studio
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/8 px-6 py-10 text-center text-xs tracking-widest text-white/30 uppercase">
        Resonance — built with Google ADK, Gemini &amp; Lyria
      </footer>
    </main>
  );
}
