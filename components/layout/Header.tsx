"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { mainNavigation } from "@/data/site-config";
import { buttonClasses } from "@/components/ui/Button";
import { cn, isActivePath } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Every page opens with a dark photographic hero, so the header starts transparent everywhere.
  const solid = scrolled || menuOpen;

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded bg-gold px-4 py-2 font-semibold text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-soft",
          solid ? "bg-forest/95 py-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md" : "bg-gradient-to-b from-charcoal/60 to-transparent py-5",
        )}
      >
        <div className="container-site flex items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative px-3.5 py-2 text-sm font-semibold tracking-wide transition-colors",
                        active ? "text-gold" : "text-white/85 hover:text-white",
                        "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-gold after:transition-transform after:duration-300",
                        active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/plan-your-trip" className={buttonClasses("gold", "sm", "hidden sm:inline-flex lg:min-h-11 lg:px-5")}>
              Plan Your Trip
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
