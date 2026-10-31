import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Photo } from "@/data/photos";
import { PhotoCredit } from "./PhotoCredit";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

type Props = {
  photo: Photo;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
};

const heights = { sm: "min-h-[50svh] sm:min-h-[54svh]", md: "min-h-[62svh] sm:min-h-[68svh]", lg: "min-h-[88svh]" };

export function PageHero({ photo, eyebrow, title, description, breadcrumbs, children, size = "md" }: Props) {
  return (
    <section className={cn("relative isolate flex items-end overflow-hidden bg-charcoal text-white", heights[size])}>
      <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/95 via-charcoal/45 to-charcoal/30" />

      <div className="container-site pb-14 pt-32 sm:pb-20">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
              {breadcrumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4 text-gold">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
      <PhotoCredit photo={photo} className="absolute bottom-3 right-4 hidden sm:block" />
    </section>
  );
}
