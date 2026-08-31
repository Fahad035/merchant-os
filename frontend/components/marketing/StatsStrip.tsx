import Reveal from "./Reveal";

const STATS = [
  { label: "Revenue tracked", value: "₹8.2L+" },
  { label: "AI opportunities surfaced", value: "5" },
  { label: "AI decisions audited", value: "100%" },
  { label: "Avg. conversion rate", value: "4.8%" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          From the live demo dashboard
        </p>

        <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80} className="text-center">
              <p className="text-3xl font-extrabold tracking-tight brand-gradient-text">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}