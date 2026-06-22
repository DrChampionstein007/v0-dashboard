import type { EventType } from "./types"

export function formatNumber(value: number, format: "number" | "decimal" = "number") {
  if (format === "decimal") {
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return value.toLocaleString("en-US")
}

export function compactNumber(value: number) {
  return Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value)
}

/** Visual metadata for each event type: label + token-based color classes. */
export const EVENT_META: Record<
  EventType,
  { label: string; text: string; bg: string; dot: string }
> = {
  page_view: { label: "Page View", text: "text-primary", bg: "bg-primary/10", dot: "bg-primary" },
  click: { label: "Click", text: "text-foreground", bg: "bg-muted", dot: "bg-muted-foreground" },
  scroll: {
    label: "Scroll",
    text: "text-muted-foreground",
    bg: "bg-muted",
    dot: "bg-muted-foreground",
  },
  form_submit: {
    label: "Form Submit",
    text: "text-[oklch(0.7_0.16_162)]",
    bg: "bg-[oklch(0.7_0.16_162/0.12)]",
    dot: "bg-[oklch(0.7_0.16_162)]",
  },
  signup: {
    label: "Signup",
    text: "text-[oklch(0.7_0.16_162)]",
    bg: "bg-[oklch(0.7_0.16_162/0.12)]",
    dot: "bg-[oklch(0.7_0.16_162)]",
  },
  purchase: {
    label: "Purchase",
    text: "text-[oklch(0.78_0.15_78)]",
    bg: "bg-[oklch(0.78_0.15_78/0.12)]",
    dot: "bg-[oklch(0.78_0.15_78)]",
  },
  rage_click: {
    label: "Rage Click",
    text: "text-destructive",
    bg: "bg-destructive/12",
    dot: "bg-destructive",
  },
  error: {
    label: "Error",
    text: "text-destructive",
    bg: "bg-destructive/12",
    dot: "bg-destructive",
  },
}
