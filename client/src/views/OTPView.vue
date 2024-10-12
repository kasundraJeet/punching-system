<script setup>
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LoaderCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import { ApiWrapper } from '@/helpers/apiWrapper';
import {
    PinInput,
    PinInputGroup,
    PinInputInput,
} from '@/components/ui/pin-input';
import { useRouter } from 'vue-router';

const router = useRouter()

const isLoading = ref(false)

const value = ref([])
const handleComplete = (e) => console.log(e.join(''))

async function onSubmit() {
    // isLoading.value = true
    // const form_data = new FormData();
    // form_data.append("otp", value.value.join(''));

    // try {
    //     const response = await ApiWrapper("auth/send-otp", form_data);

    //     if (response.success == 1) {
    //         router.push({ name: "otp" })
    //         isLoading.value = false
    //         toast.success(response.message)
    //     }
    //     else {
    //         isLoading.value = false
    //     }

    // } catch (e) {
    //     isLoading.value = false
    //     console.error("Error sending OTP:", e);
    // }
}
</script>

<template>
    <ScrollArea as="main">
        <div class="flex items-center w-full h-dvh justify-center">
            <div class="lg:p-8">
                <div class="mx-auto flex w-full flex-col justify-center space-y-8 px-2 sm:w-[320px]">
                    <div class="flex flex-col space-y-2 text-center">
                        <h1 class="text-2xl font-semibold tracking-tight">
                            Verify Your Email Id
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            Please enter the OTP sent to your email to continue.
                        </p>
                    </div>
                    <div class="w-full">
                        <form class="w-full" @submit.prevent="onSubmit">
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