import { accommodationOptions, destinationOptions, months, type travelStyleOptions } from "@/data/form-options";
import { getTour, type Tour, type TourType } from "@/data/tours";

/** Plan Your Trip form model: field types, URL prefill and validation. Kept free of React so it can be tested directly. */

export type TripFormData = {
  destinations: string[];
  tour: string;
  datesFlexible: boolean;
  arrival: string;
  departure: string;
  month: string;
  adults: string;
  children: string;
  travelStyle: string;
  accommodation: string;
  budget: string;
  currency: string;
  budgetBasis: string;
  language: string;
  requests: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
};

export type TripFormErrors = Partial<Record<keyof TripFormData, string>>;

export const tripFormSteps = [
  { title: "Your trip", fields: ["destinations", "arrival", "departure", "month", "adults", "children"] },
  { title: "Preferences", fields: ["travelStyle", "accommodation", "budget", "currency", "language", "requests"] },
  { title: "Your details", fields: ["fullName", "email", "phone", "country"] },
] as const satisfies readonly { title: string; fields: readonly (keyof TripFormData)[] }[];

const destinationValues = new Set<string>(destinationOptions.map((o) => o.value));
export const labelFor = (value: string) => destinationOptions.find((o) => o.value === value)?.label ?? value;

const styleForTourType: Record<TourType, (typeof travelStyleOptions)[number]> = {
  private: "Private Tour",
  family: "Family Holiday",
  honeymoon: "Honeymoon",
  adventure: "Adventure and Trekking",
  cultural: "Cultural Experience",
  custom: "Customized Journey",
};

/** Map a tour's destinations onto the form's destination options. */
function destinationsForTour(tour: Tour): string[] {
  if (tour.types.includes("custom")) return ["custom"];
  const d = tour.destinations;
  if (d.includes("hunza") && d.includes("skardu")) return ["hunza-skardu"];
  return d.filter((s) => destinationValues.has(s));
}

/** Read prefill values from the URL (?destination=, ?tour=, ?month=, ?travelers=). */
export function initialData(params: URLSearchParams): TripFormData {
  const tour = getTour(params.get("tour") ?? "");
  const fromQuery = (params.get("destination") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => destinationValues.has(s));
  const destinations = Array.from(new Set([...fromQuery, ...(tour ? destinationsForTour(tour) : [])]));

  const monthParam = params.get("month") ?? "";
  const month = months.find((m) => m.toLowerCase() === monthParam.toLowerCase()) ?? "";
  const travelers = params.get("travelers") ?? "";
  const adults = /^\d+\+?$/.test(travelers) ? String(Math.min(parseInt(travelers, 10), 50)) : "2";

  return {
    destinations,
    tour: tour?.slug ?? "",
    datesFlexible: Boolean(month),
    arrival: "",
    departure: "",
    month,
    adults,
    children: "0",
    travelStyle: tour ? styleForTourType[tour.types[0]] : "",
    accommodation: accommodationOptions[0],
    budget: "",
    currency: "USD",
    budgetBasis: "per-person",
    language: "English",
    requests: "",
    fullName: "",
    email: "",
    phone: "",
    country: "",
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;

export function validate(step: number, d: TripFormData, today: string): TripFormErrors {
  const e: TripFormErrors = {};
  if (step === 0) {
    if (d.destinations.length === 0) e.destinations = "Choose at least one destination — or select “Not sure yet”.";
    if (d.datesFlexible) {
      if (!d.month) e.month = "Choose the month you would most like to travel.";
    } else {
      if (!d.arrival) e.arrival = "Enter your arrival date.";
      else if (today && d.arrival < today) e.arrival = "Arrival date cannot be in the past.";
      if (!d.departure) e.departure = "Enter your departure date.";
      else if (d.arrival && d.departure < d.arrival) e.departure = "Departure cannot be earlier than arrival.";
    }
    const adults = Number(d.adults);
    if (!d.adults || !Number.isInteger(adults) || adults < 1) e.adults = "Enter at least 1 adult.";
    else if (adults > 50) e.adults = "For groups over 50, please mention the size in your special requests.";
    const children = Number(d.children || 0);
    if (!Number.isInteger(children) || children < 0) e.children = "Enter a whole number (0 or more).";
  }
  if (step === 1) {
    if (!d.travelStyle) e.travelStyle = "Choose the travel style that suits you best.";
    if (d.requests.length > 1500) e.requests = "Please keep special requests under 1,500 characters.";
  }
  if (step === 2) {
    if (d.fullName.trim().length < 2) e.fullName = "Enter your full name.";
    if (!d.email.trim()) e.email = "Enter your email address.";
    else if (!EMAIL.test(d.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
    if (d.phone.trim() && !PHONE.test(d.phone.trim())) e.phone = "Enter a valid phone number, including the country code (e.g. +44 7700 900123).";
    if (!d.country.trim()) e.country = "Enter your country of residence.";
  }
  return e;
}

export function nights(arrival: string, departure: string) {
  if (!arrival || !departure) return null;
  const diff = (new Date(departure).getTime() - new Date(arrival).getTime()) / 86_400_000;
  return diff >= 0 ? diff : null;
}
