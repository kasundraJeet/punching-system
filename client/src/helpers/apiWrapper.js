import { toast } from 'vue-sonner'
import { fetchWrapper } from '@/helpers/apiconfing'

export const ApiWrapper = async (url, method, body = {}) => {
  try {
    const response = await fetchWrapper({
      method: method,
      url: url,
      data: body
    })

    return response.data
  } catch (e) {
    toast.error(e.response?.data?.message || e.message)
    throw e
  }
}
