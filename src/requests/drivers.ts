import {
  apiRequest,
  useGetRequest,
  type BaseApiRequest,
  type BaseApiResponse
} from '@/ts/modules/request';
import type { Constructor } from './teams';
import { useAppStore } from '@/stores/app';
import { piniaInstance } from '@/stores';

const appStore = useAppStore(piniaInstance);

export type Driver = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};

export type DriverStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
};

export type GetDriversStandingsResponse = BaseApiResponse<
  {
    StandingsLists: {
      DriverStandings: DriverStanding[];
    }[];
  },
  'StandingsTable'
>;

export type GetDriversResponse = BaseApiResponse<
  {
    Drivers: Driver[];
  },
  'DriverTable'
>;

export const getDriversStandingsRequest = (params?: BaseApiRequest) => {
  const { url } = useGetRequest(`/${appStore.getSeason}/driverstandings`, params);
  return apiRequest<GetDriversStandingsResponse>(url).get();
};

export const getDriversRequest = (params?: BaseApiRequest) => {
  const { url } = useGetRequest(`/${appStore.getSeason}/drivers`, params);
  return apiRequest<GetDriversResponse>(url).get();
};
