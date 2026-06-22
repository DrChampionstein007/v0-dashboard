import { CardHeader, GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import type { HeatmapStat } from "@/lib/analytics/types"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface HeatmapWidgetProps {
  stats: HeatmapStat[]
  grid: number[][]
}

export function HeatmapWidget({ stats, grid }: HeatmapWidgetProps) {
  return (
    <GlassCard className="p-5">
      <CardHeader
        title="Heatmap Analytics"
        description="Click intensity by day and hour"
        action={
          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            Last 7 days
          </span>
        }
      />

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => {
          const positive = stat.delta >= 0
          return (
            <div key={stat.label} className="rounded-xl bg-muted/40 p-3 ring-1 ring-border">
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 text-lg font-semibold tracking-tight text-foreground tabular-nums">
                {stat.value}
              </dd>
              <dd
                className={cn(
                  "mt-0.5 text-xs font-medium tabular-nums",
                  positive ? "text-[oklch(0.7_0.16_162)]" : "text-destructive",
                )}
              >
                {positive ? "+" : ""}
                {stat.delta}%
              </dd>
            </div>
          )
        })}
      </dl>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Click density</span>
          <div className="flex items-center gap-1.5">
            <span>Low</span>
            <span className="flex gap-0.5" aria-hidden="true">
              {[0.15, 0.35, 0.6, 0.85].map((o) => (
                <span
                  key={o}
                  className="size-3 rounded-sm"
                  style={{ background: `color-mix(in oklch, var(--primary) ${o * 100}%, transparent)` }}
                />
              ))}
            </span>
            <span>High</span>
          </div>
        </div>

        <div
          className="mt-3 overflow-hidden rounded-lg"
          role="img"
          aria-label="Heatmap of click intensity across days and hours"
        >
          {grid.map((row, r) => (
            <div key={r} className="flex items-center gap-1.5 py-0.5">
              <span className="w-8 shrink-0 text-[11px] text-muted-foreground">{DAYS[r]}</span>
              <div className="flex flex-1 gap-1">
                {row.map((value, c) => (
                  <span
                    key={c}
                    className="h-4 flex-1 rounded-[3px] transition-transform hover:scale-110"
                    style={{
                      background: `color-mix(in oklch, var(--primary) ${Math.round(value * 90 + 6)}%, transparent)`,
                    }}
                    title={`${DAYS[r]} ${c}:00 — ${Math.round(value * 100)}% intensity`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="w-8 shrink-0" />
            <div className="flex flex-1 justify-between px-0.5 text-[10px] text-muted-foreground">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
