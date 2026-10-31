export type Testimonial = {
  quote: string;
  name: string;
  country?: string;
  trip?: string;
  /** Set to true ONLY for genuine reviews with the traveler's permission. */
  verified: boolean;
};

/**
 * DEVELOPMENT PLACEHOLDERS — not real reviews.
 * Replace with genuine, permission-granted testimonials and set `verified: true`.
 * Unverified entries are always displayed with a visible "Placeholder" label.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Placeholder review. Replace this text with a genuine traveler's words about their journey with Lashkar Tours — for example, what they enjoyed most about planning or traveling.",
    name: "Traveler name",
    country: "Country",
    trip: "Tour or destination",
    verified: false,
  },
  {
    quote:
      "Placeholder review. A good testimonial mentions a specific moment — a view, a village, a meal — and how the trip was organized. Only publish it with the traveler's permission.",
    name: "Traveler name",
    country: "Country",
    trip: "Tour or destination",
    verified: false,
  },
  {
    quote:
      "Placeholder review. Short, specific and honest reviews build the most trust with international visitors. Avoid editing a traveler's words beyond light trimming.",
    name: "Traveler name",
    country: "Country",
    trip: "Tour or destination",
    verified: false,
  },
];
