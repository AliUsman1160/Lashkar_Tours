import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { photos } from "@/data/photos";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const photo = photos.deosaiRoad;
  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-charcoal text-white">
      <Image src={photo.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal/70" />
      <div className="container-site pt-24 text-center">
        <p className="eyebrow text-gold">Page not found</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight sm:text-6xl">This Road Doesn&apos;t Lead Anywhere — Yet.</h1>
        <p className="mx-auto mt-5 max-w-xl text-white/80">The page you&apos;re looking for may have moved. Let&apos;s get you back on route.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <ButtonLink href="/destinations" variant="outline-light" size="lg">
            Explore destinations
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
