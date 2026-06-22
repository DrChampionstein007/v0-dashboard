import { CardHeader, GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"
import type { HeatmapStat } from "@/lib/analytics/types"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface HeatmapWidgetProps {
  stats: HeatmapStat[]
  grid: number[][]
  clicks?: any[]
}

export function HeatmapWidget({
  stats,
  grid,
  clicks = [],
}: HeatmapWidgetProps) {
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
  className="mt-4 relative h-[350px] rounded-xl border border-border bg-muted/20 overflow-hidden"
>
  {clicks.map((click, index) => (
    <div
      key={click._id || index}
      className="absolute h-3 w-3 rounded-full bg-primary"
      style={{
        left: `${Math.min((click.x / 1200) * 100, 98)}%`,
        top: `${Math.min((click.y / 800) * 100, 98)}%`,
      }}
      title={`x:${click.x}, y:${click.y}`}
    />
  ))}
</div>
      </div>
    </GlassCard>
  )
}
