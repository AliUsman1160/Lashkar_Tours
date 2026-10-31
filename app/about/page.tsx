import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Globe2, Map as MapIcon, MessagesSquare, Mountain, Users } from "lucide-react";
import { photos } from "@/data/photos";
import { team } from "@/data/team";
import { destinations } from "@/data/destinations";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlanTripCTA } from "@/components/home/PlanTripCTA";
import { ogImage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Lashkar Tours | Personalized Travel in Northern Pakistan",
  description:
    "Lashkar Tours helps international travelers discover Pakistan through personalized trip planning — from Hunza and Skardu to Fairy Meadows and the green valleys of the north.",
  alternates: { canonical: "/about" },
  openGraph: { images: [ogImage(photos.altitFort.src)] },
};

const philosophy = [
  { icon: Compass, title: "Travel with curiosity", text: "The best journeys leave room for unplanned conversations, village walks and a second cup of tea." },
  { icon: MapIcon, title: "Plan around people", text: "Your pace, interests and budget shape the route — not the other way round." },
  { icon: MessagesSquare, title: "Be clear and honest", text: "Realistic advice about seasons, distances and conditions, so expectations match the experience." },
];

const services = [
  { icon: MapIcon, title: "Custom itinerary planning", text: "Routes built around your dates, interests and travel style, from short escapes to grand journeys." },
  { icon: Globe2, title: "Support for international visitors", text: "Clear English-language communication while you plan your trip to Pakistan." },
  { icon: Mountain, title: "Destination discovery", text: "Help choosing between regions and seasons — Hunza, Skardu, Fairy Meadows and beyond." },
  { icon: Users, title: "Trips for every group", text: "Couples, families, friends and solo travelers — share who is traveling and plans can reflect it." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        photo={photos.altitFort}
        eyebrow="About us"
        title="Opening Doors to Northern Pakistan."
        description="Lashkar Tours helps travelers from around the world discover the mountains, valleys and communities of Pakistan."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Who we are" title="A Pakistan Specialist for International Travelers." />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-grey-ink">
              <p>
                Lashkar Tours is a Pakistan-based tour operator focused on one thing: helping international visitors experience the extraordinary
                north of the country.
              </p>
              <p>
                Many travelers are surprised by Pakistan — by the scale of its mountains, the color of its lakes and the warmth of its welcome.
                Our role is to make the journey easier to imagine, and easier to plan.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={photos.passuRiver.src} alt={photos.passuRiver.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="Our philosophy" title="How We Think About Travel." />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {philosophy.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-sage text-forest">
                  <Icon aria-hidden className="size-7" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 text-2xl text-forest">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-grey-ink">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-white sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="light"
              eyebrow="Focused on Pakistan"
              title="Why Northern Pakistan?"
              description="Few places on Earth combine so many great mountains, so much history and such genuine hospitality in one region."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {destinations.map((d) => (
                <li key={d.slug} className="rounded-full border border-white/25 px-4 py-2 text-sm">
                  {d.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:col-span-7">
            {services.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06} className="bg-forest">
                <div className="h-full p-8">
                  <Icon aria-hidden className="size-7 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-6 text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-last aspect-[4/3] overflow-hidden rounded-sm lg:order-first">
            <Image src={photos.arangKel.src} alt={photos.arangKel.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Local experiences" title="More Than Viewpoints." />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-grey-ink">
              <p>
                A journey through northern Pakistan is as much about people as places — walking through village orchards, sharing apricots and
                tea, or hearing the history of a fort from the communities who live beneath it.
              </p>
              <p>Tell us what kind of experiences matter to you, and they can become part of your plan.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {team.length > 0 && (
        <section className="bg-white py-20 sm:py-28">
          <div className="container-site">
            <SectionHeading eyebrow="Our team" title="The People Behind Your Journey." />
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="rounded-sm bg-ivory p-6">
                  {m.photo && (
                    <div className="relative mb-5 aspect-square overflow-hidden rounded-sm">
                      <Image src={m.photo} alt={m.name} fill sizes="33vw" className="object-cover" />
                    </div>
                  )}
                  <h3 className="text-2xl text-forest">{m.name}</h3>
                  <p className="text-sm font-semibold text-gold-dark">{m.role}</p>
                  <p className="mt-3 leading-relaxed text-grey-ink">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <PlanTripCTA title="Start Your Pakistan Story." photo={photos.hunzaAerial} />
    </>
  );
}
