export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlanFeature {
  id: string;
  plan_id: string;
  feature_text: string;
  is_included: boolean;
  display_order: number;
  created_at: string;
}

export interface PlanWithFeatures extends SubscriptionPlan {
  features: PlanFeature[];
}

export type BillingCycle = 'monthly' | 'yearly';
