import api from "./api";

import { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings> {
  const { data } = await api.get<Settings>(
    "/settings"
  );

  return data;
}

export async function updateSettings(
  settings: Settings
): Promise<Settings> {
  const { data } = await api.put<Settings>(
    "/settings",
    settings
  );

  return data;
}