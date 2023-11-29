import { useRequest } from '@/ts/request';
import { type RequestFactory, type StandingsListsResponse } from '..';
import type { Constructor } from './teams';

interface GetDriversRequest {
  season: number;
}

interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
}

export interface DriverStandings {
  Constructors: Constructor[];
  Driver: Driver;
  points: string;
  position: string;
  wins: string;
}

export type GetDriversResponse = StandingsListsResponse<{ DriverStandings: DriverStandings[] }>;

const { request } = useRequest();

export const getDriversRequest: RequestFactory<
  GetDriversRequest,
  GetDriversResponse
> = (params) => ({
  execute: () =>
    request.get(`${params.season}/driverStandings.json`, {
      params: {
        limit: 1000
      }
    })
});
