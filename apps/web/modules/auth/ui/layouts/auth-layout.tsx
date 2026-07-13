"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, GitBranchIcon, Heart } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

/* ------------------------------------------------------------------ */
/*  Vocali Logo – inline SVG from /app/icon.svg                        */
/* ------------------------------------------------------------------ */
function VocaliLogo({ className }: { className?: string }) {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M35.8177 36.8043C35.3172 37.8411 34.2674 38.5 33.1161 38.5H16.8085C14.5892 38.5 13.1382 36.1739 14.1141 34.1807L25.3765 11.1807C25.8802 10.1521 26.9256 9.5 28.0709 9.5L44.2195 9.5C46.4315 9.5 47.8828 11.8122 46.9212 13.8042L35.8177 36.8043Z"
        fill="currentColor"
      />
      <path
        opacity="0.5"
        d="M6.87054 26.7399C7.92168 29.0424 11.1761 29.0886 12.2922 26.8169L18.676 13.8228C19.6553 11.8294 18.2044 9.5 15.9834 9.5L3.66755 9.5C1.48356 9.5 0.0314944 11.7591 0.938489 13.7459L6.87054 26.7399Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated background – floating orbs, particles, grid              */
/* ------------------------------------------------------------------ */
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
        <defs>
          <pattern
            id="auth-dots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-dots)" />
      </svg>

      {/* Floating orbs – using Tailwind animation classes from globals.css */}
      <div
        className="absolute -top-32 -left-32 h-[600px] w-[600px] animate-[auth-float-1_20s_ease-in-out_infinite] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-24 -bottom-24 h-[500px] w-[500px] animate-[auth-float-2_25s_ease-in-out_infinite] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 h-[400px] w-[400px] animate-[auth-float-3_18s_ease-in-out_infinite] rounded-full opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      {/* Animated connecting lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="10%"
          y1="20%"
          x2="40%"
          y2="60%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="animate-[auth-line-pulse_8s_ease-in-out_infinite]"
        />
        <line
          x1="60%"
          y1="10%"
          x2="30%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="animate-[auth-line-pulse_10s_ease-in-out_infinite_2s]"
        />
        <line
          x1="80%"
          y1="30%"
          x2="50%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="animate-[auth-line-pulse_12s_ease-in-out_infinite_4s]"
        />
        <line
          x1="20%"
          y1="70%"
          x2="70%"
          y2="40%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="animate-[auth-line-pulse_9s_ease-in-out_infinite_1s]"
        />
      </svg>

      {/* Small floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 animate-[auth-particle_15s_ease-in-out_infinite] rounded-full bg-primary/40"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + ((i * 41) % 70)}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${12 + i * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature items                                                      */
/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    label: "AI Voice Agents",
    description: "Deploy intelligent voice assistants naturally",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2C10.5523 2 11 2.44772 11 3V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V3C9 2.44772 9.44772 2 10 2Z"
          fill="currentColor"
        />
        <path
          d="M6 6C6.55228 6 7 6.44772 7 7V13C7 13.5523 6.55228 14 6 14C5.44772 14 5 13.5523 5 13V7C5 6.44772 5.44772 6 6 6Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M14 5C14.5523 5 15 5.44772 15 6V14C15 14.5523 14.5523 15 14 15C13.4477 15 13 14.5523 13 14V6C13 5.44772 13.4477 5 14 5Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    label: "Human + AI",
    description: "Seamless hand off between AI and humans",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 7C8.65685 7 10 5.65685 10 4C10 2.34315 8.65685 1 7 1C5.34315 1 4 2.34315 4 4C4 5.65685 5.34315 7 7 7Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M1 18V16C1 13.7909 2.79086 12 5 12H9C11.2091 12 13 13.7909 13 16V18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 6L16 8L19 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Enterprise Security",
    description: "End-to-end encryption & multi-tenant isolation",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 1L3 4V9.09C3 13.64 6.02 17.9 10 19C13.98 17.9 17 13.64 17 9.09V4L10 1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M7 10L9 12L13 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Tech Stack Pills                                                   */
/* ------------------------------------------------------------------ */
const TECH_STACK = [
  {
    name: "Next.js",
    className:
      "bg-slate-100/50 text-slate-800 border-slate-200 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-800",
  },
  {
    name: "Convex",
    className:
      "bg-red-50/50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
  },
  {
    name: "Clerk",
    className:
      "bg-indigo-50/50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50",
  },
  {
    name: "Tailwind CSS",
    className:
      "bg-sky-50/50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-900/50",
  },
  {
    name: "shadcn/ui",
    className:
      "bg-zinc-100/50 text-zinc-800 border-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-300 dark:border-zinc-800",
  },
];

function LearningsButton() {
  return (
    <Button
      asChild
      size="lg"
      variant="outlinePrimary"
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 shadow-lg  transition-all hover:scale-105"
    >
      <Link href="/learnings" prefetch>
        <span className="font-medium">What I Learned Building Vocali</span>
        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/*  Auth Layout                                                        */
/* ------------------------------------------------------------------ */
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Global animated background */}
      <AnimatedBackground />

      <div className="relative z-10 grid h-screen grid-cols-1 lg:grid-cols-[65%_35%]">
        {/* ─── Left branding panel (65%) ─── */}
        <aside
          className="hidden flex-col justify-center px-10 py-10 lg:flex xl:px-20"
          aria-hidden="true"
        >
          {/* Content Wrapper */}
          <div className="mx-auto w-full max-w-4xl">
            {/* Top: Logo + wordmark */}
            <div
              className="mb-8 flex items-center gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <VocaliLogo className="text-primary" />
              <span className="text-3xl font-bold tracking-tight text-foreground">
                Vocali
              </span>
            </div>

            {/* Center: Headline + Tech Stack */}
            <div
              className="mb-10 flex flex-col gap-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              <h1 className="text-5xl leading-[1.1] font-semibold tracking-tight text-foreground xl:text-7xl">
                Intelligent customer
                <br />
                communication,
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  powered by AI.
                </span>
              </h1>
              <p className="max-w-[500px] text-lg leading-relaxed text-muted-foreground">
                Deploy AI voice agents and live chat that work alongside your
                team — resolving conversations faster and smarter.
              </p>

              {/* Tech Stack Pills */}
              <div className="mt-2 flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <div
                    key={tech.name}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm font-medium",
                      "transition-all duration-200 hover:scale-105 hover:shadow-md",
                      tech.className
                    )}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.label}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-transparent bg-card/30 px-5 py-5 transition-all duration-300 hover:border-border/60 hover:bg-card/60 hover:shadow-lg"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/10">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold text-foreground">
                      {feature.label}
                    </span>
                    <span className="text-sm leading-snug text-muted-foreground">
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom: Trust indicator */}
            <div
              className="mt-12 flex items-center gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease 0.5s",
              }}
            >
              <div className="relative flex h-3 w-3 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-20" />
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground/80">
                Trusted by forward-thinking teams building modern customer
                experiences.
              </p>
            </div>
          </div>
        </aside>

        {/* ─── Right: Auth content area (35%) ─── */}
        <main className="flex items-center justify-center border-l border-border/30 bg-background/50 px-6 sm:px-12 lg:pr-[15%] xl:pr-[20%]">
          <div className="relative w-full max-w-[420px]">
            {/* Mobile logo – only visible below lg breakpoint */}
            <div
              className="mb-10 flex flex-col items-center gap-3 lg:hidden"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div className="flex items-center gap-2.5">
                <VocaliLogo className="text-primary" />
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  Vocali
                </span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                AI-powered customer communication platform
              </p>
            </div>

            {/* Clerk component renders here */}
            {/* Clerk component wrapper with decorative, blur-free frame */}
            <div
              className="relative w-full"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted
                  ? "translateY(0) scale(1)"
                  : "translateY(6px) scale(0.99)",
                transition:
                  "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
              }}
            >
              {/* Outer soft bounding box */}
              <div className="absolute -inset-6 rounded-[2rem] border border-border/40 bg-white/40 shadow-sm" />

              {/* Inner subtle glow gradient (no blur) */}
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

              {/* Architectural corner accents */}
              <div className="absolute -top-7 -left-7 h-8 w-8 rounded-tl-[24px] border-t-[3px] border-l-[3px] border-primary/40" />
              <div className="absolute -top-7 -right-7 h-8 w-8 rounded-tr-[24px] border-t-[3px] border-r-[3px] border-primary/40" />
              <div className="absolute -bottom-7 -left-7 h-8 w-8 rounded-bl-[24px] border-b-[3px] border-l-[3px] border-primary/40" />
              <div className="absolute -right-7 -bottom-7 h-8 w-8 rounded-br-[24px] border-r-[3px] border-b-[3px] border-primary/40" />

              {/* The Actual Auth Box */}
              <div className="relative z-10 flex min-h-[460px] w-full items-center justify-center rounded-2xl bg-white shadow-xl ring-1 shadow-black/5 ring-border/50">
                <div className="w-full">{children}</div>
              </div>

              {/* Minimalist footer links */}
              <div className="absolute right-0 -bottom-16 left-0 flex items-center justify-center gap-4 text-[13px] font-medium text-muted-foreground/70">
                <span className="flex items-center gap-1.5">
                  Built with{" "}
                  <Heart className="size-3.5 fill-rose-500/20 text-rose-500" />{" "}
                  by Vocali
                </span>
                <span>&middot;</span>
                <a
                  href="https://github.com/hiverkiya/Vocali"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <GitBranchIcon className="size-3.5" /> Source
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Centered bottom learnings button */}
      <LearningsButton />
    </div>
  );
};
