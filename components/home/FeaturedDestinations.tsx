import { ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FeaturedDestinations() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Destinations"
            title="Explore Pakistan's Most Remarkable Places."
            description="Six regions, each with its own character — from the high Karakoram to the green valleys of Kashmir."
          />
          <ButtonLink href="/destinations" variant="outline-dark" className="self-start lg:self-auto">
            All destinations <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:pb-12">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 0.08} className={cn(i % 3 === 1 && "lg:translate-y-12")}>
              <DestinationCard destination={d} index={i} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
