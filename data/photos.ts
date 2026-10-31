/**
 * Photo library.
 *
 * All images are by independent photographers, used under the Unsplash License
 * (https://unsplash.com/license), and stored locally in /public/images. They show destinations —
 * not Lashkar Tours trips or customers. To use company photography, replace the file or point `src` at a new one.
 */

export type Photo = {
  src: string;
  alt: string;
  location: string;
  credit: { name: string; url: string };
};

const page = (shortId: string) => `https://unsplash.com/photos/${shortId}`;

export const photos = {
  passuConesRoad: {
    src: "/images/passuConesRoad.jpg",
    alt: "The Karakoram Highway running straight towards the jagged Passu Cones in Upper Hunza",
    location: "Passu Cones, Hunza",
    credit: { name: "Jessica Anderson", url: page("K5VKk53u7ko") },
  },
  hunzaAerial: {
    src: "/images/hunzaAerial.jpg",
    alt: "Aerial view of the Hunza River winding through a wide valley ringed by Karakoram peaks",
    location: "Hunza Valley",
    credit: { name: "Mehtab Farooq", url: page("8qCtP97jgoE") },
  },
  passuRiver: {
    src: "/images/passuRiver.jpg",
    alt: "A braided river crossing a rocky valley floor near Passu village",
    location: "Passu, Upper Hunza",
    credit: { name: "Qasim Nagori", url: page("AjFiqo-PsfE") },
  },
  hunzaSunset: {
    src: "/images/hunzaSunset.jpg",
    alt: "Last light on a mountain range above Hunza Valley at sunset",
    location: "Hunza Valley",
    credit: { name: "Ahmed Malik", url: page("i3pI9pQKo7Q") },
  },
  hunzaPeak: {
    src: "/images/hunzaPeak.jpg",
    alt: "A snow-covered Karakoram peak under drifting cloud above Hunza",
    location: "Hunza Valley",
    credit: { name: "Umar Farooq", url: page("PitvmalIFOc") },
  },
  hunzaHouse: {
    src: "/images/hunzaHouse.jpg",
    alt: "A traditional house on a terraced hillside surrounded by trees in Hunza",
    location: "Hunza Valley",
    credit: { name: "Umar Farooq", url: page("eF_nv-g0s9k") },
  },
  attabadBoats: {
    src: "/images/attabadBoats.jpg",
    alt: "Aerial view of small boats on the turquoise water of Attabad Lake",
    location: "Attabad Lake, Hunza",
    credit: { name: "Faisal Latif", url: page("rPHrx8JAULc") },
  },
  attabadLake: {
    src: "/images/attabadLake.jpg",
    alt: "Brown rocky mountains rising above the vivid blue water of Attabad Lake",
    location: "Attabad Lake, Hunza",
    credit: { name: "Ijaz Rafi", url: page("X8KiHDdfkQo") },
  },
  altitFort: {
    src: "/images/altitFort.jpg",
    alt: "Altit Fort perched above the village of Altit in autumn colors",
    location: "Altit Fort, Hunza",
    credit: { name: "Hussain Ali", url: page("6aIwiaruSY0") },
  },
  karimabadNight: {
    src: "/images/karimabadNight.jpg",
    alt: "A snow-capped mountain beneath a star-filled night sky above Karimabad",
    location: "Karimabad, Hunza",
    credit: { name: "Usman Omar", url: page("-_LwKcBwB-U") },
  },
  shangrila: {
    src: "/images/shangrila.jpg",
    alt: "A red pagoda-style building beside the lake at Shangrila, Lower Kachura",
    location: "Shangrila, Skardu",
    credit: { name: "Waqas Akhtar", url: page("_a4cjhECb-A") },
  },
  skarduSunset: {
    src: "/images/skarduSunset.jpg",
    alt: "Bird's-eye view of mountain ridges around Skardu glowing at sunset",
    location: "Skardu",
    credit: { name: "Rizwan Saeed", url: page("00R3NNegG8w") },
  },
  skarduLake: {
    src: "/images/skarduLake.jpg",
    alt: "A calm mountain lake reflecting the surrounding peaks near Skardu",
    location: "Skardu",
    credit: { name: "Muhammad Adil Shahzad", url: page("CkxyaGU7iJE") },
  },
  khaplu: {
    src: "/images/khaplu.jpg",
    alt: "Dark, steep mountains rising above the green valley at Khaplu",
    location: "Khaplu, Ghanche",
    credit: { name: "Rizwan Saeed", url: page("E2jsEq5urM4") },
  },
  deosaiTrack: {
    src: "/images/deosaiTrack.jpg",
    alt: "A truck crossing the green high-altitude grasslands of Deosai on a dirt track",
    location: "Deosai National Park",
    credit: { name: "Syed Bilal Javaid", url: page("GJXUH8oaGKU") },
  },
  deosaiRoad: {
    src: "/images/deosaiRoad.jpg",
    alt: "A white car on the gravel road across the open Deosai plateau",
    location: "Deosai National Park",
    credit: { name: "Umar Farooq", url: page("d7ZSwzISVm0") },
  },
  sheosarLake: {
    src: "/images/sheosarLake.jpg",
    alt: "Sheosar Lake surrounded by rolling mountains on the Deosai plateau",
    location: "Sheosar Lake, Deosai",
    credit: { name: "Najmul Hasan", url: page("v3bYNfmlVDc") },
  },
  nangaParbatForest: {
    src: "/images/nangaParbatForest.jpg",
    alt: "Pine forest in the foreground with the snow-covered flank of Nanga Parbat behind",
    location: "Nanga Parbat",
    credit: { name: "Muhammad Affan", url: page("919tj6EvpLE") },
  },
  nangaParbatNight: {
    src: "/images/nangaParbatNight.jpg",
    alt: "Nanga Parbat lit by moonlight under a clear night sky",
    location: "Nanga Parbat",
    credit: { name: "Haseeb Jamil", url: page("3s85IxVDyXE") },
  },
  nangaParbatClouds: {
    src: "/images/nangaParbatClouds.jpg",
    alt: "Clouds wrapping the snow-covered summit of Nanga Parbat",
    location: "Nanga Parbat",
    credit: { name: "Shahzad Riaz", url: page("tvEQJPcYLOE") },
  },
  saifulMuluk: {
    src: "/images/saifulMuluk.jpg",
    alt: "Lake Saiful Muluk with snow-streaked mountains rising behind the shore",
    location: "Lake Saiful Muluk, Naran",
    credit: { name: "Kamran Ch", url: page("hU18vj9N7Es") },
  },
  ansooLake: {
    src: "/images/ansooLake.jpg",
    alt: "High mountain landscape around Ansoo Lake in the Kaghan Valley",
    location: "Ansoo Lake, Kaghan Valley",
    credit: { name: "Muhammad Talha", url: page("xMLZ7yADkhs") },
  },
  siriPaye: {
    src: "/images/siriPaye.jpg",
    alt: "Green alpine meadows at Siri Paye above Shogran",
    location: "Siri Paye, Shogran",
    credit: { name: "Yahya Ehsan", url: page("NP5t2_5am1o") },
  },
  babusarRoad: {
    src: "/images/babusarRoad.jpg",
    alt: "A winding mountain road descending from Babusar Pass",
    location: "Babusar Pass",
    credit: { name: "Shiza Nazir", url: page("kolBHlxEqQQ") },
  },
  mahodandLake: {
    src: "/images/mahodandLake.jpg",
    alt: "Pine trees beside Mahodand Lake in the upper Ushu Valley under a blue sky",
    location: "Mahodand Lake, Kalam",
    credit: { name: "Asad", url: page("ZTQisU9iwZA") },
  },
  kalamTown: {
    src: "/images/kalamTown.jpg",
    alt: "The Swat River flowing through Kalam town surrounded by forested mountains",
    location: "Kalam, Swat",
    credit: { name: "Jalal Ajmal", url: page("q6SEOGPepak") },
  },
  kumratForest: {
    src: "/images/kumratForest.jpg",
    alt: "Dense conifer forest in Kumrat Valley, reachable from the Kalam side",
    location: "Kumrat Valley",
    credit: { name: "Graphic House", url: page("xJfsecMP39M") },
  },
  rattiGali: {
    src: "/images/rattiGali.jpg",
    alt: "Ratti Gali Lake in a high green basin above the Neelum Valley",
    location: "Ratti Gali Lake, Neelum Valley",
    credit: { name: "Rizwan Saeed", url: page("C_TU7454nP8") },
  },
  arangKel: {
    src: "/images/arangKel.jpg",
    alt: "The hilltop village of Arang Kel spread across a green slope in the Neelum Valley",
    location: "Arang Kel, Neelum Valley",
    credit: { name: "Abdullah Kashif", url: page("vh0m-hAuNt4") },
  },
  dhanniWaterfall: {
    src: "/images/dhanniWaterfall.jpg",
    alt: "Dhanni Waterfall tumbling over rocks beside the Neelum Valley road",
    location: "Dhanni Waterfall, Neelum Valley",
    credit: { name: "Abdullah Kashif", url: page("-H6MZw_ekh4") },
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
