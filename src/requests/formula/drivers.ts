import { useAppStore } from '@/stores/appStore';
import { pinia } from '@/ts';
import { createRequest, type ApiResponse } from '..';

const appStore = useAppStore(pinia);

interface GetDriversRequest {
  limit: number;
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
        DriverStandings: DriverStandings[]
      }
    ];
  };
}

const { axios, params, ...getDriversRequest } = createRequest<
  GetDriversRequest,
  ApiResponse<GetDriversResponse>
>(appStore.useApi, { limit: 1000 });

getDriversRequest.execute = () =>
  axios.get(`${appStore.getSeason}/driverStandings.json`, { params });

export { getDriversRequest };
