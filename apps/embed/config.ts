export const EMBED_CONFIG = {
  // WIDGET_URL points to the Next.js widget application.
  // In development, the widget runs on port 3001 (not 3002, which is this embed demo server).
  // To build for production, pass the environment variable like this:
  // VITE_WIDGET_URL=https://your-production-url.com pnpm build
  WIDGET_URL:
    import.meta.env.VITE_WIDGET_URL || "https://vocaliwidget.vercel.app",
  DEFAULT_ORG_ID: "org_3C4LRt2Wpdczq8Mk2cKHdsZCkYa",
  DEFAULT_POSITION: "bottom-right" as const,
};
