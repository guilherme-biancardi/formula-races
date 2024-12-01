import {
  apiRequest,
  useGetRequest,
  type BaseApiRequest,
  type BaseApiResponse
} from '@/ts/modules/request';

export type Season = Record<'season' | 'url', string>;

type GetSeasonsResponse = BaseApiResponse<{ Seasons: Season[] }, 'SeasonTable'>;

export const getSeasonsRequest = (params?: BaseApiRequest) => {
  const { url } = useGetRequest('/seasons', params);
  return apiRequest<GetSeasonsResponse>(url).get();
};
