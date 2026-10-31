import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const planningSteps = [
  { title: "Tell Us Your Plans", text: "Share your travel dates, preferred destinations, group size, and interests." },
  { title: "Discuss Your Itinerary", text: "Explore possible routes and experiences with the travel team." },
  { title: "Refine Your Trip", text: "Discuss accommodation preferences, transportation, duration, and budget." },
  { title: "Prepare for Your Journey", text: "Confirm the final arrangements directly with Lashkar Tours." },
];

export function HowItWorks() {
  return (
    <section className="bg-sage/60 py-20 sm:py-28 lg:py-32">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Planning Your Pakistan Adventure Is Simple."
          description="Nothing is booked through this website. Every trip is discussed and confirmed directly with Lashkar Tours."
        />

        <div className="relative mt-16">
          <span aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-forest/20 lg:block" />
          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {planningSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.1} className="flex gap-5 lg:block">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-forest/20 bg-ivory font-serif text-xl text-forest">
                    <span className="sr-only">Step </span>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:mt-8">
                    <h3 className="text-2xl text-forest">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-grey-ink">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 text-center">
          <ButtonLink href="/plan-your-trip" size="lg">
            Start with step one <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
