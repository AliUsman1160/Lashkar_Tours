import { ArrowRight } from "lucide-react";
import { gallery, resolveGallery } from "@/data/gallery";
import type { PhotoKey } from "@/data/photos";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const previewPhotos: PhotoKey[] = [
  "hunzaAerial",
  "shangrila",
  "nangaParbatForest",
  "attabadLake",
  "arangKel",
  "skarduSunset",
  "altitFort",
  "babusarRoad",
  "sheosarLake",
];

export function GalleryPreview() {
  const items = resolveGallery(gallery.filter((g) => previewPhotos.includes(g.photo)));
  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-36">
      <div className="container-site">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments From the Mountains."
            description="Hunza, Attabad Lake, Skardu, Shangrila, Fairy Meadows and the villages and roads between them."
          />
          <ButtonLink href="/gallery" variant="outline-dark" className="self-start lg:self-auto">
            View All Photos <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
