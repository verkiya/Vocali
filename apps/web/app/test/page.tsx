"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowRight, LogIn, Mail, Settings, Sparkles, User, Zap } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
export default function ButtonTestPage() {
  return (
    <main className="min-h-screen bg-background p-10 lg:p-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Button Variants Showcase
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive list of all light-mode button variants added to the
            design system for Vocali.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href="/sign-in">
                Back to Sign In
              </Link>
            </Button>
            <Button asChild variant="gradientPrimary">
              <Link href="/learnings">
                View Learnings Page
              </Link>
            </Button>
          </div>
        </div>

        <section className="space-y-6 rounded-2xl border border-border/50 bg-slate-50/50 p-8">
          <div className="border-b border-border/50 pb-4">
            <h2 className="text-2xl font-semibold">Core & Standard</h2>
            <p className="text-sm text-muted-foreground">The foundational buttons for standard actions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link Style</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="success">Success</Button>
            <Button variant="info">Info</Button>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-border/50 bg-slate-50/50 p-8">
          <div className="border-b border-border/50 pb-4">
            <h2 className="text-2xl font-semibold">Gradients</h2>
            <p className="text-sm text-muted-foreground">Vibrant backgrounds for primary calls to action.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="gradientPrimary">Primary Gradient</Button>
            <Button variant="gradientAI">AI Gradient</Button>
            <Button variant="gradientOcean">Ocean Gradient</Button>
            <Button variant="gradientSunset">Sunset Gradient</Button>
            <Button variant="gradientEmerald">Emerald Gradient</Button>
            <Button variant="gradientAmber">Amber Gradient</Button>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-border/50 bg-slate-50/50 p-8">
          <div className="border-b border-border/50 pb-4">
            <h2 className="text-2xl font-semibold">Soft Tinted (Pastels)</h2>
            <p className="text-sm text-muted-foreground">Low-intensity colored backgrounds for subtle actions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="softPurple">Soft Purple</Button>
            <Button variant="softBlue">Soft Blue</Button>
            <Button variant="softEmerald">Soft Emerald</Button>
            <Button variant="softAmber">Soft Amber</Button>
            <Button variant="softRose">Soft Rose</Button>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-border/50 bg-slate-50/50 p-8">
          <div className="border-b border-border/50 pb-4">
            <h2 className="text-2xl font-semibold">Outlines & Unique</h2>
            <p className="text-sm text-muted-foreground">Specialized buttons for specific contextual uses.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outlinePrimary">Outline Primary</Button>
            <Button variant="outlineDestructive">Outline Destructive</Button>
            <Button variant="neonPurple">Neon Glowing Purple</Button>
            <Button variant="dark">Solid Dark</Button>
            <Button variant="subtle">Very Subtle</Button>
          </div>
        </section>

        <section className="relative space-y-6 rounded-2xl border border-border/50 p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90"></div>
          <div className="relative z-10 border-b border-white/20 pb-4 text-white">
            <h2 className="text-2xl font-semibold">Glass & Transparent</h2>
            <p className="text-sm text-white/80">Tested over a colorful background to show translucency.</p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <Button variant="glass">Glass Button</Button>
            <Button variant="transparent">Transparent Text</Button>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-border/50 bg-slate-50/50 p-8">
          <div className="border-b border-border/50 pb-4">
            <h2 className="text-2xl font-semibold">With Icons & Sizes</h2>
            <p className="text-sm text-muted-foreground">Demonstrating sizing and icon alignment.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex flex-wrap items-end gap-4">
              <Button variant="gradientPrimary" size="lg">
                <Sparkles className="mr-2" /> Large with Icon
              </Button>
              <Button variant="default" size="default">
                <Mail className="mr-2" /> Default Size
              </Button>
              <Button variant="softBlue" size="sm">
                <User className="mr-2" /> Small
              </Button>
              <Button variant="outline" size="xs">
                Tiny
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="icon-lg">
                <Settings />
              </Button>
              <Button variant="gradientOcean" size="icon">
                <Zap />
              </Button>
              <Button variant="outlineDestructive" size="icon-sm">
                <LogIn className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="dark" className="rounded-full">
                Fully Rounded
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="softEmerald" className="w-full sm:w-auto">
                Responsive Full Width (on mobile)
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-border/50 bg-slate-50/50 p-8">
          <div className="border-b border-border/50 pb-4">
            <h2 className="text-2xl font-semibold">Toast Notifications</h2>
            <p className="text-sm text-muted-foreground">Click to showcase the custom toast variants.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="default" onClick={() => toast("Default Toast", { description: "This is a default toast notification." })}>
              Default Toast
            </Button>
            <Button variant="success" onClick={() => toast.success("Success!", { description: "Your action was successful." })}>
              Success Toast
            </Button>
            <Button variant="destructive" onClick={() => toast.error("Error!", { description: "Something went wrong." })}>
              Error Toast
            </Button>
            <Button variant="accent" onClick={() => toast.warning("Warning!", { description: "Please be careful with this action." })}>
              Warning Toast
            </Button>
            <Button variant="info" onClick={() => toast.info("Info", { description: "Here is some useful information." })}>
              Info Toast
            </Button>
          </div>
        </section>

      </div>
    </main>
  );
}
