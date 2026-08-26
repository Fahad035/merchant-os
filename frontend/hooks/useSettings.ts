"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getSettings,
  updateSettings,
} from "@/lib/settings-api";

import { Settings } from "@/types/settings";

export function useSettings() {
  const [settings, setSettings] =
    useState<Settings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function load() {
      try {
        const data =
          await getSettings();

        setSettings(data);
      } catch (err: any) {
        setError(
          err.message ??
            "Unable to load settings."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function save() {
    if (!settings) return;

    setSaving(true);

    try {
      const updated =
        await updateSettings(
          settings
        );

      setSettings(updated);
    } finally {
      setSaving(false);
    }
  }

  function updateField<
    K extends keyof Settings
  >(
    key: K,
    value: Settings[K]
  ) {
    if (!settings) return;

    setSettings({
      ...settings,
      [key]: value,
    });
  }

  return {
    settings,

    loading,

    saving,

    error,

    updateField,

    save,
  };
}