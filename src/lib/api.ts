import type { ApiError, CheckResponse } from "./types";

// Thin client for the FreeOfCheck proxy. Never talks to openFDA directly (the
// server holds the key + handles CORS/caching/rate-limit).

export class ApiClientError extends Error {
  code: ApiError["code"] | "network";
  suggestions: string[];
  status: number;
  constructor(message: string, code: ApiClientError["code"], status: number, suggestions: string[] = []) {
    super(message);
    this.code = code;
    this.status = status;
    this.suggestions = suggestions;
  }
}

export async function checkDrug(drug: string, signal?: AbortSignal): Promise<CheckResponse> {
  let res: Response;
  try {
    res = await fetch(`/api/check?drug=${encodeURIComponent(drug)}`, { signal });
  } catch {
    throw new ApiClientError("Network error", "network", 0);
  }
  if (!res.ok) {
    let body: ApiError | undefined;
    try {
      body = (await res.json()) as ApiError;
    } catch {
      /* ignore */
    }
    throw new ApiClientError(
      body?.error ?? "Request failed",
      body?.code ?? "upstream_unavailable",
      res.status,
      body?.suggestions ?? [],
    );
  }
  return (await res.json()) as CheckResponse;
}

export async function fetchSuggestions(q: string, signal?: AbortSignal): Promise<string[]> {
  try {
    const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`, { signal });
    if (!res.ok) return [];
    const body = (await res.json()) as { suggestions?: string[] };
    return body.suggestions ?? [];
  } catch {
    return [];
  }
}
