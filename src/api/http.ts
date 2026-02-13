import { http, isHttpError } from 'tosslib';

export async function fetchJson<T>(url: string): Promise<T> {
  try {
    return await http.get<T>(url);
  } catch (e) {
    if (isHttpError(e)) {
      console.error(e.message);
    }
    throw new Error('데이터를 불러오지 못했습니다.');
  }
}
