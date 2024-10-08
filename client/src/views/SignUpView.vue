<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Github } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { ApiWrapper } from '@/helpers/apiWrapper';

const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
}));

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    const from_data = new FormData()
    from_data.append("email", values.email)
    const data = ApiWrapper("auth/send-otp", from_data)
    console.log(data)
})
</script>

<template>
    <ScrollArea as="main">
        <div class="flex items-center w-full h-dvh justify-center">
            <div class="lg:p-8">
                <div class="mx-auto flex w-full flex-col justify-center space-y-6 px-2 sm:w-[350px]">
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
                            <div class="grid gap-2">
                                <FormField v-slot="{ componentField }" name="email" class="grid gap-1">
                                    <FormItem>
                                        <FormLabel class="sr-only" for="email"> Email</FormLabel>
                                        <FormControl>
                                            <Input id="email" placeholder="name@example.com" type="email"
                                                :disabled="isLoading" v-bind="componentField" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </FormField>
                                <Button :disabled="isLoading">
                                    <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                    Sign In with Email
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
                        <Button variant="outline" type="button" class="w-full" :disabled="isLoading">
                            <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                            <Github v-else class="mr-2 h-4 w-4" />
                            GitHub
                        </Button>
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