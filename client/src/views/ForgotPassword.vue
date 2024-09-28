<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Github } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'

const isLoading = ref(false)

async function onSubmit(event) {
    console.log(event)
}
</script>

<template>
    <ScrollArea as="main">
        <div class="flex items-center w-full h-dvh justify-center">
            <div class="lg:p-8">
                <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div class="flex flex-col space-y-2 text-center">
                        <h1 class="text-2xl font-semibold tracking-tight">
                            Forgot Password
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            Enter your email below to new Password
                        </p>
                    </div>
                    <div class="space-y-6">
                        <form @submit="onSubmit">
                            <div class="grid gap-2">
                                <div class="grid gap-1">
                                    <Label class="sr-only" for="email">
                                        Email
                                    </Label>
                                    <Input id="email" placeholder="name@example.com" type="email" auto-capitalize="none"
                                        auto-complete="email" auto-correct="off" :disabled="isLoading" />
                                </div>
                                <Button :disabled="isLoading">
                                    <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                    Recover Password with Email
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>