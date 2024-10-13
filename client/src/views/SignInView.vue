<script setup>
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Github, Plus } from 'lucide-vue-next';
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
} from '@/components/ui/form';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
}));

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    const form_data = new FormData();
    form_data.append("email", values.email);
    form_data.append("password", values.password);

    try {
        const response = await ApiWrapper("auth/sign-in", form_data);

        if (response.success == 1) {
            router.push({ name: "home" })
            isLoading.value = false
            authStore.setSessionToken(response.data.sessionToken)
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
                <div class="mx-auto flex w-full flex-col justify-center px-2 space-y-6 sm:w-[350px]">
                    <div class="flex flex-col space-y-2 text-center">
                        <h1 class="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p class="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <div class="space-y-6">
                        <form @submit="onSubmit">
                            <div class="grid gap-4">
                                <div class="w-full space-y-2">
                                    <FormField v-slot="{ componentField }" name="email" class="grid gap-1">
                                        <FormItem>
                                            <FormLabel class="sr-only" for="email"> Email</FormLabel>
                                            <FormControl>
                                                <div class="grid gap-1">
                                                    <Label class="sr-only" for="email">
                                                        Email
                                                    </Label>
                                                    <Input id="email" placeholder="name@example.com" type="email"
                                                        auto-capitalize="none" auto-complete="email" auto-correct="off"
                                                        :disabled="isLoading" v-bind="componentField" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                    <FormField v-slot="{ componentField }" name="password" class="grid gap-1">
                                        <FormItem>
                                            <FormLabel class="sr-only" for="password"> Password</FormLabel>
                                            <FormControl>
                                                <div class="grid gap-1">
                                                    <Label class="sr-only" for="password">
                                                        Password
                                                    </Label>
                                                    <Input id="password" placeholder="Password" type="password"
                                                        auto-capitalize="none" auto-complete="password"
                                                        auto-correct="off" :disabled="isLoading"
                                                        v-bind="componentField" />
                                                    <FormMessage />
                                                    <RouterLink to="/auth/forgot-password"
                                                        class="underline underline-offset-4 hover:text-primary text-sm text-muted-foreground text-end">
                                                        Forget Password?
                                                    </RouterLink>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    </FormField>
                                </div>
                                <Button :disabled="isLoading">
                                    <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                    Login
                                </Button>
                            </div>
                        </form>
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <span class="w-full border-t" />
                            </div>
                            <div class="relative flex justify-center text-xs uppercase">
                                <span class="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <Button variant="outline" type="button" class="w-full" :disabled="isLoading">
                                <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                <Github v-else class="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                            <Button variant="outline" type="button" class="w-full" :disabled="isLoading" as-child>
                                <RouterLink to="/auth/sign-up" class="flex items-center">
                                    <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                    <Plus v-else class="mr-2 h-4 w-4" />
                                    Create Account
                                </RouterLink>
                            </Button>
                        </div>
                    </div>
                    <p class="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our
                        <a href="/terms" class="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </a>
                        and
                        <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
                            Privacy Policy.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </ScrollArea>
</template>