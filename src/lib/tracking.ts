declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type CtaTrackParams = {
  cta_id: string;
  cta_position: string;
  plan_id?: string;
  offer_id?: string;
  price?: number;
};

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/** Engagement signal only — safe to fire on any CTA, including scroll-only anchors. */
export function trackCtaClick(params: CtaTrackParams) {
  pushDataLayer({
    event: "cta_click",
    product: "mens_studio",
    ...params,
  });
}

/** Fire ONLY when a CTA actually opens the external checkout (Kirvano). Never on scroll-only links. */
export function trackBeginCheckout(params: CtaTrackParams) {
  pushDataLayer({
    event: "begin_checkout",
    product: "mens_studio",
    ...params,
  });
}
