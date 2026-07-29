"use client";

import { VapiView } from "@/modules/plugins/ui/views/vapi-view";
import { Show } from "@clerk/nextjs";
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";

const Page = () => {
  return (
    <Show
      // Check if the organization is subscribed to the 'pro' plan
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Show>
  );
};

export default Page;
