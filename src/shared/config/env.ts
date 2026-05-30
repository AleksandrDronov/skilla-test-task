const requireEnv = (value: string | undefined, name: string): string => {
  if (!value?.trim()) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value.trim()
}

const parseCallsLimit = (value: string | undefined) => {
  const parsed = Number(value ?? 50)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 50
  }

  return parsed
}

export const env = {
  apiBaseUrl: requireEnv(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL'),
  apiToken: requireEnv(import.meta.env.VITE_API_TOKEN, 'VITE_API_TOKEN'),
  apiCallsLimit: parseCallsLimit(import.meta.env.VITE_API_CALLS_LIMIT),
}
