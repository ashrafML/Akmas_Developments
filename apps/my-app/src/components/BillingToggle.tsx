import type { BillingCycle } from '../types/subscription';

interface BillingToggleProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

export function BillingToggle({ billingCycle, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={`text-lg font-medium transition-colors ${
          billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() => onChange(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
          billingCycle === 'yearly' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={billingCycle === 'yearly'}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
            billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
          }`}
        />
      </button>
      <span
        className={`text-lg font-medium transition-colors ${
          billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        Yearly
      </span>
      {billingCycle === 'yearly' && (
        <span className="ml-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          Save up to 20%
        </span>
      )}
    </div>
  );
}
