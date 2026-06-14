import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const requireEnv = (value: string | undefined, provider: string) => {
  if (!value) throw new Error(`Missing ${provider} OAuth environment variable`);
  return value
}

export { cn, requireEnv }