<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ApiWrapper } from '@/helpers/apiWrapper';
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod';
import { useRouter } from 'vue-router';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { useAuthStore } from '@/stores';


const router = useRouter()
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})
);

const authStore = useAuthStore()


const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    const form_data = new FormData();
    form_data.append("password", values.password);
    form_data.append("confirm_password", values.confirm_password);
    form_data.append("session_id", authStore.sessionId);

    try {
        const response = await ApiWrapper("auth/create-password", form_data);

        if (response.success == 1) {
            router.push({ name: "signIn" })
            isLoading.value = false
            toast.success(response.message)
        }
        else {
            isLoading.value = false
        }

    } catch (e) {
        isLoading.value = false
        console.error("Error sending OTP:", e);
    }
});
</script>

<template>
    <ScrollArea as="main">
        <div class="flex items-center w-full h-dvh justify-center">
            <div class="lg:p-8">
                <div class="mx-auto flex w-full flex-col justify-center space-y-8 px-2 sm:w-[350px]">
                    <div class="flex flex-col space-y-2 text-center">
                        <h1 class="text-2xl font-semibold tracking-tight">
                            Create an Password
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            Choose a strong password to secure your account.
                        </p>
                    </div>
                    <div class="space-y-6">
                        <form @submit="onSubmit">
                            <div class="grid gap-3">
                                <div class="w-full space-y-2">
                                    <FormField v-slot="{ componentField }" name="password" class="grid gap-1">
                                        <FormItem>
                                            <FormLabel class="sr-only" for="password"> Password</FormLabel>
                                            <FormControl>
                                                <Input id="password" placeholder="New Password" type="password"
                                                    :disabled="isLoading" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                    <FormField v-slot="{ componentField }" name="confirm_password" class="grid gap-1">
                                        <FormItem>
                                            <FormLabel class="sr-only" for="confirm_password"> Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="confirm_password" placeholder="Confirm Password"
                                                    type="password" :disabled="isLoading" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                </div>
                                <Button :disabled="isLoading">
                                    <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                    Save and Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>