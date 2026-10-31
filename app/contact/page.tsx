import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Lashkar Tours | Pakistan Trip Inquiries",
  description: "Get in touch with Lashkar Tours about a trip to Hunza, Skardu or northern Pakistan — on WhatsApp or through our trip-planning form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const details = [
    siteConfig.email && { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    siteConfig.phone && { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    siteConfig.address && { icon: MapPin, label: "Address", value: siteConfig.address },
    siteConfig.businessHours && { icon: Clock, label: "Hours", value: siteConfig.businessHours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        photo={photos.kalamTown}
        size="sm"
        eyebrow="Contact"
        title="Let's Talk About Your Trip."
        description="Have a question or a journey in mind? The quickest way to start is on WhatsApp or through the trip-planning form."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <div className="rounded-sm bg-forest p-8 text-white sm:p-10">
              <WhatsAppIcon className="size-9 text-[#25D366]" />
              <h2 className="mt-5 text-3xl">Chat on WhatsApp</h2>
              <p className="mt-3 leading-relaxed text-white/80">
                Message Lashkar Tours directly. A short introduction is prefilled — edit it to mention your dates and destinations.
              </p>
              <WhatsAppButton size="lg" className="mt-7 w-full sm:w-auto" />            </div>

            <div className="rounded-sm bg-white p-8 sm:p-10">
              <h2 className="text-3xl text-forest">Plan a trip</h2>
              <p className="mt-3 leading-relaxed text-grey-ink">
                Know roughly where and when you want to go? The trip planner asks the right questions so your itinerary can be discussed quickly.
              </p>
              <ButtonLink href="/plan-your-trip" className="mt-6">
                Plan Your Trip <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>

            {details.length > 0 ? (
              <dl className="grid gap-4 sm:grid-cols-2">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="rounded-sm bg-white p-6">
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-dark">
                      <Icon aria-hidden className="size-4" /> {label}
                    </dt>
                    <dd className="mt-2 break-words font-semibold text-forest">
                      {href ? (
                        <a href={href} className="hover:underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="rounded-sm border border-dashed border-forest/25 px-5 py-4 text-sm leading-relaxed text-grey-ink">
                Email, phone and address details will appear here once they have been verified and added to{" "}
                <code className="text-xs">data/site-config.ts</code>.
              </p>
            )}
          </div>

          <div>
            <SectionHeading eyebrow="Send a message" title="Quick Question?" description="For general questions. For trip requests, the trip planner is the better choice." />
            <div className="mt-8">
              <ContactForm />
            </div>
            <p className="mt-6 text-sm text-grey-ink">
              You may also find your answer in the{" "}
              <Link href="/faq" className="font-semibold text-forest underline-offset-4 hover:underline">
                frequently asked questions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
