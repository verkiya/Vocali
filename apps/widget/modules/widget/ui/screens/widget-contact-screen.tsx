import { ArrowLeftIcon, CheckIcon, CopyIcon, PhoneIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { useAtomValue, useSetAtom } from "jotai";
import { screenAtom, widgetSettingsAtom } from "../../atoms/widget-atoms";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";

export const WidgetContactScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);

  const phoneNumber = widgetSettings?.vapiSettings?.phoneNumber;

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    if (!phoneNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex w-full items-center justify-between">
          <Button
            variant="neonPurple"
            size="icon"

            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Contact Support
          </p>
          <div className="w-9" /> {/* Spacer to center the text */}
        </div>
      </WidgetHeader>
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-6 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-[ping_3s_ease-in-out_infinite] rounded-full bg-[#7266ff]/10" />
          <div className="absolute inset-2 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-[#7266ff]/20" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7266ff] to-[#5143ff] text-white shadow-[0_0_20px_rgba(114,102,255,0.4)]">
            <PhoneIcon className="size-6" />
          </div>
        </div>

        <div className="space-y-2 px-4">
          <p className="text-sm font-medium text-[#7266ff] dark:text-[#7266ff]/80">
            Available 24/7
          </p>
          <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {phoneNumber}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-y-3 rounded-3xl border border-[#7266ff]/20 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-[#7266ff]/20 dark:bg-black/40">
          <Button
            variant="neonPurple"
            className="group relative flex h-14 w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-2xl font-semibold shadow-[0_0_20px_rgba(114,102,255,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-8px_rgba(114,102,255,0.6)] active:scale-95"
            asChild
          >
            <Link href={`tel:${phoneNumber}`}>
              <PhoneIcon className="size-5" />
              Call Now
            </Link>
          </Button>

          <Button
            variant="outline"
            className="group relative flex h-14 w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-2xl border-2 border-[#7266ff]/40 bg-transparent font-semibold text-[#7266ff] transition-all hover:border-[#7266ff] hover:bg-[#7266ff]/5 active:scale-95"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <CheckIcon className="size-5 text-emerald-500" />
                <span className="text-emerald-500">Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon className="size-5" />
                Copy Number
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
