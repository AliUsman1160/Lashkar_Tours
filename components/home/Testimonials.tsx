import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  const hasPlaceholders = testimonials.some((t) => !t.verified);

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32" aria-labelledby="testimonials-title">
      <div className="container-site">
        <SectionHeading align="center" eyebrow="Traveler experiences" title={<span id="testimonials-title">In Their Words.</span>} />

        {hasPlaceholders && (
          <p role="note" className="mx-auto mt-6 max-w-2xl rounded-sm border border-dashed border-gold-dark/60 bg-gold/10 px-4 py-3 text-center text-sm text-charcoal">
            <strong>Placeholder content.</strong> These are not real reviews. Replace them with genuine, verified testimonials in{" "}
            <code className="text-xs">data/testimonials.ts</code>.
          </p>
        )}

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i}>
              <figure className={cn("relative flex h-full flex-col rounded-sm bg-ivory p-8", !t.verified && "border border-dashed border-forest/25")}>
                {!t.verified && (
                  <span className="absolute right-4 top-4 rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-grey-ink">
                    Placeholder
                  </span>
                )}
                <Quote aria-hidden className="size-8 text-gold" strokeWidth={1.4} />
                <blockquote className={cn("mt-6 flex-1 font-serif text-lg leading-relaxed", t.verified ? "text-charcoal" : "text-grey-ink italic")}>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-forest/10 pt-5">
                  <p className="font-semibold text-forest">{t.name}</p>
                  <p className="text-sm text-grey-ink">{[t.country, t.trip].filter(Boolean).join(" · ")}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
