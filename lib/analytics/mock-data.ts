import type {
  AnalyticsEvent,
  DateRange,
  HeatmapStat,
  Kpi,
  Session,
  TimeseriesPoint,
  TopPage,
} from "./types"

export const DATE_RANGES: DateRange[] = [
  { id: "24h", label: "Last 24 hours" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
]

export const KPIS: Kpi[] = [
  { id: "sessions", label: "Total Sessions", value: 48213, delta: 12.4, format: "number" },
  { id: "events", label: "Total Events", value: 312984, delta: 8.1, format: "number" },
  { id: "clicks", label: "Total Clicks", value: 96420, delta: -3.2, format: "number" },
  {
    id: "eps",
    label: "Avg Events / Session",
    value: 6.49,
    delta: 4.7,
    unit: "/session",
    format: "decimal",
  },
]

export const TIMESERIES: TimeseriesPoint[] = [
  { label: "Mon", sessions: 5820, events: 36240, eventsPerSession: 6.2 },
  { label: "Tue", sessions: 6410, events: 41820, eventsPerSession: 6.5 },
  { label: "Wed", sessions: 7120, events: 47650, eventsPerSession: 6.7 },
  { label: "Thu", sessions: 6680, events: 43210, eventsPerSession: 6.5 },
  { label: "Fri", sessions: 7840, events: 53120, eventsPerSession: 6.8 },
  { label: "Sat", sessions: 6920, events: 42180, eventsPerSession: 6.1 },
  { label: "Sun", sessions: 7420, events: 48764, eventsPerSession: 6.6 },
]

function journey(seed: string): AnalyticsEvent[] {
  const base = [
    { type: "page_view", page: "/", offset: 0 },
    { type: "click", page: "/", offset: 12 },
    { type: "page_view", page: "/pricing", offset: 48 },
    { type: "scroll", page: "/pricing", offset: 71 },
    { type: "click", page: "/pricing", offset: 96 },
    { type: "form_submit", page: "/signup", offset: 142 },
    { type: "signup", page: "/welcome", offset: 168 },
  ] as const
  return base.map((e, i) => ({
    id: `${seed}-ev-${i}`,
    type: e.type,
    page: e.page,
    timestamp: `2026-06-22T09:${String(10 + i).padStart(2, "0")}:00.000Z`,
  }))
}

export const SESSIONS: Session[] = [
  {
    id: "ses_9fa2c1",
    user: "Ava Thompson",
    device: "Desktop",
    location: "San Francisco, US",
    events: 23,
    duration: "8m 12s",
    startedAt: "2m ago",
    active: true,
    journey: journey("ses_9fa2c1"),
  },
  {
    id: "ses_7b1e44",
    user: "Liam Carter",
    device: "Mobile",
    location: "London, UK",
    events: 14,
    duration: "4m 03s",
    startedAt: "9m ago",
    active: true,
    journey: journey("ses_7b1e44"),
  },
  {
    id: "ses_3c8d90",
    user: "Sofia Rossi",
    device: "Tablet",
    location: "Milan, IT",
    events: 31,
    duration: "12m 47s",
    startedAt: "21m ago",
    active: false,
    journey: journey("ses_3c8d90"),
  },
  {
    id: "ses_5e2a77",
    user: "Noah Kim",
    device: "Desktop",
    location: "Seoul, KR",
    events: 9,
    duration: "2m 35s",
    startedAt: "44m ago",
    active: false,
    journey: journey("ses_5e2a77"),
  },
  {
    id: "ses_1d6f02",
    user: "Maya Patel",
    device: "Mobile",
    location: "Mumbai, IN",
    events: 18,
    duration: "6m 58s",
    startedAt: "1h ago",
    active: false,
    journey: journey("ses_1d6f02"),
  },
]

export const TOP_PAGES: TopPage[] = [
  { path: "/", views: 24820, events: 86240, share: 100 },
  { path: "/pricing", views: 14210, events: 41820, share: 57 },
  { path: "/blog/launch", views: 9840, events: 22650, share: 40 },
  { path: "/docs/getting-started", views: 7120, events: 18210, share: 29 },
  { path: "/signup", views: 5260, events: 12980, share: 21 },
]

export const HEATMAP_STATS: HeatmapStat[] = [
  { label: "Total Clicks", value: "96,420", delta: 6.4 },
  { label: "Rage Clicks", value: "1,284", delta: -11.2 },
  { label: "Avg Scroll Depth", value: "68%", delta: 2.9 },
  { label: "Dead Clicks", value: "742", delta: -4.1 },
]

export const RECENT_ACTIVITY: AnalyticsEvent[] = [
  { id: "ra-1", type: "purchase", page: "/checkout", timestamp: "Just now" },
  { id: "ra-2", type: "signup", page: "/welcome", timestamp: "1m ago" },
  { id: "ra-3", type: "rage_click", page: "/pricing", timestamp: "2m ago" },
  { id: "ra-4", type: "form_submit", page: "/contact", timestamp: "4m ago" },
  { id: "ra-5", type: "page_view", page: "/blog/launch", timestamp: "5m ago" },
  { id: "ra-6", type: "error", page: "/dashboard", timestamp: "7m ago" },
  { id: "ra-7", type: "click", page: "/", timestamp: "9m ago" },
]

/** Synthetic 24x7 grid of click intensity (0-1) for the heatmap visualization. */
export const HEATMAP_GRID: number[][] = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 24 }, (_, col) => {
    const peak = Math.exp(-((col - 14) ** 2) / 40)
    const weekend = row >= 5 ? 0.7 : 1
    const noise = ((row * 31 + col * 17) % 23) / 60
    return Math.min(1, peak * weekend + noise * 0.5)
  }),
)
