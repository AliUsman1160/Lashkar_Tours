export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Absolute URL for metadata (canonical, Open Graph). */
export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path}`;
}

/** Image URL sized for Open Graph previews. */
export function ogImage(src: string) {
  return src.startsWith("http") ? src.replace(/w=\d+/, "w=1200") : src;
}
