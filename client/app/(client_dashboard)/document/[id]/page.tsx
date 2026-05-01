import React from 'react';
import DocumentViewerClient from './DocumentViewerClient';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '5' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const DOCUMENT_MAPPING: Record<string, { name: string, type: 'doc' | 'sheet' | 'slide' }> = {
  '1': { name: 'Strategic Roadmap 2026', type: 'doc' },
  '2': { name: 'Financial Projections Q3', type: 'sheet' },
  '3': { name: 'Board Presentation - April', type: 'slide' },
  '5': { name: 'Market Analysis - Global', type: 'doc' },
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const docInfo = DOCUMENT_MAPPING[id] || { name: 'Document', type: 'doc' };
  
  return <DocumentViewerClient id={id} type={docInfo.type} name={docInfo.name} />;
}
