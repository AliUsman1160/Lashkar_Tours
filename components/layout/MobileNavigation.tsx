"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { mainNavigation, siteConfig } from "@/data/site-config";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn, isActivePath } from "@/lib/utils";
import { Logo } from "./Logo";

type Props = { open: boolean; onClose: () => void; pathname: string };

export function MobileNavigation({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close when the route changes.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) onClose();
    lastPath.current = pathname;
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        // Keep focus inside the drawer.
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
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
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-forest text-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <Logo />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-sm hover:bg-white/10"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-5 pt-6">
              <ul className="space-y-1">
                {mainNavigation.map((item, i) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-white/10 py-4 font-serif text-2xl transition-colors",
                          active ? "text-gold" : "text-white hover:text-gold",
                        )}
                      >
                        {item.label}
                        <ArrowRight aria-hidden className="size-5 opacity-50" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-white/10 bg-forest-deep px-5 py-6">
              <Link href="/plan-your-trip" onClick={onClose} className={buttonClasses("gold", "lg", "w-full")}>
                Plan Your Trip
              </Link>
              <WhatsAppButton size="lg" className="w-full" />
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="block pt-2 text-center text-sm text-white/70 hover:text-white">
                  {siteConfig.email}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
