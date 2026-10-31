import { Compass, Globe2, Mountain, Route } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const highlights = [
  { icon: Route, title: "Customized Travel Experiences", text: "Routes shaped around your dates and interests" },
  { icon: Mountain, title: "Northern Pakistan Adventures", text: "Hunza, Skardu, Fairy Meadows and beyond" },
  { icon: Compass, title: "Local Travel Knowledge", text: "Guidance informed by the regions themselves" },
  { icon: Globe2, title: "Support for International Visitors", text: "Clear English-language trip planning" },
];

/** Qualitative highlights only. Numerical credentials appear solely when verified in site-config. */
export function TrustBar() {
  const credentials = siteConfig.verifiedCredentials;
  return (
    <section aria-label="Why travelers choose Lashkar Tours" className="border-b border-forest/10 bg-white">
      <div className="container-site grid grid-cols-1 divide-y divide-forest/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4 py-6 sm:px-4 lg:px-6 lg:first:pl-0">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage text-forest">
              <Icon aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-semibold leading-snug text-forest">{title}</p>
              <p className="mt-1 text-sm text-grey-ink">{text}</p>
            </div>
          </div>
        ))}
      </div>
      {credentials.length > 0 && (
        <div className="border-t border-forest/10 bg-ivory">
          <dl className="container-site flex flex-wrap justify-center gap-x-12 gap-y-4 py-5">
            {credentials.map((c) => (
              <div key={c.label} className="flex items-baseline gap-2">
                <dt className="font-serif text-2xl text-forest">{c.value}</dt>
                <dd className="text-sm text-grey-ink">{c.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
