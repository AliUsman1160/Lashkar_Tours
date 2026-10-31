export type Faq = { question: string; answer: string; category: string };

/**
 * General questions for international travelers. Answers are intentionally cautious:
 * prices, permits, visas, road conditions and availability must always be confirmed
 * with Lashkar Tours or the relevant official authority.
 */
export const faqs: Faq[] = [
  {
    category: "Planning",
    question: "What destinations can I visit in Pakistan?",
    answer:
      "Lashkar Tours focuses on northern Pakistan, including Hunza Valley, Skardu, Fairy Meadows, Naran and Kaghan, Swat and Kalam, and the Neelum Valley. If you have another place in mind, mention it when you plan your trip and it can be discussed.",
  },
  {
    category: "Planning",
    question: "Can I customize my itinerary?",
    answer:
      "Yes. The tours on this website are example itineraries intended as starting points. You can ask to change the length, pace, destinations and activities to suit your interests and travel dates.",
  },
  {
    category: "Planning",
    question: "How do I request a tour quotation?",
    answer:
      "Share your travel dates, destinations, group size, accommodation preferences and approximate budget through the Plan Your Trip form or on WhatsApp. Prices depend on many factors — such as season, group size and the services you choose — so quotations are prepared individually by Lashkar Tours.",
  },
  {
    category: "Planning",
    question: "Can I combine Hunza and Skardu in one trip?",
    answer:
      "Yes, the two regions are often combined. The road between them takes most of a day, and flights to the region are weather-dependent, so a combined trip usually works best with ten days or more. Discuss your dates to see what is realistic.",
  },
  {
    category: "Planning",
    question: "What information should I provide when planning a trip?",
    answer:
      "It helps to share your preferred dates (or month), the destinations that interest you, the number of adults and children, your travel style, accommodation preferences, an approximate budget, and any special requirements such as dietary needs or mobility considerations.",
  },
  {
    category: "Contact",
    question: "Can I discuss my trip through WhatsApp?",
    answer:
      "Yes — WhatsApp is a convenient way to talk through your plans. Use any of the WhatsApp buttons on this website to start a conversation with a pre-written message that you can edit before sending.",
  },
  {
    category: "Travel styles",
    question: "Are private tours available?",
    answer:
      "You can request a private journey for yourself, your partner, family or friends. Ask Lashkar Tours about the private options available for your dates.",
  },
  {
    category: "Travel styles",
    question: "How can I ask about accommodation and transportation?",
    answer:
      "Mention your accommodation preference (for example, comfortable mid-range or boutique heritage stays) and any transport requirements when you submit your plans. Lashkar Tours can explain the options available for your route — note that choices in remote areas such as Fairy Meadows are often simple.",
  },
  {
    category: "Before you travel",
    question: "What should I know before visiting northern Pakistan?",
    answer:
      "Mountain weather can delay flights and roads, so a flexible day in your schedule is wise. Some areas sit at high altitude, local customs are generally conservative, and mobile coverage can be limited. For visas, entry requirements, permits and travel advisories, always check the latest information from official government sources before you travel.",
  },
  {
    category: "Travel styles",
    question: "Can I request a trip for my family or group?",
    answer:
      "Yes. Share the size of your group and the ages of any children, and a suitable pace and route can be discussed. Some destinations, such as Naran and Kaghan, involve shorter drives and can be a good fit for families.",
  },
  {
    category: "Before you travel",
    question: "Do I need a visa or permit to visit Pakistan?",
    answer:
      "Most international visitors need a visa, and some areas may require additional permits for foreign nationals. Requirements vary by nationality and change over time, so please check the official Government of Pakistan visa portal and your own government's travel advice. Lashkar Tours can tell you if a specific destination has known additional requirements.",
  },
  {
    category: "Before you travel",
    question: "When is the best time to visit northern Pakistan?",
    answer:
      "The main travel season for the mountains runs from late spring to early autumn. Spring brings blossom, summer gives the best access to high areas, and autumn brings clear skies and golden colors. Many high passes and plateaus are closed in winter. Each destination page has a seasonal guide.",
  },
];
