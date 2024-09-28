<script setup>
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
console.log(import.meta.env.VITE_API_URL)
</script>

<template>
  <Toaster />
  <RouterView />
</template>