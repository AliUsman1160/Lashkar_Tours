import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, Compass, Info, MapPin, X } from "lucide-react";
import { formatDuration, getTour, tours, tourTypes } from "@/data/tours";
import { getDestination } from "@/data/destinations";
import { photos } from "@/data/photos";
import { whatsappMessages } from "@/lib/whatsapp";
import { ogImage } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ItineraryAccordion } from "@/components/tours/ItineraryAccordion";
import { TourCard, formatPrice, tourDestinationNames } from "@/components/tours/TourCard";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  const cover = photos[tour.coverImage];
  const title = `${tour.title} | ${tourDestinationNames(tour).replace(/ · /g, ", ")} Tour`;
  return {
    title,
    description: `${tour.summary} An example itinerary from Lashkar Tours that you can tailor to your dates and interests.`,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: { title: `${tour.title} — Lashkar Tours`, url: `/tours/${tour.slug}`, images: [{ url: ogImage(cover.src), alt: cover.alt }] },
  };
}

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const cover = photos[tour.coverImage];
  const price = formatPrice(tour);
  const planHref = `/plan-your-trip?tour=${tour.slug}`;
  const tourDestinations = tour.destinations.map(getDestination).filter((d) => d !== undefined);
  const related = tour.relatedTours.map(getTour).filter((t) => t !== undefined);
  const isModular = tour.itinerary.some((d) => !/^\d+$/.test(d.label));

  return (
    <>
      <PageHero
        photo={cover}
        size="lg"
        eyebrow={tour.style}
        title={tour.title}
        description={tour.summary}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tours", href: "/tours" }, { label: tour.title }]}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
          <li className="flex items-center gap-2">
            <MapPin aria-hidden className="size-4 text-gold" />
            {tourDestinationNames(tour)}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4 text-gold" />
            {formatDuration(tour)}
            {tour.durationDays && " (sample itinerary)"}
          </li>
          <li className="flex items-center gap-2">
            <Compass aria-hidden className="size-4 text-gold" />
            {tour.types.map((t) => tourTypes[t]).slice(0, 3).join(" · ")}
          </li>
        </ul>
      </PageHero>

      <div className="bg-ivory">
        <div className="container-site grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16">
          {/* Main column */}
          <div className="space-y-20 lg:col-span-8">
            <section aria-labelledby="overview">
              <SectionHeading eyebrow="Overview" title={<span id="overview">What to Expect</span>} />
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-grey-ink">
                {tour.overview.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="highlights">
              <SectionHeading eyebrow="Highlights" title={<span id="highlights">Tour Highlights</span>} />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 rounded-sm bg-white px-5 py-4 font-semibold text-forest">
                    <Check aria-hidden className="size-4 shrink-0 text-gold-dark" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="itinerary">
              <SectionHeading
                eyebrow="Itinerary"
                title={<span id="itinerary">{isModular ? "Build Your Route" : "Day by Day"}</span>}
                description={
                  isModular
                    ? "Building blocks travelers often combine. Choose one, several, or suggest your own."
                    : "A sample outline. Timings, order and overnight stops are confirmed with Lashkar Tours when you plan."
                }
              />
              <div className="mt-8">
                <ItineraryAccordion days={tour.itinerary} />
              </div>
            </section>

            <section aria-labelledby="included" className="grid gap-6 md:grid-cols-2">
              <h2 id="included" className="sr-only">
                What is and isn&apos;t included
              </h2>
              <InclusionList title="What's included" items={tour.inclusions} positive />
              <InclusionList title="What's not included" items={tour.exclusions} />
            </section>

            <section aria-labelledby="travel-info">
              <SectionHeading eyebrow="Practical notes" title={<span id="travel-info">Travel Information</span>} />
              <ul className="mt-8 space-y-4">
                {tour.travelNotes.map((n) => (
                  <li key={n} className="flex gap-3 leading-relaxed text-grey-ink">
                    <Info aria-hidden className="mt-1 size-4 shrink-0 text-gold-dark" />
                    {n}
                  </li>
                ))}
              </ul>
            </section>

            {tourDestinations.length > 0 && (
              <section aria-labelledby="destinations">
                <SectionHeading eyebrow="Destinations" title={<span id="destinations">Explore the Destinations</span>} />
                <ul className="mt-8 flex flex-wrap gap-3">
                  {tourDestinations.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/destinations/${d.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest/20 bg-white px-5 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white"
                      >
                        {d.name} <ArrowRight aria-hidden className="size-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Conversion panel */}
          <aside aria-label="Plan this trip" className="lg:col-span-4">
            <div className="rounded-sm bg-forest p-7 text-white shadow-[0_30px_60px_-30px_rgba(15,42,34,0.8)] lg:sticky lg:top-28">
              <p className="eyebrow text-gold">Pricing</p>
              <p className="mt-3 font-serif text-3xl">{price ?? "Request a Custom Quote"}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {price
                  ? "Final pricing depends on dates, group size and the services you choose."
                  : "Costs depend on your dates, group size, accommodation and transport preferences. Share your plans to receive a quote."}
              </p>
              <div className="mt-7 space-y-3">
                <ButtonLink href={planHref} size="lg" className="w-full">
                  Plan This Trip <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <WhatsAppButton
                  message={whatsappMessages.tour(tour.title)}
                  label="Ask a Question on WhatsApp"
                  variant="outline-light"
                  size="lg"
                  className="w-full whitespace-normal text-center"
                />
              </div>
              <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/65">
                This is an example itinerary, not a reservation. Availability and arrangements are confirmed directly with Lashkar Tours.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-site">
            <SectionHeading eyebrow="Keep exploring" title="Related Tours" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function InclusionList({ title, items, positive }: { title: string; items: string[]; positive?: boolean }) {
  const Icon = positive ? Check : X;
  return (
    <div className="rounded-sm bg-white p-7">
      <h3 className="text-2xl text-forest">{title}</h3>
      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((i) => (
            <li key={i} className="flex gap-3 text-grey-ink">
              <Icon aria-hidden className={positive ? "mt-1 size-4 shrink-0 text-forest" : "mt-1 size-4 shrink-0 text-grey"} />
              {i}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 leading-relaxed text-grey-ink">
          {positive
            ? "Inclusions are agreed individually for each trip. Ask Lashkar Tours what can be arranged for your journey."
            : "Exclusions will be set out clearly in your personal quotation."}
        </p>
      )}
    </div>
  );
}
