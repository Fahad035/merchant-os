import {
  LayoutDashboard,
  Bot,
  Package,
  Megaphone,
  ShoppingCart,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    title: "Unified Dashboard",
    description:
      "Revenue, orders, conversion rate and open AI opportunities in one live view.",
    icon: LayoutDashboard,
  },
  {
    title: "AI Copilot Chat",
    description:
      "Ask about revenue, campaigns or orders in plain language and get a grounded answer.",
    icon: Bot,
  },
  {
    title: "Smart Catalog",
    description:
      "Bundle detection and low-stock alerts surfaced automatically across your products.",
    icon: Package,
  },
  {
    title: "Campaign Generator",
    description:
      "AI drafts targeted campaigns with an audience, discount, and expected revenue.",
    icon: Megaphone,
  },
  {
    title: "Checkout Upsells",
    description:
      "Confidence-ranked upsell suggestions at checkout, tied to real order data.",
    icon: ShoppingCart,
  },
  {
    title: "Governance & Audit",
    description:
      "Every AI action — approved, rejected or executed — is permanently logged.",
    icon: ClipboardList,
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs tracking-wide text-primary">
          ONE PLATFORM
        </p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Everything a merchant needs to grow — nothing a black box.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Six focused modules, all backed by the same explainable AI engine
          and audit trail.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card
            key={feature.title}
            className="p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl brand-gradient shadow-pop">
              <feature.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mt-4 font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}