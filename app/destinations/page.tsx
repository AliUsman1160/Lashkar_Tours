import type { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DestinationFilters } from "@/components/destinations/DestinationFilters";
import { PlanTripCTA } from "@/components/home/PlanTripCTA";
import { ogImage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pakistan Destinations | Hunza, Skardu, Fairy Meadows & More",
  description:
    "Explore northern Pakistan's most remarkable destinations — Hunza Valley, Skardu, Fairy Meadows, Naran and Kaghan, Swat and Kalam, and the Neelum Valley.",
  alternates: { canonical: "/destinations" },
  openGraph: { images: [ogImage(photos.hunzaSunset.src)] },
};

const regions = [
  {
    name: "Gilgit-Baltistan",
    text: "Pakistan's high north, where the Karakoram, Himalaya and Hindu Kush meet. Home to K2, Nanga Parbat and the valleys of Hunza and Baltistan.",
    slugs: ["hunza", "skardu", "fairy-meadows"],
  },
  {
    name: "Khyber Pakhtunkhwa",
    text: "Green, forested valleys within a day's drive of Islamabad, with alpine lakes, high passes and deep layers of history.",
    slugs: ["naran-kaghan", "swat-kalam"],
  },
  {
    name: "Azad Jammu & Kashmir",
    text: "Lush river valleys and wooden villages. Some areas near the Line of Control have special access rules for foreign visitors.",
    slugs: ["neelum-valley"],
  },
];

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        photo={photos.hunzaSunset}
        eyebrow="Destinations"
        title="Where Will Pakistan Take You?"
        description="From glacier-carved valleys to quiet riverside villages, northern Pakistan holds some of the most spectacular landscapes on Earth."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />

      <section className="bg-ivory py-20 sm:py-24">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
            <SectionHeading eyebrow="Exploring Pakistan" title="Six Regions, Six Different Journeys." />
            <div className="space-y-4 text-lg leading-relaxed text-grey-ink lg:pt-10">
              <p>
                Pakistan&apos;s north is not one landscape but many. Each region has its own seasons, culture and pace — and its own reasons to
                visit.
              </p>
              <p>
                Browse the destinations below, then tell Lashkar Tours which ones interest you. Many travelers combine two or three regions in a
                single trip.
              </p>
            </div>
          </div>
          <div className="mt-14">
            <DestinationFilters destinations={destinations} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Regional highlights" title="Understanding the North." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-forest/10 md:grid-cols-3">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08} className="bg-white">
                <div className="h-full p-8 lg:p-10">
                  <p className="font-serif text-sm text-gold-dark">0{i + 1}</p>
                  <h3 className="mt-4 text-2xl text-forest">{r.name}</h3>
                  <p className="mt-3 leading-relaxed text-grey-ink">{r.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {r.slugs.map((slug) => {
                      const d = destinations.find((x) => x.slug === slug);
                      return d ? (
                        <li key={slug}>
                          <Link
                            href={`/destinations/${slug}`}
                            className="inline-flex min-h-9 items-center rounded-full bg-sage px-4 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
                          >
                            {d.name}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PlanTripCTA
        title="Not Sure Where to Start?"
        description="Tell Lashkar Tours how long you have and what you enjoy, and explore which regions could fit your trip."
        photo={photos.passuRiver}
      />
    </>
  );
}
