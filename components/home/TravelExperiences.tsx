import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/experiences";
import { photos } from "@/data/photos";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// Editorial rhythm for the eight tiles on large screens.
const layout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function TravelExperiences() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-site">
        <SectionHeading
          eyebrow="A taste of Pakistan"
          title="One Journey, Many Worlds."
          description="Northern Pakistan rewards curiosity. In a single trip you can move from glaciers to orchards, from ancient forts to lively bazaars."
        />
        <div className="mt-14 grid auto-rows-[19rem] gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[17rem]">
          {experiences.map((exp, i) => {
            const photo = photos[exp.photo];
            return (
              <Reveal key={exp.title} delay={(i % 3) * 0.06} className={cn("h-full", layout[i])}>
                <Link href={exp.href} className="group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-sm bg-charcoal p-6 text-white sm:p-7">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"}
                    className="-z-10 object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                  <h3 className={cn("leading-tight", i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")}>{exp.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-32 lg:group-focus-visible:opacity-100">
                    {exp.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
