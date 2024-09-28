import { useAuthStore } from '@/stores'
import axios from 'axios'
import { toast } from 'vue-sonner'
import router from '@/router'

function showNetworkStatusMessage(online) {
  if (online) {
    toast.success('Back online')
  } else {
    toast.error('Network error. Please check your internet connection.')
  }
}

window.addEventListener('online', () => showNetworkStatusMessage(true))
window.addEventListener('offline', () => showNetworkStatusMessage(false))

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}

function request(method) {
  return async (url, body = null) => {
    const requestOptions = {
      method,
      url,
      headers: {
        ...authHeader(url),
        'Content-Type': body ? 'application/json' : undefined
      }
    }

    if (body && method !== 'GET') {
      requestOptions.data = body
    }
    try {
      const response = await axios(requestOptions)
      return handleResponse(response)
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Network error. Please check your internet connection.'
      )
      return Promise.reject(error)
    }
  }
}

function authHeader(url) {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `${user.token}` }
  } else {
    return {}
  }
}

async function handleResponse(response) {
  const isJson = response.headers?.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : null

  if (data === null) {
    const error = 'Server error: No valid response data'
    return Promise.reject(error)
  }

  if (!response.ok) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status) && user) {
      logout()
    }

    const error = (data && data.message) || response.status
    return Promise.reject(error)
  }

  if (data.success === 2) {
    const { user, logout } = useAuthStore()
    if (user) {
      logout()
      router.push({ name: 'signIn' })
    }
    const error = 'Token error: Your Token Expire Please login!'
    return Promise.reject(error)
  }

  return data
}
