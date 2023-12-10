import Environment from '../env.js';
import { Route } from '../interfaces/traefik.js';
import { HttpClient } from '../utils/httpClient.js';

const httpClient = new HttpClient({
  baseURL: Environment.TRAEFIK_API_URL,
});

export const getRoutes = async () => {
  const data = await httpClient.get<Array<Route>>('/http/routers');

  return data
    .filter((route) => route.tls !== undefined)
    .map((route) => ({
      ...route,
      rule: route.rule.replace('Host(`', '').replace('`)', ''),
    }));
};
