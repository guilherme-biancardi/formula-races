import type { AxiosInstance, AxiosResponse } from "axios";

interface Request<Req, Res> {
  axios: AxiosInstance;
  params?: Req;
  execute: () => Promise<AxiosResponse<Res>>;
}

export interface ApiResponse<Res> {
  MRData: Res;
}

export const createRequest = <Req, Res>(axios: AxiosInstance, params?: Req) => <Request<Req, Res>>({
    axios,
    params, 
});
