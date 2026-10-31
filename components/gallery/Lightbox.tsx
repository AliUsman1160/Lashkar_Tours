"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/photos";

type Props = {
  items: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const count = items.length;

  const prev = () => index !== null && onNavigate((index - 1 + count) % count);
  const next = () => index !== null && onNavigate((index + 1) % count);

  // Keep the latest handlers for the keyboard listener without re-binding it on every navigation.
  const handlers = useRef({ prev, next, onClose });
  useEffect(() => {
    handlers.current = { prev, next, onClose };
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlers.current.onClose();
      else if (e.key === "ArrowLeft") handlers.current.prev();
      else if (e.key === "ArrowRight") handlers.current.next();
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${count}: ${item.location}`}
          className="fixed inset-0 z-[70] flex flex-col bg-charcoal/95 text-white backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onTouchStart={(e) => (touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const dx = e.changedTouches[0].clientX - start.x;
            const dy = e.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx > 0 ? prev : next)();
            else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm tabular-nums text-white/70" aria-live="polite">
              {index + 1} / {count}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="grid size-12 place-items-center rounded-full transition-colors hover:bg-white/10"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.src}
                className="pointer-events-none absolute inset-0 mx-auto max-w-6xl px-2 sm:px-20"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative h-full w-full">
                  <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
                </div>
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-charcoal/60 ring-1 ring-white/20 transition-colors hover:bg-white hover:text-charcoal sm:left-6"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-charcoal/60 ring-1 ring-white/20 transition-colors hover:bg-white hover:text-charcoal sm:right-6"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 py-4 text-center sm:px-6">
            <p className="font-serif text-lg">{item.location}</p>
            <p className="mx-auto mt-1 max-w-2xl text-sm text-white/70">{item.alt}</p>
            <p className="mt-2 text-xs text-white/50">
              Photo:{" "}
              <a href={item.credit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-white hover:underline">
                {item.credit.name}
              </a>{" "}
              / Unsplash
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
