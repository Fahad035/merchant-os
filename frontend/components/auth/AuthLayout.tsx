import Link from "next/link";
import { ShieldCheck, TrendingUp, Zap } from "lucide-react";
import Logo from "@/components/brand/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const PANEL_POINTS = [
  {
    icon: Zap,
    text: "AI surfaces bundle, upsell and campaign opportunities automatically.",
  },
  {
    icon: ShieldCheck,
    text: "Every recommendation is approved, rejected and logged — nothing runs unseen.",
  },
  {
    icon: TrendingUp,
    text: "One dashboard for revenue, orders, conversion and AI activity.",
  },
];

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 brand-gradient"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-grid opacity-20"
        />

        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="text-base font-bold tracking-tight">
            MerchantOS
          </span>
        </Link>

        <div className="max-w-md">
          <p className="font-mono text-xs tracking-wide text-white/70">
            AI_COMMERCE · GOVERNANCE_BUILT_IN
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight">
            AI that runs your store — and shows its work.
          </h2>

          <ul className="mt-8 space-y-4">
            {PANEL_POINTS.map((point) => (
              <li key={point.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <point.icon className="h-4 w-4" />
                </span>
                <span className="text-sm text-white/90">{point.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} MerchantOS. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Logo size={28} />
            <span className="text-base font-bold tracking-tight">
              MerchantOS
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}