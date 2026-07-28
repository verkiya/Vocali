"use client";

import { PricingTable } from "../components/pricing-table";
import { CheckCircle2Icon, SparklesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";

export const BillingView = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background pb-24 pt-12 text-foreground sm:pt-20">
      {/* Dynamic Background */}


      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">


          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Upgrade your <span className="bg-gradient-to-r from-[#7266ff] to-[#5143ff] bg-clip-text text-transparent drop-shadow-sm">Voice Experience</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
            Start free, upgrade when you need more power. All plans include 24/7 AI agent availability, unlimited contacts, and real-time transcripts.
          </p>
        </div>



        <div className="mt-8 flex w-full justify-center">
          <div className="w-full max-w-5xl rounded-3xl">
            <PricingTable />
          </div>
        </div>
      </div>
    </div>
  );
};
