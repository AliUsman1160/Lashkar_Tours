import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/data/faqs";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Pakistan Travel FAQ | Planning a Trip to Northern Pakistan",
  description:
    "Answers to common questions about planning a trip to Pakistan with Lashkar Tours — custom itineraries, quotations, combining Hunza and Skardu, family trips and what to know before you travel.",
  alternates: { canonical: "/faq" },
};

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default function FaqPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        photo={photos.passuRiver}
        size="sm"
        eyebrow="FAQ"
        title="Questions, Answered."
        description="Helpful information for international travelers planning a journey to northern Pakistan."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="FAQ categories" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
              {categories.map((c) => (
                <li key={c}>
                  <a
                    href={`#${slugify(c)}`}
                    className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-forest hover:bg-sage lg:rounded-sm lg:bg-transparent lg:px-3"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14 lg:col-span-9">
            {categories.map((c) => (
              <section key={c} id={slugify(c)} className="scroll-mt-28" aria-labelledby={`${slugify(c)}-title`}>
                <h2 id={`${slugify(c)}-title`} className="mb-4 text-3xl text-forest">
                  {c}
                </h2>
                <Accordion items={faqs.filter((f) => f.category === c).map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
              </section>
            ))}

            <div className="rounded-sm bg-white p-8 sm:p-10">
              <p className="text-sm leading-relaxed text-grey-ink">
                <strong className="text-charcoal">Please note:</strong> prices, permits, entry requirements, road conditions, seasonal access and
                availability change. Always confirm the latest details with Lashkar Tours or the relevant official authority before you travel.
              </p>
              <h2 className="mt-8 text-3xl text-forest">Still have a question?</h2>
              <p className="mt-2 text-grey-ink">
                Ask directly, or browse the{" "}
                <Link href="/destinations" className="font-semibold text-forest underline-offset-4 hover:underline">
                  destination guides
                </Link>{" "}
                for seasonal and practical tips.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/plan-your-trip">
                  Plan Your Trip <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                <WhatsAppButton label="Ask on WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
