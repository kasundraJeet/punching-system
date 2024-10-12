<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(30)
let interval = null

const startCountdown = () => {
    interval = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
            if (countdown.value == 5) {
                toast.info('OTP will be expired in 5 seconds')
            }
        } else {
            clearInterval(interval)
        }
    }, 1000)
}


onMounted(() => {
    startCountdown()
})

onBeforeUnmount(() => {
    clearInterval(interval)
})
</script>

<template>
    <main class="flex flex-col items-center justify-center h-dvh space-y-6">
        <div class="space-y-2">
            <h1 class="text-2xl font-semibold tracking-tight">OTP Sent Successfully</h1>
            <p class="text-sm text-muted-foreground">Please check your email for the OTP</p>
        </div>
        <div class="space-y-2">
            <Button class="w-full" :disabled="countdown == 0" @click="router.push({ name: 'otp' })">
                Verify OTP {{ countdown > 0 ? `(${countdown})` : '' }}
            </Button>
            <Button variant="outline" :disabled="countdown > 0" class="w-full"
                @click="router.push({ name: 'signUp' })">Cancel</Button>
        </div>
    </main>
</template>
