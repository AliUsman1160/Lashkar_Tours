import type { PhotoKey } from "./photos";

/**
 * Example tour concepts. These are editable starting points for conversation,
 * NOT confirmed packages. Leave `price`, `inclusions` and `exclusions` empty
 * until Lashkar Tours has confirmed them — the UI handles empty values honestly.
 */

export const tourTypes = {
  private: "Private Tours",
  family: "Family Tours",
  honeymoon: "Honeymoon Trips",
  adventure: "Adventure & Trekking",
  cultural: "Cultural Experiences",
  custom: "Customized Tours",
} as const;

export type TourType = keyof typeof tourTypes;

export type ItineraryDay = {
  /** Day number, or a free label such as "Option A" for modular itineraries. */
  label: string;
  title: string;
  location: string;
  activities: string[];
  /** Only fill in once verified. */
  accommodation?: string;
  note?: string;
};

export type Tour = {
  slug: string;
  title: string;
  destinations: string[]; // destination slugs
  summary: string;
  overview: string[];
  coverImage: PhotoKey;
  /** Length of the sample itinerary in days. Undefined = flexible. */
  durationDays?: number;
  types: TourType[];
  style: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  /** Confirmed inclusions only. */
  inclusions: string[];
  /** Confirmed exclusions only. */
  exclusions: string[];
  /** Verified starting price, e.g. { amount: 1200, currency: "USD", basis: "per person" }. */
  price?: { amount: number; currency: string; basis: string };
  travelNotes: string[];
  relatedTours: string[];
  featured: boolean;
};

const WEATHER_NOTE =
  "Mountain flights and roads are weather-dependent. A flexible day is strongly recommended.";

