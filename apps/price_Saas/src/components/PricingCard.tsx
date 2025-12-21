import { Check } from 'lucide-react';
import type { PlanWithFeatures, BillingCycle } from '../types/subscription';

interface PricingCardProps {
  plan: PlanWithFeatures;
  billingCycle: BillingCycle;
  onSelect: (planId: string) => void;
}

export function PricingCard({ plan, billingCycle, onSelect }: PricingCardProps) {
  const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
  const monthlyPrice = billingCycle === 'yearly' ? (plan.price_yearly / 12).toFixed(2) : price;
  const savings = billingCycle === 'yearly' ? Math.round(((plan.price_monthly * 12 - plan.price_yearly) / (plan.price_monthly * 12)) * 100) : 0;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
        plan.is_popular
          ? 'border-2 border-blue-500 bg-white shadow-2xl'
          : 'border border-gray-200 bg-white shadow-lg'
      }`}
    >
      {plan.is_popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-5xl font-extrabold text-gray-900">${monthlyPrice}</span>
          <span className="ml-2 text-gray-600">/month</span>
        </div>
        {billingCycle === 'yearly' && savings > 0 && (
          <p className="mt-2 text-sm font-medium text-green-600">Save {savings}% annually</p>
        )}
        {billingCycle === 'yearly' && (
          <p className="mt-1 text-xs text-gray-500">Billed ${price} per year</p>
        )}
      </div>

      <button
        onClick={() => onSelect(plan.id)}
        className={`w-full rounded-lg px-6 py-3 text-center font-semibold transition-all duration-200 ${
          plan.is_popular
            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Get Started
      </button>

      <div className="mt-8 space-y-4">
        {plan.features
          .sort((a, b) => a.display_order - b.display_order)
          .map((feature) => (
            <div key={feature.id} className="flex items-start">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-sm text-gray-700">{feature.feature_text}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
