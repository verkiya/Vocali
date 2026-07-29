export const INTEGRATIONS = [
  {
    id: "html",
    title: "HTML",
    icon: "/html5.svg",
  },
  {
    id: "react",
    title: "React",
    icon: "/react.svg",
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "/nextjs.svg",
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "/javascript.svg",
  },
];

export type IntegrationId = (typeof INTEGRATIONS)[number]["id"];
export const HTML_SCRIPT = `<script src="https://vocaliwidget.vercel.app/widget.iife.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const REACT_SCRIPT = `<script src="https://vocaliwidget.vercel.app/widget.iife.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const NEXTJS_SCRIPT = `<script src="https://vocaliwidget.vercel.app/widget.iife.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const JAVASCRIPT_SCRIPT = `<script src="https://vocaliwidget.vercel.app/widget.iife.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
