import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfileView.vue')
    },
    {
      path: '/auth',
      children: [
        {
          path: 'sign-up',
          name: 'signUp',
          component: () => import('@/views/SignUpView.vue')
        },
        {
          path: 'sign-in',
          name: 'signIn',
          component: () => import('@/views/SignInView.vue')
        },
        {
          path: 'otp-send-successfully',
          name: 'otp-send-successfully',
          component: () => import('@/views/OTPSendView.vue')
        },
        {
          path: 'otp',
          name: 'otp',
          component: () => import('@/views/OTPView.vue')
        },
        {
          path: 'crete-password',
          name: 'crete-password',
          component: () => import('@/views/CretePassword.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/ForgotPassword.vue')
        }
      ]
    },
    {
      path: '/admin',
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        },
        {
          path: 'profile',
          name: 'adminProfile',
          component: () => import('@/views/ProfileView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  const publicPages = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/otp-send-successfully',
    '/auth/otp',
    '/auth/crete-password',
    '/auth/forgot-password'
  ]
  const authPage = !publicPages.includes(to.path)
  if (authPage && !authStore.sessionToken) {
    return '/auth/sign-in'
  }
  if (authStore.sessionToken && !authPage) {
    return '/'
  }
})

export default router
