import React from "react";
import { Star, Folder, Download } from "lucide-react";

const FavouriteCard = ({ title }: { title: string }) => {
  return (
    <div className="bg-primary w-full p-5 rounded-xl text-background shadow-md relative">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg max-w-[80%] leading-tight text-background">{title}</h3>
        <Star className="w-5 h-5 text-background" />
      </div>

      <div className="flex items-center gap-6 text-sm mt-4 opacity-90">
        <p>Start: 05/25</p>
        <p>End: 05/27</p>
      </div>

      <p className="text-sm mt-2 opacity-90">
        Short description ashdovhohvdcbhev vydevcw trshvespdyfhosydhydh
      </p>

      <div className="w-full h-[1px] bg-background opacity-40 mt-4" />

      <div className="flex justify-between items-center mt-3">
        <Folder className="w-5 h-5 text-background" />
        <Download className="w-5 h-5 text-background" />
      </div>
    </div>
  );
};

export default function FavouritesPage() {
  const items = [
    "ORR decision-ready reports",
    "Project-specific deliverables",
    "Presentations or summaries",
    "Agreements or key reference docs.",
    "Agreements or key reference docs.",
    "Agreements or key reference docs.",
  ];

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-6">
      <div className=" w-full bg-card p-8 md:p-10 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-10 text-left text-primary">Favourites / Saved Items</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <FavouriteCard key={index} title={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
