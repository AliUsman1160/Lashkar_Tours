import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/destinations", "/tours", "/plan-your-trip", "/about", "/gallery", "/faq", "/contact"];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), priority: p === "/" ? 1 : p === "/plan-your-trip" ? 0.9 : 0.7 })),
    ...destinations.map((d) => ({ url: absoluteUrl(`/destinations/${d.slug}`), priority: 0.8 })),
    ...tours.map((t) => ({ url: absoluteUrl(`/tours/${t.slug}`), priority: 0.6 })),
  ];
}
