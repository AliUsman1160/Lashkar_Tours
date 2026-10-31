"use client";

import { cn } from "@/lib/utils";

type Props<T extends string> = {
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
};

/** Pill-style single-select filter group. Reused by the gallery and destination listings. */
export function FilterPills<T extends string>({ options, value, onChange, label }: Props<T>) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors",
              selected ? "border-forest bg-forest text-white" : "border-forest/20 bg-white text-forest hover:border-forest",
            )}
          >
            {o.label}
            {o.count !== undefined && <span className={cn("text-xs", selected ? "text-gold" : "text-grey-ink")}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
