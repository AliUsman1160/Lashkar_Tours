import type { PhotoKey } from "./photos";

export const destinationCategories = {
  "northern-pakistan": "Northern Pakistan",
  "lakes-valleys": "Lakes & Valleys",
  "mountains-trekking": "Mountains & Trekking",
  "culture-heritage": "Culture & Heritage",
  "family-friendly": "Family-Friendly Trips",
} as const;

export type DestinationCategory = keyof typeof destinationCategories;

export type Destination = {
  slug: string;
  name: string;
  /** Short label used in forms and WhatsApp messages. */
  shortName: string;
  region: string;
  tagline: string;
  shortDescription: string;
  intro: string[];
  heroImage: PhotoKey;
  cardImage: PhotoKey;
  gallery: PhotoKey[];
  categories: DestinationCategory[];
  /** Editorial suggestion only — leave undefined to hide. */
  suggestedDuration?: string;
  highlights: { name: string; description: string }[];
  experiences: { title: string; description: string }[];
  bestTime: {
    summary: string;
    seasons: { label: string; months: string; note: string }[];
  };
  gettingThere: string;
  sampleRoute: { title: string; detail: string }[];
  tips: string[];
  faqs: { question: string; answer: string }[];
  relatedTours: string[];
  whatsappMessage: string;
  seo: { title: string; description: string };
};

const CONFIRM_NOTE =
  "Seasons, road conditions and access change from year to year. Please confirm current conditions with Lashkar Tours before you travel.";

