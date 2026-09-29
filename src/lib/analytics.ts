/**
 * Google Ads tracking. The gtag.js snippet itself lives in index.html.
 * Replace CONVERSION_LABEL with the label from Google Ads → Goals →
 * Conversions → (your WhatsApp conversion) → Tag setup.
 */
export const GOOGLE_ADS_ID = "AW-17630335494";
export const CONVERSION_LABEL = "CONVERSION_LABEL";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Reports a WhatsApp click as a Google Ads conversion. Fire-and-forget:
 * it never prevents the link from opening WhatsApp.
 */
export function trackWhatsAppClick() {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}` });
    }
  } catch {
    /* tracking must never break navigation */
  }
}
