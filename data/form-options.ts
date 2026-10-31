/** Configurable options for the Plan Your Trip form. */

export const destinationOptions = [
  { value: "hunza", label: "Hunza Valley" },
  { value: "skardu", label: "Skardu" },
  { value: "hunza-skardu", label: "Hunza and Skardu" },
  { value: "fairy-meadows", label: "Fairy Meadows" },
  { value: "naran-kaghan", label: "Naran and Kaghan" },
  { value: "swat-kalam", label: "Swat and Kalam" },
  { value: "neelum-valley", label: "Neelum Valley" },
  { value: "islamabad-north", label: "Islamabad and Northern Pakistan" },
  { value: "custom", label: "Custom itinerary" },
  { value: "not-sure", label: "Not sure yet — recommend destinations" },
] as const;

export const travelStyleOptions = [
  "Private Tour",
  "Family Holiday",
  "Honeymoon",
  "Adventure and Trekking",
  "Cultural Experience",
  "Photography Tour",
  "Group Tour",
  "Customized Journey",
] as const;

export const accommodationOptions = [
  "No preference — please advise",
  "Comfortable mid-range",
  "Boutique or heritage stays",
  "Premium, where available",
  "Budget-friendly",
  "Camping or simple lodges are fine",
] as const;

export const currencyOptions = ["USD", "GBP", "EUR", "AUD", "CAD", "PKR", "Not sure yet"] as const;

/** Budget bands, expressed in the visitor's chosen currency. Edit freely. */
export const budgetOptions = [
  "Under 1,000",
  "1,000 – 2,000",
  "2,000 – 3,500",
  "3,500 – 5,000",
  "Over 5,000",
  "Not sure yet",
] as const;

export const budgetBasisOptions = [
  { value: "per-person", label: "Per person" },
  { value: "whole-group", label: "For the whole group" },
] as const;

export const languageOptions = ["English", "Urdu", "Arabic", "French", "German", "Spanish", "Chinese", "Other"] as const;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const countrySuggestions = [
  "United Kingdom", "United States", "Canada", "Australia", "New Zealand", "Ireland", "Germany", "France",
  "Netherlands", "Belgium", "Switzerland", "Austria", "Italy", "Spain", "Portugal", "Sweden", "Norway",
  "Denmark", "Finland", "Poland", "Czech Republic", "Turkey", "United Arab Emirates", "Saudi Arabia", "Qatar",
  "Kuwait", "Oman", "Bahrain", "Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines", "Vietnam",
  "Japan", "South Korea", "China", "Hong Kong", "South Africa", "Pakistan",
];
