'use client';

import { useState, useEffect, useCallback } from 'react';

interface MarketData {
  symbol: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  open: number;
  close: number;
  timestamp: number;
  change: number;
  changePercent: number;
}

interface MarketState {
  data: MarketData[];
  loading: boolean;
  error: string | null;
  lastUpdate: string;
}

export function useMarketData(refreshInterval: number = 30000) {
  const [state, setState] = useState<MarketState>({
    data: [],
    loading: true,
    error: null,
    lastUpdate: '',
  });

  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      const url = `/api/market${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        setState(prev => ({
          data: result.data,
          loading: false,
          error: null,
          lastUpdate: new Date().toISOString(),
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: result.error || 'Failed to fetch market data',
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Network error',
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return {
    ...state,
    refresh,
  };
}
