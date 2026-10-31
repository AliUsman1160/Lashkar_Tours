"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import { photos } from "@/data/photos";
import { destinationOptions, months } from "@/data/form-options";
import { buttonClasses } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

const heroPhoto = photos.passuConesRoad;
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [travelers, setTravelers] = useState("2");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (month) params.set("month", month);
    if (travelers) params.set("travelers", travelers);
    const query = params.toString();
    router.push(`/plan-your-trip${query ? `?${query}` : ""}`);
  };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal text-white" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 motion-safe:animate-[heroZoom_24s_ease-out_forwards]">
        <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="100vw" className="object-cover object-[50%_60%]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/50" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />

      <div className="container-site pb-10 pt-36 sm:pb-14 lg:pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow mb-6 flex items-center gap-3 text-gold"
          >
            <span aria-hidden className="h-px w-10 bg-gold" />
            Discover Pakistan with local experts
          </motion.p>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            Pakistan Is More <em className="font-light text-gold">Beautiful</em> Than You Imagine.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            From the majestic peaks of the Karakoram to the peaceful valleys of Hunza, discover Pakistan through thoughtfully planned journeys,
            unforgettable landscapes, and authentic local experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/destinations" className={buttonClasses("gold", "lg")}>
              Explore Destinations <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href="/plan-your-trip" className={buttonClasses("outline-light", "lg")}>
              Plan Your Trip
            </Link>
          </motion.div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          aria-label="Start planning your trip"
          className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/15 shadow-2xl ring-1 ring-white/15 backdrop-blur-md sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1.4fr_1fr_1fr_auto]"
        >
          <HeroField icon={<MapPin className="size-4" />} label="Destination" htmlFor="hero-destination">
            <select id="hero-destination" value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass}>
              <option value="">Anywhere in the north</option>
              {destinationOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </HeroField>
          <HeroField icon={<CalendarDays className="size-4" />} label="Travel month" htmlFor="hero-month">
            <select id="hero-month" value={month} onChange={(e) => setMonth(e.target.value)} className={selectClass}>
              <option value="">I&apos;m flexible</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </HeroField>
          <HeroField icon={<Users className="size-4" />} label="Travelers" htmlFor="hero-travelers">
            <select id="hero-travelers" value={travelers} onChange={(e) => setTravelers(e.target.value)} className={selectClass}>
              {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
                <option key={n} value={n}>
                  {n} {n === "1" ? "traveler" : "travelers"}
                </option>
              ))}
              <option value="13+">13+ travelers</option>
            </select>
          </HeroField>
          <button type="submit" className={buttonClasses("gold", "lg", "h-full min-h-16 rounded-none sm:col-span-2 lg:col-span-1")}>
            Plan Your Trip <ArrowRight aria-hidden className="size-4" />
          </button>
        </motion.form>
      </div>

      <PhotoCredit photo={heroPhoto} className="absolute right-4 top-24 hidden [writing-mode:vertical-rl] lg:block" />
    </section>
  );
}

const selectClass =
  "w-full cursor-pointer appearance-none bg-transparent text-base font-semibold text-white outline-none [&>option]:text-charcoal";

function HeroField({ icon, label, htmlFor, children }: { icon: React.ReactNode; label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="bg-charcoal/55 px-5 py-3.5 transition-colors focus-within:bg-charcoal/75 hover:bg-charcoal/65">
      <label htmlFor={htmlFor} className="mb-1 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">
        <span aria-hidden>{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