export const destinations: Destination[] = [
  {
    slug: "skardu",
    name: "Skardu",
    shortName: "Skardu",
    region: "Baltistan, Gilgit-Baltistan",
    tagline: "Alpine lakes, cold deserts and the gateway to the Karakoram giants.",
    shortDescription:
      "Discover dramatic mountain scenery, alpine lakes, cold deserts, and the gateway to some of the world's most spectacular peaks.",
    intro: [
      "Skardu sits in a broad valley where the Indus River slows and spreads between bare, sculpted mountains. It is the main town of Baltistan and the starting point for expeditions towards K2 and the Baltoro Glacier — but you do not need to be a mountaineer to feel the scale of this landscape.",
      "Within easy reach of town are mirror-still lakes, the pale dunes of the Sarfaranga cold desert, restored royal forts at Shigar and Khaplu, and the vast high plateau of Deosai. Baltistan's Balti culture, with its Tibetan-influenced language and architecture, gives the region a character all its own.",
    ],
    heroImage: "skarduLake",
    cardImage: "shangrila",
    gallery: ["shangrila", "skarduSunset", "khaplu", "deosaiTrack", "sheosarLake", "deosaiRoad"],
    categories: ["northern-pakistan", "lakes-valleys", "mountains-trekking", "culture-heritage"],
    suggestedDuration: "4–6 days in the Skardu region is a comfortable starting point",
    highlights: [
      { name: "Shangrila Lake", description: "The resort lake at Lower Kachura, known for its pagoda-roofed buildings and calm, reflective water." },
      { name: "Upper Kachura Lake", description: "A deep, clear lake framed by orchards and steep slopes — a peaceful place to walk or row." },
      { name: "Shigar Fort", description: "A restored 17th-century Balti palace and a fine example of the region's timber-and-stone architecture." },
      { name: "Khaplu Fort", description: "The restored palace of Khaplu's former rulers, set in a green valley along the Shyok River." },
      { name: "Deosai National Park", description: "One of the highest plateaus on Earth — rolling summer grasslands, wildflowers and Sheosar Lake." },
      { name: "Manthokha Waterfall", description: "A tall waterfall in the Kharmang valley, surrounded by shaded willow groves." },
    ],
    experiences: [
      { title: "Lake days", description: "Slow mornings by Shangrila and Upper Kachura, with time for short walks and photography." },
      { title: "Desert at altitude", description: "Watch the light change over the Sarfaranga cold desert, with snow peaks behind the dunes." },
      { title: "Royal Baltistan", description: "Explore the restored forts of Shigar and Khaplu and the villages around them." },
      { title: "The Deosai plateau", description: "A seasonal jeep journey across high grasslands, often called the 'Land of Giants'." },
    ],
    bestTime: {
      summary: "Late spring to early autumn is the main travel season. Deosai is usually only accessible in summer.",
      seasons: [
        { label: "Spring", months: "April – May", note: "Blossom in the valleys; higher areas may still be snowbound." },
        { label: "Summer", months: "June – August", note: "The usual window for Deosai and higher roads. Busiest period." },
        { label: "Autumn", months: "September – October", note: "Clear skies and golden poplars; nights turn cold." },
        { label: "Winter", months: "November – March", note: "Very cold, with limited access to higher areas." },
      ],
    },
    gettingThere:
      "Skardu is reached by domestic flights from Islamabad — which are weather-dependent — or by a long road journey through the mountains. Many travelers combine both. Discuss which option suits your schedule.",
    sampleRoute: [
      { title: "Arrive in Skardu", detail: "Settle in, acclimatize and enjoy an easy evening by the Indus." },
      { title: "Lakes of Kachura", detail: "Shangrila and Upper Kachura, with time to walk and rest." },
      { title: "Shigar & the cold desert", detail: "Shigar Fort and village, returning via Sarfaranga at golden hour." },
      { title: "Deosai (seasonal)", detail: "A full day on the plateau, including Sheosar Lake when the road is open." },
      { title: "Khaplu or Manthokha", detail: "Choose between the palace at Khaplu and the waterfall at Manthokha." },
    ],
    tips: [
      "Build a spare day into your plan — mountain flights and roads can be delayed by weather.",
      "Skardu sits at roughly 2,200 m and Deosai much higher. Take the first day gently.",
      "Pack layers: summer days can be warm while evenings and the plateau are cold.",
      "Dress modestly when visiting villages, and ask before photographing people.",
    ],
    faqs: [
      { question: "How many days do I need in Skardu?", answer: "Four to six days lets you see the lakes, Shigar and either Deosai or Khaplu at a relaxed pace. Your ideal length depends on how you travel to Skardu and what you want to include — Lashkar Tours can help you plan it." },
      { question: "Can I visit Deosai at any time of year?", answer: "No. Deosai is a high plateau and is generally accessible only in the summer months, once snow has cleared. Exact opening varies each year, so confirm before you travel." },
      { question: "Can Skardu be combined with Hunza?", answer: "Yes, many travelers combine the two in one journey. Allow enough time for the road between them, which takes most of a day." },
    ],
    relatedTours: ["skardu-shangrila-adventure", "hunza-skardu-grand-journey", "customized-pakistan-discovery"],
    whatsappMessage:
      "Hello Lashkar Tours, I am interested in visiting Skardu. I would like to discuss trip duration, itinerary options, and estimated costs.",
    seo: {
      title: "Skardu Tours | Lakes, Forts & Deosai, Pakistan — Lashkar Tours",
      description:
        "Explore Skardu's alpine lakes, Shigar and Khaplu forts, the Sarfaranga cold desert and Deosai National Park. Plan a personalized Skardu trip with Lashkar Tours.",
    },
  },
  {
    slug: "hunza",
    name: "Hunza Valley",
    shortName: "Hunza Valley",
    region: "Gilgit-Baltistan",
    tagline: "Mountain villages, historic forts and the Karakoram at its most spectacular.",
    shortDescription:
      "Explore mountain villages, historic forts, scenic viewpoints, and breathtaking views of the Karakoram.",
    intro: [
      "Hunza is a terraced green valley carved into some of the highest mountains on the planet. Peaks such as Rakaposhi and Ultar rise straight from the valley floor, while orchards of apricot, apple and cherry fill the terraces below.",
      "From the old capital of Karimabad, with its hilltop forts and lively bazaar, the Karakoram Highway leads north through Gojal — past the turquoise Attabad Lake, the needle-sharp Passu Cones and swaying suspension bridges — towards the high Khunjerab Pass on the border with China.",
    ],
    heroImage: "hunzaAerial",
    cardImage: "attabadLake",
    gallery: ["attabadLake", "altitFort", "passuConesRoad", "attabadBoats", "hunzaSunset", "karimabadNight", "passuRiver", "hunzaHouse"],
    categories: ["northern-pakistan", "lakes-valleys", "culture-heritage", "family-friendly"],
    suggestedDuration: "3–5 days in Hunza, plus travel time to and from the valley",
    highlights: [
      { name: "Karimabad", description: "Hunza's historic center, with a walkable bazaar and views across to Rakaposhi." },
      { name: "Baltit Fort", description: "A centuries-old fort above Karimabad, now a museum of Hunza's royal history." },
      { name: "Altit Fort", description: "The older of Hunza's two great forts, perched on a cliff above the Hunza River." },
      { name: "Attabad Lake", description: "A striking turquoise lake formed by a landslide in 2010, now popular for boat rides." },
      { name: "Passu Cones", description: "The serrated peaks of Tupopdan, one of the most photographed views on the Karakoram Highway." },
      { name: "Hussaini Suspension Bridge", description: "A long, airy footbridge of planks and cables strung across the Hunza River." },
    ],
    experiences: [
      { title: "Village walks", description: "Follow irrigation channels through Karimabad, Altit and Ganish, and meet the people who live there." },
      { title: "Viewpoints at golden hour", description: "Watch the light on Rakaposhi, Ultar and Ladyfinger Peak from Eagle's Nest." },
      { title: "Upper Hunza drive", description: "Attabad Lake, Passu, Hussaini and the Karakoram Highway at your own pace." },
      { title: "Seasonal color", description: "Spring blossom or autumn gold transform the valley in just a few weeks." },
    ],
    bestTime: {
      summary: "Hunza can be visited from spring to late autumn. Spring blossom and autumn colors are especially popular.",
      seasons: [
        { label: "Spring", months: "Late March – May", note: "Apricot and cherry blossom; cool days and cold nights." },
        { label: "Summer", months: "June – August", note: "Warm days and full access to Upper Hunza. Busiest season." },
        { label: "Autumn", months: "September – early November", note: "Golden poplars and clear skies — a photographer's favorite." },
        { label: "Winter", months: "December – February", note: "Cold and quiet; some services and high roads are limited." },
      ],
    },
    gettingThere:
      "Most travelers reach Hunza along the Karakoram Highway, either all the way by road from Islamabad (usually over two days) or by flying to Gilgit — weather permitting — and continuing by road.",
    sampleRoute: [
      { title: "Into the valley", detail: "Drive up the Karakoram Highway with a stop at the Rakaposhi viewpoint." },
      { title: "Karimabad & the forts", detail: "Baltit and Altit forts, the bazaar and a sunset at Eagle's Nest." },
      { title: "Upper Hunza", detail: "Attabad Lake, the Passu Cones and the Hussaini Suspension Bridge." },
      { title: "Khunjerab Pass (seasonal)", detail: "An optional journey to the high border pass when the road is open." },
    ],
    tips: [
      "Allow extra time for the Karakoram Highway; landslides and roadworks can cause delays.",
      "Hunza is a conservative community — modest clothing is appreciated, especially in villages.",
      "Ask permission before photographing people, particularly women.",
      "Cash is useful in smaller villages; ATMs are limited outside the main towns.",
    ],
    faqs: [
      { question: "When is apricot blossom season in Hunza?", answer: "Blossom typically appears from late March to April, but timing shifts each year with the weather. If blossom is important to you, mention it when planning so your dates can be discussed." },
      { question: "Can I visit Khunjerab Pass from Hunza?", answer: "Khunjerab Pass is usually open during the warmer months and can be visited as a day trip from Upper Hunza. Opening dates, entry fees and rules for foreign visitors can change, so confirm the latest details before your trip." },
      { question: "Is Hunza suitable for families?", answer: "Hunza is a popular destination for families, with short walks, lake visits and viewpoints. Discuss your group's needs — such as travel time and pace — when you plan." },
    ],
    relatedTours: ["hunza-valley-explorer", "hunza-skardu-grand-journey", "customized-pakistan-discovery"],
    whatsappMessage:
      "Hello Lashkar Tours, I am interested in planning a trip to Hunza Valley. Could you help me explore itinerary options?",
    seo: {
      title: "Hunza Valley Tours | Explore Hunza, Pakistan — Lashkar Tours",
      description:
        "Discover Hunza Valley, mountain villages, historic forts, Attabad Lake, and breathtaking Karakoram landscapes. Plan a personalized Hunza trip with Lashkar Tours.",
    },
  },
  {
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    shortName: "Fairy Meadows",
    region: "Diamer, Gilgit-Baltistan",
    tagline: "An alpine meadow at the foot of Nanga Parbat.",
    shortDescription:
      "Experience a remarkable alpine landscape with unforgettable views of Nanga Parbat.",
    intro: [
      "Fairy Meadows is a high grassland ringed by pine forest, facing the immense Rakhiot Face of Nanga Parbat — at 8,126 meters, the ninth-highest mountain in the world. There are no roads into the meadow itself, which is a large part of its magic.",
      "Getting there is an adventure: a rough jeep track climbs from the Karakoram Highway at Raikot Bridge to the village of Tato, followed by a walk up through the forest. Those who make the journey are rewarded with sunrises on Nanga Parbat that few other places can match.",
    ],
    heroImage: "nangaParbatForest",
    cardImage: "nangaParbatClouds",
    gallery: ["nangaParbatClouds", "nangaParbatNight", "nangaParbatForest"],
    categories: ["northern-pakistan", "mountains-trekking"],
    suggestedDuration: "2–3 nights at or near the meadows, plus travel days",
    highlights: [
      { name: "Nanga Parbat views", description: "Uninterrupted views of the mountain's north face from the meadow." },
      { name: "The forest trail", description: "The walk from Tato climbs through pine forest to the open meadow." },
      { name: "Beyal Camp", description: "A further walk beyond the meadow towards the glacier and closer views of the peak." },
      { name: "Raikot Bridge to Tato", description: "One of the region's most dramatic jeep tracks, cut into the side of the gorge." },
    ],
    experiences: [
      { title: "Scenic mountain journey", description: "From the Karakoram Highway up the jeep track and on foot into the meadows." },
      { title: "Alpine meadows", description: "Open grassland, forest edges and streams beneath the mountain." },
      { title: "Guided trekking, where available", description: "Extend your stay with walks towards Beyal Camp or the base-camp viewpoint." },
      { title: "Mountain photography", description: "Sunrise, starry skies and reflections in the meadow's small lake." },
    ],
    bestTime: {
      summary: "Fairy Meadows is a summer destination. Outside the warmer months the trail and accommodation are often snowbound.",
      seasons: [
        { label: "Early summer", months: "May – June", note: "Snow may remain on higher trails; the meadows turn green." },
        { label: "Peak summer", months: "July – August", note: "The most reliable months for access and walking." },
        { label: "Early autumn", months: "September", note: "Crisp, clear days and fewer visitors before the cold sets in." },
      ],
    },
    gettingThere:
      "Travel along the Karakoram Highway to Raikot Bridge, transfer to a local jeep for the track to Tato, then walk up to the meadows. The walk usually takes a few hours depending on pace; ponies may be available for luggage.",
    sampleRoute: [
      { title: "Along the Karakoram Highway", detail: "Travel north to the Chilas area and overnight near Raikot Bridge." },
      { title: "Jeep track and forest walk", detail: "Jeep to Tato, then walk up to Fairy Meadows for sunset." },
      { title: "Towards Beyal Camp", detail: "An optional walk deeper into the valley for closer views of the glacier." },
      { title: "Descent", detail: "Sunrise on Nanga Parbat, then walk down and continue your journey." },
    ],
    tips: [
      "You need a reasonable level of fitness for the walk from Tato — let Lashkar Tours know about any mobility concerns.",
      "Accommodation at the meadows is simple (cabins or camping). Discuss options and expectations in advance.",
      "Bring warm layers, sturdy footwear and a torch; nights are cold even in summer.",
      "Mobile signal and electricity can be very limited.",
    ],
    faqs: [
      { question: "How difficult is the walk to Fairy Meadows?", answer: "It is a steady uphill walk on a well-used trail that most reasonably fit travelers can manage at their own pace. If you have concerns about fitness or mobility, discuss them before booking any arrangements." },
      { question: "Can children visit Fairy Meadows?", answer: "Some families do visit, but the jeep track and walk need careful consideration. Share your children's ages and experience when planning so the trip can be discussed realistically." },
      { question: "Can I trek to Nanga Parbat Base Camp?", answer: "Walks beyond the meadows towards Beyal Camp and the base-camp area are possible in suitable conditions. Ask Lashkar Tours about guided options and timing." },
    ],
    relatedTours: ["fairy-meadows-nature-escape", "hunza-skardu-grand-journey", "customized-pakistan-discovery"],
    whatsappMessage:
      "Hello Lashkar Tours, I am interested in visiting Fairy Meadows and seeing Nanga Parbat. Could you help me plan the journey?",
    seo: {
      title: "Fairy Meadows Tours | Nanga Parbat Views, Pakistan — Lashkar Tours",
      description:
        "Visit Fairy Meadows beneath Nanga Parbat — a jeep journey, forest walk and alpine meadow in northern Pakistan. Plan your Fairy Meadows trip with Lashkar Tours.",
    },
  },
  {
    slug: "naran-kaghan",
    name: "Naran & Kaghan",
    shortName: "Naran and Kaghan",
    region: "Khyber Pakhtunkhwa",
    tagline: "Green valleys, glacial lakes and one of Pakistan's great mountain drives.",
    shortDescription:
      "Discover green valleys, mountain rivers, lakes, and scenic drives.",
    intro: [
      "The Kaghan Valley follows the Kunhar River for more than 150 kilometers, climbing from forested foothills to treeless high passes. It is one of the most accessible mountain regions from Islamabad, and a favorite summer escape for Pakistani families.",
      "Naran, the valley's main summer town, is the base for Lake Saiful Muluk and its legend of a prince and a fairy. Further up, Lulusar Lake and the Babusar Pass open the route north to the Karakoram Highway — a spectacular way to begin a longer northern journey.",
    ],
    heroImage: "saifulMuluk",
    cardImage: "saifulMuluk",
    gallery: ["siriPaye", "ansooLake", "babusarRoad"],
    categories: ["northern-pakistan", "lakes-valleys", "family-friendly"],
    suggestedDuration: "3–4 days covers the main valley highlights",
    highlights: [
      { name: "Lake Saiful Muluk", description: "A glacial lake surrounded by peaks, reached by jeep from Naran." },
      { name: "Shogran & Siri Paye", description: "Forested hill station and high meadows on the valley's western side." },
      { name: "Lulusar Lake", description: "The source of the Kunhar River, a long lake near the top of the valley." },
      { name: "Babusar Pass", description: "The high pass linking Kaghan to Chilas and the Karakoram Highway (seasonal)." },
      { name: "Ansoo Lake", description: "A remote, tear-shaped lake for experienced trekkers in good conditions." },
      { name: "Kunhar River", description: "The fast-flowing river that runs the length of the valley." },
    ],
    experiences: [
      { title: "Lakes by jeep", description: "Short jeep journeys from Naran to Saiful Muluk and up-valley lakes." },
      { title: "Meadow walks", description: "Gentle walks across the high grasslands of Siri Paye." },
      { title: "The Babusar road", description: "Cross the pass as part of a route to Chilas and the north." },
      { title: "Family-friendly pace", description: "Shorter drives and easy stops make this a good first mountain trip." },
    ],
    bestTime: {
      summary: "The upper valley is a summer destination; Babusar Pass usually opens only in the warmer months.",
      seasons: [
        { label: "Early summer", months: "May – June", note: "Lower valley open; snow may remain near the lakes and pass." },
        { label: "Peak summer", months: "July – August", note: "Full access, but also the busiest period for domestic tourism." },
        { label: "Early autumn", months: "September", note: "Quieter and clear, with cool nights." },
        { label: "Winter", months: "November – April", note: "The upper valley is largely snowbound and closed." },
      ],
    },
    gettingThere:
      "The valley is reached by road from Islamabad via Abbottabad or the Hazara Motorway, then Balakot. Naran is typically a long day's drive from Islamabad.",
    sampleRoute: [
      { title: "Islamabad to Shogran", detail: "Drive into the lower valley and stay overnight in the forested hills." },
      { title: "Siri Paye meadows", detail: "Jeep up to the high meadows for walking and views." },
      { title: "On to Naran", detail: "Follow the Kunhar River up to Naran." },
      { title: "Saiful Muluk & the upper valley", detail: "Visit the lake, then continue to Lulusar or over Babusar (seasonal)." },
    ],
    tips: [
      "Peak domestic holiday periods can be very busy — travel mid-week if you can.",
      "Jeep access to Saiful Muluk depends on snow and road conditions early in the season.",
      "Take care near riverbanks; the Kunhar is cold and fast.",
      "Babusar Pass is high — bring a warm layer even on hot days.",
    ],
    faqs: [
      { question: "Is Naran good for a short trip from Islamabad?", answer: "Yes. It is one of the closest major mountain areas to Islamabad, which makes it a good choice for shorter trips. Allow realistic driving time in each direction." },
      { question: "Can I continue from Naran to Hunza or Fairy Meadows?", answer: "When Babusar Pass is open, the road connects Naran to Chilas on the Karakoram Highway, making it possible to continue north. Pass opening dates vary each year." },
      { question: "When is Lake Saiful Muluk accessible?", answer: "It is generally accessible in summer once snow has cleared from the jeep road. Early-season access can vary, so confirm conditions close to your dates." },
    ],
    relatedTours: ["northern-pakistan-family-tour", "customized-pakistan-discovery"],
    whatsappMessage:
      "Hello Lashkar Tours, I am interested in a trip to Naran and Kaghan. Could you help me explore itinerary options?",
    seo: {
      title: "Naran & Kaghan Tours | Lake Saiful Muluk, Pakistan — Lashkar Tours",
      description:
        "Discover the Kaghan Valley, Naran, Lake Saiful Muluk, Siri Paye and Babusar Pass. Plan a personalized Naran and Kaghan trip with Lashkar Tours.",
    },
  },
  {
    slug: "swat-kalam",
    name: "Swat & Kalam",
    shortName: "Swat and Kalam",
    region: "Khyber Pakhtunkhwa",
    tagline: "Forested valleys, mountain streams and layers of ancient history.",
    shortDescription:
      "Explore forested valleys, mountain streams, and beautiful northern landscapes.",
    intro: [
      "Swat is a broad, fertile valley whose history runs deep: it was once a center of Gandhara Buddhist civilization, and stupas and rock carvings still dot the lower valley around Mingora. Its museum holds remarkable sculpture from that era.",
      "Upstream, the valley narrows and the forests thicken. Kalam sits where rivers meet beneath pine-covered slopes, and from here tracks lead to the Ushu Forest and the quiet shores of Mahodand Lake. Malam Jabba, on a ridge above the valley, offers chairlift views in summer and snow in winter.",
    ],
    heroImage: "kalamTown",
    cardImage: "mahodandLake",
    gallery: ["mahodandLake", "kumratForest", "kalamTown"],
    categories: ["northern-pakistan", "lakes-valleys", "culture-heritage", "family-friendly"],
    suggestedDuration: "3–5 days to combine lower Swat with Kalam",
    highlights: [
      { name: "Swat Museum & Buddhist sites", description: "Gandhara-era sculpture and archaeological sites around Mingora and Saidu Sharif." },
      { name: "Malam Jabba", description: "A hilltop resort with a chairlift, mountain views and winter snow." },
      { name: "Bahrain", description: "A riverside town on the way to Kalam, known for its bazaar and woodwork." },
      { name: "Kalam", description: "The upper valley's main town, surrounded by forest and mountain streams." },
      { name: "Ushu Forest", description: "Tall deodar and pine forest just beyond Kalam." },
      { name: "Mahodand Lake", description: "A lake in the upper Ushu Valley, popular for picnics and boating in summer." },
    ],
    experiences: [
      { title: "Gandhara heritage", description: "Explore the Buddhist history of the lower valley with time at the museum." },
      { title: "Forest and river", description: "Easy walks along the Swat River and through the Ushu Forest." },
      { title: "Lake excursions", description: "A jeep journey up to Mahodand Lake when the track is open." },
      { title: "Neighboring valleys", description: "Ask about combining your trip with nearby Kumrat Valley." },
    ],
    bestTime: {
      summary: "Lower Swat can be visited for much of the year; Kalam and Mahodand are best in summer.",
      seasons: [
        { label: "Spring", months: "March – May", note: "Mild in lower Swat; the upper valley is still waking up." },
        { label: "Summer", months: "June – August", note: "Best time for Kalam, Ushu and Mahodand Lake." },
        { label: "Autumn", months: "September – October", note: "Clear and calm, with autumn color in the forests." },
        { label: "Winter", months: "December – February", note: "Snow at Malam Jabba; higher areas largely inaccessible." },
      ],
    },
    gettingThere:
      "Swat is reached by road from Islamabad via the Swat Motorway. Kalam is a further drive up the valley from Mingora.",
    sampleRoute: [
      { title: "Islamabad to Swat", detail: "Drive to lower Swat and visit the museum or a Buddhist site." },
      { title: "Malam Jabba", detail: "An excursion to the ridge-top resort and chairlift." },
      { title: "Up the valley to Kalam", detail: "Via Bahrain, following the Swat River into the mountains." },
      { title: "Ushu & Mahodand", detail: "Forest walks and a day at the lake (seasonal)." },
    ],
    tips: [
      "Summer weekends in Kalam can be busy; mid-week travel is often quieter.",
      "Jeep tracks beyond Kalam depend on weather and snow conditions.",
      "Swat is a conservative region — modest dress is respectful.",
      "Confirm the latest travel guidance for the region before you travel.",
    ],
    faqs: [
      { question: "Is Swat worth visiting for history as well as scenery?", answer: "Yes. Lower Swat has a rich Buddhist heritage from the Gandhara period, and the Swat Museum is a highlight for anyone interested in the region's history." },
      { question: "When can I visit Mahodand Lake?", answer: "Mahodand is generally reached in the summer months, when the jeep track beyond Kalam is clear. Conditions vary, so confirm before you travel." },
      { question: "Can Swat be combined with other destinations?", answer: "Swat can be part of a longer northern journey, but the valleys are separated by long drives. Lashkar Tours can help you decide what combination is realistic for your dates." },
    ],
    relatedTours: ["swat-kalam-valleys-journey", "customized-pakistan-discovery"],
    whatsappMessage:
      "Hello Lashkar Tours, I am interested in visiting Swat and Kalam. Could you help me explore itinerary options?",
    seo: {
      title: "Swat & Kalam Tours | Valleys & Buddhist Heritage — Lashkar Tours",
      description:
        "Explore Swat's Buddhist heritage, Malam Jabba, Kalam, the Ushu Forest and Mahodand Lake. Plan a personalized Swat and Kalam trip with Lashkar Tours.",
    },
  },
  {
    slug: "neelum-valley",
    name: "Neelum Valley",
    shortName: "Neelum Valley",
    region: "Azad Jammu & Kashmir",
    tagline: "Lush valleys, rushing rivers and quiet mountain villages.",
    shortDescription:
      "Discover lush valleys, rivers, mountain villages, and peaceful scenic surroundings.",
    intro: [
      "The Neelum Valley winds for some 200 kilometers alongside the blue-green Neelum River, through some of the greenest landscapes in Pakistan. Villages of wooden houses cling to steep, forested slopes, and waterfalls pour down to the road.",
      "Travelers come for the peaceful riverside towns of Keran and Sharda, the hilltop meadows of Arang Kel, and — for the adventurous — the high alpine lakes at Ratti Gali. The valley follows the Line of Control for much of its length, so access rules deserve careful attention.",
    ],
    heroImage: "arangKel",
    cardImage: "rattiGali",
    gallery: ["rattiGali", "dhanniWaterfall", "arangKel"],
    categories: ["lakes-valleys", "culture-heritage"],
    suggestedDuration: "3–5 days, depending on how far up the valley you travel",
    highlights: [
      { name: "Keran", description: "A riverside village where the Neelum River runs close to the road." },
      { name: "Sharda", description: "Home to the ruins of the ancient Sharda temple and university site." },
      { name: "Arang Kel", description: "A hilltop village of meadows and wooden homes, reached from Kel." },
      { name: "Ratti Gali Lake", description: "A high alpine lake reached by jeep and a hike in summer." },
      { name: "Dhanni Waterfall", description: "A roadside waterfall that makes a natural stop on the drive up the valley." },
      { name: "The Neelum River", description: "The valley's emerald river, constant companion on every journey." },
    ],
    experiences: [
      { title: "Riverside stays", description: "Slow days beside the Neelum River in villages like Keran and Sharda." },
      { title: "Village meadows", description: "Walk among the wooden houses and meadows of Arang Kel." },
      { title: "Alpine lake trek", description: "A seasonal journey to Ratti Gali for experienced walkers." },
      { title: "Waterfalls and forest", description: "Stops along the valley road at waterfalls and viewpoints." },
    ],
    bestTime: {
      summary: "The valley is greenest from late spring to early autumn. Higher lakes are reachable only in summer.",
      seasons: [
        { label: "Spring", months: "April – May", note: "Rivers run high with snowmelt; higher areas still snowy." },
        { label: "Summer", months: "June – August", note: "Best access to Arang Kel and Ratti Gali." },
        { label: "Autumn", months: "September – October", note: "Quieter roads and changing colors." },
        { label: "Winter", months: "November – March", note: "Heavy snow in the upper valley; limited access." },
      ],
    },
    gettingThere:
      "The valley is reached by road from Islamabad via Muzaffarabad, the capital of Azad Jammu & Kashmir. Road conditions in the upper valley can be rough.",
    sampleRoute: [
      { title: "Islamabad to Muzaffarabad", detail: "Drive into Azad Kashmir and continue into the lower valley." },
      { title: "Keran & Sharda", detail: "Riverside villages and the ancient site at Sharda." },
      { title: "Kel & Arang Kel", detail: "Cross to Arang Kel for meadows and village walks." },
      { title: "Ratti Gali (seasonal)", detail: "A jeep journey and hike to the alpine lake in suitable conditions." },
    ],
    tips: [
      "Foreign nationals may need permission, such as a No Objection Certificate, to visit some areas near the Line of Control. Rules change — confirm the current requirements with Lashkar Tours and the relevant authorities before planning.",
      "Carry your passport and copies of travel documents at all times.",
      "Mobile coverage is patchy in the upper valley.",
      "Upper-valley roads are narrow and can be affected by rain and landslides.",
    ],
    faqs: [
      { question: "Can foreign tourists visit the Neelum Valley?", answer: "Access for foreign nationals depends on current regulations, and some areas near the Line of Control may require special permission. Please confirm the latest requirements with Lashkar Tours and the relevant official authorities before making plans." },
      { question: "How do I get to Arang Kel?", answer: "Arang Kel is reached from the village of Kel, across the river, followed by an uphill walk. The exact options available can change, so ask when planning." },
      { question: "Is Ratti Gali suitable for everyone?", answer: "Ratti Gali involves a rough jeep track and a hike at altitude, and is only accessible in summer. It is best suited to reasonably fit travelers." },
    ],
    relatedTours: ["neelum-valley-riverside-retreat", "customized-pakistan-discovery"],
    whatsappMessage:
      "Hello Lashkar Tours, I am interested in visiting the Neelum Valley. Could you help me explore itinerary options and current access requirements?",
    seo: {
      title: "Neelum Valley Tours | Arang Kel & Ratti Gali — Lashkar Tours",
      description:
        "Discover the Neelum Valley's riverside villages, Arang Kel, Sharda and Ratti Gali Lake in Azad Kashmir. Plan a personalized Neelum Valley trip with Lashkar Tours.",
    },
  },
];

export const destinationNote = CONFIRM_NOTE;

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
