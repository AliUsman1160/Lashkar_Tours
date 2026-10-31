import type { PhotoKey } from "./photos";

/** "A Taste of Pakistan" — the range of experiences a northern journey can include. */
export const experiences: { title: string; description: string; photo: PhotoKey; href: string }[] = [
  {
    title: "Mountain landscapes",
    description: "The Karakoram, Himalaya and Hindu Kush meet in northern Pakistan — home to five of the world's fourteen 8,000-meter peaks.",
    photo: "hunzaPeak",
    href: "/destinations/hunza",
  },
  {
    title: "Alpine lakes",
    description: "From turquoise Attabad to Saiful Muluk and the still waters of Kachura, lakes reflect the peaks around them.",
    photo: "attabadBoats",
    href: "/destinations/skardu",
  },
  {
    title: "Traditional villages",
    description: "Wooden houses, terraced fields and orchards fed by centuries-old irrigation channels.",
    photo: "arangKel",
    href: "/destinations/neelum-valley",
  },
  {
    title: "Historic forts",
    description: "Baltit, Altit, Shigar and Khaplu tell the story of the mountain kingdoms that once ruled these valleys.",
    photo: "altitFort",
    href: "/destinations/hunza",
  },
  {
    title: "Scenic road trips",
    description: "The Karakoram Highway and Babusar Pass are journeys in their own right.",
    photo: "babusarRoad",
    href: "/destinations/naran-kaghan",
  },
  {
    title: "Local food & culture",
    description: "Riverside bazaars, apricots straight from the tree, and the warm hospitality of mountain towns.",
    photo: "kalamTown",
    href: "/destinations/swat-kalam",
  },
  {
    title: "Hiking & trekking",
    description: "Forest trails to Fairy Meadows, meadow walks above Shogran and routes towards the great base camps.",
    photo: "nangaParbatForest",
    href: "/destinations/fairy-meadows",
  },
  {
    title: "Photography",
    description: "Golden-hour peaks, starry skies and blossom or autumn color, depending on when you visit.",
    photo: "karimabadNight",
    href: "/gallery",
  },
];
