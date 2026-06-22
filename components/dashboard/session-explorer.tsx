"use client"

import { useMemo, useState } from "react"
import { Monitor, Search, Smartphone, Tablet } from "lucide-react"
import { CardHeader, GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import type { Session } from "@/lib/analytics/types"

const DEVICE_ICON = {
  Desktop: Monitor,
  Mobile: Smartphone,
  Tablet: Tablet,
} as const

interface SessionExplorerProps {
  sessions: Session[]
  selectedId: string
  onSelect: (id: string) => void
}

export function SessionExplorer({ sessions, selectedId, onSelect }: SessionExplorerProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sessions
    return sessions.filter(
      (s) =>
        s.user.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q),
    )
  }, [sessions, query])

  return (
    <GlassCard className="flex h-full flex-col p-5">
      <CardHeader title="Session Explorer" description={`${sessions.length} sessions tracked`} />

      <div className="relative mt-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by user, location or ID"
          aria-label="Search sessions"
          className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <ul className="mt-3 flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: 380 }}>
        {filtered.map((session) => {
          const Icon = DEVICE_ICON[session.device]
          const active = session.id === selectedId
          return (
            <li key={session.id}>
              <button
                type="button"
                onClick={() => onSelect(session.id)}
                aria-pressed={active}
                className={cn(
                  "w-full rounded-xl border p-3 text-left transition-colors",
                  active
                    ? "border-primary/50 bg-primary/10 ring-1 ring-primary/30"
                    : "border-border bg-muted/30 hover:bg-accent",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted/70 ring-1 ring-border">
                      <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{session.user}</p>
                      <p className="truncate text-xs text-muted-foreground">{session.location}</p>
                    </div>
                  </div>
                  {session.active ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-[oklch(0.7_0.16_162)]">
                      <span className="size-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.16_162)]" />
                      Live
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">{session.startedAt}</span>
                  )}
                </div>
                <div className="mt-2.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="tabular-nums">{session.events} events</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{session.duration}</span>
                  <span className="ml-auto font-mono text-[11px] opacity-70">{session.id}</span>
                </div>
              </button>
            </li>
          )
        })}
        {filtered.length === 0 ? (
          <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No sessions match &ldquo;{query}&rdquo;
          </li>
        ) : null}
      </ul>
    </GlassCard>
  )
}
