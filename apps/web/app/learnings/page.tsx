import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  ListChecks,
  MessageSquare,
  Mic,
  Route,
  SearchCode,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

const lessons = [
  {
    icon: Mic,
    title: "Real-time Voice Latency is Critical",
    area: "AI Voice",
    summary:
      "When building conversational AI voice agents, any latency above 500ms breaks the natural flow of conversation. Streaming audio directly via WebSockets is mandatory.",
    evidence:
      "Early iterations used HTTP polling for audio chunks, resulting in awkward pauses. Switching to continuous WebSocket streaming solved the delay.",
    watchFor:
      "Do not revert to HTTP-based audio buffering even for 'simpler' voices; it degrades the user experience immediately.",
  },
  {
    icon: Bot,
    title: "AI State Must Be Deterministic",
    area: "Convex / State",
    summary:
      "Conversational context cannot rely solely on the LLM's memory. We must store deterministic conversation state in Convex to allow human agents to take over seamlessly.",
    evidence:
      "Human handoffs failed when the agent hallucinated past context. Convex now acts as the absolute source of truth for the transcript.",
    watchFor:
      "Never pass raw LLM context directly to a human operator without cross-referencing the Convex database transcript.",
  },
  {
    icon: ShieldCheck,
    title: "Clerk Handles Multi-Tenant B2B Well",
    area: "Authentication",
    summary:
      "Vocali requires robust organization support (B2B SaaS). Clerk's organization feature provides exactly what is needed for role-based access control out of the box.",
    evidence:
      "Custom RBAC implementation was taking weeks. Clerk Organizations dropped that to hours while improving security.",
    watchFor:
      "Ensure all Convex mutations strictly verify the Clerk Organization ID. Do not rely solely on the User ID.",
  },
  {
    icon: Zap,
    title: "CSS Animations over JS",
    area: "Frontend Performance",
    summary:
      "React state-driven animations are too slow for complex background effects. Pure CSS keyframes running on the compositor thread are required for 60fps.",
    evidence:
      "The auth-layout background used Framer Motion initially, causing CPU spikes. Switching to Tailwind arbitrary animations resolved all jank.",
    watchFor:
      "Do not use React state (e.g., requestAnimationFrame loops) for decorative UI elements. Stick to CSS.",
  },
];

const invariants = [
  "Convex is the single source of truth for conversation transcripts.",
  "All voice streaming must happen over WebSockets, never HTTP.",
  "Human handoff must happen within 200ms of user request.",
  "Authentication and Organization checks must happen on every Convex mutation.",
  "UI animations must prioritize CSS over JavaScript where possible.",
];

const codePointers = [
  {
    label: "Auth Layout",
    path: "apps/web/modules/auth/ui/layouts/auth-layout.tsx",
    note: "Contains the premium 65/35 split-screen design with CSS-driven background animations.",
  },
  {
    label: "Button Component",
    path: "packages/ui/src/components/button.tsx",
    note: "Centralized button design system with numerous light-mode optimized variants and gradients.",
  },
  {
    label: "Convex Schema",
    path: "packages/backend/convex/schema.ts",
    note: "Defines the strict data model for users, organizations, and conversation transcripts.",
  },
];

export default function LearningsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-28 text-foreground md:pb-32">
      {/* Subtle Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(114,102,255,0.08),transparent_42%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_38%)]" />
      
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16 lg:px-10">
        <div className="w-full">
          <header className="mb-16 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/50 px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground shadow-sm">
              <Route className="size-3.5" />
              Project Insights
            </div>

            <div className="grid gap-8 lg:items-end">
              <div>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight lg:text-[4.5rem] lg:leading-[1.02]">
                  What building
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                    Vocali taught us
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl border-l-2 border-primary/70 pl-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  This page documents the engineering decisions, performance discoveries,
                  and architectural invariants of the Vocali platform. By maintaining this
                  record, we ensure future development aligns with the core principles of
                  low-latency AI communication.
                </p>
              </div>
            </div>
          </header>

          <section className="mb-16 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Mic className="size-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Voice First</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Vocali prioritizes real-time, low-latency audio processing above all else. 
                Speed is the difference between a tool and an experience.
              </p>
            </article>
            <article className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Seamless Handoffs</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                AI shouldn't trap users. The architecture guarantees a smooth transition 
                to a human agent the moment intent shifts or frustration is detected.
              </p>
            </article>
            <article className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Enterprise Grade</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Built from day one to support B2B SaaS requirements: RBAC, 
                isolated tenant data in Convex, and strict auth boundaries.
              </p>
            </article>
          </section>

          <section id="lessons" className="mb-16 scroll-mt-20">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <SearchCode className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Lessons worth preserving</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {lessons.map((lesson) => {
                const Icon = lesson.icon;
                return (
                  <article
                    key={lesson.title}
                    className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                        {lesson.area}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground max-w-prose">
                      {lesson.summary}
                    </p>
                    <div className="mt-5 rounded-lg border border-primary/10 bg-primary/5 p-4 text-sm leading-6 text-foreground">
                      <span className="font-semibold text-primary">
                        Evidence:{" "}
                      </span>
                      {lesson.evidence}
                    </div>
                    <div className="mt-4 rounded-lg border border-amber-200/50 bg-amber-50/50 p-4 text-sm leading-6 text-amber-900">
                      <span className="font-semibold text-amber-700">
                        Watch for:{" "}
                      </span>
                      {lesson.watchFor}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="pointers" className="mb-16 scroll-mt-20">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <SearchCode className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Where to look first</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {codePointers.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="font-semibold">{item.label}</h3>
                  <code
                    className="mt-3 block rounded-lg border bg-slate-50 px-3 py-2 text-xs font-mono text-slate-700"
                  >
                    {item.path}
                  </code>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground max-w-prose">
                    {item.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="invariants" className="rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-7 shadow-sm md:p-9 scroll-mt-20">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <ListChecks className="size-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Maintenance invariants</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {invariants.map((invariant) => (
                <div
                  key={invariant}
                  className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    {invariant}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/85 px-4 py-4">
        <div className="mx-auto flex max-w-7xl justify-center">
          <Button asChild variant="outline" size="lg" className="rounded-full shadow-lg transition-all hover:scale-105 px-8">
            <Link href="/sign-in">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
