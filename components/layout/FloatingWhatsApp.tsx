"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Context-aware message: mentions the destination or tour the visitor is viewing. */
function messageFor(pathname: string) {
  const [, section, slug] = pathname.split("/");
  if (section === "destinations" && slug) {
    const d = destinations.find((x) => x.slug === slug);
    if (d) return d.whatsappMessage;
  }
  if (section === "tours" && slug) {
    const t = tours.find((x) => x.slug === slug);
    if (t) return whatsappMessages.tour(t.title);
  }
  return whatsappMessages.general;
}

export function FloatingWhatsApp() {
  const pathname = usePathname();

  return (
    <motion.a
      href={buildWhatsAppLink(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lashkar Tours on WhatsApp (opens in a new tab)"
      title="Chat on WhatsApp"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] sm:bottom-6 sm:right-6 sm:size-16"
    >
      <WhatsAppIcon className="size-8 sm:size-9" />
    </motion.a>
  );
}
