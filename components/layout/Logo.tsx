import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

/** Text wordmark used until the official logo file is supplied via siteConfig.logoPath. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center", className)} aria-label={`${siteConfig.name} — home`}>
      {siteConfig.logoPath ? (
        <Image src={siteConfig.logoPath} alt={siteConfig.name} width={160} height={48} className="h-10 w-auto" priority />
      ) : (
        <span className="flex flex-col leading-none">
          <span className={cn("font-serif text-[1.65rem] font-semibold tracking-tight", tone === "light" ? "text-white" : "text-forest")}>
            Lashkar
          </span>
          <span className={cn("mt-1 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.42em]", tone === "light" ? "text-gold" : "text-gold-dark")}>
            <span aria-hidden className="h-px w-4 bg-current" />
            Tours
          </span>
        </span>
      )}
    </Link>
  );
}
