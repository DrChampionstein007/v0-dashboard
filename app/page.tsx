"use client"

import { useEffect, useMemo, useState } from "react"
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
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [selectedSession, setSelectedSession] = useState("")
  const [sessionEvents, setSessionEvents] = useState<any[]>([])
  const [heatmapClicks, setHeatmapClicks] = useState<any[]>([])
  const [selectedPage, setSelectedPage] = useState("/")

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "https://analytics-backend-8jae.onrender.com/api/events/dashboard"
        )

        const result = await response.json()

        setDashboardData(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDashboard()
  }, [selectedPage])

  const data = useMemo(() => {
    const mockData = getAnalyticsData(range)

    if (!dashboardData) return mockData

    mockData.sessions = dashboardData.sessions.map((session: any) => ({
      id: session._id,
      user: session._id,
      device: "Desktop",
      location: `${session.totalEvents} events`,
      events: session.totalEvents,
      duration: "-",
      startedAt: "-",
      active: session._id === selectedSession,
      journey:
        session._id === selectedSession
          ? sessionEvents.map((event: any) => ({
            id: event._id,
            type: event.eventType,
            page: event.pageUrl,
            timestamp: event.timestamp,
          }))
          : [],
    }))

    mockData.kpis = [
      {
        id: "sessions",
        label: "Total Sessions",
        value: dashboardData.totalSessions,
        delta: 0,
        format: "number",
      },
      {
        id: "events",
        label: "Total Events",
        value: dashboardData.totalEvents,
        delta: 0,
        format: "number",
      },
      {
        id: "clicks",
        label: "Total Clicks",
        value: dashboardData.totalClicks,
        delta: 0,
        format: "number",
      },
      {
        id: "eps",
        label: "Avg Events / Session",
        value: Number(dashboardData.avgEventsPerSession),
        delta: 0,
        unit: "/session",
        format: "decimal",
      },
    ]

    return mockData
  }, [range, dashboardData, sessionEvents, selectedSession])

  useEffect(() => {
    if (!selectedSession && data.sessions.length > 0) {
      setSelectedSession(data.sessions[0].id)
    }
  }, [data.sessions, selectedSession])

  useEffect(() => {
    if (!selectedSession) return

    const fetchSessionEvents = async () => {
      try {
        const response = await fetch(
          `https://analytics-backend-8jae.onrender.com/api/events/session/${selectedSession}`
        )

        const result = await response.json()

        setSessionEvents(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSessionEvents()
  }, [selectedSession])

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await fetch(
          `https://analytics-backend-8jae.onrender.com/api/events/heatmap?pageUrl=${selectedPage}`
        )

        const result = await response.json()

        setHeatmapClicks(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchHeatmapData()
  }, [selectedPage])

  const activeSession = data.sessions.find(
    (s) => s.id === selectedSession
  )

  return (
    <main className="min-h-dvh">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60rem 30rem at 15% -10%, oklch(0.62 0.18 256 / 0.18), transparent), radial-gradient(50rem 28rem at 95% 0%, oklch(0.7 0.16 162 / 0.1), transparent)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <DashboardHeader
          ranges={data.dateRanges}
          selected={range}
          onSelect={setRange}
        />

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


        <div className="mb-4">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="rounded border px-3 py-2"
          >
            <option value="/">/</option>
            <option value="/dashboard">/dashboard</option>
            <option value="/pricing">/pricing</option>
            <option value="/contact">/contact</option>
          </select>
        </div>

        <HeatmapWidget
          stats={[
            {
              label: "Total Clicks",
              value: String(heatmapClicks.length),
              delta: 0,
            },
            {
              label: "Tracked Points",
              value: String(heatmapClicks.length),
              delta: 0,
            },
            {
              label: "Page",
              value: selectedPage,
              delta: 0,
            },
            {
              label: "Source",
              value: "MongoDB",
              delta: 0,
            },
          ]}
          grid={data.heatmapGrid}
          clicks={heatmapClicks}
        />

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopPagesWidget pages={data.topPages} />
          <RecentActivityWidget
            events={
              dashboardData?.recentActivity?.map((event: any) => ({
                id: event._id,
                type: event.eventType,
                page: event.pageUrl,
                timestamp: event.timestamp,
              })) || []
            }
          />
        </section>

        <footer className="pt-2 text-center text-xs text-muted-foreground">
          Pulse Analytics
        </footer>
      </div>
    </main>
  )
}