"use node";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { decryptSecret } from "../lib/secrets";

export const getVapiSecrets = action({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const plugin = await ctx.runQuery(
      internal.system.plugins.getByOrganizationIdAndService,
      {
        organizationId: args.organizationId,
        service: "vapi",
      }
    );

    if (!plugin) {
      return null;
    }

    const encryptedKey = plugin.encryptedKey as string;

    // DECRYPTION EXPLANATION (FRONTEND EXPOSURE):
    // The database stores both the public and private keys in a single encrypted string.
    // We decrypt the string here in memory to access the full object.
    const secretData = decryptSecret<{
      privateApiKey: string;
      publicApiKey: string;
    }>(encryptedKey);

    if (!secretData) {
      return null;
    }

    if (!secretData.publicApiKey) {
      return null;
    }

    if (!secretData.privateApiKey) {
      return null;
    }

    // SECURITY GUARANTEE:
    // When the frontend widget loads, it needs the public key to connect a user to Vapi.
    // We purposely throw away the private key here and *only* send the publicApiKey back 
    // to the browser. The private key never leaks to the frontend!
    return {
      publicApiKey: secretData.publicApiKey,
    };
  },
});
