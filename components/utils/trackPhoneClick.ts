export function trackPhoneClick() {
  if (typeof window !== "undefined" && window.gtag) {
    // TODO: Replace PHONE_CLICK_LABEL with actual conversion label from Google Ads
    window.gtag("event", "conversion", {
      send_to: "AW-10835426783/PHONE_CLICK_LABEL",
      value: 1.0,
      currency: "USD",
    });
  }
}
