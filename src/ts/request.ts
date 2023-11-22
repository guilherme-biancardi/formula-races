import axios from 'axios';

export const useRequest = () => ({
  request: axios.create({ baseURL: import.meta.env.VITE_API_URL })
});
