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
            variant="neonPurple"
            size="icon"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <p className="font-semibold text-gray-900 dark:text-gray-100">Voice Chat</p>
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
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-8 text-center">
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Radar rings */}
            <div
              className={cn(
                "absolute inset-0 rounded-full",
                isConnected && !isSpeaking && "animate-[ping_2s_ease-in-out_infinite] bg-[#7266ff]/20",
                isConnected && isSpeaking && "animate-[ping_1.5s_ease-in-out_infinite] bg-emerald-500/30",
                isConnecting && "animate-[ping_1s_ease-in-out_infinite] bg-amber-500/20",
                !isConnected && !isConnecting && "animate-[ping_3s_ease-in-out_infinite] bg-[#7266ff]/10"
              )}
            />
            <div
              className={cn(
                "absolute inset-4 rounded-full",
                isConnected && !isSpeaking && "animate-[ping_2.5s_ease-in-out_infinite] bg-[#7266ff]/20",
                isConnected && isSpeaking && "animate-[ping_2s_ease-in-out_infinite] bg-emerald-500/40",
                isConnecting && "animate-[ping_1.5s_ease-in-out_infinite] bg-amber-500/30",
                !isConnected && !isConnecting && "animate-[ping_4s_ease-in-out_infinite] bg-[#7266ff]/10"
              )}
            />

            {/* Core Mic Circle */}
            <div
              className={cn(
                "relative flex h-16 w-16 items-center justify-center rounded-full text-white transition-colors duration-500",
                isConnected && !isSpeaking
                  ? "bg-gradient-to-br from-[#7266ff] to-[#5143ff] shadow-[0_0_30px_rgba(114,102,255,0.5)]"
                  : isConnected && isSpeaking
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.6)]"
                  : isConnecting
                  ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                  : "bg-gradient-to-br from-[#7266ff]/80 to-[#5143ff]/80 shadow-[0_0_20px_rgba(114,102,255,0.3)]"
              )}
            >
              <MicIcon className={cn("size-8", isConnecting && "animate-bounce")} />
            </div>
          </div>

          <div className="space-y-2 px-4">
            <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {isConnecting
                ? "Connecting..."
                : isConnected && isSpeaking
                ? "Assistant is speaking"
                : isConnected && !isSpeaking
                ? "Listening..."
                : "Ready to speak"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isConnecting
                ? "Please wait while we connect your call."
                : isConnected
                ? "Your conversation transcript will appear here."
                : "Tap the button below to start the conversation."}
            </p>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex flex-col items-center gap-y-4 rounded-3xl border border-[#7266ff]/20 bg-white/60 p-4 shadow-sm backdrop-blur-xl dark:border-[#7266ff]/20 dark:bg-black/40">
          {isConnected && (
            <div className="flex items-center gap-x-3 rounded-full bg-black/5 px-4 py-1.5 dark:bg-white/10">
              <div
                className={cn(
                  "size-2.5 rounded-full shadow-[0_0_8px_currentColor]",
                  isSpeaking
                    ? "animate-pulse bg-emerald-500 text-emerald-500"
                    : "bg-[#7266ff] text-[#7266ff]"
                )}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {isSpeaking
                  ? "Assistant Speaking..."
                  : "Listening to you..."}
              </span>
            </div>
          )}

          <div className="w-full">
            {isConnected ? (
              <Button
                variant="destructive"
                className="group relative flex h-14 w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-2xl font-semibold shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-8px_rgba(239,68,68,0.6)] active:scale-95"
                onClick={endCall}
              >
                <MicOffIcon className="size-5" />
                End Call
              </Button>
            ) : (
              <Button
                variant="successOutline"
                className="group relative flex h-14 w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden rounded-2xl font-semibold shadow-[0_0_20px_rgba(114,102,255,0.4)] transition-all shadow-[0_8px_25px_-8px_rgba(114,102,255,0.6)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                disabled={isConnecting}
                onClick={startCall}
              >
                <MicIcon
                  className={cn("size-5", isConnecting && "animate-bounce")}
                />
                {isConnecting ? "Connecting..." : "Start Call"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
