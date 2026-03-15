'use client';
import { useState, useEffect, useCallback } from 'react';

export function useCachedData<T>(
  cacheKey: string,
  fetchUrl: string,
  processData: (data: any) => T
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setError(null);

      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${fetchUrl}`);
      }
      
      const result = await response.json();
      if (result.success) {
        const processed = processData(result.data);
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
      setLoading(false);
    }
  }, [cacheKey, fetchUrl, processData]);

  useEffect(() => {
    // Try to load from cache first
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setData(parsed);
          setLoading(false); // Stop showing full-page loading if we have cache
        } catch (e) {
          console.error(`Failed to parse cached ${cacheKey}`, e);
        }
      }
    }
    
    fetchData(!!data); // Silent fetch if we already have data from cache
  }, [cacheKey, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
