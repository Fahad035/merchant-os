import api from "./api";

import {
  Campaign,
  CampaignListResponse,
} from "@/types/campaign";

export async function getCampaigns(): Promise<CampaignListResponse> {
  const { data } =
    await api.get<CampaignListResponse>(
      "/campaigns"
    );

  return data;
}

export async function getRunningCampaigns(): Promise<Campaign[]> {
  const { data } =
    await api.get<Campaign[]>(
      "/campaigns/running"
    );

  return data;
}

export async function getDraftCampaigns(): Promise<Campaign[]> {
  const { data } =
    await api.get<Campaign[]>(
      "/campaigns/drafts"
    );

  return data;
}