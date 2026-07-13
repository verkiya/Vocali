import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@workspace/ui/lib/utils";

const buttonVariants = cva(
  "group/button cursor-pointer inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
        transparent:
          "bg-transparent text-primary-foreground hover:bg-transparent hover:text-primary-foreground/80",

        /* Gradients */
        primaryGradient:
          "bg-gradient-to-r from-[#7266ff] to-[#5b4eff] text-white hover:from-[#5b4eff] hover:to-[#4a3dff] shadow-md shadow-[#7266ff]/20",
        oceanGradient:
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-md shadow-blue-500/20",
        sunsetGradient:
          "bg-gradient-to-r from-orange-400 to-rose-400 text-white hover:from-orange-500 hover:to-rose-500 shadow-md shadow-orange-500/20",
        emeraldGradient:
          "bg-gradient-to-b from-[#bbf7d0] to-[#86efac] text-emerald-900 hover:to-[#4ade80] shadow-sm",
        amberGradient:
          "bg-gradient-to-b from-[#fef3c7] to-[#fde68a] text-amber-900 hover:to-[#facc15] shadow-sm",

        /* Soft Tinted Backgrounds */
        softPurple:
          "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100/50",
        softBlue:
          "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100/50",
        softEmerald:
          "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100/50",
        softAmber:
          "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100/50",
        softRose:
          "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100/50",

        /* Unique/Specialized */
        dark:
          "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
        subtle:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/50",
        glass:
          "bg-white/40 text-slate-800 border border-white/60 hover:bg-white/60 shadow-sm", /* No blur per user request */
        outlinePrimary:
          "border-1 border-[#7266ff] text-[#7266ff] hover:bg-[#7266ff]/5",
        outlineDestructive:
          "border-2 border-destructive text-destructive hover:bg-destructive/5",
        neonPurple:
          "bg-[#7266ff] text-white shadow-[0_0_15px_rgba(114,102,255,0.4)] hover:shadow-[0_0_20px_rgba(114,102,255,0.6)]",

        /* Standard Accents */
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/80",
        success:
          "bg-emerald-500 text-white hover:bg-emerald-600",
        info:
          "bg-blue-500 text-white hover:bg-blue-600",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
