"use client";

import { useSettings } from "@/hooks/useSettings";

import ProfileCard from "@/components/settings/ProfileCard";
import BusinessSettings from "@/components/settings/BusinessSettings";
import AIPreferences from "@/components/settings/AIPreferences";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import SaveSettingsButton from "@/components/settings/SaveSettingsButton";

export default function SettingsPage() {
  const {
    settings,
    loading,
    saving,
    error,
    updateField,
    save,
  } = useSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        Loading settings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center p-10">
        No settings found.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Configure your MerchantOS workspace, AI behavior,
          notifications, security, and business profile.
        </p>

      </div>

      {/* Merchant */}

      <ProfileCard
        settings={settings}
        updateField={updateField}
      />

      {/* Business */}

      <BusinessSettings
        settings={settings}
        updateField={updateField}
      />

      {/* AI */}

      <AIPreferences
        settings={settings}
        updateField={updateField}
      />

      {/* Notifications */}

      <NotificationSettings
        settings={settings}
        updateField={updateField}
      />

      {/* Appearance */}

      <AppearanceSettings
        settings={settings}
        updateField={updateField}
      />

      {/* Security */}

      <SecuritySettings
        settings={settings}
        updateField={updateField}
      />

      {/* Save */}

      <SaveSettingsButton
        saving={saving}
        onSave={save}
      />

    </div>
  );
}