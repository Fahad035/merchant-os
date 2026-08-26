import MarketingNavbar from "@/components/marketing/MarketingNavbar";
import Hero from "@/components/marketing/Hero";
import StatsStrip from "@/components/marketing/StatsStrip";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import HowItWorks from "@/components/marketing/HowItWorks";
import DemoShowcase from "@/components/marketing/DemoShowcase";
import PricingTeaser from "@/components/marketing/PricingTeaser";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />
      <Hero />
      <StatsStrip />
      <FeatureGrid />
      <HowItWorks />
      <DemoShowcase />
      <PricingTeaser />
      <MarketingFooter />
    </div>
  );
}