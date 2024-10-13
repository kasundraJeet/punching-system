import { toast } from 'vue-sonner'
import axios from 'axios'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

export const ApiWrapper = async (url, body) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/${url}`, body, {
      headers: {
        'token': authStore.sessionToken || null
      }
    })

    if (response.data.success == 2) {
      authStore.setSessionToken(null)
      toast.error(response.data.message)
      router.push({ name: 'signIn' })
    } else {
      return response.data
    }
  } catch (e) {
    toast.error(e.response?.data?.message || e.message)
    throw e
  }
}
