"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

const aspect = { tall: "aspect-[3/4]", wide: "aspect-[4/3]", default: "aspect-[5/4]" };

export type GridPhoto = Photo & { key: string; shape?: "tall" | "wide" };

export function GalleryGrid({ items, className }: { items: GridPhoto[]; className?: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul className={cn("columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4", className)}>
        {items.map((item, i) => (
          <motion.li
            key={item.key}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn("group relative block w-full overflow-hidden rounded-sm bg-sage", aspect[item.shape ?? "default"])}
              aria-label={`Open photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-4 text-left text-white opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <span className="font-serif text-lg leading-tight">{item.location}</span>
                <Expand aria-hidden className="size-5 shrink-0" />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      <Lightbox items={items} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </>
  );
}
