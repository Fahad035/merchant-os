import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Reveal from "./Reveal";

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Explore the dashboard and AI recommendations.",
    features: [
      "1 workspace",
      "Up to 100 products",
      "AI copilot chat",
      "7-day audit history",
    ],
  },
  {
    name: "Growth",
    price: "₹4,999/mo",
    description: "For merchants ready to act on every opportunity.",
    features: [
      "Unlimited products",
      "Campaign generator",
      "Checkout upsell AI",
      "Full audit trail",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Talk to us",
    description: "Multi-store operations with custom governance rules.",
    features: [
      "Multiple workspaces",
      "Custom approval rules",
      "Priority support",
      "Dedicated onboarding",
    ],
  },
];

export default function PricingTeaser() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-wide text-primary">
          PRICING
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Simple pricing, no surprise fees.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Illustrative plans — connect billing when you&apos;re ready to
          charge for MerchantOS.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 100}>
            <Card
              className={`relative h-full p-8 ${
                tier.highlighted ? "border-primary/50" : ""
              }`}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-3 left-8">
                  Most popular
                </Badge>
              )}
              <h3 className="font-semibold">{tier.name}</h3>
              <p className="mt-3 text-3xl font-extrabold tracking-tight">
                {tier.price}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className={buttonVariants({
                  className: "mt-8 w-full",
                  variant: tier.highlighted ? "default" : "outline",
                })}
              >
                Get started
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}