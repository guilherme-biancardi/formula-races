import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Request<Res> {
  execute: () => Promise<AxiosResponse<Res>>;
}

export interface ApiRequest {
  limit: number;
}

export interface ApiResponse<Res> {
  MRData: Res;
}

export type RequestFactory<Req, Res> = (params: Req, options?: AxiosRequestConfig) => Request<Res>;
