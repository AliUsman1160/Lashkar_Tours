"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { id?: string; title: ReactNode; content: ReactNode; meta?: ReactNode };

type Props = {
  items: AccordionItem[];
  /** Indexes open on first render. */
  defaultOpen?: number[];
  allowMultiple?: boolean;
  headingLevel?: "h3" | "h4";
  className?: string;
  /** Show expand/collapse all controls. */
  showToggleAll?: boolean;
};

export function Accordion({ items, defaultOpen = [], allowMultiple = true, headingLevel = "h3", className, showToggleAll }: Props) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen));
  const baseId = useId();
  const Heading = headingLevel;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const allOpen = open.size === items.length;

  return (
    <div className={className}>
      {showToggleAll && (
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))}
            className="text-sm font-semibold text-forest underline-offset-4 hover:underline"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      )}
      <div className="divide-y divide-forest/10 border-y border-forest/10">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          const buttonId = `${baseId}-btn-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          return (
            <div key={item.id ?? i}>
              <Heading className="font-sans text-base">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="group flex w-full items-start gap-4 py-5 text-left"
                >
                  {item.meta}
                  <span className="flex-1 pt-0.5 text-base font-semibold text-charcoal sm:text-lg">{item.title}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-forest/20 text-forest transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10",
                      isOpen && "rotate-45 border-gold bg-gold text-charcoal group-hover:bg-gold",
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
              </Heading>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pr-12 text-grey-ink leading-relaxed">{item.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
