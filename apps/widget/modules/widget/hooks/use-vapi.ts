import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { vapiSecretsAtom, widgetSettingsAtom } from "../atoms/widget-atoms";
interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const vapiSecrets = useAtomValue(vapiSecretsAtom);
  const widgetSettings = useAtomValue(widgetSettingsAtom);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const VAPI_KEY = process.env.NEXT_PUBLIC_VAPI_KEY;
  const AGENT = process.env.VAPI_AGENT;
  if (!VAPI_KEY) {
    throw new Error("Missing NEXT_PUBLIC_VAPI_KEY");
  }
  useEffect(() => {
    // Only for testing the Vapi API, otherwise customers will provide their own API keys
    if (!vapiSecrets) {
      return;
    }

    const vapiInstance = new Vapi(vapiSecrets.publicApiKey);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.log(error, "VAPI_ERROR");
      setIsConnecting(false);
    });

    vapiInstance.on("message", (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => {
          const lastMessage = prev[prev.length - 1];
          const newRole = message.role === "user" ? "user" : "assistant";

          if (lastMessage && lastMessage.role === newRole) {
            const newPrev = [...prev];
            newPrev[prev.length - 1] = {
              ...lastMessage,
              text: lastMessage.text + " " + message.transcript,
            };
            return newPrev;
          }

          return [
            ...prev,
            {
              role: newRole,
              text: message.transcript,
            },
          ];
        });
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = () => {
    if (!vapiSecrets || !widgetSettings?.vapiSettings?.assistantId) {
      return;
    }
    setIsConnecting(true);
    setTranscript([]);

    if (vapi) {
      // Only for testing the Vapi API, otherwise customers will provide their own Assistant IDs
      vapi.start(widgetSettings.vapiSettings.assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  };
};
