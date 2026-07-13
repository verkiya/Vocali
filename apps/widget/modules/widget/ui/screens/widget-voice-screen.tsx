import { ArrowLeftIcon, MicIcon, MicOffIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { useSetAtom } from "jotai";
import { screenAtom } from "../../atoms/widget-atoms";
import { cn } from "@workspace/ui/lib/utils";

export const WidgetVoiceScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const {
    isConnected,
    isSpeaking,
    transcript,
    startCall,
    endCall,
    isConnecting,
  } = useVapi();

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <p className="font-medium">Voice Chat</p>
        </div>
      </WidgetHeader>

      {transcript.length > 0 ? (
        <AIConversation className="h-full">
          <AIConversationContent>
            {transcript.map((message, index) => (
              <AIMessage
                from={message.role}
                key={`${message.role}-${index}-${message.text}`}
              >
                <AIMessageContent>{message.text}</AIMessageContent>
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
      ) : (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
            <div className="relative flex items-center justify-center rounded-full border bg-background p-4 shadow-md">
              <MicIcon className="size-7 text-primary" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-medium">Start a conversation</p>
            <p className="text-sm text-muted-foreground">
              Your voice transcript will appear here
            </p>
          </div>
        </div>
      )}

      <div className="border-t bg-background p-4">
        <div className="flex flex-col items-center gap-y-4">
          {isConnected && (
            <div className="flex items-center gap-x-2 rounded-full bg-muted px-3 py-1">
              <div
                className={cn(
                  "size-2.5 rounded-full",
                  isSpeaking ? "animate-pulse bg-red-500" : "bg-green-500"
                )}
              />
              <span className="text-xs text-muted-foreground">
                {isSpeaking
                  ? "Assistant Speaking..."
                  : "Listening to Customer..."}
              </span>
            </div>
          )}

          <div className="w-full">
            {isConnected ? (
              <Button
                className="w-full gap-x-2 shadow-md"
                size="lg"
                variant="destructive"
                onClick={endCall}
              >
                <MicOffIcon className="size-5" />
                End Call
              </Button>
            ) : (
              <Button
                className="w-full gap-x-2 shadow-md"
                variant="secondary"
                disabled={isConnecting}
                size="lg"
                onClick={startCall}
              >
                <MicIcon className="size-5" />
                {isConnecting ? "Connecting..." : "Start Call"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
