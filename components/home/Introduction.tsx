import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { photos } from "@/data/photos";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Introduction() {
  const main = photos.hunzaHouse;
  const inset = photos.altitFort;
  return (
    <section className="overflow-hidden bg-ivory py-20 sm:py-28 lg:py-36">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <SectionHeading eyebrow="Welcome to Lashkar Tours" title="Discover the Real Pakistan." />
          <p className="mt-6 text-lg leading-relaxed text-grey-ink">
            Pakistan is a land of extraordinary landscapes, rich traditions, welcoming communities, and unforgettable journeys. Lashkar Tours helps
            travelers explore its remarkable destinations through thoughtfully planned travel experiences.
          </p>
          <p className="mt-4 leading-relaxed text-grey-ink">
            Whether you dream of apricot blossom in Hunza, the lakes of Skardu or a sunrise over Nanga Parbat, your journey starts with a
            conversation about what you would love to see.
          </p>
          <ButtonLink href="/about" variant="outline-dark" className="mt-10">
            Discover Our Story <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-sm">
            <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-10 left-0 aspect-square w-[46%] overflow-hidden rounded-sm border-[6px] border-ivory shadow-xl sm:-bottom-12">
            <Image src={inset.src} alt={inset.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
          </div>
          <p aria-hidden className="absolute -right-2 top-8 hidden font-serif text-sm italic text-forest/60 [writing-mode:vertical-rl] sm:block">
            {main.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
