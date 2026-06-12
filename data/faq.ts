// data/faq.ts
// Display copy lives in the `home` locale namespace (home.faq.items.<key>).
// This file is the single source of truth for the FAQ ordering and which item
// opens by default.
export type FaqItem = {
  /** Translation key under `home.faq.items`. */
  key: string
  defaultOpen?: boolean
}

export const faqItems: FaqItem[] = [
  { key: 'aiAct', defaultOpen: true },
  { key: 'timeline' },
  { key: 'monitoring' },
  { key: 'scalable' },
  { key: 'tech' },
  { key: 'sector' },
  { key: 'confidentiality' },
  { key: 'afterDelivery' },
  { key: 'pricing' },
  { key: 'diagnosis' },
]
