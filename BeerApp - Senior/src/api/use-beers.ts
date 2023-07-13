import { useMemo } from 'react'
import { API, IMAGES_API, IMAGES_API_KEY } from './config';
import { ApiParams, Beer, ImageResponse, MetaResponse } from '../types';
import { unless, isNil, reject, isEmpty, either } from 'ramda';
import useSWR, { preload } from 'swr'
import { db } from '../utils/db';

const createFetcher = (headers?: HeadersInit) => (url: string) => fetch(url, { headers }).then((res) => res.json());
const rejectNilOrEmpty = unless(isNil, reject(either(isEmpty, isNil)));
const isLoading = (data: any, error: Error | object) => data === undefined && !error
const toBeer = (beer?: Beer, images?: ImageResponse): Beer | undefined => beer ? ({
  ...beer,
  images: images?.photos ?? [],
  favorite: false,
}) : undefined;
const toBeers = (beers?: Array<Beer>, meta?: MetaResponse) => ({
  items: beers ?? [],
  total: meta && parseInt(meta.total),
  page: meta && parseInt(meta.page),
  perPage: meta && parseInt(meta.per_page),
});

export function useBeers(params?: ApiParams) {
  const qs = new URLSearchParams(rejectNilOrEmpty(params as Record<string, any>) ?? '').toString();
  const key = useMemo(() => `${API}breweries?${qs}`, [qs]);
  const metaKey = useMemo(() => `${API}breweries/meta?${qs}`, [qs]);

  const { data: beers, error, mutate } = useSWR<Array<Beer>>(key, {
    fetcher: createFetcher(),
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  })

  const { data: metaData, error: metaError } = useSWR<MetaResponse>(metaKey, {
    fetcher: createFetcher(),
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  })

  const data = useMemo(() => toBeers(beers, metaData), [beers, metaData]);

  return {
    data,
    error: error || metaError,
    mutate,
    loading: isLoading(beers || metaData, error || metaError),
  }
}

export function useBeer(id?: string) {
  const key = useMemo(() => `${API}breweries/${id}`, [id]);
  const imagesKey = useMemo(() => `${IMAGES_API}search?query=craft%20beers&per_page=5`, []);

  const { data, error, mutate } = useSWR<Beer>(key, {
    fetcher: createFetcher(),
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
  const { data: images, error: imagesError } = useSWR<ImageResponse>(imagesKey, {
    fetcher: createFetcher({ Authorization: IMAGES_API_KEY ?? '' }),
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
  const beer = useMemo(() => {
    const beer = toBeer(data, images);
    beer && db.setBeer(beer);
    return beer;
  }, [data, images])

  return {
    data: beer,
    error: error || imagesError,
    mutate,
    loading: isLoading(beer, imagesError || error),
  }
}

export function preloadBeers() {
  const fetcher = createFetcher();
  preload(`${API}breweries`, fetcher);
  preload(`${API}breweries/meta`, fetcher);
  preload(`${API}breweries?per_page=15&page=1&by_name`, fetcher);
  preload(`${API}breweries/meta?per_page=15&page=1&by_name`, fetcher);
  preload(`${API}breweries?per_page=15&page=2&by_name`, fetcher);
  preload(`${API}breweries/meta?per_page=15&page=2&by_name`, fetcher);
  preload(`${API}breweries?per_page=15&page=3&by_name`, fetcher);
  preload(`${API}breweries/meta?per_page=15&page=3&by_name`, fetcher);
  preload(`${API}breweries?per_page=15&page=4&by_name`, fetcher);
  preload(`${API}breweries/meta?per_page=15&page=4&by_name`, fetcher);
  preload(`${API}breweries?per_page=15&page=5&by_name`, fetcher);
  preload(`${API}breweries/meta?per_page=15&page=5&by_name`, fetcher);
  preload(`${IMAGES_API}search?query=craft%20beers&per_page=5`, createFetcher({ Authorization: IMAGES_API_KEY ?? '' }));
}
