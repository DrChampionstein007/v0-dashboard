import { CardHeader, GlassCard } from "./glass-card"
import { compactNumber } from "@/lib/analytics/format"
import type { TopPage } from "@/lib/analytics/types"

export function TopPagesWidget({ pages }: { pages: TopPage[] }) {
  return (
    <GlassCard className="p-5">
      <CardHeader title="Top Pages" description="Most visited pages this period" />

      <ul className="mt-4 flex flex-col gap-2.5">
        {pages.map((page, index) => (
          <li key={page.path} className="relative overflow-hidden rounded-xl">
            <span
              className="absolute inset-y-0 left-0 rounded-xl bg-primary/10"
              style={{ width: `${page.share}%` }}
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="w-5 shrink-0 text-xs font-medium text-muted-foreground tabular-nums">
                  {index + 1}
                </span>
                <span className="truncate font-mono text-sm text-foreground">{page.path}</span>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-xs tabular-nums">
                <span className="text-foreground">
                  {compactNumber(page.views)}
                  <span className="ml-1 text-muted-foreground">views</span>
                </span>
                <span className="hidden text-muted-foreground sm:inline">
                  {compactNumber(page.events)} events
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