export const tours: Tour[] = [
  {
    slug: "hunza-valley-explorer",
    title: "Hunza Valley Explorer",
    destinations: ["hunza"],
    summary:
      "Forts, orchards, turquoise lakes and the Karakoram Highway — a classic first journey into Hunza.",
    overview: [
      "This journey follows the Karakoram Highway into the heart of Hunza, balancing well-known sights with time to wander the villages. Expect dramatic drives, mountain viewpoints and a mix of history and nature.",
      "Think of the outline below as a starting point. Lashkar Tours can adjust pace, length and stops to match your interests and travel dates.",
    ],
    coverImage: "attabadLake",
    durationDays: 8,
    types: ["private", "cultural", "family"],
    style: "Private journey",
    highlights: ["Karakoram Highway", "Baltit & Altit forts", "Eagle's Nest viewpoint", "Attabad Lake", "Passu Cones", "Hussaini Suspension Bridge"],
    itinerary: [
      { label: "1", title: "Arrive in Islamabad", location: "Islamabad", activities: ["Arrival and time to rest", "Optional evening at the Margalla Hills viewpoints"] },
      { label: "2", title: "Journey north", location: "Islamabad → Chilas or Gilgit", activities: ["Travel north by road, or fly to Gilgit if preferred and weather allows"], note: "The route used depends on the season and flight schedules." },
      { label: "3", title: "Into Hunza", location: "→ Karimabad", activities: ["Rakaposhi viewpoint", "Arrive in Karimabad in time for the evening light"] },
      { label: "4", title: "Karimabad and the forts", location: "Karimabad", activities: ["Baltit Fort", "Altit Fort and village walk", "Sunset at Eagle's Nest"] },
      { label: "5", title: "Upper Hunza", location: "Gojal", activities: ["Attabad Lake", "Passu Cones viewpoint", "Hussaini Suspension Bridge"] },
      { label: "6", title: "Khunjerab Pass or a free day", location: "Upper Hunza", activities: ["Optional trip to Khunjerab Pass when open", "Or a slower day of walks in the valley"], note: "Khunjerab opening dates and entry rules vary — confirm in advance." },
      { label: "7", title: "Return south", location: "Hunza → Chilas or Gilgit", activities: ["Begin the journey back along the Karakoram Highway"] },
      { label: "8", title: "Back to Islamabad", location: "Islamabad", activities: ["Return to Islamabad for onward travel"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      WEATHER_NOTE,
      "Spring blossom (around April) and autumn color (around late October) are popular — mention if you'd like to travel then.",
      "Entry requirements and any permits for foreign visitors should be confirmed before travel.",
    ],
    relatedTours: ["hunza-skardu-grand-journey", "skardu-shangrila-adventure", "fairy-meadows-nature-escape"],
    featured: true,
  },
  {
    slug: "skardu-shangrila-adventure",
    title: "Skardu & Shangrila Adventure",
    destinations: ["skardu"],
    summary:
      "Alpine lakes, royal forts, cold deserts and — in summer — the high plateau of Deosai.",
    overview: [
      "Skardu is a landscape of contrasts: still lakes and sand dunes, green oases and bare mountains. This outline explores the best of the region, with an optional day on the Deosai plateau in summer.",
      "Flights to Skardu are weather-dependent, so this plan is best treated as flexible. The order of days can be changed to fit conditions.",
    ],
    coverImage: "shangrila",
    durationDays: 7,
    types: ["adventure", "private", "honeymoon"],
    style: "Lakes & landscapes",
    highlights: ["Shangrila Lake", "Upper Kachura Lake", "Shigar Fort", "Sarfaranga cold desert", "Deosai National Park", "Khaplu"],
    itinerary: [
      { label: "1", title: "Arrive in Islamabad", location: "Islamabad", activities: ["Arrival and rest"] },
      { label: "2", title: "Fly to Skardu", location: "Islamabad → Skardu", activities: ["Mountain flight to Skardu, weather permitting", "Gentle afternoon to acclimatize"], note: "If flights are cancelled, alternatives can be discussed with Lashkar Tours." },
      { label: "3", title: "The Kachura lakes", location: "Skardu", activities: ["Shangrila (Lower Kachura)", "Upper Kachura Lake walk"] },
      { label: "4", title: "Shigar and the cold desert", location: "Shigar", activities: ["Shigar Fort and village", "Sarfaranga cold desert at golden hour"] },
      { label: "5", title: "Deosai plateau", location: "Deosai National Park", activities: ["Full-day jeep excursion across the plateau", "Sheosar Lake"], note: "Seasonal — generally only possible in summer." },
      { label: "6", title: "Khaplu", location: "Ghanche", activities: ["Khaplu Fort and village", "Drive along the Shyok River"] },
      { label: "7", title: "Return to Islamabad", location: "Skardu → Islamabad", activities: ["Flight back, weather permitting"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      WEATHER_NOTE,
      "Deosai lies at high altitude. Let Lashkar Tours know about any health considerations.",
    ],
    relatedTours: ["hunza-skardu-grand-journey", "hunza-valley-explorer", "customized-pakistan-discovery"],
    featured: true,
  },
  {
    slug: "hunza-skardu-grand-journey",
    title: "Hunza and Skardu Grand Journey",
    destinations: ["hunza", "skardu", "fairy-meadows"],
    summary:
      "The great valleys of Gilgit-Baltistan in one unhurried journey, from Hunza's forts to Skardu's lakes.",
    overview: [
      "For travelers with more time, this journey links the two most celebrated regions of northern Pakistan. It moves from the orchards and forts of Hunza to the lakes and deserts of Skardu, with the option of a detour to Fairy Meadows.",
      "Longer trips like this benefit from careful planning around seasons, flights and road conditions. Use this outline to start the conversation.",
    ],
    coverImage: "passuConesRoad",
    durationDays: 12,
    types: ["private", "adventure", "cultural"],
    style: "Grand northern journey",
    highlights: ["Karimabad & the forts", "Attabad Lake & Passu", "Gilgit to Skardu road", "Shangrila & Kachura", "Shigar Fort", "Optional Fairy Meadows"],
    itinerary: [
      { label: "1", title: "Arrive in Islamabad", location: "Islamabad", activities: ["Arrival and rest"] },
      { label: "2", title: "Head north", location: "→ Gilgit or Chilas", activities: ["Fly to Gilgit (weather permitting) or travel north by road"] },
      { label: "3", title: "Into Hunza", location: "→ Karimabad", activities: ["Rakaposhi viewpoint", "Evening in Karimabad"] },
      { label: "4", title: "Forts and villages", location: "Karimabad", activities: ["Baltit and Altit forts", "Eagle's Nest at sunset"] },
      { label: "5", title: "Upper Hunza", location: "Gojal", activities: ["Attabad Lake", "Passu Cones", "Hussaini Suspension Bridge"] },
      { label: "6", title: "Flexible day", location: "Hunza", activities: ["Khunjerab Pass (seasonal) or a relaxed day"] },
      { label: "7", title: "Hunza to Skardu", location: "→ Skardu", activities: ["A long scenic drive along the Indus River"] },
      { label: "8", title: "The Kachura lakes", location: "Skardu", activities: ["Shangrila and Upper Kachura"] },
      { label: "9", title: "Shigar", location: "Shigar", activities: ["Shigar Fort", "Sarfaranga cold desert"] },
      { label: "10", title: "Deosai or Khaplu", location: "Skardu region", activities: ["Deosai in summer, or Khaplu Fort"] },
      { label: "11", title: "Spare day", location: "Skardu", activities: ["Held in reserve for weather — or used to rest and explore"] },
      { label: "12", title: "Return to Islamabad", location: "Skardu → Islamabad", activities: ["Flight back, weather permitting"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      WEATHER_NOTE,
      "Fairy Meadows can be added for travelers comfortable with a jeep track and a forest walk — this adds roughly two to three days.",
    ],
    relatedTours: ["hunza-valley-explorer", "skardu-shangrila-adventure", "fairy-meadows-nature-escape"],
    featured: true,
  },
  {
    slug: "fairy-meadows-nature-escape",
    title: "Fairy Meadows Nature Escape",
    destinations: ["fairy-meadows"],
    summary:
      "A jeep track, a forest trail and a meadow facing Nanga Parbat — a short adventure with a big view.",
    overview: [
      "This journey is built around two nights close to Nanga Parbat, the ninth-highest mountain in the world. The reward for the jeep track and the walk is a meadow with one of the great mountain views of the Himalaya.",
      "Fairy Meadows is best for travelers who are comfortable with simple accommodation and some walking. Discuss your fitness and expectations when planning.",
    ],
    coverImage: "nangaParbatClouds",
    durationDays: 6,
    types: ["adventure", "private"],
    style: "Nature & trekking",
    highlights: ["Karakoram Highway", "Raikot Bridge jeep track", "Forest walk from Tato", "Nanga Parbat sunrise", "Optional walk to Beyal Camp"],
    itinerary: [
      { label: "1", title: "Arrive in Islamabad", location: "Islamabad", activities: ["Arrival and preparation"] },
      { label: "2", title: "North to Chilas", location: "→ Chilas", activities: ["Travel north by road (via Babusar Pass when open)"] },
      { label: "3", title: "Up to the meadows", location: "Raikot Bridge → Tato → Fairy Meadows", activities: ["Jeep transfer to Tato", "Forest walk to Fairy Meadows"] },
      { label: "4", title: "Beyal Camp (optional)", location: "Fairy Meadows", activities: ["Walk towards Beyal Camp and the glacier viewpoint", "Or a quiet day in the meadow"] },
      { label: "5", title: "Descent", location: "→ Chilas", activities: ["Sunrise on Nanga Parbat", "Walk down and return to the highway"] },
      { label: "6", title: "Return to Islamabad", location: "Islamabad", activities: ["Drive back to Islamabad"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      "Accommodation at the meadows is basic. Ask about current options.",
      "A summer journey — trails and accommodation are often closed outside the warmer months.",
      WEATHER_NOTE,
    ],
    relatedTours: ["hunza-skardu-grand-journey", "hunza-valley-explorer"],
    featured: true,
  },
  {
    slug: "northern-pakistan-family-tour",
    title: "Northern Pakistan Family Tour",
    destinations: ["naran-kaghan"],
    summary:
      "Meadows, lakes and mountain air with shorter drives — an easy introduction to the mountains for families.",
    overview: [
      "The Kaghan Valley is one of the most accessible mountain regions from Islamabad, which makes it a natural choice for families. This outline keeps drives manageable and leaves room for play, picnics and short walks.",
      "Share the ages and interests of everyone traveling, and the plan can be adjusted to suit your family.",
    ],
    coverImage: "siriPaye",
    durationDays: 5,
    types: ["family", "private"],
    style: "Family-friendly",
    highlights: ["Shogran & Siri Paye meadows", "Kunhar River", "Lake Saiful Muluk", "Lulusar Lake", "Babusar Pass (seasonal)"],
    itinerary: [
      { label: "1", title: "Arrive in Islamabad", location: "Islamabad", activities: ["Arrival and rest"] },
      { label: "2", title: "To Shogran", location: "→ Shogran", activities: ["Drive into the Kaghan Valley", "Evening in the forested hills"] },
      { label: "3", title: "Meadows and river", location: "Siri Paye → Naran", activities: ["Jeep up to Siri Paye meadows", "Continue to Naran"] },
      { label: "4", title: "Lakes day", location: "Naran", activities: ["Lake Saiful Muluk", "Lulusar Lake or Babusar Pass, conditions permitting"] },
      { label: "5", title: "Return to Islamabad", location: "Islamabad", activities: ["Drive back with relaxed stops"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      "Upper-valley access depends on snow; early summer may limit some excursions.",
      "Domestic holiday periods can be busy — mid-week travel is often quieter.",
    ],
    relatedTours: ["swat-kalam-valleys-journey", "hunza-valley-explorer", "customized-pakistan-discovery"],
    featured: true,
  },
  {
    slug: "swat-kalam-valleys-journey",
    title: "Swat & Kalam Valleys Journey",
    destinations: ["swat-kalam"],
    summary:
      "Gandhara heritage, forested valleys and alpine lakes in the Swat Valley.",
    overview: [
      "Swat combines history and scenery in one valley: Buddhist sites and a fine museum in the lower valley, then forests, rivers and lakes as you climb towards Kalam.",
      "This outline can be extended or combined with other regions — ask Lashkar Tours what is realistic for your dates.",
    ],
    coverImage: "mahodandLake",
    durationDays: 5,
    types: ["cultural", "family", "private"],
    style: "Culture & valleys",
    highlights: ["Swat Museum", "Buddhist heritage sites", "Malam Jabba", "Kalam", "Ushu Forest", "Mahodand Lake"],
    itinerary: [
      { label: "1", title: "Islamabad to Swat", location: "→ Mingora", activities: ["Drive via the Swat Motorway", "Afternoon at a Buddhist heritage site"] },
      { label: "2", title: "Museum and Malam Jabba", location: "Swat", activities: ["Swat Museum", "Excursion to Malam Jabba"] },
      { label: "3", title: "Up to Kalam", location: "→ Kalam", activities: ["Stop at Bahrain", "Arrive in Kalam"] },
      { label: "4", title: "Ushu and Mahodand", location: "Kalam", activities: ["Ushu Forest walk", "Mahodand Lake (seasonal)"] },
      { label: "5", title: "Return to Islamabad", location: "Islamabad", activities: ["Drive back down the valley"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      "Mahodand Lake is generally reached in summer only.",
      "Please check current travel guidance for the region before you travel.",
    ],
    relatedTours: ["northern-pakistan-family-tour", "neelum-valley-riverside-retreat"],
    featured: false,
  },
  {
    slug: "neelum-valley-riverside-retreat",
    title: "Neelum Valley Riverside Retreat",
    destinations: ["neelum-valley"],
    summary:
      "Riverside villages, waterfalls and hilltop meadows in one of Pakistan's greenest valleys.",
    overview: [
      "A slower journey for travelers who want green landscapes and quiet villages. The Neelum River runs alongside you almost the entire way, and the pace leaves time to simply enjoy it.",
      "Because the valley borders the Line of Control, access for foreign nationals must be confirmed before any plans are made.",
    ],
    coverImage: "arangKel",
    durationDays: 5,
    types: ["honeymoon", "private"],
    style: "Slow travel",
    highlights: ["Neelum River", "Keran", "Sharda", "Arang Kel", "Dhanni Waterfall", "Optional Ratti Gali"],
    itinerary: [
      { label: "1", title: "Islamabad to the valley", location: "→ Muzaffarabad → Keran", activities: ["Drive via Muzaffarabad", "Dhanni Waterfall en route"] },
      { label: "2", title: "Sharda", location: "Sharda", activities: ["Riverside walks", "The ancient site at Sharda"] },
      { label: "3", title: "Arang Kel", location: "Kel → Arang Kel", activities: ["Cross to Arang Kel", "Meadow and village walks"] },
      { label: "4", title: "Free or Ratti Gali", location: "Upper Neelum", activities: ["A slow day by the river, or Ratti Gali in summer"] },
      { label: "5", title: "Return to Islamabad", location: "Islamabad", activities: ["Drive back to Islamabad"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      "Foreign nationals may need special permission (such as a No Objection Certificate) for parts of the valley. Confirm current rules before planning.",
      "Upper-valley roads can be rough and are affected by weather.",
    ],
    relatedTours: ["swat-kalam-valleys-journey", "northern-pakistan-family-tour"],
    featured: false,
  },
  {
    slug: "customized-pakistan-discovery",
    title: "Customized Pakistan Discovery Tour",
    destinations: ["hunza", "skardu", "fairy-meadows", "naran-kaghan", "swat-kalam", "neelum-valley"],
    summary:
      "Your route, your pace. Combine valleys, lakes and experiences into a journey designed around you.",
    overview: [
      "Not every traveler fits a fixed itinerary. This option starts with a conversation about what you want to see, how long you have, who you are traveling with and how you like to travel.",
      "Below are a few building blocks travelers often combine. Mix and match them, or tell Lashkar Tours about something completely different.",
    ],
    coverImage: "hunzaSunset",
    types: ["custom", "private", "family", "honeymoon", "adventure", "cultural"],
    style: "Tailor-made",
    highlights: ["Choose your destinations", "Set your own pace", "Mix nature, culture and adventure", "Plan around your dates"],
    itinerary: [
      { label: "Option A", title: "Hunza & Upper Hunza", location: "Gilgit-Baltistan", activities: ["Karimabad, forts and villages", "Attabad Lake and Passu"] },
      { label: "Option B", title: "Skardu & Baltistan", location: "Gilgit-Baltistan", activities: ["Lakes, Shigar and Khaplu", "Deosai in summer"] },
      { label: "Option C", title: "Fairy Meadows", location: "Diamer", activities: ["Nanga Parbat views", "Forest and meadow walks"] },
      { label: "Option D", title: "Kaghan, Swat or Neelum", location: "Khyber Pakhtunkhwa / Azad Kashmir", activities: ["Green valleys and lakes", "Shorter drives from Islamabad"] },
    ],
    inclusions: [],
    exclusions: [],
    travelNotes: [
      "Tell Lashkar Tours your dates, group size, interests and budget to start planning.",
      WEATHER_NOTE,
    ],
    relatedTours: ["hunza-skardu-grand-journey", "hunza-valley-explorer", "northern-pakistan-family-tour"],
    featured: true,
  },
];

export const durationFilters = [
  { id: "short", label: "Up to 6 days", test: (d?: number) => d !== undefined && d <= 6 },
  { id: "medium", label: "7–9 days", test: (d?: number) => d !== undefined && d >= 7 && d <= 9 },
  { id: "long", label: "10+ days", test: (d?: number) => d !== undefined && d >= 10 },
  { id: "flexible", label: "Flexible", test: (d?: number) => d === undefined },
] as const;

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function formatDuration(tour: Pick<Tour, "durationDays">) {
  return tour.durationDays ? `${tour.durationDays} days` : "Flexible length";
}
