/**
 * BFF client helper.
 *
 * The client performs POST requests against the BFF routes and returns typed
 * response envelopes so feature services can stay thin and predictable.
 */
import type { BffResponse } from "@/lib/api/bff/BffResponse";

/**
 * Sends a POST request to a BFF endpoint and parses the JSON response.
 *
 * @param url - Absolute or relative BFF endpoint URL.
 * @param body - Request payload containing the action, params, and optional data.
 * @param init - Optional fetch overrides.
 * @returns The typed BFF response payload.
 */
export async function apiClient<TRes>(
  url: string,
  body: { action: string; params?: Record<string, unknown>; data?: unknown },
  init?: RequestInit,
): Promise<BffResponse<TRes>> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    body: JSON.stringify(body),
    credentials: "include",
    ...init,
  });

  return (await response.json()) as BffResponse<TRes>;
}
