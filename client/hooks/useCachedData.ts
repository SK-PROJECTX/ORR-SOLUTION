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

  const fetchUrlRef = useRef(fetchUrl);
  const processDataRef = useRef(processData);

  useEffect(() => {
    fetchUrlRef.current = fetchUrl;
    processDataRef.current = processData;
  }, [fetchUrl, processData]);

  const fetchData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setError(null);

      // Extract lang from URL if present to set Accept-Language header
      const url = new URL(fetchUrlRef.current);
      const lang = url.searchParams.get('lang') || 'en';

      const response = await fetch(fetchUrlRef.current, {
        headers: {
          'Accept-Language': lang
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${fetchUrlRef.current}`);
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
  }, [cacheKey]);

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
