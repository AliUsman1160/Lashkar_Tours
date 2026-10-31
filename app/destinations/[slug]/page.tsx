import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarRange, Clock, Info, MapPin, Plane } from "lucide-react";
import { destinationNote, destinations, getDestination } from "@/data/destinations";
import { photos } from "@/data/photos";
import { getTour } from "@/data/tours";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { TourCard } from "@/components/tours/TourCard";
import { PlanTripCTA } from "@/components/home/PlanTripCTA";
import { ogImage } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  const hero = photos[d.heroImage];
  return {
    title: { absolute: d.seo.title },
    description: d.seo.description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: d.seo.title,
      description: d.seo.description,
      url: `/destinations/${d.slug}`,
      images: [{ url: ogImage(hero.src), alt: hero.alt }],
    },
  };
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const hero = photos[d.heroImage];
  const planHref = `/plan-your-trip?destination=${d.slug}`;
  const relatedTours = d.relatedTours.map(getTour).filter((t) => t !== undefined);
  const galleryItems = d.gallery.map((key, i) => ({ ...photos[key], key, shape: i % 3 === 0 ? ("wide" as const) : undefined }));

  return (
    <>
      <PageHero
        photo={hero}
        size="lg"
        eyebrow={d.region}
        title={d.name}
        description={d.tagline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }, { label: d.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={planHref} size="lg">
            Plan a Trip to {d.shortName} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <WhatsAppButton message={d.whatsappMessage} variant="outline-light" size="lg" label="Ask on WhatsApp" />
        </div>
      </PageHero>

      {/* Introduction + key facts */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <SectionHeading eyebrow={`About ${d.shortName}`} title={d.shortDescription} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-grey-ink">
              {d.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <aside aria-label={`${d.name} at a glance`} className="rounded-sm bg-white p-8 shadow-[0_20px_50px_-35px_rgba(23,61,50,0.5)]">
              <h2 className="text-2xl text-forest">At a glance</h2>
              <dl className="mt-6 space-y-6">
                <Fact icon={<MapPin className="size-5" />} term="Region" detail={d.region} />
                {d.suggestedDuration && <Fact icon={<Clock className="size-5" />} term="Suggested stay" detail={d.suggestedDuration} />}
                <Fact icon={<CalendarRange className="size-5" />} term="Best time to visit" detail={d.bestTime.summary} />
                <Fact icon={<Plane className="size-5" />} term="Getting there" detail={d.gettingThere} />
              </dl>
              <ButtonLink href={planHref} variant="forest" className="mt-8 w-full">
                Plan a Trip to {d.shortName}
              </ButtonLink>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Highlights" title={`Major Attractions in ${d.shortName}`} />
          <ol className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {d.highlights.map((h, i) => (
              <li key={h.name} className="border-t border-forest/15 py-7">
                <Reveal delay={(i % 3) * 0.06}>
                  <p className="font-serif text-sm text-gold-dark">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl text-forest">{h.name}</h3>
                  <p className="mt-2 leading-relaxed text-grey-ink">{h.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-start gap-2 text-sm text-grey-ink">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-dark" />
            These are destination highlights, not a list of what is included in any particular tour. Discuss which places you would like to
            include.
          </p>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-ivory py-20 sm:py-28" aria-labelledby="photos-title">
        <div className="container-site">
          <SectionHeading eyebrow="Gallery" title={<span id="photos-title">{d.shortName} in Pictures</span>} />
          <GalleryGrid items={galleryItems} className="mt-12" />
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-forest py-20 text-white sm:py-28">
        <div className="container-site">
          <SectionHeading tone="light" eyebrow="Suggested experiences" title={`Ways to Experience ${d.shortName}`} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {d.experiences.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06} className="bg-forest">
                <div className="h-full p-8">
                  <span aria-hidden className="block h-px w-10 bg-gold" />
                  <h3 className="mt-6 text-xl">{e.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{e.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Seasons + sample route */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="When to go" title="Best Time to Visit" description={d.bestTime.summary} />
            <dl className="mt-10 divide-y divide-forest/10 border-y border-forest/10">
              {d.bestTime.seasons.map((s) => (
                <div key={s.label} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt>
                    <span className="block font-semibold text-forest">{s.label}</span>
                    <span className="text-sm text-gold-dark">{s.months}</span>
                  </dt>
                  <dd className="text-grey-ink">{s.note}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-start gap-2 text-sm text-grey-ink">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-dark" />
              {destinationNote}
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Route ideas" title="A Sample Route" description="One way to explore — the order and length can be adjusted." />
            <ol className="relative mt-10 space-y-8 border-l border-forest/20 pl-8">
              {d.sampleRoute.map((step, i) => (
                <li key={step.title} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.85rem] grid size-7 place-items-center rounded-full border border-forest/20 bg-ivory text-xs font-bold text-forest"
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-sans text-lg font-semibold text-forest">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-grey-ink">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tips + FAQs */}
      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Travel tips" title="Good to Know" />
            <ul className="mt-8 space-y-4">
              {d.tips.map((tip) => (
                <li key={tip} className="flex gap-3 leading-relaxed text-grey-ink">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="FAQs" title={`${d.shortName} Questions`} />
            <Accordion className="mt-8" items={d.faqs.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
          </div>
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-site">
            <SectionHeading eyebrow="Related journeys" title={`Tours Featuring ${d.shortName}`} description="Example itineraries you can adapt to your own plans." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PlanTripCTA
        title={`Plan a Trip to ${d.name}`}
        description={`Share your dates, group size and interests, and explore a ${d.shortName} itinerary that suits you.`}
        photo={photos[d.gallery[0]] ?? hero}
        planHref={planHref}
        planLabel={`Plan a Trip to ${d.shortName}`}
        whatsappMessage={d.whatsappMessage}
      />
    </>
  );
}

function Fact({ icon, term, detail }: { icon: React.ReactNode; term: string; detail: string }) {
  return (
    <div className="flex gap-4">
      <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-forest">
        {icon}
      </span>
      <div>
        <dt className="text-xs font-bold uppercase tracking-[0.16em] text-gold-dark">{term}</dt>
        <dd className="mt-1 leading-relaxed text-charcoal">{detail}</dd>
      </div>
    </div>
  );
}
