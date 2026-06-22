"use client"

import { useMemo, useState } from "react"
import { getAnalyticsData } from "@/lib/analytics/api"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { SessionExplorer } from "@/components/dashboard/session-explorer"
import { UserJourneyTimeline } from "@/components/dashboard/user-journey-timeline"
import { HeatmapWidget } from "@/components/dashboard/heatmap-widget"
import { TopPagesWidget } from "@/components/dashboard/top-pages-widget"
import { RecentActivityWidget } from "@/components/dashboard/recent-activity-widget"

export default function DashboardPage() {
  const [range, setRange] = useState("7d")

  // Data is sourced through the API layer so a real backend can be wired in
  // later without changing any component. Re-evaluated when the range changes.
  const data = useMemo(() => getAnalyticsData(range), [range])

  const [selectedSession, setSelectedSession] = useState(data.sessions[0]?.id ?? "")
  const activeSession = data.sessions.find((s) => s.id === selectedSession)

  return (
    <main className="min-h-dvh">
      {/* Ambient glow accents */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60rem 30rem at 15% -10%, oklch(0.62 0.18 256 / 0.18), transparent), radial-gradient(50rem 28rem at 95% 0%, oklch(0.7 0.16 162 / 0.1), transparent)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <DashboardHeader ranges={data.dateRanges} selected={range} onSelect={setRange} />

        <KpiCards kpis={data.kpis} />

        <AnalyticsOverview data={data.timeseries} />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SessionExplorer
            sessions={data.sessions}
            selectedId={selectedSession}
            onSelect={setSelectedSession}
          />
          <UserJourneyTimeline session={activeSession} />
        </section>

        <HeatmapWidget stats={data.heatmapStats} grid={data.heatmapGrid} />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopPagesWidget pages={data.topPages} />
          <RecentActivityWidget events={data.recentActivity} />
        </section>

        <footer className="pt-2 text-center text-xs text-muted-foreground">
          Pulse Analytics · Mock data shown — connect your API in{" "}
          <span className="font-mono">lib/analytics/api.ts</span>
        </footer>
      </div>
    </main>
  )
}
