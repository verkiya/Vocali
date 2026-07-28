"use client";

import Bowser from "bowser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { useQuery } from "convex/react";
import { ClockIcon, GlobeIcon, MailIcon, MonitorIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@workspace/ui/lib/utils";

type InfoItem = {
  label: string;
  value: string | React.ReactNode;
  className?: string;
};

type InfoSection = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: InfoItem[];
};

export const ContactPanel = () => {
  const params = useParams();
  const conversationId = params.conversationId as Id<"conversations"> | null;

  const contactSession = useQuery(
    api.private.contactSessions.getOneByConversationId,
    conversationId
      ? {
          conversationId,
        }
      : "skip"
  );

  const parseUserAgent = useMemo(() => {
    return (userAgent?: string) => {
      if (!userAgent) {
        return { browser: "Unknown", os: "Unknown", device: "Unknown" };
      }

      const browser = Bowser.getParser(userAgent);
      const result = browser.getResult();

      return {
        browser: result.browser.name || "Unknown",
        browserVersion: result.browser.version || "",
        os: result.os.name || "Unknown",
        osVersion: result.os.version || "",
        device: result.platform.type || "desktop",
        deviceVendor: result.platform.vendor || "",
        deviceModel: result.platform.model || "",
      };
    };
  }, []);

  const userAgentInfo = useMemo(
    () => parseUserAgent(contactSession?.metadata?.userAgent),
    [contactSession?.metadata?.userAgent, parseUserAgent]
  );

  const countryInfo = useMemo(() => {
    return getCountryFromTimezone(contactSession?.metadata?.timezone);
  }, [contactSession?.metadata?.timezone]);

  const accordionSections = useMemo<InfoSection[]>(() => {
    if (!contactSession?.metadata) {
      return [];
    }

    return [
      {
        id: "device-info",
        icon: MonitorIcon,
        title: "Device Information",
        items: [
          {
            label: "Browser",
            value:
              userAgentInfo.browser +
              (userAgentInfo.browserVersion
                ? ` ${userAgentInfo.browserVersion}`
                : ""),
          },
          {
            label: "OS",
            value:
              userAgentInfo.os +
              (userAgentInfo.osVersion ? ` ${userAgentInfo.osVersion}` : ""),
          },
          {
            label: "Device",
            value:
              userAgentInfo.device +
              (userAgentInfo.deviceModel
                ? ` - ${userAgentInfo.deviceModel}`
                : ""),
            className: "capitalize",
          },
          {
            label: "Screen",
            value: contactSession.metadata.screenResolution,
          },
          {
            label: "Viewport",
            value: contactSession.metadata.viewportSize,
          },
          {
            label: "Cookies",
            value: contactSession.metadata.cookieEnabled
              ? "Enabled"
              : "Disabled",
          },
        ],
      },
      {
        id: "location-info",
        icon: GlobeIcon,
        title: "Location & Language",
        items: [
          ...(countryInfo
            ? [
                {
                  label: "Country",
                  value: <span>{countryInfo.name}</span>,
                },
              ]
            : []),
          {
            label: "Language",
            value: contactSession.metadata.language,
          },
          {
            label: "Timezone",
            value: contactSession.metadata.timezone,
          },
          {
            label: "UTC Offset",
            value: contactSession.metadata.timezoneOffset,
          },
        ],
      },
      {
        id: "session-details",
        title: "Session details",
        icon: ClockIcon,
        items: [
          {
            label: "Session Started",
            value: new Date(contactSession._creationTime).toLocaleString(),
          },
        ],
      },
    ];
  }, [contactSession, userAgentInfo, countryInfo]);

  if (contactSession === undefined || contactSession === null) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col bg-background/50 text-foreground">
      {/* Premium Profile Header */}
      <div className="relative flex flex-col items-center gap-y-4 border-b border-[#7266ff]/10 bg-gradient-to-b from-[#7266ff]/5 to-transparent px-4 py-8 text-center">
        <div className="relative">

          <div className="relative rounded-full border-2 border-background shadow-sm">
            <DicebearAvatar
              badgeImageUrl={
                countryInfo?.code
                  ? getCountryFlagUrl(countryInfo.code)
                  : undefined
              }
              seed={contactSession._id}
              size={64}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center overflow-hidden">
          <h4 className="line-clamp-1 text-lg font-semibold">{contactSession.name}</h4>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {contactSession.email}
          </p>
        </div>
        <Button
          variant="neonPurple"
          asChild
          className="group mt-2 w-full shadow-[0_4px_14px_0_rgba(114,102,255,0.39)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(114,102,255,0.23)]"
          size="lg"
        >
          <Link href={`mailto:${contactSession.email}`}>
            <MailIcon className="mr-2 size-4 transition-transform group-hover:scale-110" />
            <span>Send Email</span>
          </Link>
        </Button>
      </div>

      {/* Modern Accordion Details */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {contactSession.metadata && (
          <Accordion
            className="flex w-full flex-col gap-y-3"
            collapsible
            type="single"
            defaultValue="device-info"
          >
            {accordionSections.map((section) => (
              <AccordionItem
                className="overflow-hidden rounded-2xl border border-[#7266ff]/10 bg-white/50 shadow-sm transition-colors hover:border-[#7266ff]/30 dark:bg-black/20"
                key={section.id}
                value={section.id}
              >
                <AccordionTrigger className="flex w-full flex-1 cursor-pointer items-start justify-between gap-4 px-4 py-5 text-left text-sm font-medium transition-all hover:no-underline [&[data-state=open]]:bg-[#7266ff]/5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#7266ff]/10 text-[#7266ff]">
                      <section.icon className="size-4 shrink-0" />
                    </div>
                    <span className="font-semibold text-foreground/90">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-1">
                  <div className="mt-3 space-y-3 text-sm">
                    {section.items.map((item) => (
                      <div
                        className="flex items-center justify-between group"
                        key={`${section.id}-${item.label}`}
                      >
                        <span className="text-muted-foreground transition-colors group-hover:text-foreground/80">
                          {item.label}
                        </span>
                        <span className={cn("font-medium text-right text-foreground/90", item.className)}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
