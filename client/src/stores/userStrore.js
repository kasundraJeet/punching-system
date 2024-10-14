import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const userDetails = ref('')

  function setUserDetails(details) {
    userDetails.value = details
  }

  return { userDetails, setUserDetails }
})
