import { photos, type PhotoKey } from "./photos";

export const galleryCategories = [
  "Hunza",
  "Skardu",
  "Lakes and Valleys",
  "Mountains",
  "Culture and Heritage",
  "Adventure",
  "Road Trips",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  photo: PhotoKey;
  destination?: string; // destination slug
  categories: GalleryCategory[];
  /** Layout hint for the masonry grid. */
  shape?: "tall" | "wide";
};

export const gallery: GalleryItem[] = [
  { photo: "attabadLake", destination: "hunza", categories: ["Hunza", "Lakes and Valleys"], shape: "wide" },
  { photo: "altitFort", destination: "hunza", categories: ["Hunza", "Culture and Heritage"], shape: "tall" },
  { photo: "shangrila", destination: "skardu", categories: ["Skardu", "Lakes and Valleys", "Culture and Heritage"] },
  { photo: "nangaParbatForest", destination: "fairy-meadows", categories: ["Mountains", "Adventure"], shape: "tall" },
  { photo: "passuConesRoad", destination: "hunza", categories: ["Hunza", "Road Trips", "Mountains"] },
  { photo: "deosaiTrack", destination: "skardu", categories: ["Skardu", "Adventure", "Road Trips"], shape: "wide" },
  { photo: "hunzaHouse", destination: "hunza", categories: ["Hunza", "Culture and Heritage"] },
  { photo: "saifulMuluk", destination: "naran-kaghan", categories: ["Lakes and Valleys", "Mountains"] },
  { photo: "karimabadNight", destination: "hunza", categories: ["Hunza", "Mountains"], shape: "tall" },
  { photo: "skarduSunset", destination: "skardu", categories: ["Skardu", "Mountains"] },
  { photo: "arangKel", destination: "neelum-valley", categories: ["Lakes and Valleys", "Culture and Heritage"], shape: "wide" },
  { photo: "nangaParbatClouds", destination: "fairy-meadows", categories: ["Mountains"] },
  { photo: "babusarRoad", destination: "naran-kaghan", categories: ["Road Trips", "Adventure"] },
  { photo: "attabadBoats", destination: "hunza", categories: ["Hunza", "Lakes and Valleys", "Adventure"], shape: "tall" },
  { photo: "khaplu", destination: "skardu", categories: ["Skardu", "Mountains", "Culture and Heritage"] },
  { photo: "mahodandLake", destination: "swat-kalam", categories: ["Lakes and Valleys"] },
  { photo: "sheosarLake", destination: "skardu", categories: ["Skardu", "Lakes and Valleys", "Adventure"], shape: "wide" },
  { photo: "kalamTown", destination: "swat-kalam", categories: ["Lakes and Valleys", "Road Trips"] },
  { photo: "hunzaSunset", destination: "hunza", categories: ["Hunza", "Mountains"] },
  { photo: "rattiGali", destination: "neelum-valley", categories: ["Lakes and Valleys", "Adventure"], shape: "tall" },
  { photo: "deosaiRoad", destination: "skardu", categories: ["Skardu", "Road Trips"] },
  { photo: "passuRiver", destination: "hunza", categories: ["Hunza", "Lakes and Valleys"] },
  { photo: "siriPaye", destination: "naran-kaghan", categories: ["Lakes and Valleys", "Adventure"] },
  { photo: "nangaParbatNight", destination: "fairy-meadows", categories: ["Mountains", "Adventure"], shape: "wide" },
  { photo: "dhanniWaterfall", destination: "neelum-valley", categories: ["Lakes and Valleys", "Road Trips"] },
  { photo: "kumratForest", destination: "swat-kalam", categories: ["Lakes and Valleys", "Adventure"] },
  { photo: "ansooLake", destination: "naran-kaghan", categories: ["Mountains", "Adventure"] },
  { photo: "hunzaPeak", destination: "hunza", categories: ["Hunza", "Mountains"] },
  { photo: "skarduLake", destination: "skardu", categories: ["Skardu", "Lakes and Valleys"] },
  { photo: "hunzaAerial", destination: "hunza", categories: ["Hunza", "Lakes and Valleys", "Road Trips"], shape: "wide" },
];

/** Resolve gallery entries to full photo records for client components. */
export function resolveGallery(items: GalleryItem[]) {
  return items.map((item) => ({ ...item, ...photos[item.photo], key: item.photo }));
}

export type ResolvedGalleryItem = ReturnType<typeof resolveGallery>[number];
