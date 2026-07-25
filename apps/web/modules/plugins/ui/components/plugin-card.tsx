import { ArrowLeftRightIcon, type LucideIcon, PlugIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";

export interface Feature {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface PluginCardProps {
  isDisabled?: boolean;
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
}

const GradientBorder = ({ rx }: { rx: string }) => (
  <div
    className="pointer-events-none absolute inset-0 border border-transparent bg-gradient-to-r from-cyan-500/50 to-purple-500/50"
    style={{
      borderRadius: rx,
      WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
  />
);

export const PluginCard = ({
  isDisabled,
  serviceName,
  serviceImage,
  features,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="relative h-fit w-full overflow-hidden rounded-2xl p-8 shadow-xl backdrop-blur-xl">
      <GradientBorder rx="16px" />
      
      {/* Subtle top gradient glow */}
      <div className="absolute inset-x-0 -top-px h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-purple-500/50 opacity-100" />

      <div className="mb-8 flex items-center justify-center gap-6">
        <div className="relative flex size-14 items-center justify-center rounded-2xl p-2 shadow-inner">
          <GradientBorder rx="16px" />
          <Image
            alt={serviceName}
            className="rounded object-contain drop-shadow-md"
            height={36}
            width={36}
            src={serviceImage}
          />
        </div>

        <div className="flex flex-col items-center gap-1 text-purple-400">
          <ArrowLeftRightIcon className="size-5 animate-[pulse_2s_ease-in-out_infinite]" />
        </div>

        <div className="relative flex size-14 items-center justify-center rounded-2xl p-2 shadow-inner">
          <GradientBorder rx="16px" />
          <Image
            alt="Platform"
            className="object-contain drop-shadow-md"
            height={32}
            width={32}
            src="/icon.svg"
          />
        </div>
      </div>

      <div className="mb-8 text-center">
        <h3 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
          Connect {serviceName}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground/80">
          Authorize access to unlock seamless integrations
        </p>
      </div>

      <div className="mb-8">
        <div className="space-y-5">
          {features.map((feature) => (
            <div className="flex items-start gap-4" key={feature.label}>
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl text-purple-400 shadow-sm">
                <GradientBorder rx="12px" />
                <feature.icon className="size-4.5" />
              </div>
              <div className="pt-0.5">
                <div className="text-sm font-semibold tracking-tight text-foreground">{feature.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground/70">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          className="h-11 w-full rounded-xl font-medium tracking-wide shadow-md shadow-purple-500/25"
          disabled={isDisabled}
          onClick={onSubmit}
          variant="gradientAI"
        >
          <span>Connect Account</span>
          <PlugIcon className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};
