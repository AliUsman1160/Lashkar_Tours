import { BedDouble, Info, MapPin } from "lucide-react";
import type { ItineraryDay } from "@/data/tours";
import { Accordion } from "@/components/ui/Accordion";

export function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const isDayBased = days.every((d) => /^\d+$/.test(d.label));

  return (
    <Accordion
      showToggleAll
      defaultOpen={[0]}
      items={days.map((day) => ({
        id: day.label,
        meta: (
          <span className="mt-0.5 min-w-16 shrink-0 rounded-sm bg-forest px-2.5 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white">
            {isDayBased ? `Day ${day.label}` : day.label}
          </span>
        ),
        title: day.title,
        content: (
          <div className="space-y-4 sm:pl-20">
            <p className="flex items-center gap-2 text-sm font-semibold text-forest">
              <MapPin aria-hidden className="size-4 text-gold-dark" />
              {day.location}
            </p>
            <ul className="space-y-2">
              {day.activities.map((a) => (
                <li key={a} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
            {day.accommodation && (
              <p className="flex items-center gap-2 text-sm">
                <BedDouble aria-hidden className="size-4 text-gold-dark" />
                {day.accommodation}
              </p>
            )}
            {day.note && (
              <p className="flex items-start gap-2 rounded-sm bg-sage/60 px-3 py-2 text-sm text-charcoal">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
                {day.note}
              </p>
            )}
          </div>
        ),
      }))}
    />
  );
}
