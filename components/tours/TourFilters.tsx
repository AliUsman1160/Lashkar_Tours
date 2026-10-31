"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, SearchX } from "lucide-react";
import { durationFilters, tourTypes, type Tour, type TourType } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/Button";
import { FilterPills } from "@/components/gallery/GalleryFilters";
import { TourCard } from "./TourCard";

type TypeFilter = "all" | TourType;

export function TourFilters({ tours }: { tours: Tour[] }) {
  const [destination, setDestination] = useState("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [duration, setDuration] = useState("all");

  // Only offer filter values that exist in the data.
  const destinationOptions = destinations.filter((d) => tours.some((t) => t.destinations.includes(d.slug)));
  const typeOptions = [
    { value: "all" as TypeFilter, label: "All trip types" },
    ...(Object.keys(tourTypes) as TourType[]).filter((k) => tours.some((t) => t.types.includes(k))).map((k) => ({ value: k as TypeFilter, label: tourTypes[k] })),
  ];
  const durationOptions = durationFilters.filter((f) => tours.some((t) => f.test(t.durationDays)));

  const results = useMemo(
    () =>
      tours.filter((t) => {
        if (destination !== "all" && !t.destinations.includes(destination)) return false;
        if (type !== "all" && !t.types.includes(type)) return false;
        const df = durationFilters.find((f) => f.id === duration);
        if (df && !df.test(t.durationDays)) return false;
        return true;
      }),
    [tours, destination, type, duration],
  );

  const reset = () => {
    setDestination("all");
    setType("all");
    setDuration("all");
  };
  const filtered = destination !== "all" || type !== "all" || duration !== "all";

  return (
    <div>
      <div className="rounded-sm bg-white p-5 shadow-[0_20px_50px_-40px_rgba(23,61,50,0.6)] sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select id="filter-destination" label="Destination" value={destination} onChange={setDestination}>
            <option value="all">All destinations</option>
            {destinationOptions.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </Select>
          <Select id="filter-duration" label="Duration" value={duration} onChange={setDuration}>
            <option value="all">Any length</option>
            {durationOptions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-dark" id="type-label">
            Trip type
          </p>
          <FilterPills label="Trip type" options={typeOptions} value={type} onChange={setType} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-grey-ink" aria-live="polite">
          Showing <strong className="text-forest">{results.length}</strong> of {tours.length} example journeys
        </p>
        {filtered && (
          <button type="button" onClick={reset} className="text-sm font-semibold text-forest underline-offset-4 hover:underline">
            Reset filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => (
            <li key={t.slug}>
              <TourCard tour={t} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center rounded-sm border border-dashed border-forest/25 bg-white px-6 py-16 text-center">
          <SearchX aria-hidden className="size-10 text-gold-dark" strokeWidth={1.4} />
          <h2 className="mt-5 text-2xl text-forest">No journeys match those filters</h2>
          <p className="mt-2 max-w-md text-grey-ink">
            Try a different combination — or skip the filters altogether and describe your ideal trip. Every itinerary can be tailored.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="forest" onClick={reset}>
              Reset filters
            </Button>
            <Link href="/plan-your-trip" className="inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold text-forest underline-offset-4 hover:underline">
              Request a custom trip
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gold-dark">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-12 w-full cursor-pointer appearance-none rounded-sm border border-forest/20 bg-ivory px-4 pr-10 font-semibold text-forest outline-none transition-colors focus:border-forest"
        >
          {children}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-forest" />
      </div>
    </div>
  );
}
