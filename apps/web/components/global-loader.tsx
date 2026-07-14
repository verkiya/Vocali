import { cn } from "@workspace/ui/lib/utils"

export function GlobalLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-1 flex-col items-center justify-center min-h-[50vh] h-full w-full", className)}>
      <div className="relative flex items-center justify-center">
        {/* A sophisticated animated loader */}
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-y-[3px] border-primary animate-spin duration-1000 ease-in-out" />
          <div className="absolute inset-2 rounded-full border-x-[3px] border-primary/60 animate-spin duration-700 ease-linear" />
          <div className="absolute inset-4 rounded-full border-y-[3px] border-primary/30 animate-spin duration-500 ease-in-out" />
        </div>
      </div>
      <p className="mt-6 text-sm font-medium text-muted-foreground animate-pulse tracking-widest uppercase">
        Loading
      </p>
    </div>
  )
}
