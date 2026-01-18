import { useEffect, useState } from 'react';
import type { PlanWithFeatures, BillingCycle } from '../types/subscription';
import { PricingCard } from './PricingCard';
import { BillingToggle } from './BillingToggle';
// // In PricingPage.tsx - temporary test
// import {DomainEvent} from '@akmas-front-monorepo/Event-servic'
// export const domainEvent = new DomainEvent();
const mockPlans: PlanWithFeatures[] = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for getting started',
    price_monthly: 29,
    price_yearly: 290,
    is_popular: false,
    is_active: true,
    display_order: 1,
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    features: [
      {
        id: '1',
        plan_id: '1',
        feature_text: 'Up to 10 projects',
        is_included: true,
        display_order: 1,
        created_at: '2025-01-01',
      },
      {
        id: '2',
        plan_id: '1',
        feature_text: '5GB storage',
        is_included: true,
        display_order: 2,
        created_at: '2025-01-01',
      },
      {
        id: '3',
        plan_id: '1',
        feature_text: 'Basic analytics',
        is_included: true,
        display_order: 3,
        created_at: '2025-01-01',
      },
      {
        id: '4',
        plan_id: '1',
        feature_text: 'Priority support',
        is_included: false,
        display_order: 4,
        created_at: '2025-01-01',
      },
    ],
  },
  {
    id: '2',
    name: 'Pro',
    description: 'Best for growing teams',
    price_monthly: 79,
    price_yearly: 790,
    is_popular: true,
    is_active: true,
    display_order: 2,
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    features: [
      {
        id: '5',
        plan_id: '2',
        feature_text: 'Unlimited projects',
        is_included: true,
        display_order: 1,
        created_at: '2025-01-01',
      },
      {
        id: '6',
        plan_id: '2',
        feature_text: '500GB storage',
        is_included: true,
        display_order: 2,
        created_at: '2025-01-01',
      },
      {
        id: '7',
        plan_id: '2',
        feature_text: 'Advanced analytics',
        is_included: true,
        display_order: 3,
        created_at: '2025-01-01',
      },
      {
        id: '8',
        plan_id: '2',
        feature_text: 'Priority support',
        is_included: true,
        display_order: 4,
        created_at: '2025-01-01',
      },
    ],
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For large organizations',
    price_monthly: 299,
    price_yearly: 2990,
    is_popular: false,
    is_active: true,
    display_order: 3,
    created_at: '2025-01-01',
    updated_at: '2025-01-01',
    features: [
      {
        id: '9',
        plan_id: '3',
        feature_text: 'Unlimited everything',
        is_included: true,
        display_order: 1,
        created_at: '2025-01-01',
      },
      {
        id: '10',
        plan_id: '3',
        feature_text: 'Unlimited storage',
        is_included: true,
        display_order: 2,
        created_at: '2025-01-01',
      },
      {
        id: '11',
        plan_id: '3',
        feature_text: 'Custom analytics',
        is_included: true,
        display_order: 3,
        created_at: '2025-01-01',
      },
      {
        id: '12',
        plan_id: '3',
        feature_text: 'Dedicated support',
        is_included: true,
        display_order: 4,
        created_at: '2025-01-01',
      },
    ],
  },
];
var notfied=''
export function PricingPage() {

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [plans] = useState<PlanWithFeatures[]>(mockPlans);
  const CUSTOM_EVENT_NAME = 'mfe-event-bus';

  function handleSelectPlan(planId: string) {
    const plan = plans.find((p) => p.id === planId);
    console.log('Selected plan:', plan?.name, 'Billing:', billingCycle,'gg',eventReturn);
    alert(`You selected ${plan?.name} (${billingCycle}). Integration with payment provider would happen here.`);
  }
  const [eventReturn, setEventReturn] = useState("");
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const handler = (event: any) => {
      const { eventType, data } = event.detail || {};
      console.log('🎯 Event received in Price-SaaS:', eventType, data);
      if (eventType === 'react-wrp-event') {
        console.log('✅ Updating message state:', event);
        setEventReturn("Event Data received in Price-SaaS: " + data);
        setRenderKey(prev => prev + 1); // Force re-render
      }
      
      // if (eventType === 'price-updated') {
      //   console.log('✅ Updating price state:', data);
      //   setPriceData(data);
      //   setRenderKey(prev => prev + 1); // Force re-render
      // }
    };
    
    window.addEventListener('mfe-event-bus', handler);
    console.log('👂 React ready to receive events');
    
    return () => {
      window.removeEventListener('mfe-event-bus', handler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* <button 
  className="bg-blue-500 text-white p-2"
  onClick={() => setEventReturn("Manual Update Working")}
>
  Test React State
</button> */}
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
            Select the perfect plan for your needs. Scale as you grow : 
      </p>
<p>Event: {eventReturn}</p>    

          <div className="mt-12">
            <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Cancel anytime. Questions? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
