"use client";

import { useState, useEffect } from "react";
import { Star, FolderOpen, Download, Loader2 } from "lucide-react";
import { useDocumentStore } from "@/store/documentStore";

export default function DocumentVault() {
  const { documents, isLoading, fetchDocuments, toggleFavorite, downloadDocument } = useDocumentStore();
  const [localFavorites, setLocalFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleToggleFavorite = async (id: number) => {
    await toggleFavorite(id);
    setLocalFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleFolderClick = (id: number) => {
    console.log('Open folder for document:', id);
  };

  const handleDownloadClick = async (id: number) => {
    await downloadDocument(id);
  };

  const grouped = {
    Project: documents.filter((doc) => doc.document_type === "project"),
    Engagement: documents.filter((doc) => doc.document_type === "engagement"),
    Stage: documents.filter((doc) => doc.document_type === "stage"),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full px-10 py-10 bg-background text-foreground relative">
        <h1 className="text-xl font-semibold mb-8 text-lemon">Document Vault</h1>
        <div className="bg-card rounded-xl p-10 w-full min-h-[600px] flex items-center justify-center">
          <div className="flex items-center gap-2 text-foreground/70">
            <Loader2 className="animate-spin" size={20} />
            Loading documents...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-10 py-10 bg-background text-foreground relative">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-8 text-lemon">Document Vault</h1>

      {/* Main container */}
      <div className="bg-card rounded-xl p-10 w-full min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 */}
          <div>
            <h2 className="text-sm mb-3 opacity-70">Project</h2>
            <div className="space-y-6">
              {grouped.Project.map((item) => (
                <DocCard 
                  key={item.id} 
                  data={item} 
                  isFavorite={localFavorites.has(item.id)}
                  onToggleFavorite={() => handleToggleFavorite(item.id)}
                  onFolderClick={() => handleFolderClick(item.id)}
                  onDownloadClick={() => handleDownloadClick(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-sm mb-3 opacity-70">Engagement</h2>
            <div className="space-y-6">
              {grouped.Engagement.map((item) => (
                <DocCard 
                  key={item.id} 
                  data={item} 
                  isFavorite={localFavorites.has(item.id)}
                  onToggleFavorite={() => handleToggleFavorite(item.id)}
                  onFolderClick={() => handleFolderClick(item.id)}
                  onDownloadClick={() => handleDownloadClick(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-sm mb-3 opacity-70">Stage</h2>
            <div className="space-y-6">
              {grouped.Stage.map((item) => (
                <DocCard 
                  key={item.id} 
                  data={item} 
                  isFavorite={localFavorites.has(item.id)}
                  onToggleFavorite={() => handleToggleFavorite(item.id)}
                  onFolderClick={() => handleFolderClick(item.id)}
                  onDownloadClick={() => handleDownloadClick(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------- CARD COMPONENT --------------------- */

function DocCard({ data, isFavorite, onToggleFavorite, onFolderClick, onDownloadClick }: {
  data: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onFolderClick: () => void;
  onDownloadClick: () => void;
}) {
  return (
    <div className="bg-lemon text-background p-5 rounded-lg relative shadow-md">
      {/* Star icon */}
      <button 
        onClick={onToggleFavorite}
        className="absolute right-4 top-4 hover:scale-110 transition-transform"
      >
        <Star 
          size={18} 
          className={`${isFavorite ? 'text-background' : 'text-background/70'}`} 
          fill={isFavorite ? 'currentColor' : 'none'}
        />
      </button>

      <h3 className="font-semibold text-[15px] mb-2 pr-8">{data.title}</h3>

      <p className="text-xs mb-1">
        <span className="font-semibold">Type:</span> {data.document_type} &nbsp;&nbsp;
        <span className="font-semibold">Size:</span> {data.file_size}
      </p>

      <p className="text-[10px] opacity-80 leading-tight mb-6">{data.description}</p>
      <div className="border-t border-foreground mb-5"/>

      {/* Footer icons */}
      <div className="flex justify-between items-center">
        
          <button 
            onClick={onFolderClick}
            className="hover:scale-110 transition-transform p-1"
            title="Open folder"
          >
            <FolderOpen size={18} className="text-background" />
          </button>
          <button 
            onClick={onDownloadClick}
            className="hover:scale-110 transition-transform p-1"
            title="Download"
          >
            <Download size={18} className="text-background" />
          </button>
        </div>
    </div>
  );
}
