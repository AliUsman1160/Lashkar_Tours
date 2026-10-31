import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { photos } from "@/data/photos";
import { cn } from "@/lib/utils";

type Props = {
  destination: Destination;
  index?: number;
  className?: string;
  /** Use on grids where this card spans a larger area. */
  large?: boolean;
  headingLevel?: "h2" | "h3";
};

export function DestinationCard({ destination, index, className, large, headingLevel: Heading = "h3" }: Props) {
  const photo = photos[destination.cardImage];
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-sm bg-charcoal text-white",
        large && "sm:min-h-[34rem]",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className="-z-10 object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent transition-opacity duration-500 group-hover:from-forest-deep" />

      {index !== undefined && (
        <span aria-hidden className="absolute left-6 top-6 font-serif text-sm text-white/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div className="p-6 sm:p-8">
        <p className="eyebrow mb-3 text-gold">{destination.region}</p>
        <Heading className="text-3xl leading-tight sm:text-4xl">{destination.name}</Heading>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">{destination.shortDescription}</p>
        {destination.suggestedDuration && (
          <p className="mt-4 flex items-start gap-2 text-xs text-white/70">
            <Clock aria-hidden className="mt-px size-3.5 shrink-0 text-gold" />
            {destination.suggestedDuration}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-sm font-semibold tracking-wide transition-colors group-hover:border-gold group-hover:text-gold">
          Explore Destination
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
