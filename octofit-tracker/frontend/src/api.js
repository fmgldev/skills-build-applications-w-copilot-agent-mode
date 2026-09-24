const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const browserHostname = typeof window === 'undefined' ? '' : window.location.hostname
const codespaceHostname = browserHostname.match(/^(.*)-5173\.app\.github\.dev$/)?.[1]
const codespaceName = configuredCodespaceName || codespaceHostname

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }
  return getItems(await response.json())
}
