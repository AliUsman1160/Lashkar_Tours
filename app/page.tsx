import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Introduction } from "@/components/home/Introduction";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { FeaturedTours } from "@/components/home/FeaturedTours";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TravelExperiences } from "@/components/home/TravelExperiences";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { PlanTripCTA } from "@/components/home/PlanTripCTA";

export const metadata: Metadata = {
  title: { absolute: "Lashkar Tours | Discover Hunza, Skardu & Northern Pakistan" },
  description:
    "Explore Pakistan with Lashkar Tours. Discover Hunza, Skardu, Fairy Meadows, and northern Pakistan through customized journeys and personalized trip planning.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Introduction />
      <FeaturedDestinations />
      <FeaturedTours />
      <WhyChooseUs />
      <TravelExperiences />
      <HowItWorks />
      <Testimonials />
      <GalleryPreview />
      <PlanTripCTA />
    </>
  );
}
