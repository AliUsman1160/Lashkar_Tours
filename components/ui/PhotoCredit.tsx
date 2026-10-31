import type { Photo } from "@/data/photos";
import { cn } from "@/lib/utils";

export function PhotoCredit({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <p className={cn("text-[11px] leading-tight text-white/70", className)}>
      {photo.location} · Photo:{" "}
      <a href={photo.credit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-white hover:underline">
        {photo.credit.name}
      </a>{" "}
      / Unsplash
    </p>
  );
}
