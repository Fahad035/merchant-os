"use client";

import { Card } from "@/components/ui/card";

import GenerateCampaignDialog from "@/components/campaigns/GenerateCampaignDialog";

import CampaignCard from "@/components/campaigns/CampaignCard";

import CampaignTable from "@/components/campaigns/CampaignTable";

import CampaignStats from "@/components/campaigns/CampaignStats";

import CampaignSearch from "@/components/campaigns/CampaignSearch";

import { useCampaigns } from "@/hooks/useCampaigns";

export default function CampaignsPage() {
  const {
    loading,
    error,

    campaigns,

    totalCampaigns,

    runningCount,

    totalExpectedRevenue,

    averageConfidence,

    search,

    setSearch,
  } = useCampaigns();

  if (loading) {
    return (
      <div className="p-8">
        Loading campaigns...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Campaign Manager
          </h1>

          <p className="text-muted-foreground mt-2">
            AI-powered campaign planning
            and marketing automation.
          </p>

        </div>

        <GenerateCampaignDialog />

      </div>

      <CampaignStats
        totalCampaigns={totalCampaigns}
        runningCampaigns={runningCount}
        expectedRevenue={
          totalExpectedRevenue
        }
        confidence={
          averageConfidence
        }
      />

      <Card className="p-6 border-primary">

        <div className="flex justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              🤖 AI Marketing Insight
            </h2>

            <p className="mt-3 text-muted-foreground">
              Weekend campaigns for
              inactive footwear customers
              have produced the highest
              projected conversion rate
              over the last 30 days.
            </p>

          </div>

        </div>

      </Card>

      <CampaignSearch
        value={search}
        onChange={setSearch}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
          />
        ))}

      </div>

      <Card className="p-6">

        <h2 className="mb-5 text-xl font-semibold">
          Campaign History
        </h2>

        <CampaignTable
          campaigns={campaigns}
        />

      </Card>

    </div>
  );
}