"use client";

import { useEffect, useState } from "react";
import { Brain, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TARGET_CONFIDENCE = 92;
const TARGET_REVENUE = 18000;

export default function AIRecommendationMockup() {
  const [confidence, setConfidence] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [approved, setApproved] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setConfidence(TARGET_CONFIDENCE);
      setRevenue(TARGET_REVENUE);
      setApproved(true);
      setLogged(true);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setConfidence(Math.round(TARGET_CONFIDENCE * eased));
      setRevenue(Math.round(TARGET_REVENUE * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);

    const approveTimer = setTimeout(() => setApproved(true), duration + 500);
    const logTimer = setTimeout(() => setLogged(true), duration + 1100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(approveTimer);
      clearTimeout(logTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-2xl animate-float"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-from), var(--brand-to))",
        }}
      />

      <Card className="border-border/50 p-0">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Brain className="h-4 w-4 text-primary" />
            AI RECOMMENDATION · ACT-001
          </div>
          <Badge variant={approved ? "default" : "secondary"}>
            {approved ? "Approved" : "Pending review"}
          </Badge>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div>
            <h3 className="font-semibold leading-snug">Bundle Opportunity</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Customers buying <strong>Running Shoes</strong> frequently add{" "}
              <strong>Sports Socks</strong> in the same session.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/60 bg-muted/40 p-3">
              <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                Confidence
              </p>
              <p className="mt-1 text-xl font-bold tabular-nums">
                {confidence}%
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/40 p-3">
              <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                Expected Revenue
              </p>
              <p className="mt-1 flex items-center gap-1 text-xl font-bold tabular-nums">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                ₹{revenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors duration-500 ${
              logged
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-border/60 bg-muted/30 text-muted-foreground"
            }`}
          >
            {logged ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <ShieldCheck className="h-4 w-4 shrink-0" />
            )}
            {logged
              ? "Logged to Audit Trail — fully explainable"
              : "Awaiting merchant decision…"}
          </div>
        </div>
      </Card>
    </div>
  );
}