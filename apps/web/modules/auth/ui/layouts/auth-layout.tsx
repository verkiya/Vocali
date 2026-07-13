"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Vocali Logo – inline SVG from /app/icon.svg                        */
/* ------------------------------------------------------------------ */
function VocaliLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
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
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[100px] animate-[auth-float-1_20s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px] animate-[auth-float-2_25s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full opacity-[0.15] blur-[120px] animate-[auth-float-3_18s_ease-in-out_infinite]"
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
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/40 animate-[auth-particle_15s_ease-in-out_infinite]"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + ((i * 37) % 60)}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${12 + i * 3}s`,
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
    description:
      "Deploy intelligent voice assistants that handle customer conversations naturally",
    icon: (
      <svg
        width="18"
        height="18"
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
        <path
          d="M2 8C2.55228 8 3 8.44772 3 9V11C3 11.5523 2.55228 12 2 12C1.44772 12 1 11.5523 1 11V9C1 8.44772 1.44772 8 2 8Z"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M18 7C18.5523 7 19 7.44772 19 8V12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12V8C17 7.44772 17.4477 7 18 7Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    label: "Human + AI Collaboration",
    description:
      "Seamlessly hand off between AI and human operators without losing context",
    icon: (
      <svg
        width="18"
        height="18"
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
    description:
      "End-to-end encryption, role-based access, and multi-tenant isolation",
    icon: (
      <svg
        width="18"
        height="18"
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
/*  Auth Layout                                                        */
/* ------------------------------------------------------------------ */
export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full bg-background">
      {/* Global animated background */}
      <AnimatedBackground />

      {/* ─── Left branding panel ─── */}
      <aside
        className="relative hidden w-[480px] shrink-0 flex-col justify-between overflow-hidden border-r border-border/40 lg:flex xl:w-[540px]"
        aria-hidden="true"
      >
        {/* Panel overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between px-10 py-10 xl:px-12 xl:py-12">
          {/* Top: Logo + wordmark */}
          <div
            className="flex items-center gap-2.5"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <VocaliLogo className="text-primary" />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Vocali
            </span>
          </div>

          {/* Center: Headline + features */}
          <div className="flex flex-col gap-10">
            <div
              className="flex flex-col gap-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              <h1 className="text-[28px] font-semibold leading-[1.2] tracking-tight text-foreground xl:text-[32px]">
                Intelligent customer
                <br />
                communication,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  powered by AI.
                </span>
              </h1>
              <p className="max-w-[380px] text-[15px] leading-relaxed text-muted-foreground">
                Deploy AI voice agents and live chat that work alongside your
                team — resolving conversations faster and smarter.
              </p>
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.label}
                  className="group flex items-start gap-3.5 rounded-xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-border/40 hover:bg-card/50"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card/80 text-primary shadow-sm transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-primary/10">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {feature.label}
                    </span>
                    <span className="text-[13px] leading-snug text-muted-foreground">
                      {feature.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Trust indicator */}
          <div
            className="flex flex-col gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-sm shadow-emerald-500/50" />
              <p className="text-[13px] text-muted-foreground/70">
                Trusted by forward-thinking teams building modern customer
                experiences.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Right: Auth content area ─── */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-8">
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
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Vocali
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            AI-powered customer communication platform
          </p>
        </div>

        {/* Clerk component renders here */}
        <div
          className="w-full max-w-[440px]"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateY(0) scale(1)"
              : "translateY(6px) scale(0.99)",
            transition:
              "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
