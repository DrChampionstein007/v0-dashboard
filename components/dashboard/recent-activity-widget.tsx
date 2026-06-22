import { CardHeader, GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import { EVENT_META } from "@/lib/analytics/format"
import type { AnalyticsEvent } from "@/lib/analytics/types"

export function RecentActivityWidget({ events }: { events: AnalyticsEvent[] }) {
  return (
    <GlassCard className="p-5">
      <CardHeader
        title="Recent Activity"
        description="Latest user events"
        action={
          <span className="flex items-center gap-1.5 text-xs font-medium text-[oklch(0.7_0.16_162)]">
            <span className="size-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.16_162)]" />
            Live
          </span>
        }
      />

      <ul className="mt-4 flex flex-col gap-1">
        {events.map((event) => {
          const meta = EVENT_META[event.type]
          return (
            <li
              key={event.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
            >
              <span className={cn("flex size-7 items-center justify-center rounded-md", meta.bg)}>
                <span className={cn("size-2 rounded-full", meta.dot)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  <span className={cn("font-medium", meta.text)}>{meta.label}</span>
                  <span className="text-muted-foreground"> on </span>
                  <span className="font-mono text-xs text-foreground">{event.page}</span>
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {event.timestamp}
              </span>
            </li>
          )
        })}
      </ul>
    </GlassCard>
  )
}
