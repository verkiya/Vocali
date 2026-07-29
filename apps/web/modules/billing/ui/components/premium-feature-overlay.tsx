"use client";

import {
  type LucideIcon,
  BotIcon,
  PhoneIcon,
  MicIcon,
  CodeIcon,
  SparklesIcon,
  GemIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
}

const features: Feature[] = [
  {
    icon: SparklesIcon,
    label: "Everything in Free",
    description: "All features included in the Free plan",
  },
  {
    icon: BotIcon,
    label: "AI Customer Support",
    description: "24/7 AI voice agents for your customers",
  },
  {
    icon: PhoneIcon,
    label: "Global VOIP System",
    description: "Global phone numbers in 50+ countries",
  },
  {
    icon: MicIcon,
    label: "Custom Agent Voice",
    description: "Choose from 100+ premium voices",
  },
  {
    icon: CodeIcon,
    label: "API Access",
    description: "Programmatic access to all Vocali APIs",
  },
];

export const PremiumFeatureOverlay = ({
  children,
}: PremiumFeatureOverlayProps) => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none select-none blur-sm opacity-40 transition-all duration-500">
        {children}
      </div>

      <div className="absolute inset-0 bg-background/30 backdrop-blur-[8px] z-30" />

      <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-white/20 dark:border-white/10 rounded-[2rem] bg-white/70 dark:bg-black/60 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_60px_rgba(114,102,255,0.2)] overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6 relative">
            <div className="flex items-center justify-center relative mb-4">
              <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-[#7266ff] to-[#5143ff] text-white shadow-lg shadow-[#7266ff]/20">
                <GemIcon className="size-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Pro Plan Required</CardTitle>
            <CardDescription className="text-base font-medium text-gray-500 dark:text-gray-400">
              Unlock this feature and supercharge your workflow.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-10">
            <div className="space-y-5 rounded-2xl bg-white/40 dark:bg-white/5 p-5 border border-white/20 dark:border-white/10 shadow-inner">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#7266ff]/10 dark:bg-[#7266ff]/20 text-[#7266ff]">
                    <feature.icon className="size-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{feature.label}</p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
             variant="premium" className="w-full h-20 rounded-xl text-2xl font-bold"  size="lg"            onClick={() => router.push("/billing")}
            >
             Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
