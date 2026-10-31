"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CircleCheckBig, Info, RotateCcw, X } from "lucide-react";
import {
  accommodationOptions,
  budgetBasisOptions,
  budgetOptions,
  countrySuggestions,
  currencyOptions,
  destinationOptions,
  languageOptions,
  months,
  travelStyleOptions,
} from "@/data/form-options";
import { getTour, type Tour } from "@/data/tours";
import {
  initialData,
  labelFor,
  nights,
  tripFormSteps as steps,
  validate,
  type TripFormData as FormData,
  type TripFormErrors as Errors,
} from "@/lib/trip-inquiry";
import { buildInquiryMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { Button, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { Field, FieldError, SelectControl, controlClass, describedBy } from "./FormFields";

export function PlanYourTripForm() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<FormData>(() => initialData(new URLSearchParams(searchParams.toString())));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [today, setToday] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Computed on the client to avoid a server/client mismatch in the prerendered page.
  useEffect(() => {
    const now = new Date();
    setToday(new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10));
  }, []);

  const tour = getTour(data.tour);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleDestination = (value: string) =>
    set("destinations", data.destinations.includes(value) ? data.destinations.filter((v) => v !== value) : [...data.destinations, value]);

  const focusFirstError = (errs: Errors) => {
    const first = steps[step].fields.find((f) => errs[f]);
    if (!first) return;
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goNext = () => {
    const errs = validate(step, data, today);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setStep((s) => s + 1);
    scrollToTop();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) return goNext();
    // Re-validate every step in case earlier answers were changed.
    for (let s = 0; s < steps.length; s++) {
      const errs = validate(s, data, today);
      if (Object.keys(errs).length) {
        setErrors(errs);
        setStep(s);
        return focusFirstError(errs);
      }
    }
    // Demo only: nothing is transmitted or stored.
    setSubmitted(true);
    scrollToTop();
  };

  const reset = () => {
    setData(initialData(new URLSearchParams()));
    setErrors({});
    setStep(0);
    setSubmitted(false);
    scrollToTop();
  };

  const message = buildInquiryMessage({
    fullName: data.fullName,
    country: data.country,
    destinations: data.destinations.map(labelFor),
    tour: tour?.title,
    arrival: data.datesFlexible ? "" : data.arrival,
    departure: data.datesFlexible ? "" : data.departure,
    month: data.datesFlexible ? data.month : "",
    adults: data.adults,
    children: data.children,
    travelStyle: data.travelStyle,
    accommodation: data.accommodation,
    budget: data.budget,
    currency: data.currency,
    budgetBasis: budgetBasisOptions.find((b) => b.value === data.budgetBasis)?.label.toLowerCase(),
    language: data.language,
    requests: data.requests,
  });
  const whatsappHref = buildWhatsAppLink(message);
  const tripNights = nights(data.arrival, data.departure);

  return (
    <div ref={topRef} className="scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Confirmation data={data} tour={tour} whatsappHref={whatsappHref} onEdit={() => setSubmitted(false)} onReset={reset} />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-label="Plan your trip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-sm bg-white shadow-[0_30px_70px_-45px_rgba(23,61,50,0.6)]"
          >
            <Progress step={step} />

            <div className="p-6 sm:p-10">
              {tour && (
                <div className="mb-8 flex items-start justify-between gap-4 rounded-sm border border-gold/50 bg-gold/10 px-4 py-3">
                  <p className="text-sm">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gold-dark">Tour selected</span>
                    <span className="font-semibold text-forest">{tour.title}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => set("tour", "")}
                    className="inline-flex min-h-9 items-center gap-1 rounded-sm px-2 text-sm font-semibold text-forest hover:bg-gold/20"
                  >
                    <X aria-hidden className="size-4" /> Remove
                  </button>
                </div>
              )}

              {step === 0 && (
                <StepPanel title="Where and when would you like to travel?" description="Choose as many destinations as you like.">
                  <fieldset aria-describedby={errors.destinations ? "destinations-error" : undefined}>
                    <legend className="mb-3 text-sm font-semibold text-charcoal">
                      Preferred destinations
                      <span className="ml-1 text-red-700" aria-hidden>
                        *
                      </span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {destinationOptions.map((o, i) => {
                        const checked = data.destinations.includes(o.value);
                        return (
                          <label
                            key={o.value}
                            className={cn(
                              "relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                              checked ? "border-forest bg-forest text-white" : "border-forest/20 bg-white text-forest hover:border-forest",
                            )}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleDestination(o.value)}
                              data-field={i === 0 ? "destinations" : undefined}
                              aria-invalid={errors.destinations ? true : undefined}
                            />
                            {checked && <Check aria-hidden className="size-4" />}
                            {o.label}
                          </label>
                        );
                      })}
                    </div>
                    <FieldError id="destinations" error={errors.destinations} />
                  </fieldset>

                  <div className="border-t border-forest/10 pt-8">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-charcoal">Travel dates</p>
                      <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-charcoal">
                        <input
                          type="checkbox"
                          checked={data.datesFlexible}
                          onChange={(e) => set("datesFlexible", e.target.checked)}
                          className="size-5 accent-forest"
                        />
                        My dates are flexible
                      </label>
                    </div>
                    {data.datesFlexible ? (
                      <Field id="month" label="Preferred travel month" required error={errors.month}>
                        <SelectControl
                          id="month"
                          data-field="month"
                          value={data.month}
                          onChange={(e) => set("month", e.target.value)}
                          invalid={!!errors.month}
                          aria-describedby={describedBy("month", errors.month)}
                          aria-required
                        >
                          <option value="">Select a month</option>
                          {months.map((m) => (
                            <option key={m}>{m}</option>
                          ))}
                        </SelectControl>
                      </Field>
                    ) : (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="arrival" label="Arrival date" required error={errors.arrival}>
                          <input
                            id="arrival"
                            data-field="arrival"
                            type="date"
                            min={today || undefined}
                            value={data.arrival}
                            onChange={(e) => set("arrival", e.target.value)}
                            className={controlClass(!!errors.arrival)}
                            aria-invalid={!!errors.arrival || undefined}
                            aria-describedby={describedBy("arrival", errors.arrival)}
                            aria-required
                          />
                        </Field>
                        <Field id="departure" label="Departure date" required error={errors.departure}>
                          <input
                            id="departure"
                            data-field="departure"
                            type="date"
                            min={data.arrival || today || undefined}
                            value={data.departure}
                            onChange={(e) => set("departure", e.target.value)}
                            className={controlClass(!!errors.departure)}
                            aria-invalid={!!errors.departure || undefined}
                            aria-describedby={describedBy("departure", errors.departure)}
                            aria-required
                          />
                        </Field>
                        {tripNights !== null && (
                          <p className="text-sm text-grey-ink sm:col-span-2" aria-live="polite">
                            {tripNights === 0 ? "Same-day arrival and departure." : `${tripNights} night${tripNights === 1 ? "" : "s"} in Pakistan.`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-5 border-t border-forest/10 pt-8 sm:grid-cols-2">
                    <Field id="adults" label="Number of travelers (adults)" required error={errors.adults}>
                      <input
                        id="adults"
                        data-field="adults"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={50}
                        value={data.adults}
                        onChange={(e) => set("adults", e.target.value)}
                        className={controlClass(!!errors.adults)}
                        aria-invalid={!!errors.adults || undefined}
                        aria-describedby={describedBy("adults", errors.adults)}
                        aria-required
                      />
                    </Field>
                    <Field id="children" label="Number of children" error={errors.children} hint="Under 12. Ages can be added in special requests.">
                      <input
                        id="children"
                        data-field="children"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={30}
                        value={data.children}
                        onChange={(e) => set("children", e.target.value)}
                        className={controlClass(!!errors.children)}
                        aria-invalid={!!errors.children || undefined}
                        aria-describedby={describedBy("children", errors.children, "Under 12")}
                      />
                    </Field>
                  </div>
                </StepPanel>
              )}

              {step === 1 && (
                <StepPanel title="How do you like to travel?" description="This helps shape a suitable itinerary and quote.">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="travelStyle" label="Travel style" required error={errors.travelStyle}>
                      <SelectControl
                        id="travelStyle"
                        data-field="travelStyle"
                        value={data.travelStyle}
                        onChange={(e) => set("travelStyle", e.target.value)}
                        invalid={!!errors.travelStyle}
                        aria-describedby={describedBy("travelStyle", errors.travelStyle)}
                        aria-required
                      >
                        <option value="">Select a travel style</option>
                        {travelStyleOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </SelectControl>
                    </Field>
                    <Field id="accommodation" label="Accommodation preference">
                      <SelectControl id="accommodation" value={data.accommodation} onChange={(e) => set("accommodation", e.target.value)}>
                        {accommodationOptions.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </SelectControl>
                    </Field>
                  </div>

                  <fieldset className="rounded-sm border border-forest/15 p-5 sm:p-6">
                    <legend className="px-2 text-sm font-semibold text-charcoal">
                      Estimated budget <span className="text-xs font-normal text-grey-ink">(optional)</span>
                    </legend>
                    <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
                      <Field id="budget" label="Budget range" required={false}>
                        <SelectControl id="budget" value={data.budget} onChange={(e) => set("budget", e.target.value)}>
                          <option value="">Prefer not to say</option>
                          {budgetOptions.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </SelectControl>
                      </Field>
                      <Field id="currency" label="Currency">
                        <SelectControl id="currency" value={data.currency} onChange={(e) => set("currency", e.target.value)}>
                          {currencyOptions.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </SelectControl>
                      </Field>
                    </div>
                    <div className="mt-5" role="radiogroup" aria-label="Budget applies to">
                      <p className="mb-2 text-sm font-semibold text-charcoal">This budget is…</p>
                      <div className="flex flex-wrap gap-3">
                        {budgetBasisOptions.map((o) => (
                          <label
                            key={o.value}
                            className={cn(
                              "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border px-4 text-sm font-semibold transition-colors",
                              "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold",
                              data.budgetBasis === o.value ? "border-forest bg-sage text-forest" : "border-forest/20 text-charcoal hover:border-forest",
                            )}
                          >
                            <input
                              type="radio"
                              name="budgetBasis"
                              value={o.value}
                              checked={data.budgetBasis === o.value}
                              onChange={() => set("budgetBasis", o.value)}
                              className="size-4 accent-forest"
                            />
                            {o.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  <Field id="language" label="Preferred language for communication">
                    <SelectControl id="language" value={data.language} onChange={(e) => set("language", e.target.value)}>
                      {languageOptions.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </SelectControl>
                  </Field>

                  <Field
                    id="requests"
                    label="Special requests"
                    error={errors.requests}
                    hint="Interests, children's ages, dietary needs, mobility considerations, celebrations…"
                  >
                    <textarea
                      id="requests"
                      data-field="requests"
                      rows={5}
                      value={data.requests}
                      onChange={(e) => set("requests", e.target.value)}
                      className={cn(controlClass(!!errors.requests), "py-3")}
                      aria-invalid={!!errors.requests || undefined}
                      aria-describedby={describedBy("requests", errors.requests, "hint")}
                      placeholder="Tell us anything that would help plan your trip."
                    />
                  </Field>
                </StepPanel>
              )}

              {step === 2 && (
                <StepPanel title="How can Lashkar Tours reach you?" description="Your details stay in your browser — this demo form does not send them anywhere.">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="fullName" label="Full name" required error={errors.fullName} className="sm:col-span-2">
                      <input
                        id="fullName"
                        data-field="fullName"
                        autoComplete="name"
                        value={data.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        className={controlClass(!!errors.fullName)}
                        aria-invalid={!!errors.fullName || undefined}
                        aria-describedby={describedBy("fullName", errors.fullName)}
                        aria-required
                      />
                    </Field>
                    <Field id="email" label="Email address" required error={errors.email}>
                      <input
                        id="email"
                        data-field="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={controlClass(!!errors.email)}
                        aria-invalid={!!errors.email || undefined}
                        aria-describedby={describedBy("email", errors.email)}
                        aria-required
                      />
                    </Field>
                    <Field id="phone" label="WhatsApp or phone number" error={errors.phone} hint="Include your country code, e.g. +44.">
                      <input
                        id="phone"
                        data-field="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={controlClass(!!errors.phone)}
                        aria-invalid={!!errors.phone || undefined}
                        aria-describedby={describedBy("phone", errors.phone, "hint")}
                      />
                    </Field>
                    <Field id="country" label="Country of residence" required error={errors.country} className="sm:col-span-2">
                      <input
                        id="country"
                        data-field="country"
                        list="country-list"
                        autoComplete="country-name"
                        value={data.country}
                        onChange={(e) => set("country", e.target.value)}
                        className={controlClass(!!errors.country)}
                        aria-invalid={!!errors.country || undefined}
                        aria-describedby={describedBy("country", errors.country)}
                        aria-required
                      />
                      <datalist id="country-list">
                        {countrySuggestions.map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                    </Field>
                  </div>
                  <DemoNotice />
                </StepPanel>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-forest/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              {step > 0 ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep((s) => s - 1);
                    setErrors({});
                    scrollToTop();
                  }}
                >
                  <ArrowLeft aria-hidden className="size-4" /> Back
                </Button>
              ) : (
                <span className="text-xs text-grey-ink">
                  <span className="text-red-700">*</span> Required
                </span>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                {step === steps.length - 1 && <WhatsAppContinue href={whatsappHref} />}
                <Button type="submit" variant={step === steps.length - 1 ? "gold" : "forest"} size="lg">
                  {step === steps.length - 1 ? "Submit Trip Request" : `Continue to ${steps[step + 1].title.toLowerCase()}`}
                  <ArrowRight aria-hidden className="size-4" />
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div className="border-b border-forest/10 px-6 pb-5 pt-6 sm:px-10">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gold-dark">
        Step {step + 1} of {steps.length}
      </p>
      <ol className="grid grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1 rounded-full transition-colors duration-500", i <= step ? "bg-forest" : "bg-sage")} />
            <span className={cn("mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm", i === step ? "text-forest" : "text-grey-ink")}>
              {i < step && <Check aria-hidden className="size-3.5 text-forest" />}
              {s.title}
              {i < step && <span className="sr-only">(completed)</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StepPanel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl text-forest sm:text-3xl">{title}</h2>
      <p className="mt-2 text-grey-ink">{description}</p>
      <div className="mt-8 space-y-8">{children}</div>
    </div>
  );
}

function DemoNotice() {
  return (
    <p role="note" className="flex items-start gap-3 rounded-sm bg-sage/70 px-4 py-3 text-sm leading-relaxed text-charcoal">
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
      <span>
        <strong>Demo form:</strong> submitting shows a confirmation on this page only. Your inquiry is not transmitted to Lashkar Tours or stored
        anywhere. To contact Lashkar Tours, use WhatsApp or the details on the contact page.
      </span>
    </p>
  );
}

function WhatsAppContinue({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg")}>
      <WhatsAppIcon className="size-5" />
      Continue on WhatsApp
      <span className="sr-only">(opens WhatsApp with your trip details prefilled — you can review it before sending)</span>
    </a>
  );
}

function Confirmation({
  data,
  tour,
  whatsappHref,
  onEdit,
  onReset,
}: {
  data: FormData;
  tour?: Tour;
  whatsappHref: string;
  onEdit: () => void;
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  const basis = budgetBasisOptions.find((b) => b.value === data.budgetBasis)?.label.toLowerCase();
  const currency = data.currency === "Not sure yet" ? "" : `${data.currency} `;
  const budgetText = !data.budget ? "Not specified" : data.budget === "Not sure yet" ? "Not sure yet" : `${currency}${data.budget} (${basis})`;

  const rows: [string, string][] = [
    ["Destinations", data.destinations.map(labelFor).join(", ")],
    ...(tour ? ([["Tour", tour.title]] as [string, string][]) : []),
    ["When", data.datesFlexible ? `${data.month} (flexible)` : `${data.arrival} to ${data.departure}`],
    ["Travelers", `${data.adults} adult${data.adults === "1" ? "" : "s"}${Number(data.children) > 0 ? `, ${data.children} children` : ""}`],
    ["Travel style", data.travelStyle],
    ["Accommodation", data.accommodation],
    ["Budget", budgetText],
    ["Contact", [data.fullName, data.email, data.phone].filter(Boolean).join(" · ")],
  ];

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-[0_30px_70px_-45px_rgba(23,61,50,0.6)]">
      <div className="bg-forest px-6 py-10 text-white sm:px-10">
        <CircleCheckBig aria-hidden className="size-12 text-gold" strokeWidth={1.4} />
        <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-3xl outline-none sm:text-4xl">
          Thank you, {data.fullName.split(" ")[0]}. Your trip plan is ready.
        </h2>
        <p className="mt-3 max-w-xl text-white/80">Here is a summary of the journey you described.</p>
      </div>

      <div className="space-y-8 p-6 sm:p-10">
        <div role="status" className="flex items-start gap-3 rounded-sm border border-gold-dark/50 bg-gold/10 px-4 py-4 text-sm leading-relaxed text-charcoal">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-dark" />
          <p>
            <strong>This is a demonstration.</strong> Your inquiry has <strong>not</strong> been sent to Lashkar Tours and nothing has been
            stored. To start a real conversation, continue on WhatsApp — you will be able to review the message before sending it.
          </p>
        </div>

        <dl className="divide-y divide-forest/10 border-y border-forest/10">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-grey-ink">{k}</dt>
              <dd className="text-charcoal">{v}</dd>
            </div>
          ))}
          {data.requests && (
            <div className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-grey-ink">Special requests</dt>
              <dd className="whitespace-pre-line text-charcoal">{data.requests}</dd>
            </div>
          )}
        </dl>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <WhatsAppContinue href={whatsappHref} />
          <Button variant="outline-dark" size="lg" onClick={onEdit}>
            <ArrowLeft aria-hidden className="size-4" /> Edit details
          </Button>
          <Button variant="ghost" size="lg" onClick={onReset}>
            <RotateCcw aria-hidden className="size-4" /> Start over
          </Button>
        </div>
        <p className="text-sm text-grey-ink">
          Want to keep exploring? Browse <Link href="/destinations" className="font-semibold text-forest underline-offset-4 hover:underline">destinations</Link> or{" "}
          <Link href="/tours" className="font-semibold text-forest underline-offset-4 hover:underline">
            example tours
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
