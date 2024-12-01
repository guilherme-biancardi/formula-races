import { createFetch } from '@vueuse/core';

export type BaseApiResponse<T, K extends string> = {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & { [key in K]: T };
};

export type BaseApiRequest = {
  limit?: number;
};

export const useGetRequest = (url: string, params: object = {}): { url: string } => {
  const urlParams = new URLSearchParams({ format: 'json', ...params } as Record<string, string>);

  return {
    url: `${url}?${urlParams}`
  };
};

export const apiRequest = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async afterFetch(ctx) {
      ctx.data = await ctx.response.json();
      return ctx;
    }
  }
});
