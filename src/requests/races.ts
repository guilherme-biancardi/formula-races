import { piniaInstance } from '@/stores';
import { useAppStore } from '@/stores/app';
import {
  apiRequest,
  useGetRequest,
  type BaseApiRequest,
  type BaseApiResponse
} from '@/ts/modules/request';
import type { Driver } from './drivers';
import type { Constructor } from './teams';

type CircuitLocation = {
  lat: string;
  long: string;
  locality: string;
  country: string;
};

type Circuit = {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: CircuitLocation;
};

export type Race = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
};

export type GetRacesResponse = BaseApiResponse<
  {
    Races: Race[];
  },
  'RaceTable'
>;

const appStore = useAppStore(piniaInstance);

export const getRacesRequest = (params?: BaseApiRequest) => {
  const { url } = useGetRequest(`/${appStore.getSeason}/races`, params);
  return apiRequest<GetRacesResponse>(url).get();
};

export type Result = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: {
    millis: string;
    time: string;
  };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
};

type GetResultByRoundRequest = BaseApiRequest & {
  round: number;
};

type GetResultsByDriver = BaseApiRequest & {
  driverId: string;
};

type GetResultsResponse = BaseApiResponse<
  {
    Races: (Race & { Results: Result[] })[];
  },
  'RaceTable'
>;

export const getResultByRoundRequest = ({ round, ...params }: GetResultByRoundRequest) => {
  const { url } = useGetRequest(`/${appStore.getSeason}/${round}/results`, params);
  return apiRequest<GetResultsResponse>(url).get();
};

export const getResultsByDriverRequest = ({ driverId, ...params }: GetResultsByDriver) => {
  const { url } = useGetRequest(`/${appStore.getSeason}/drivers/${driverId}/results`, params);
  return apiRequest<GetResultsResponse>(url).get();
};
