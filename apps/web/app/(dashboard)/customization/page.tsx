"use client";

import { CustomizationView } from "@/modules/customization/ui/views/customization-view";
import { Show } from "@clerk/nextjs";
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";

const Page = () => {
  return (
    <Show
      // Check if the organization is subscribed to the 'pro' plan
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Show>
  );
};

export default Page;
