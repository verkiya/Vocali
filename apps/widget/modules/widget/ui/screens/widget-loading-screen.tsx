"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { WidgetHeader } from "../components/widget-header";
import { LoaderIcon } from "lucide-react";
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
  vapiSecretsAtom,
  widgetSettingsAtom,
} from "../../atoms/widget-atoms";
import { useEffect, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "org" | "session" | "settings" | "vapi" | "done";
export const WidgetLoadingScreen = ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setVapiSecrets = useSetAtom(vapiSecretsAtom);
  const setWidgetSettings = useSetAtom(widgetSettingsAtom);
  const validateOrganization = useAction(api.public.organizations.validate);
  const setScreen = useSetAtom(screenAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId || "")
  );
  //Validating the organization
  useEffect(() => {
    if (step != "org") return;
    setLoadingMessage("Searching Organization ID...");
    if (!organizationId) {
      setErrorMessage("Organization ID is required.");
      setScreen("error");
      return;
    }
    setLoadingMessage("Verifying Organization ID...");
    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep("session");
        } else {
          setErrorMessage(result.reason || "Invalid Configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setStep,
    setOrganizationId,
    validateOrganization,
    setLoadingMessage,
  ]);
  //Validate the session, if it exists
  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );
  useEffect(() => {
    if (step !== "session") {
      return;
    }
    setLoadingMessage("Searching Contact Session ID...");
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("settings");
      return;
    }
    setLoadingMessage("Validating Session...");
    validateContactSession({
      contactSessionId: contactSessionId,
    })
      .then((result) => {
        setSessionValid(result.valid);
        setStep("settings");
      })
      .catch(() => {
        setSessionValid(false);
        setStep("settings");
      });
  }, [step, contactSessionId, validateContactSession, setLoadingMessage]);
  // Step 3: Load Widget Settings
  const widgetSettings = useQuery(
    api.public.widgetSettings.getByOrganizationId,
    organizationId
      ? {
          organizationId,
        }
      : "skip"
  );
  useEffect(() => {
    if (step !== "settings") {
      return;
    }

    setLoadingMessage("Loading widget settings...");

    if (widgetSettings !== undefined) {
      setWidgetSettings(widgetSettings);
      setStep("vapi");
    }
  }, [step, widgetSettings, setStep, setWidgetSettings, setLoadingMessage]);
  // Step 4: Load Vapi secrets (Optional)
  const getVapiSecrets = useAction(api.public.secrets.getVapiSecrets);
  useEffect(() => {
    if (step !== "vapi") {
      return;
    }

    if (!organizationId) {
      setErrorMessage("Organization ID is required");
      setScreen("error");
      return;
    }

    setLoadingMessage("Loading voice features...");
    getVapiSecrets({ organizationId })
      .then((secrets) => {
        setVapiSecrets(secrets);
        setStep("done");
      })
      .catch(() => {
        setVapiSecrets(null);
        setStep("done");
      });
  }, [
    step,
    organizationId,
    getVapiSecrets,
    setErrorMessage,
    setScreen,
    setVapiSecrets,
    setLoadingMessage,
    setStep,
  ]);

  useEffect(() => {
    if (step !== "done") return;
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen]);
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col gap-y-2 px-2 py-6 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-lg text-gray-500">
            Getting started, please wait...
          </p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-xs animate-in rounded-xl border border-gray-200 bg-white px-5 py-6 text-center shadow-sm duration-300 zoom-in-95 fade-in">
          <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[#7266ff]/30 blur-md" />

            <LoaderIcon
              className="relative z-10 h-7 w-7 animate-spin text-[#7266ff]/70"
              strokeWidth={2.5}
            />
          </div>

          <p className="text-sm font-semibold text-gray-900">
            {loadingMessage || "Loading..."}
          </p>

          <p className="mt-1 animate-pulse text-xs text-gray-500">
            Setting things up for you
          </p>
        </div>
      </div>
    </>
  );
};
