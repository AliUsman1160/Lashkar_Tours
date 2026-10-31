import type { Metadata } from "next";
import { Suspense } from "react";
import { Compass, ShieldCheck } from "lucide-react";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PlanYourTripForm } from "@/components/forms/PlanYourTripForm";
import { planningSteps } from "@/components/home/HowItWorks";
import { ogImage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Plan Your Trip to Pakistan | Personalized Itinerary Request",
  description:
    "Tell Lashkar Tours about your dream trip to Pakistan — destinations, dates, group size and interests — and discuss a personalized itinerary for Hunza, Skardu and beyond.",
  alternates: { canonical: "/plan-your-trip" },
  openGraph: { images: [ogImage(photos.attabadBoats.src)] },
};

export default function PlanYourTripPage() {
  return (
    <>
      <PageHero
        photo={photos.attabadBoats}
        size="sm"
        eyebrow="Plan your trip"
        title="Let's Plan Your Pakistan Adventure."
        description="Tell us a little about your trip, and explore the possibilities for a memorable journey through Pakistan. Share your preferred destinations, travel dates, group size, and interests so you can discuss a suitable itinerary with Lashkar Tours."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Plan Your Trip" }]}
      />

      <section className="bg-ivory py-12 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-[42rem] animate-pulse rounded-sm bg-white" aria-label="Loading form" />}>
              <PlanYourTripForm />
            </Suspense>
          </div>

          <aside className="space-y-6 lg:col-span-4" aria-label="About trip planning">
            <div className="rounded-sm bg-white p-7">
              <Compass aria-hidden className="size-7 text-gold-dark" strokeWidth={1.5} />
              <h2 className="mt-4 text-2xl text-forest">Personal, not packaged</h2>
              <p className="mt-2 leading-relaxed text-grey-ink">
                You don&apos;t need to pick a fixed package. Describe what you&apos;d love to experience and discuss a route that fits your
                time, interests and budget.
              </p>
            </div>

            <div className="rounded-sm bg-white p-7">
              <h2 className="text-2xl text-forest">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {planningSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage font-serif text-sm text-forest">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-forest">{s.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-grey-ink">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-sm bg-forest p-7 text-white">
              <h2 className="text-2xl">Prefer to chat?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">Start a WhatsApp conversation and share your plans directly.</p>
              <WhatsAppButton className="mt-5 w-full" />
            </div>

            <p className="flex items-start gap-3 px-1 text-sm leading-relaxed text-grey-ink">
              <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-forest" />
              This form is a demonstration. Nothing you enter is sent or stored, and submitting does not create a booking.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
