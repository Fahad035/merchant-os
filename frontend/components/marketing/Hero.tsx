import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import AIRecommendationMockup from "./AIRecommendationMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      {/* Soft radial fade over the grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--primary), transparent 88%), transparent)",
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
            AI_COMMERCE · GOVERNANCE_BUILT_IN
          </div>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Let AI run the store.
            <br />
            <span className="brand-gradient-text">Keep every decision</span>{" "}
            on the record.
          </h1>

          <p className="mt-6 max-w-lg text-balance text-lg text-muted-foreground">
            MerchantOS finds bundle, upsell and campaign opportunities across
            your catalog and checkout — then logs every recommendation,
            approval and rejection, so you always know why revenue moved.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <PlayCircle className="h-4 w-4" />
              See how it works
            </a>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            No credit card needed to explore the live demo dashboard.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AIRecommendationMockup />
        </div>
      </div>
    </section>
  );
}