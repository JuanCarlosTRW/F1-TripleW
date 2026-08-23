/**
 * Conversion + engagement tracking. One gtag config lives in app/layout.tsx
 * (AW-10835426783) - never add a second tag.
 *
 * Funnel events (audit §14):
 *   page_view (automatic) -> hero_cta_click / phone_click / sms_click
 *   -> form_start -> form_step_complete -> form_submit -> qualified_lead
 * Deposit and booking are offline conversions - import them into Google Ads
 * from the CRM/booking records; they cannot be measured on-page.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params ?? {});
  }
}

export function trackPhoneClick(location: string) {
  trackEvent("phone_click", { location });
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // TODO: Replace PHONE_CLICK_LABEL with the real conversion label from Google Ads
    window.gtag("event", "conversion", {
      send_to: "AW-10835426783/PHONE_CLICK_LABEL",
      value: 1.0,
      currency: "USD",
    });
  }
}

export function trackSmsClick(location: string) {
  trackEvent("sms_click", { location });
}

export function trackFormSubmitConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // TODO: Replace FORM_SUBMIT_LABEL with the real conversion label from Google Ads
    window.gtag("event", "conversion", {
      send_to: "AW-10835426783/FORM_SUBMIT_LABEL",
      value: 1.0,
      currency: "USD",
    });
  }
}
