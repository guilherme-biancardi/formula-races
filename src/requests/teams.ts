import { useAppStore } from '@/stores/app';
import {
  apiRequest,
  useGetRequest,
  type BaseApiRequest,
  type BaseApiResponse
} from '@/ts/modules/request';

const appStore = useAppStore();

export type Constructor = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type ConstructorStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
};

export type GetConstructorsStandingsResponse = BaseApiResponse<
  {
    StandingsLists: {
      ConstructorStandings: ConstructorStanding[];
    }[];
  },
  'StandingsTable'
>;

export const getConstructorsStandingsRequest = (params?: BaseApiRequest) => {
  const { url } = useGetRequest(`/${appStore.getSeason}/constructorstandings`, params);
  return apiRequest<GetConstructorsStandingsResponse>(url).get();
};
