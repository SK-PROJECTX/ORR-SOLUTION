"use client";

import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

export default function ProfileOverview() {
  const { t } = useLanguage();
  return (
    <div className="text-foreground">
      <h1 className="text-3xl font-bold mb-6">{interpolate(t.dashboard.profile.overview)}</h1>
      <div className="bg-card p-6 rounded-lg">
        <p>{interpolate(t.dashboard.profile.overviewPlace)}</p>
      </div>
    </div>
  );
}