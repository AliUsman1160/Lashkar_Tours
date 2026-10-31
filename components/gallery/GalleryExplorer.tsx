"use client";

import { useMemo, useState } from "react";
import { galleryCategories, type GalleryCategory, type ResolvedGalleryItem } from "@/data/gallery";
import { FilterPills } from "./GalleryFilters";
import { GalleryGrid } from "./GalleryGrid";

type Filter = "All" | GalleryCategory;

export function GalleryExplorer({ items }: { items: ResolvedGalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const options = useMemo(
    () => [
      { value: "All" as Filter, label: "All photos", count: items.length },
      ...galleryCategories
        .map((c) => ({ value: c as Filter, label: c, count: items.filter((i) => i.categories.includes(c)).length }))
        .filter((o) => o.count > 0),
    ],
    [items],
  );

  const visible = filter === "All" ? items : items.filter((i) => i.categories.includes(filter));

  return (
    <div>
      <FilterPills label="Filter photos by category" options={options} value={filter} onChange={setFilter} />
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} photos
      </p>
      <GalleryGrid key={filter} items={visible} className="mt-8" />
    </div>
  );
}
