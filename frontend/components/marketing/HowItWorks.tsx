import { Brain, ShieldCheck, UserCheck } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Recommend",
    description:
      "The AI engine scans your catalog, checkout sessions and customer activity for revenue opportunities.",
    icon: Brain,
  },
  {
    number: "02",
    title: "Approve",
    description:
      "You review the reasoning, confidence score and expected revenue — then approve or reject it.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Audit",
    description:
      "Every decision — approved, rejected or executed — is permanently logged with full reasoning.",
    icon: ShieldCheck,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-y border-border/60 bg-muted/30 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-wide text-primary">
            THE LOOP
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Every AI action follows the same accountable loop.
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          {/* connecting line */}
          <div
            aria-hidden
            className="absolute top-6 left-0 right-0 hidden h-px bg-border/80 md:block"
          />

          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 120} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full brand-gradient text-sm font-bold text-white shadow-pop">
                {step.number}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <step.icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{step.title}</h3>
              </div>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}