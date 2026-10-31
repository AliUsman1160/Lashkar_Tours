import { siteConfig } from "@/data/site-config";

/** Digits-only WhatsApp number, or null when missing or not in a plausible international format. */
export function getWhatsAppNumber(raw: string = siteConfig.whatsappNumber): string | null {
  const digits = raw.replace(/\D/g, "");
  // E.164 numbers are 8–15 digits; a leading 0 means a national (not international) format.
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

/**
 * Build a wa.me link with a prefilled message. wa.me opens the WhatsApp app on phones and
 * WhatsApp Web on desktop. With a configured number the chat opens with Lashkar Tours directly;
 * without one, WhatsApp opens with the message ready and the visitor chooses the recipient.
 */
export function buildWhatsAppLink(message: string, rawNumber?: string): string {
  const number = getWhatsAppNumber(rawNumber);
  return `https://wa.me/${number ?? ""}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general:
    "Hello Lashkar Tours, I am interested in exploring Pakistan and would like to discuss available tour options.",
  destination: (name: string) =>
    `Hello Lashkar Tours, I am interested in planning a trip to ${name}. Could you help me explore itinerary options?`,
  tour: (title: string) =>
    `Hello Lashkar Tours, I am interested in the "${title}" tour. Could you help me with itinerary details and a custom quote?`,
};

export type InquirySummary = {
  fullName?: string;
  country?: string;
  destinations: string[];
  tour?: string;
  arrival?: string;
  departure?: string;
  month?: string;
  adults?: string;
  children?: string;
  travelStyle?: string;
  accommodation?: string;
  budget?: string;
  currency?: string;
  budgetBasis?: string;
  language?: string;
  requests?: string;
};

/** Turn the visitor's form entries into a readable WhatsApp message. Empty fields are skipped. */
export function buildInquiryMessage(d: InquirySummary) {
  const lines = ["Hello Lashkar Tours, I would like to plan a trip to Pakistan."];
  const add = (label: string, value?: string) => {
    if (value && value.trim()) lines.push(`• ${label}: ${value.trim()}`);
  };

  add("Name", d.fullName);
  add("Country of residence", d.country);
  add("Interested in", d.tour);
  add("Destinations", d.destinations.join(", "));
  if (d.arrival || d.departure) add("Dates", [d.arrival, d.departure].filter(Boolean).join(" to "));
  else add("Travel month", d.month);
  add("Adults", d.adults);
  add("Children", d.children && d.children !== "0" ? d.children : undefined);
  add("Travel style", d.travelStyle);
  add("Accommodation", d.accommodation);
  if (d.budget) {
    const currency = d.currency && d.currency !== "Not sure yet" ? `${d.currency} ` : "";
    add("Budget", d.budget === "Not sure yet" ? "Not sure yet" : `${currency}${d.budget} ${d.budgetBasis ?? ""}`);
  }
  add("Preferred language", d.language);
  add("Special requests", d.requests);
  lines.push("", "Could you help me explore itinerary options?");
  return lines.join("\n");
}
