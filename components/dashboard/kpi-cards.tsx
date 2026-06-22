import { ArrowDownRight, ArrowUpRight, MousePointerClick, Layers, TrendingUp, Users } from "lucide-react"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/lib/analytics/format"
import type { Kpi } from "@/lib/analytics/types"

const ICONS: Record<string, typeof Users> = {
  sessions: Users,
  events: Layers,
  clicks: MousePointerClick,
  eps: TrendingUp,
}

function KpiCardItem({ kpi }: { kpi: Kpi }) {
  const Icon = ICONS[kpi.id] ?? TrendingUp
  const positive = kpi.delta >= 0

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
        <span className="flex size-9 items-center justify-center rounded-lg bg-muted/60 ring-1 ring-border">
          <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <span className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {formatNumber(kpi.value, kpi.format)}
          {kpi.unit ? (
            <span className="ml-1 text-base font-normal text-muted-foreground">{kpi.unit}</span>
          ) : null}
        </span>
        <span
          className={cn(
            "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
            positive
              ? "bg-[oklch(0.7_0.16_162/0.12)] text-[oklch(0.7_0.16_162)]"
              : "bg-destructive/12 text-destructive",
          )}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          ) : (
            <ArrowDownRight className="size-3.5" aria-hidden="true" />
          )}
          {Math.abs(kpi.delta)}%
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">vs. previous period</p>
    </GlassCard>
  )
}

export function KpiCards({ kpis }: { kpis: Kpi[] }) {
  return (
    <section
      aria-label="Key performance indicators"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {kpis.map((kpi) => (
        <KpiCardItem key={kpi.id} kpi={kpi} />
      ))}
    </section>
  )
}
