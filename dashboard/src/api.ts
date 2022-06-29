import { ENDPOINTS, HOST } from './constants';
import store from './store';

export async function $fetch(
  endpoint: string,
  options: RequestInit = {},
  headers: HeadersInit = {}
) {
  return await fetch(HOST + endpoint, {
    headers: {
      Authorization: store.state.apiKey,
      ...headers,
    },
    ...options,
  });
}

export async function sendAction(action: string): Promise<void> {
  await $fetch(`${ENDPOINTS.ACTION}/${action}`, {
    method: 'POST',
  });
}

export default async function fetchStats(): Promise<void> {
  const response = await $fetch(ENDPOINTS.STATS);
  store.commit('setStats', await response.json());
}

export async function isKeyValid(key: string): Promise<boolean> {
  const response = await $fetch(
    ENDPOINTS.KEY,
    {},
    {
      Authorization: key,
    }
  );
  return response.status === 200;
}
