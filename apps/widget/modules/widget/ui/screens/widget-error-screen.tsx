"use client";

import { useAtomValue } from "jotai";
import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { errorMessageAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";

export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col gap-y-2 px-4 py-6">
          <p className="text-2xl font-semibold tracking-tight">
            Unable to connect
          </p>

          <p className="text-sm text-muted-foreground">
            We couldn&apos;t start your conversation right now
          </p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 items-center justify-center p-5">
        <div className="w-full max-w-sm rounded-2xl border bg-background p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#7266ff]/20">
            <AlertCircleIcon
              className="size-6 text-[#7266ff]!"
              strokeWidth={2}
            />
          </div>

          <h3 className="text-sm font-semibold">
            Connection interrupted
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {errorMessage || "The assistant could not be initialized. Please try again."}
          </p>

          <Button
            onClick={() => window.location.reload()}
            variant="gradientPrimary"
            className="group mt-5 w-full gap-2 rounded-xl text-xs font-semibold text-primary-foreground shadow-sm transition-all  active:scale-[0.98]"
          >
            <RefreshCwIcon className="size-3.5 transition-transform duration-500 group-hover:rotate-180" />
            Reconnect
          </Button>

          <p className="mt-4 text-[11px] text-muted-foreground">
            URL should be valid /?organizationId=
          </p>
        </div>
      </div>
    </>
  );
};
