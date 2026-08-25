"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getCampaigns,
  getRunningCampaigns,
  getDraftCampaigns,
} from "@/lib/campaign-api";

import { Campaign } from "@/types/campaign";

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<
    Campaign[]
  >([]);

  const [running, setRunning] = useState<
    Campaign[]
  >([]);

  const [drafts, setDrafts] = useState<
    Campaign[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [
          allCampaigns,
          runningCampaigns,
          draftCampaigns,
        ] = await Promise.all([
          getCampaigns(),
          getRunningCampaigns(),
          getDraftCampaigns(),
        ]);

        setCampaigns(
          allCampaigns.campaigns
        );

        setRunning(
          runningCampaigns
        );

        setDrafts(
          draftCampaigns
        );
      } catch (err: any) {
        setError(
          err?.message ??
            "Unable to load campaigns."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredCampaigns =
    useMemo(() => {
      return campaigns.filter(
        (campaign) =>
          campaign.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          campaign.audience
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [campaigns, search]);

  const totalExpectedRevenue =
    useMemo(() => {
      return campaigns.reduce(
        (sum, campaign) =>
          sum +
          Number(
            campaign.expected_revenue
          ),
        0
      );
    }, [campaigns]);

  const averageConfidence =
    useMemo(() => {
      if (!campaigns.length)
        return 0;

      const total =
        campaigns.reduce(
          (sum, campaign) =>
            sum +
            campaign.confidence,
          0
        );

      return Math.round(
        total / campaigns.length
      );
    }, [campaigns]);

  return {
    loading,

    error,

    campaigns:
      filteredCampaigns,

    running,

    drafts,

    totalCampaigns:
      campaigns.length,

    runningCount:
      running.length,

    draftCount:
      drafts.length,

    totalExpectedRevenue,

    averageConfidence,

    search,

    setSearch,
  };
}