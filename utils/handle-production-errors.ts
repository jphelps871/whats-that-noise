const requireEnv = (value: string | undefined, provider: string) => {
  if (!value) throw new Error(`Missing ${provider} OAuth environment variable`);
  return value
}

export { requireEnv }