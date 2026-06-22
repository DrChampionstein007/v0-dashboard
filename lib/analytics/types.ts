// Shared domain types for the analytics dashboard.
// These mirror the shapes the real API is expected to return.

export type EventType =
  | "page_view"
  | "click"
  | "scroll"
  | "form_submit"
  | "signup"
  | "purchase"
  | "rage_click"
  | "error"

export interface Kpi {
  id: string
  label: string
  value: number
  /** Percentage change vs. the previous period. */
  delta: number
  /** Short unit suffix, e.g. "" or "/session". */
  unit?: string
  format?: "number" | "decimal"
}

export interface TimeseriesPoint {
  /** Short label for the x-axis, e.g. "Mon" or "12:00". */
  label: string
  events: number
  sessions: number
  eventsPerSession: number
}

export interface AnalyticsEvent {
  id: string
  type: EventType
  page: string
  timestamp: string
}

export interface Session {
  id: string
  user: string
  device: "Desktop" | "Mobile" | "Tablet"
  location: string
  events: number
  duration: string
  startedAt: string
  active: boolean
  journey: AnalyticsEvent[]
}

export interface TopPage {
  path: string
  views: number
  events: number
  /** Share of total traffic, 0-100. */
  share: number
}

export interface HeatmapStat {
  label: string
  value: string
  delta: number
}

export interface DateRange {
  id: string
  label: string
}
