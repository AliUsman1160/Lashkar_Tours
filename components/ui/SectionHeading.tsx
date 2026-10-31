import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", tone = "dark", as: Tag = "h2", className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4 flex items-center gap-3", align === "center" && "justify-center", tone === "light" ? "text-gold" : "text-gold-dark")}>
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag className={cn("text-3xl leading-[1.1] sm:text-4xl lg:text-5xl", tone === "light" ? "text-white" : "text-forest")}>{title}</Tag>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-white/80" : "text-grey-ink")}>{description}</p>
      )}
    </div>
  );
}
