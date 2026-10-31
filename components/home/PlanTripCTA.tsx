import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { photos, type Photo } from "@/data/photos";
import { whatsappMessages } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type Props = {
  title?: string;
  description?: string;
  photo?: Photo;
  planHref?: string;
  planLabel?: string;
  whatsappMessage?: string;
};

/** Full-bleed conversion banner. Defaults match the homepage; destination and tour pages pass their own copy. */
export function PlanTripCTA({
  title = "Your Pakistan Adventure Starts Here.",
  description = "Tell us what you would love to experience in Pakistan. Whether you have a destination in mind or need help planning your route, start by sharing your travel plans.",
  photo = photos.nangaParbatClouds,
  planHref = "/plan-your-trip",
  planLabel = "Plan Your Trip",
  whatsappMessage = whatsappMessages.general,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-28 text-white sm:py-36 lg:py-44">
      <Image src={photo.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal/65" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/80 to-transparent" />
      <Reveal className="container-site text-center">
        <p className="eyebrow text-gold">Start planning</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-7xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={planHref} size="lg" className="w-full sm:w-auto">
            {planLabel} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <WhatsAppButton message={whatsappMessage} size="lg" variant="outline-light" className="w-full sm:w-auto" />
        </div>
      </Reveal>
      <PhotoCredit photo={photo} className="absolute bottom-3 right-4" />
    </section>
  );
}
