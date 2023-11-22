import { useRequest } from '@/ts/request';
import { type ApiResponse, type RequestFactory } from '..';

interface GetDriversRequest {
  season: number;
}

interface DriverConstructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
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
  Constructors: DriverConstructor[];
  Driver: Driver;
  points: string;
  position: string;
  wins: string;
}

export interface GetDriversResponse {
  StandingsTable: {
    StandingsLists: [
      {
        DriverStandings: DriverStandings[];
      }
    ];
  };
}

const { request } = useRequest();

export const getDriversRequest: RequestFactory<
  GetDriversRequest,
  ApiResponse<GetDriversResponse>
> = (params) => ({
  execute: () =>
    request.get(`${params.season}/driverStandings.json`, {
      params: {
        limit: 1000
      }
    })
});
