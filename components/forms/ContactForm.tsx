"use client";

import { useRef, useState, type FormEvent } from "react";
import { CircleCheckBig, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Field, controlClass, describedBy } from "./FormFields";

type Data = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Data, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Demo contact form: validates input and confirms on-page. Nothing is sent or stored. */
export function ContactForm() {
  const [data, setData] = useState<Data>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Data, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (data.name.trim().length < 2) errs.name = "Enter your name.";
    if (!data.email.trim()) errs.email = "Enter your email address.";
    else if (!EMAIL.test(data.email.trim())) errs.email = "Enter a valid email address, like name@example.com.";
    if (data.message.trim().length < 10) errs.message = "Write a short message (at least 10 characters).";
    setErrors(errs);
    const first = (Object.keys(errs) as (keyof Data)[])[0];
    if (first) return formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
    setDone(true);
  };

  if (done) {
    return (
      <div role="status" className="rounded-sm bg-white p-8">
        <CircleCheckBig aria-hidden className="size-10 text-forest" strokeWidth={1.4} />
        <h3 className="mt-4 text-2xl text-forest">Thanks, {data.name.split(" ")[0]} — message checked.</h3>
        <p className="mt-2 leading-relaxed text-grey-ink">
          <strong className="text-charcoal">This is a demo form.</strong> Your message has not been sent to Lashkar Tours. Please use WhatsApp to
          get in touch directly.
        </p>
        <Button variant="outline-dark" className="mt-6" 
          onClick={() => {
            setDone(false);
            setData({ name: "", email: "", message: "" });
          }}
        >
          Write another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact Lashkar Tours" className="space-y-5 rounded-sm bg-white p-6 sm:p-8">
      <Field id="contact-name" label="Your name" required error={errors.name}>
        <input
          id="contact-name"
          autoComplete="name"
          value={data.name}
          onChange={(e) => set("name", e.target.value)}
          className={controlClass(!!errors.name)}
          aria-invalid={!!errors.name || undefined}
          aria-describedby={describedBy("contact-name", errors.name)}
          aria-required
        />
      </Field>
      <Field id="contact-email" label="Email address" required error={errors.email}>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          className={controlClass(!!errors.email)}
          aria-invalid={!!errors.email || undefined}
          aria-describedby={describedBy("contact-email", errors.email)}
          aria-required
        />
      </Field>
      <Field id="contact-message" label="Message" required error={errors.message}>
        <textarea
          id="contact-message"
          rows={5}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          className={cn(controlClass(!!errors.message), "py-3")}
          aria-invalid={!!errors.message || undefined}
          aria-describedby={describedBy("contact-message", errors.message)}
          aria-required
        />
      </Field>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-grey-ink">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-forest" />
        Demo form — messages are validated but not sent or stored.
      </p>
      <Button type="submit" variant="forest" size="lg" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
