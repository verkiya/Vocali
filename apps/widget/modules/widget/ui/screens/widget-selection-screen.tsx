"use client";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import {
  ChevronRightIcon,
  MessageSquareTextIcon,
  MicIcon,
  PhoneIcon,
} from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  hasVapiSecretsAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "../../atoms/widget-atoms";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useState } from "react";
import { WidgetFooter } from "../components/widget-footer";

const ActionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  disabled,
}: {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="group relative cursor-pointer flex w-full items-center gap-x-4 overflow-hidden rounded-2xl border border-[#7266ff]/40 bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#7266ff]/5 hover:to-transparent hover:shadow-[0_8px_24px_-8px_rgba(114,102,255,0.25)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#7266ff]/40 dark:bg-white/5 dark:hover:from-[#7266ff]/10"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100/80 text-gray-500 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:bg-[#7266ff] group-hover:text-white group-hover:shadow-[0_0_12px_rgba(114,102,255,0.4)] dark:bg-white/10 dark:text-gray-400">
      <Icon className="size-6" />
    </div>
    <div className="flex flex-1 flex-col">
      <span className="font-semibold text-gray-900 transition-colors group-hover:text-[#7266ff] dark:text-gray-100 dark:group-hover:text-white">
        {title}
      </span>
      <span className="text-sm text-gray-500 transition-colors group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
        {description}
      </span>
    </div>
    <div className="flex shrink-0 items-center justify-center text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#7266ff] dark:group-hover:text-white">
      <ChevronRightIcon className="size-5" />
    </div>
  </button>
);

export const WidgetSelectionScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const hasVapiSecrets = useAtomValue(hasVapiSecretsAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const createConversation = useMutation(api.public.conversations.create);
  const [isPending, setIsPending] = useState(false);
  const handleNewConversation = async () => {
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing Organization ID");
      return;
    }

    if (!contactSessionId) {
      setScreen("auth");
      return;
    }
    setIsPending(true);
    try {
      const conversationId = await createConversation({
        contactSessionId,
        organizationId,
      });
      setConversationId(conversationId);
      setScreen("chat");
    } catch {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg text-muted-foreground">How can we help you today?</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto p-4">
        <ActionCard
          icon={MessageSquareTextIcon}
          title="Start chat"
          description="Text with our AI assistant"
          onClick={handleNewConversation}
          disabled={isPending}
        />
        {hasVapiSecrets && widgetSettings?.vapiSettings?.assistantId && (
          <ActionCard
            icon={MicIcon}
            title="Start voice call"
            description="Speak directly with our AI"
            onClick={() => setScreen("voice")}
            disabled={isPending}
          />
        )}
        {hasVapiSecrets && widgetSettings?.vapiSettings?.phoneNumber && (
          <ActionCard
            icon={PhoneIcon}
            title="Call us"
            description="Call us on your phone"
            onClick={() => setScreen("contact")}
            disabled={isPending}
          />
        )}
      </div>
      <WidgetFooter />
    </>
  );
};
