import Image from "next/image";
import { Compass, Globe2, Headset, PenTool } from "lucide-react";
import { photos } from "@/data/photos";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  { icon: Compass, title: "Local Knowledge", text: "Explore destinations with guidance informed by local knowledge and regional context." },
  { icon: PenTool, title: "Tailor-Made Journeys", text: "Discuss a travel plan that fits your interests, schedule, group, and budget." },
  { icon: Globe2, title: "International Traveler Support", text: "Clear English-language travel information for visitors planning a trip to Pakistan." },
  {
    icon: Headset,
    title: "Personal Travel Assistance",
    text: "Easily discuss itinerary options, transportation, accommodation preferences, and special requirements.",
  },
];

export function WhyChooseUs() {
  const photo = photos.skarduSunset;
  return (
    <section className="relative overflow-hidden bg-forest py-20 text-white sm:py-28 lg:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading tone="light" eyebrow="Why travel with Lashkar Tours?" title="Your Journey, Thoughtfully Planned." />
          <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
            <Image src={photo.src} alt={photo.alt} fill sizes="40vw" className="object-cover" />
          </div>
        </div>
        <div className="grid gap-px self-center overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:col-span-7">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08} className="bg-forest">
              <div className="h-full p-8 transition-colors duration-500 hover:bg-forest-deep sm:p-10">
                <Icon aria-hidden className="size-8 text-gold" strokeWidth={1.4} />
                <h3 className="mt-8 text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
