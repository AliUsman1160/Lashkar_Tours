import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "gold"
  | "forest"
  | "light"
  | "outline-light"
  | "outline-dark"
  | "ghost"
  | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-all duration-300 ease-out-soft disabled:cursor-not-allowed disabled:opacity-60 select-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-charcoal hover:bg-[#e2b96d] shadow-[0_8px_24px_-12px_rgba(213,168,90,0.8)]",
  forest: "bg-forest text-white hover:bg-forest-deep",
  light: "bg-white text-forest hover:bg-ivory",
  "outline-light": "border border-white/60 text-white hover:bg-white hover:text-forest",
  "outline-dark": "border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-white",
  ghost: "text-forest hover:text-gold-dark",
  whatsapp: "bg-[#1f7a4d] text-white hover:bg-[#186540]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

export function buttonClasses(variant: ButtonVariant = "gold", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, children, ...props }: LinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
