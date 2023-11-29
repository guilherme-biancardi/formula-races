import { useRequest } from '@/ts/request';
import { type RequestFactory, type StandingsListsResponse } from '..';

interface GetTeamsRequest {
  season: number;
}

export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

export interface ConstructorStandings {
  Constructor: Constructor;
  points: string;
  position: string;
  positionText: string;
  wins: string;
}

export type GetTeamsResponse = StandingsListsResponse<{ ConstructorStandings: ConstructorStandings[] }>;

const { request } = useRequest();

export const getTeamsRequest: RequestFactory<GetTeamsRequest, GetTeamsResponse> = (params) => ({
  execute: () =>
    request.get(`${params.season}/constructorStandings.json`, {
      params: {
        limit: 1000
      }
    })
});
