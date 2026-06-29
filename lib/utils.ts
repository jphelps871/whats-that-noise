import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const requireEnv = (value: string | undefined, provider: string) => {
  if (!value) throw new Error(`Missing ${provider} OAuth environment variable`);
  return value
}

export const fetcher = (url: RequestInfo | URL, init?: RequestInit) =>
  fetch(url, init).then((res) => res.json());

export { cn, requireEnv }