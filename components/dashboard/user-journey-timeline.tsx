import { CardHeader, GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import { EVENT_META } from "@/lib/analytics/format"
import type { Session } from "@/lib/analytics/types"

function formatTime(iso: string) {
  return iso
}

export function UserJourneyTimeline({ session }: { session: Session | undefined }) {
  return (
    <GlassCard className="flex h-full flex-col p-5">
      <CardHeader
        title="User Journey"
        description={session ? `${session.user} · ${session.id}` : "Select a session"}
      />

      {session ? (
        <ol className="mt-5 flex flex-col" role="list">
          {session.journey.map((event, index) => {
            const meta = EVENT_META[event.type]
            const last = index === session.journey.length - 1
            return (
              <li key={event.id} className="relative flex gap-4 pb-5 last:pb-0">
                {!last ? (
                  <span
                    className="absolute left-[11px] top-6 h-full w-px bg-border"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    "z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ring-4 ring-card",
                    meta.bg,
                  )}
                >
                  <span className={cn("size-2 rounded-full", meta.dot)} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-xs font-medium",
                        meta.bg,
                        meta.text,
                      )}
                    >
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{event.page}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                    {event.timestamp}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      ) : (
        <div className="mt-5 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Pick a session from the explorer to see its journey.
        </div>
      )}
    </GlassCard>
  )
}
