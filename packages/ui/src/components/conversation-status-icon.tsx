import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface ConversationStatusIconProps {
  status: "unresolved" | "escalated" | "resolved";
  className?: string;
}

const statusConfig = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-emerald-400",
  },
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-red-400",
  },
  escalated: {
    icon: ArrowUpIcon,
    bgColor: "bg-amber-400",
  },
} as const;

export const ConversationStatusIcon = ({
  status,
  className,
}: ConversationStatusIconProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex size-5 items-center justify-center rounded-full",
        config.bgColor,
        className
      )}
    >
      <Icon className="size-3 stroke-3 text-white" />
    </div>
  );
};
