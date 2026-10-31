import { ArrowRight } from "lucide-react";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedTours() {
  const featured = tours.filter((t) => t.featured).slice(0, 6);
  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-36">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Journeys"
          title="Find the Journey That Inspires You."
          description="Example itineraries to spark ideas. Every journey can be adjusted to your dates, pace and budget."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tour, i) => (
            <Reveal key={tour.slug} delay={(i % 3) * 0.08}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <ButtonLink href="/tours" variant="forest" size="lg">
            View all tours <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <p className="max-w-xl text-sm text-grey-ink">
            These are sample journeys, not fixed departures. Prices are quoted individually once your plans are known.
          </p>
        </div>
      </div>
    </section>
  );
}
