import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Logo } from "./Logo";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-white/70">{siteConfig.description}</p>
          <div className="mt-8">
            <WhatsAppButton />
          </div>
          {siteConfig.socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-4" aria-label="Social media">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white/75 hover:text-gold">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterColumn title="Destinations" className="lg:col-span-2">
          {destinations.map((d) => (
            <FooterLink key={d.slug} href={`/destinations/${d.slug}`}>
              {d.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Tours" className="lg:col-span-3">
          {tours.slice(0, 6).map((t) => (
            <FooterLink key={t.slug} href={`/tours/${t.slug}`}>
              {t.title}
            </FooterLink>
          ))}
          <FooterLink href="/tours">All tours</FooterLink>
        </FooterColumn>

        <FooterColumn title="Lashkar Tours" className="lg:col-span-3">
          {companyLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
          {(siteConfig.email || siteConfig.phone || siteConfig.address) && (
            <li className="space-y-2 pt-4 text-sm text-white/70">
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail aria-hidden className="size-4 text-gold" /> {siteConfig.email}
                </a>
              )}
              {siteConfig.phone && (
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
                  <Phone aria-hidden className="size-4 text-gold" /> {siteConfig.phone}
                </a>
              )}
              {siteConfig.address && (
                <p className="flex items-start gap-2">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" /> {siteConfig.address}
                </p>
              )}
            </li>
          )}
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Destination photography by independent photographers on{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-white hover:underline">
              Unsplash
            </a>
            . Images show destinations, not Lashkar Tours trips.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 text-gold">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-white/75 transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
