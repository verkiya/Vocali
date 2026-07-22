"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  CreditCardIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryBigIcon,
  PaletteIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";

type SidebarIcon =
  | React.ComponentType<{ className?: string }>
  | {
      type: "image";
      src: string;
      alt: string;
    };

type SidebarItem = {
  title: string;
  url: string;
  icon: SidebarIcon;
  badge?: string;
};

const customerSupportItems: SidebarItem[] = [
  {
    title: "Conversations",
    url: "/conversations",
    icon: InboxIcon,
  },
  {
    title: "Knowledge Base",
    url: "/files",
    icon: LibraryBigIcon,
  },
];

const aiPlatformItems: SidebarItem[] = [
  {
    title: "Widget Customization",
    url: "/customization",
    icon: PaletteIcon,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Voice Assistant",
    url: "/plugins/vapi",
    icon: {
      type: "image",
      src: "/vapi.png",
      alt: "Vapi",
    },
    badge: "Beta",
  },
];

const accountItems: SidebarItem[] = [
  {
    title: "Plans & Billing",
    url: "/billing",
    icon: CreditCardIcon,
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(url);
  };

  const renderItems = (items: SidebarItem[]) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title} >
        <SidebarMenuButton
          asChild
          isActive={isActive(item.url)}
          tooltip={item.title}
          className={cn(
            "transition-all duration-200 hover:scale-102 hover:bg-primary/20 ",
            isActive(item.url) && "font-semibold! bg-gradient-to-b from-sidebar-primary to-[#8a8aff]! text-sidebar-primary-foreground! hover:to[#8a8aff]/90"
          )}
        >
          <Link href={item.url}>
            {"type" in item.icon ? (
              <Image
                src={item.icon.src}
                alt={item.icon.alt}
                width={16}
                height={16}
                className="size-4 shrink-0 rounded-sm object-contain"
              />
            ) : (
              <item.icon className="size-4 shrink-0 opacity-90" />
            )}

            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>

        {item.badge && (
          <SidebarMenuBadge className="text-[10px] font-medium">
            {item.badge}
          </SidebarMenuBadge>
        )}
      </SidebarMenuItem>
    ));

  return (
    <Sidebar className="group" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: "!w-full !h-12 border-1 rounded-xl group-data-[collapsible=icon]:border-transparent",
                    avatarBox: "!size-4 !rounded-sm",
                    organizationSwitcherTrigger:
                      "!w-full !justify-start group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2",
                    organizationPreview:
                      "group-data-[collapsible=icon]:!justify-center !gap-2",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:!hidden !text-xs !font-medium !text-sidebar-foreground",
                    organizationSwitcherTriggerIcon:
                      "group-data-[collapsible=icon]:!hidden !ml-auto !text-sidebar-foreground",
                  },
                }}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 ">
              {renderItems(customerSupportItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>AI Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderItems(aiPlatformItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {renderItems(accountItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem className="transition-all hover:scale-102">
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox:
                    "!w-full !h-12 border-1 rounded-xl group-data-[collapsible=icon]:border-transparent",
                  userButtonTrigger:
                    "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2!",
                  userButtonBox:
                    "!w-full !flex-row-reverse !justify-end !gap-2 group-data-[collapsible=icon]:!justify-center !text-sidebar-foreground",
                  userButtonOuterIdentifier:
                    "!pl-0 group-data-[collapsible=icon]:!hidden",
                  avatarBox: "!size-4",
                },
              }}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <div className="mx-2 flex items-center justify-center bg-muted/40 p-1 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-emerald-500" />
                AI services operational
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
