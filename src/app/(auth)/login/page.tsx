"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="glass animate-fade-up w-full max-w-md rounded-[2rem] p-9 md:p-11">
      <h1 className="font-display text-3xl font-bold">
        Welcome <span className="text-gradient">back.</span>
      </h1>
      <p className="mt-2 text-sm text-white/45">
        Log in to your studio. Your library is waiting.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/studio");
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/40 uppercase">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@universe.com"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-neon-violet/60 focus:shadow-[0_0_24px_rgba(167,139,250,0.2)]"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-widest text-white/40 uppercase">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-neon-pink/60 focus:shadow-[0_0_24px_rgba(244,114,182,0.2)]"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-neon-violet via-neon-pink to-neon-cyan py-3.5 font-display text-sm font-bold tracking-widest text-ink uppercase shadow-[0_0_32px_rgba(167,139,250,0.4)] transition hover:scale-[1.02]"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-white/35">
        Auth is coming soon —{" "}
        <Link href="/studio" className="text-neon-cyan underline-offset-4 hover:underline">
          skip and enter the studio
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-white/50">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-white underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
