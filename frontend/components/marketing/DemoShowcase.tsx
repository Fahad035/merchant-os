import { ArrowUpRight, Package2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "./Reveal";

export default function DemoShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
        <div>
          <p className="font-mono text-xs tracking-wide text-primary">
            FROM THE DEMO WORKSPACE
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Built around a real merchant scenario, not a mock-up.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The seeded demo workspace models{" "}
            <strong className="text-foreground">SportZone India</strong>, a
            sports &amp; fitness retailer. Its catalog, orders and AI
            recommendations are what you&apos;ll see the moment you open the
            dashboard — no empty states, no placeholder data.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Running Shoes + Sports Socks bundle flagged automatically from
                session data.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Weekend campaign drafted for customers inactive 45+ days.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Every recommendation traceable in the Audit Center, end to
                end.
              </span>
            </li>
          </ul>
        </div>
        </Reveal>

        <Reveal delay={150}>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Package2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">SportZone India</p>
                <p className="text-xs text-muted-foreground">
                  Sports &amp; Fitness · Demo merchant
                </p>
              </div>
            </div>
            <Badge variant="secondary">Live in dashboard</Badge>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Running Shoes</span>
              <span className="font-medium">₹2,999 · 120 in stock</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Sports Socks</span>
              <span className="font-medium">₹299 · 300 in stock</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
              <span className="font-medium">Bundle opportunity</span>
              <span className="font-bold text-primary">+₹18,000</span>
            </div>
          </div>
        </Card>
        </Reveal>
      </div>
    </section>
  );
}