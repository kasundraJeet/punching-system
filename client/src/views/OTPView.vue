<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoaderCircle } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import {
    PinInput,
    PinInputGroup,
    PinInputInput,
} from '@/components/ui/pin-input'

const isLoading = ref(false)

const value = ref(['1', '2', '3'])
const handleComplete = (e) => alert(e.join(''))

async function onSubmit(event) {
    console.log(event)
}
</script>

<template>
    <ScrollArea as="main">
        <div class="flex items-center w-full h-dvh justify-center">
            <div class="lg:p-8">
                <div class="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
                    <div class="flex flex-col space-y-2 text-center">
                        <h1 class="text-2xl font-semibold tracking-tight">
                            Verify Your Email Id
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            Please enter the OTP sent to your phone to continue.
                        </p>
                    </div>
                    <div class="w-full">
                        <form class="w-full" @submit="onSubmit">
                            <div class="flex flex-col items-center w-full gap-4">
                                <PinInput id="pin-input" v-model="value" placeholder="○" @complete="handleComplete">
                                    <PinInputGroup>
                                        <PinInputInput v-for="(id, index) in 6" :key="id" :index="index" />
                                    </PinInputGroup>
                                </PinInput>
                                <Button class="w-full" :disabled="isLoading">
                                    <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                    Confirm OTP
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>