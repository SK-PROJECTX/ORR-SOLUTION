import { useState, useEffect } from 'react';
import { cmsApi } from '@/lib/cms-api';

interface StrategicAdvisoryContent {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image: string;
  services_title: string;
  service_1_title: string;
  service_1_description: string;
  service_2_title: string;
  service_2_description: string;
  service_3_title: string;
  service_3_description: string;
  process_description?: string;
  process_title: string;
  process_subtitle?: string;
  process_step_1?: string;
  process_step_1_title?: string;
  process_step_1_subtitle?: string;
  process_step_2?: string;
  process_step_2_title?: string;
  process_step_3?: string;
  process_step_3_title?: string;
  case_challenge?: string;
  case_solution?: string;
  case_result?: string;
  case_image_alt?: string;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  
  // Network Advantage Section
  network_title?: string;
  network_description?: string;
  network_cards?: Array<{
    title: string;
    description: string;
    icon: string;
  }> | Array<{
    text: string;
    type: string;
  }>;

  // Digital Solutions Section
  digital_title?: string;
  digital_subtitle?: string;
  digital_description?: string;
  digital_image_alt?: string;
  digital_who_is_this_for?: (string | { text: string; type: string })[];
  digital_features?: (string | { text: string; type: string })[];

  meta_title: string;
  meta_description: string;
}

export function useStrategicAdvisoryContent() {
  const [content, setContent] = useState<StrategicAdvisoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('🔄 Fetching Strategic Advisory content...');
        setLoading(true);
        const response = await cmsApi.getStrategicAdvisoryContent();
        console.log('✅ Strategic Advisory API Response:', response);
        console.log('📊 Strategic Advisory Data:', response.data);
        setContent(response.data);
      } catch (err: any) {
        console.error('❌ Error fetching Strategic Advisory content:', err);
        setError(err.message || 'Failed to fetch Strategic Advisory content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}

export function useOperationalSystemsContent() {
  const [content, setContent] = useState<StrategicAdvisoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('🔄 Fetching Operational Systems content...');
        setLoading(true);
        const response = await cmsApi.getOperationalSystemsContent();
        console.log('✅ Operational Systems API Response:', response);
        console.log('📊 Operational Systems Data:', response.data);
        setContent(response.data);
      } catch (err: any) {
        console.error('❌ Error fetching Operational Systems content:', err);
        setError(err.message || 'Failed to fetch Operational Systems content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}

export function useLivingSystemsContent() {
  const [content, setContent] = useState<StrategicAdvisoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('🔄 Fetching Living Systems content...');
        setLoading(true);
        const response = await cmsApi.getLivingSystemsContent();
        console.log('✅ Living Systems API Response:', response);
        console.log('📊 Living Systems Data:', response.data);
        setContent(response.data);
      } catch (err: any) {
        console.error('❌ Error fetching Living Systems content:', err);
        setError(err.message || 'Failed to fetch Living Systems content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}