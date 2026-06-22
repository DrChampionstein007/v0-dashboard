"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, Calendar, Check, ChevronDown, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "@/lib/analytics/types"

interface DashboardHeaderProps {
  ranges: DateRange[]
  selected: string
  onSelect: (id: string) => void
}

export function DashboardHeader({ ranges, selected, onSelect }: DashboardHeaderProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = ranges.find((r) => r.id === selected) ?? ranges[0]

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/25">
          <Activity className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground text-balance">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            User behavior, sessions and engagement insights
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Calendar className="size-4 text-muted-foreground" aria-hidden="true" />
            {current.label}
            <ChevronDown
              className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {open ? (
            <ul
              role="listbox"
              className="glass absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl p-1 shadow-xl"
            >
              {ranges.map((range) => (
                <li key={range.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={range.id === selected}
                    onClick={() => {
                      onSelect(range.id)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                      range.id === selected ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {range.label}
                    {range.id === selected ? (
                      <Check className="size-4 text-primary" aria-hidden="true" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
        >
          <Download className="size-4" aria-hidden="true" />
          Export
        </button>
      </div>
    </header>
  )
}
