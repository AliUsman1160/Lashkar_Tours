import type { Metadata } from "next";
import { gallery, resolveGallery } from "@/data/gallery";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { PlanTripCTA } from "@/components/home/PlanTripCTA";
import { ogImage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pakistan Travel Gallery | Hunza, Skardu & Northern Valleys",
  description:
    "Photographs of Hunza Valley, Attabad Lake, Skardu, Deosai, Fairy Meadows, Naran, Swat and the Neelum Valley — the landscapes of northern Pakistan.",
  alternates: { canonical: "/gallery" },
  openGraph: { images: [ogImage(photos.attabadLake.src)] },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        photo={photos.sheosarLake}
        eyebrow="Gallery"
        title="Northern Pakistan, Frame by Frame."
        description="Peaks, lakes, forts and villages from across the north. Select any photo to view it full screen."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-site">
          <GalleryExplorer items={resolveGallery(gallery)} />
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-grey-ink">
            Photographs are by independent photographers and used under the{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="font-semibold text-forest underline-offset-4 hover:underline">
              Unsplash License
            </a>
            . They show the destinations themselves and do not depict Lashkar Tours trips or customers. Each photo credits its photographer in the
            viewer.
          </p>
        </div>
      </section>
      <PlanTripCTA title="See It for Yourself." photo={photos.hunzaPeak} />
    </>
  );
}
