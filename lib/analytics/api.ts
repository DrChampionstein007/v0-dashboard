// API layer — kept separate from UI and mock data.
//
// Today these functions return mock data synchronously. When the real
// backend is ready, swap the bodies for `fetch(...)` calls (or a typed
// client) without touching any component. The signatures already accept
// a `range` so endpoints can be parameterized by the selected period.

import {
  DATE_RANGES,
  HEATMAP_GRID,
  HEATMAP_STATS,
  KPIS,
  RECENT_ACTIVITY,
  SESSIONS,
  TIMESERIES,
  TOP_PAGES,
} from "./mock-data"
import type {
  AnalyticsEvent,
  DateRange,
  HeatmapStat,
  Kpi,
  Session,
  TimeseriesPoint,
  TopPage,
} from "./types"

export interface AnalyticsData {
  dateRanges: DateRange[]
  kpis: Kpi[]
  timeseries: TimeseriesPoint[]
  sessions: Session[]
  topPages: TopPage[]
  heatmapStats: HeatmapStat[]
  heatmapGrid: number[][]
  recentActivity: AnalyticsEvent[]
}

/**
 * Returns the full dashboard payload for a given date range.
 * Replace the return value with a real `fetch` when the API exists, e.g.:
 *   const res = await fetch(`/api/analytics?range=${range}`)
 *   return res.json()
 */
export function getAnalyticsData(range: string = "7d"): AnalyticsData {
  void range

  return {
    dateRanges: DATE_RANGES,

    kpis: [
      {
        id: "sessions",
        label: "Total Sessions",
        value: 2,
        delta: 0,
        format: "number",
      },
      {
        id: "events",
        label: "Total Events",
        value: 42,
        delta: 0,
        format: "number",
      },
      {
        id: "clicks",
        label: "Total Clicks",
        value: 36,
        delta: 0,
        format: "number",
      },
      {
        id: "eps",
        label: "Avg Events / Session",
        value: 21,
        delta: 0,
        unit: "/session",
        format: "decimal",
      },
    ],

    timeseries: TIMESERIES,
    sessions: SESSIONS,
    topPages: TOP_PAGES,
    heatmapStats: HEATMAP_STATS,
    heatmapGrid: HEATMAP_GRID,
    recentActivity: RECENT_ACTIVITY,
  }
}
