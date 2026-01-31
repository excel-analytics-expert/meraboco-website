export type MicroCmsPlan = "lite" | "standard" | "pro"

export type MicroCmsSite = {
  id: string
  name: string
  nameEn?: string
  name_en?: string
  catchCopy: string
  catchCopyEn?: string
  catchCopy_en?: string
  description: string
  descriptionEn?: string
  description_en?: string
  plan: MicroCmsPlan
  industry?: string
  address?: string
  phone?: string
  hours?: string
  map_url?: string
  map_url_en?: string
  mapUrlEn?: string
  createdAt: string
  updatedAt: string
}

export type MicroCmsPricingPlan = {
  id: string
  name: string
  nameEn?: string
  name_en?: string
  monthlyPrice: string
  initialCost: string
  demoUrl?: string
  summary: string
  summaryEn?: string
  summary_en?: string
  features?: string[]
  featuresEn?: string[] | string
  features_en?: string[] | string
  planId?: MicroCmsPlan
  stripePriceId?: string
  createdAt: string
  updatedAt: string
}
