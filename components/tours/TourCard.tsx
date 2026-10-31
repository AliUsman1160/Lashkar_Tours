import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { formatDuration, type Tour } from "@/data/tours";
import { getDestination } from "@/data/destinations";
import { photos } from "@/data/photos";
import { whatsappMessages } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function formatPrice(tour: Tour) {
  if (!tour.price) return null;
  return `From ${new Intl.NumberFormat("en-US", { style: "currency", currency: tour.price.currency, maximumFractionDigits: 0 }).format(tour.price.amount)} ${tour.price.basis}`;
}

export function tourDestinationNames(tour: Tour) {
  if (tour.types.includes("custom")) return "Across northern Pakistan";
  return tour.destinations.map((s) => getDestination(s)?.name ?? s).join(" · ");
}

export function TourCard({ tour, headingLevel: Heading = "h3" }: { tour: Tour; headingLevel?: "h2" | "h3" }) {
  const photo = photos[tour.coverImage];
  const price = formatPrice(tour);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_1px_0_rgba(23,61,50,0.08),0_20px_40px_-30px_rgba(23,61,50,0.35)] transition-shadow duration-500 hover:shadow-[0_1px_0_rgba(23,61,50,0.08),0_30px_60px_-30px_rgba(23,61,50,0.5)]">
      <Link href={`/tours/${tour.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-sage" tabIndex={-1} aria-hidden>
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-sm bg-white/95 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-forest">
          {tour.style}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-grey-ink">
          <span className="flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 text-gold-dark" />
            {tourDestinationNames(tour)}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-3.5 text-gold-dark" />
            {formatDuration(tour)}
            {tour.durationDays && <span className="font-normal">(sample)</span>}
          </span>
        </div>

        <Heading className="mt-3 text-2xl leading-snug text-forest">
          <Link href={`/tours/${tour.slug}`} className="transition-colors hover:text-gold-dark">
            {tour.title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-grey-ink">{tour.summary}</p>

        <p className="mt-5 border-t border-forest/10 pt-4 text-sm font-semibold text-forest">{price ?? "Request a Custom Quote"}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/tours/${tour.slug}`} className={buttonClasses("forest", "sm", "flex-1")}>
            View Tour <ArrowRight aria-hidden className="size-4" />
          </Link>
          <WhatsAppButton message={whatsappMessages.tour(tour.title)} label="Inquire on WhatsApp" variant="outline-dark" size="sm" className="flex-1" />
        </div>
      </div>
    </article>
  );
}
