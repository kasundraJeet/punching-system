import { toast } from 'vue-sonner'
import axios from 'axios'
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()

export const ApiWrapper = async (url, body) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/${url}`, body, {
      headers: {
        token: authStore.sessionToken || null
      }
    })

    return response.data
  } catch (e) {
    if (e.status == 401) {
      authStore.deleteCookie('sessionToken')
      authStore.deleteCookie('sessionId')
    } else {
      toast.error(e.response?.data?.message || e.message)
      throw e
    }
  }
}
