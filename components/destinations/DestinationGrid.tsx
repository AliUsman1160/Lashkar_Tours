import type { Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";
import { DestinationCard } from "./DestinationCard";

export function DestinationGrid({ destinations, className }: { destinations: Destination[]; className?: string }) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6", className)}>
      {destinations.map((d) => (
        <li key={d.slug} className="flex">
          <DestinationCard destination={d} className="w-full" headingLevel="h2" />
        </li>
      ))}
    </ul>
  );
}
