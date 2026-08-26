import Link from "next/link";
import { Sparkles } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Catalog", href: "/catalog" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Checkout", href: "/checkout" },
  { label: "Audit", href: "/audit" },
];

export default function MarketingFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient shadow-pop">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span className="text-base font-bold tracking-tight">
                MerchantOS
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI commerce copilot that shows its work — every
              recommendation, approval and rejection, fully auditable.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Product</p>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Workspace</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/settings"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  AI Chat
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MerchantOS. All rights reserved.</p>
          <p>Built for merchants who want AI they can explain.</p>
        </div>
      </div>
    </footer>
  );
}