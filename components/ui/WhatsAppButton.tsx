import { buildWhatsAppLink, whatsappMessages } from "@/lib/whatsapp";
import { buttonClasses, type ButtonSize } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  message?: string;
  label?: string;
  variant?: "solid" | "outline-light" | "outline-dark";
  size?: ButtonSize;
  className?: string;
};

/** Opens WhatsApp (app on mobile, WhatsApp Web on desktop) with a prefilled message. */
export function WhatsAppButton({ message = whatsappMessages.general, label = "Chat on WhatsApp", variant = "solid", size = "md", className }: Props) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant === "solid" ? "whatsapp" : variant, size, className)}
    >
      <WhatsAppIcon className="size-5" />
      {label}
      <span className="sr-only">(opens WhatsApp in a new tab)</span>
    </a>
  );
}
