import { Hint } from "@workspace/ui/components/hint";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";

export const ConversationStatusButton = ({
  status,
  onClick,
  disabled,
}: {
  status: Doc<"conversations">["status"];
  onClick: () => void;
  disabled?: boolean;
}) => {
  if (status === "resolved") {
    return (
      <Hint text="Mark as unresolved">
        <Button
          disabled={disabled}
          onClick={onClick}
          size="sm"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <CheckIcon />
          Resolved
        </Button>
      </Hint>
    );
  }

  if (status === "escalated") {
    return (
      <Hint text="Mark as resolved">
        <Button
          disabled={disabled}
          onClick={onClick}
          size="sm"
          className="bg-amber-500 text-white hover:bg-amber-600"
        >
          <ArrowUpIcon />
          Escalated
        </Button>
      </Hint>
    );
  }

  return (
    <Hint text="Mark as escalated">
      <Button
        disabled={disabled}
        onClick={onClick}
        size="sm"
        className="bg-red-600 text-white hover:bg-red-700 "
      >
        <ArrowRightIcon />
        Unresolved
      </Button>
    </Hint>
  );
};
