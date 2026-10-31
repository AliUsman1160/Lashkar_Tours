/**
 * Central business configuration.
 *
 * IMPORTANT: only enter details that Lashkar Tours has verified.
 * Any field left empty (`""` or `null`) is hidden across the site — nothing is invented.
 */

export type SocialLink = { label: string; href: string };

export const siteConfig = {
  name: "Lashkar Tours",
  tagline: "Discover Pakistan with local experts",
  description:
    "Lashkar Tours plans personalized journeys through northern Pakistan for international travelers —from Hunza and Skardu to Fairy Meadows, Naran, Swat and the Neelum Valley.",

  /** Public site URL, used for canonical links, Open Graph and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Path to the official logo in /public. Leave null to use the text wordmark. */
  logoPath: null as string | null,

  /**
   * Verified business WhatsApp number in international format, digits only
   * (e.g. "923001234567"). While empty, WhatsApp buttons render a clear
   * "not configured" state and no contact links are generated.
   */
  whatsappNumber: "" as string,

  /** Verified contact details. Leave empty until confirmed. */
  email: "" as string,
  phone: "" as string,
  address: "" as string,
  businessHours: "" as string,

  /** Verified social profiles only. */
  socials: [] as SocialLink[],

  /**
   * Measurable credentials (years operating, licences, ratings…).
   * Add an item only when it is verified, e.g. { value: "Licensed", label: "by …" }.
   */
  verifiedCredentials: [] as { value: string; label: string }[],

  colors: {
    forest: "#173D32",
    charcoal: "#202B2A",
    ivory: "#F7F6F0",
    gold: "#D5A85A",
    sage: "#DCE5DC",
    white: "#FFFFFF",
    grey: "#747C79",
  },
} as const;

export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/tours" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;
