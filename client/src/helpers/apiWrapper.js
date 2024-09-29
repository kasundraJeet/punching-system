import { toast } from 'vue-sonner'
import { fetchWrapper } from '@/helpers/apiconfing'

export const ApiWrapper = async (url, body) => {
  try {
    const response = await fetchWrapper.post(`${import.meta.env.VITE_API_URL}/${url}`, body)

    return response.data
  } catch (e) {
    toast.error(e.response?.data?.message || e.message)
    throw e
  }
}
