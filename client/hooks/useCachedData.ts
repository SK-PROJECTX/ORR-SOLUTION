'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

export function useCachedData<T>(
  cacheKey: string,
  fetchUrl: string,
  processData: (data: any) => T
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const processDataRef = useRef(processData);

  useEffect(() => {
    processDataRef.current = processData;
  }, [processData]);

  const fetchData = useCallback(async (isSilent = false) => {
    if (!fetchUrl) return;

    try {
      if (!isSilent) setLoading(true);
      setError(null);

      // Extract lang from URL safely (handles both absolute and relative)
      let lang = 'en';
      try {
        const url = new URL(fetchUrl, typeof window !== 'undefined' ? window.location.origin : undefined);
        lang = url.searchParams.get('lang') || 'en';
      } catch (e) {
        // Fallback for relative URLs or malformed strings
        const langMatch = fetchUrl.match(/[?&]lang=([^&]+)/);
        if (langMatch) lang = langMatch[1];
      }

      const response = await fetch(fetchUrl, {
        headers: {
          'Accept-Language': lang
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${fetchUrl}`);
      }
      
      const result = await response.json();
      if (result.success) {
        const processed = processDataRef.current(result.data);
        setData(processed);
        
        // Update cache
        if (typeof window !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(processed));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(`Error fetching ${cacheKey}:`, err);
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [cacheKey, fetchUrl]);

  useEffect(() => {
    let hasCache = false;
    // Try to load from cache first
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setData(parsed);
          setLoading(false); // Stop showing full-page loading if we have cache
          hasCache = true;
          console.log(`📦 [useCachedData] Loaded cached data for key: ${cacheKey}`);
        } catch (e) {
          console.error(`Failed to parse cached ${cacheKey}`, e);
        }
      } else {
        // If no cache for this specific key, ensure we show loading
        setLoading(true);
      }
    }
    
    console.log(`🔄 [useCachedData] Fetching fresh data for key: ${cacheKey}`);
    fetchData(hasCache); // Silent fetch if we already have data from cache
  }, [cacheKey, fetchUrl, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
