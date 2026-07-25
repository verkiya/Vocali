"use node";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { encryptSecret } from "../lib/secrets";

export const upsert = internalAction({
  args: {
    organizationId: v.string(),
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    // ENCRYPTION EXPLANATION:
    // When the user submits their keys in the dashboard, they are sent here as a single package:
    // { privateApiKey: "...", publicApiKey: "..." }
    // We encrypt that entire object into one single Base64 string so that both keys are safely 
    // secured at rest using just one database column.
    const encryptedKey = encryptSecret(args.value);

    await ctx.runMutation(internal.system.plugins.upsert, {
      service: args.service,
      encryptedKey,
      organizationId: args.organizationId,
    });

    return { status: "success" };
  },
});
