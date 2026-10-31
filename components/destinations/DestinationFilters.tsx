"use client";

import { useState } from "react";
import { destinationCategories, type Destination, type DestinationCategory } from "@/data/destinations";
import { FilterPills } from "@/components/gallery/GalleryFilters";
import { DestinationGrid } from "./DestinationGrid";

type Filter = "all" | DestinationCategory;

/** Category filters are generated from the data — a category only appears when at least one destination uses it. */
export function DestinationFilters({ destinations }: { destinations: Destination[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const options = [
    { value: "all" as Filter, label: "All destinations", count: destinations.length },
    ...(Object.keys(destinationCategories) as DestinationCategory[])
      .map((key) => ({
        value: key as Filter,
        label: destinationCategories[key],
        count: destinations.filter((d) => d.categories.includes(key)).length,
      }))
      .filter((o) => o.count > 0),
  ];

  const visible = filter === "all" ? destinations : destinations.filter((d) => d.categories.includes(filter));

  return (
    <div>
      <FilterPills label="Filter destinations by category" options={options} value={filter} onChange={setFilter} />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} destinations
      </p>
      <DestinationGrid destinations={visible} className="mt-10" />
    </div>
  );
}
