"use client";

import { PricingTable as ClerkPricingTable } from "@clerk/nextjs";

export const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <ClerkPricingTable
        for="organization"
        appearance={{
          elements: {
            pricingTableCard:
              "border! border-white/20! dark:border-white/10! rounded-3xl! bg-white/70! dark:bg-black/60! backdrop-blur-2xl! overflow-hidden! transition-all! duration-500! shadow-xl! dark:shadow-[0_0_40px_rgba(114,102,255,0.15)]! hover:-translate-y-2! hover:shadow-2xl! dark:hover:shadow-[0_0_60px_rgba(114,102,255,0.3)]! hover:border-[#7266ff]/50!",

            pricingTableCardHeader: "bg-transparent! border-b! border-white/10! dark:border-white/5! px-8! py-8!",

            pricingTableCardBody: "bg-transparent! px-8! py-6!",

            pricingTableCardFooter: "bg-transparent! px-8! py-8!",

            buttonPrimary:
              "bg-gradient-to-r! from-[#7266ff]! to-[#5143ff]! text-white! hover:opacity-100! active:scale-95! focus:ring-2! focus:ring-[#7266ff]/50! rounded-xl! shadow-[0_4px_14px_0_rgba(114,102,255,0.39)]! hover:shadow-[0_0_20px_rgba(114,102,255,0.6)]! transition-all! duration-300! border-none!",

            button:
              "bg-gradient-to-r! from-[#7266ff]! to-[#5143ff]! text-white! hover:opacity-100! rounded-xl! transition-all! duration-300!",

            pricingTableCheckoutButton:
              "bg-gradient-to-r! from-[#7266ff]! to-[#5143ff]! text-white! hover:opacity-100! active:scale-95! shadow-[0_4px_14px_0_rgba(114,102,255,0.39)]! hover:shadow-[0_0_20px_rgba(114,102,255,0.6)]! rounded-xl! transition-all! duration-300! border-none!",

            buttonSecondary:
              "bg-[#7266ff]/10! text-[#7266ff]! hover:bg-[#7266ff]/20! rounded-xl! transition-all! duration-300! border-none!",

            pricingTablePrice: "text-5xl! font-black! text-gray-900! dark:text-white! tracking-tight!",

            pricingTablePlanTitle: "text-2xl! font-bold! text-gray-900! dark:text-white!",

            pricingTablePlanDescription: "text-sm! text-gray-500! dark:text-gray-400! font-medium!",

            pricingTableFeature: "text-sm! text-gray-700! dark:text-gray-300! font-medium!",

            pricingTableFeatureIcon: "text-[#7266ff]! drop-shadow-[0_0_8px_rgba(114,102,255,0.5)]!",
          },
        }}
      />
    </div>
  );
};
