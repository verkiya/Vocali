"use client";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
  widgetSettingsAtom,
} from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import {
  AISuggestion,
  AISuggestions,
} from "@workspace/ui/components/ai/suggestion";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";
import { Button } from "@workspace/ui/components/button";
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { AIResponse } from "@workspace/ui/components/ai/response";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import z from "zod";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});
import { Form, FormField } from "@workspace/ui/components/form";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
export const WidgetChatScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? {
          conversationId,
          contactSessionId,
        }
      : "skip"
  );
  const suggestions = useMemo(() => {
    if (!widgetSettings) {
      return [];
    }

    return Object.keys(widgetSettings.defaultSuggestions).map((key) => {
      return widgetSettings.defaultSuggestions[
        key as keyof typeof widgetSettings.defaultSuggestions
      ];
    });
  }, [widgetSettings]);
  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId
      ? { threadId: conversation.threadId, contactSessionId }
      : "skip",
    {
      initialNumItems: 10,
    }
  );
  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const createMessage = useAction(api.public.messages.create);
  const [isThinking, setIsThinking] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!conversation || !contactSessionId) return;
    setIsThinking(true);
    form.reset();
    try {
      await createMessage({
        threadId: conversation.threadId,
        prompt: values.message,
        contactSessionId,
      });
    } finally {
      setIsThinking(false);
    }
  };
  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-x-2">
            <Button size="icon" onClick={onBack} variant="glass">
              <ArrowLeftIcon />
            </Button>
            <p>Chat</p>
          </div>
         
        </div>
      </WidgetHeader>
      <div className="flex min-h-0 flex-1 flex-col gap-y-4 p-4">
        <AIConversation className="min-h-0 flex-1">
          <AIConversationContent>
            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              ref={topElementRef}
            />
            {toUIMessages(messages.results ?? [])
              ?.filter(
                (m) => typeof m.text === "string" && m.text.trim() !== ""
              )
              .map((message) => {
                const text =
                  "text" in message && typeof message.text === "string"
                    ? message.text
                    : "";
                return (
                  <AIMessage
                    from={message.role === "user" ? "user" : "assistant"}
                    key={message.id}
                  >
                    <AIMessageContent>
                      <AIResponse>{text}</AIResponse>
                    </AIMessageContent>
                    {message.role === "assistant" && (
                      <DicebearAvatar
                        imageUrl="/vocali.svg"
                        seed="assistant"
                        size={32}
                      />
                    )}
                  </AIMessage>
                );
              })}
            {isThinking && (
              <AIMessage from="assistant" key="thinking">
                <AIMessageContent className="border-[#d8d1ff] bg-[#f6f2ff] text-[#3b2c8e]/70 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[#8a8aff]"
                      style={{ animationDelay: "0s" }}
                    />
                    <span
                      className="h-2.5 w-2.5 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[#8a8aff]"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="h-2.5 w-2.5 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[#8a8aff]"
                      style={{ animationDelay: "0.3s" }}
                    />
                    <span className="text-sm font-medium text-[#3b2c8e]/70">
                      Thinking...
                    </span>
                  </div>
                </AIMessageContent>
              </AIMessage>
            )}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>

        {toUIMessages(messages.results ?? [])?.length === 1 && (
          <AISuggestions className="flex w-full flex-col items-end p-2">
            {suggestions.map((suggestion) => {
              if (!suggestion) {
                return null;
              }

              return (
                <AISuggestion
                  key={suggestion}
                  onClick={() => {
                    form.setValue("message", suggestion, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    form.handleSubmit(onSubmit)();
                  }}
                  suggestion={suggestion}
                />
              );
            })}
          </AISuggestions>
        )}
        <Form {...form}>
          <AIInput
            className="rounded-none border-x-0 border-b-0"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              disabled={conversation?.status === "resolved"}
              name="message"
              render={({ field }) => (
                <AIInputTextarea
                  disabled={conversation?.status === "resolved"}
                  onChange={field.onChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    conversation?.status === "resolved"
                      ? "This conversation has been resolved."
                      : "Type your message..."
                  }
                  value={field.value}
                />
              )}
            />
            <AIInputToolbar>
              <AIInputTools />
              <AIInputSubmit
                disabled={
                  conversation?.status === "resolved" || !form.formState.isValid
                }
                status="ready"
                type="submit"
              />
            </AIInputToolbar>
          </AIInput>
        </Form>
      </div>
    </>
  );
};
