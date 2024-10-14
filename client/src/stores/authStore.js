import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  const sessionId = ref(getCookie('sessionId') || null)
  const sessionToken = ref(getCookie('sessionToken') || null)

  function setSessionId(id) {
    sessionId.value = id
    setCookie('sessionId', id, 7)
  }

  function setSessionToken(token) {
    sessionToken.value = token
    setCookie('sessionToken', token, 7)
  }

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  function setCookie(name, value, days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }

  return { sessionId, setSessionId, sessionToken, setSessionToken, deleteCookie }
})
