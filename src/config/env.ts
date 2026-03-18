/**
 * Environment configuration module.
 *
 * This file validates the runtime environment with Zod and exposes a single
 * typed `env` object so the rest of the application never reads `process.env`
 * directly.
 */
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
