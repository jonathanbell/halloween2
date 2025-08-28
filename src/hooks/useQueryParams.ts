import { useEffect, useState } from 'react';
import type { QueryParams } from '../types';

export const useQueryParams = (): QueryParams => {
  const [params, setParams] = useState<QueryParams>({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentCount = urlParams.get('currentCount');
    const initialCandyCount = urlParams.get('initialCandyCount');

    setParams({
      currentCount: currentCount ? parseInt(currentCount, 10) : undefined,
      initialCandyCount: initialCandyCount ? parseInt(initialCandyCount, 10) : undefined,
    });
  }, []);

  return params;
};

export const updateURLParam = (key: string, value: string | number): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value.toString());
  window.history.replaceState({}, '', url.toString());
};