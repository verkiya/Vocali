"use client";

import { useOrganization } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { IntegrationId, INTEGRATIONS } from "../../constants";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  const { organization } = useOrganization();

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization ID not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    setSelectedSnippet(snippet);
    setDialogOpen(true);
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.info("Copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex min-h-screen flex-col bg-background p-8 sm:p-12">
        <div className="mx-auto w-full max-w-screen-lg">
          <div className="space-y-3 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7266ff] to-[#5143ff] bg-clip-text text-transparent drop-shadow-sm">
                Setup & Integrations
              </span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              Choose the integration that&apos;s right for you and seamlessly deploy your AI agent.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-xl shadow-xl dark:shadow-[0_0_40px_rgba(114,102,255,0.05)] p-8 md:p-10 mb-10 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7266ff]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1 space-y-1">
                  <Label className="text-lg font-bold text-gray-900 dark:text-gray-100" htmlFor="organization-id">
                    Organization ID
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your unique identifier required for initializing the agent.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Input
                    disabled
                    id="organization-id"
                    readOnly
                    value={organization?.id ?? ""}
                    className="flex-1 md:w-64 bg-white/70 dark:bg-white/5 font-mono text-sm border-white/20 dark:border-white/10 rounded-xl h-12 shadow-inner"
                  />
                  <Button 
                    className="gap-2 rounded-xl h-12 px-6 font-semibold bg-gradient-to-r from-[#7266ff] to-[#5143ff] text-white hover:opacity-90 shadow-lg hover:shadow-[#7266ff]/25 transition-all duration-300 w-32" 
                    onClick={handleCopy}
                  >
                    {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-200/50 dark:bg-gray-800/50" />

              <div className="space-y-6">
                <div className="space-y-1">
                  <Label className="text-xl font-bold text-gray-900 dark:text-gray-100">Select Platform</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Click a platform to generate your customized embed code.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {INTEGRATIONS.map((integration) => (
                    <button
                      key={integration.id}
                      onClick={() => handleIntegrationClick(integration.id)}
                      type="button"
                      className="group cursor-pointer flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-md hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(114,102,255,0.15)] hover:-translate-y-1 hover:border-[#7266ff]/40"
                    >
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-white dark:bg-black/50 shadow-sm border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          alt={integration.title}
                          height={32}
                          src={integration.icon}
                          width={32}
                          className="object-contain"
                        />
                      </div>
                      <p className="font-bold text-gray-900 dark:text-gray-100">{integration.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.info("Copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-2xl border-white/20 dark:border-white/10 bg-white dark:bg-black/60 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_60px_rgba(114,102,255,0.2)] rounded-[2rem] overflow-hidden p-0">
        <div className="p-8 pb-4 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7266ff]/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <DialogHeader className="relative z-10 space-y-3">
            <DialogTitle className="text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-[#7266ff] to-[#5143ff] bg-clip-text text-transparent drop-shadow-sm">
                Integrate with your website
              </span>
            </DialogTitle>
            <DialogDescription className="text-base text-gray-500 dark:text-gray-400 font-medium">
              Follow these simple steps to deploy the AI chatbox directly onto your platform.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-8 p-8 pt-0 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#7266ff]/10 dark:bg-[#7266ff]/20 text-[#7266ff] font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">Copy the embed code</h3>
            </div>

            <div className="group relative ml-3 pl-8 border-l-2 border-gray-200 dark:border-white/10">
              <div className="relative rounded-2xl border border-white/20 dark:border-white/10 bg-gray-900 shadow-inner overflow-hidden">
                <pre className="max-h-[250px] overflow-auto p-5 pr-14 font-mono text-sm break-all whitespace-pre-wrap text-gray-300">
                  {snippet}
                </pre>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-gray-900 via-gray-900 to-transparent pointer-events-none" />
                <Button
                  className="absolute top-4 right-4 size-8 rounded-lg bg-white/10 hover:bg-[#7266ff] text-white opacity-0 transition-all duration-300 group-hover:opacity-100 border border-white/10 hover:border-[#7266ff] z-10"
                  onClick={handleCopy}
                  size="icon"
                >
                  {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#7266ff]/10 dark:bg-[#7266ff]/20 text-[#7266ff] font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">Add the code to your page</h3>
            </div>
            <div className="ml-3 pl-8 border-l-2 border-transparent">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                Paste the snippet above into your website's HTML. We recommend placing it just before the closing <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-[#7266ff] font-mono text-xs">&lt;/head&gt;</code> tag for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
