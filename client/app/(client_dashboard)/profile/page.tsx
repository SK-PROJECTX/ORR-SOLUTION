import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

export default function Profile() {
  const { t } = useLanguage();
  return (
    <div className="text-foreground">
      <h1 className="text-3xl font-bold mb-6">{interpolate(t.dashboard.profile.title)}</h1>
      <div className="bg-card p-6 rounded-lg">
        <p>{interpolate(t.dashboard.profile.contentPlace)}</p>
      </div>
    </div>
  );
}