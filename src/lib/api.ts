export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new HttpError(response.status, `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function isNotFound(error: unknown): boolean {
  return error instanceof HttpError && error.status === 404;
}
