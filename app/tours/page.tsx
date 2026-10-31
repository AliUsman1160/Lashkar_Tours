import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { tours } from "@/data/tours";
import { PageHero } from "@/components/ui/PageHero";
import { TourFilters } from "@/components/tours/TourFilters";
import { PlanTripCTA } from "@/components/home/PlanTripCTA";
import { ogImage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pakistan Tours | Hunza, Skardu & Northern Pakistan Itineraries",
  description:
    "Browse example itineraries for Hunza, Skardu, Fairy Meadows, Naran, Swat and the Neelum Valley — private, family, honeymoon, adventure and fully customized journeys.",
  alternates: { canonical: "/tours" },
  openGraph: { images: [ogImage(photos.attabadLake.src)] },
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        photo={photos.deosaiTrack}
        eyebrow="Tours"
        title="Journeys Through Northern Pakistan."
        description="Example itineraries to inspire your trip. None are fixed departures — each one is a starting point you can shape around your own dates, interests and budget."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tours" }]}
      />
      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-site">
          <TourFilters tours={tours} />
        </div>
      </section>
      <PlanTripCTA
        title="Prefer Something Completely Your Own?"
        description="Describe the trip you have in mind — destinations, dates, pace and budget — and discuss a custom itinerary with Lashkar Tours."
        photo={photos.karimabadNight}
        planLabel="Request a Custom Trip"
      />
    </>
  );
}
