<script setup>
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-vue-next';
import LayoutWrapper from "@/components/layout/LayoutWrapper.vue";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    number: z.string().refine(value => /^\d+$/.test(value), {
        message: "Number must contain only digits",
    }),
    email: z.string().email().optional(),
});
const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
})
</script>

<template>
    <LayoutWrapper>
        <section class="space-y-6">
            <form @submit="onSubmit" class="grid grid-cols-4 w-full gap-3">
                <aside class="space-y-2">
                    <div class="form-section">
                        <div class="profile-avatar">
                            <Avatar class="absolute inset-0 w-full h-full object-cover rounded-full">
                                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <button>
                                <Plus />
                            </button>
                        </div>
                    </div>
                    <div class="form-section">
                        <Textarea placeholder="Type your Bio here..." class="min-h-32 resize-none rounded-xl" />
                    </div>
                </aside>
                <div class="col-span-3 space-y-2">
                    <div class="form-section">
                        <div class="space-y-1">
                            <h4 class="text-lg capitalize">Contact Information</h4>
                            <p class="text-sm opacity-50">Update your details to stay connected and receive important
                                notifications.</p>
                        </div>
                        <div class="w-full grid grid-cols-2 gap-y-4 gap-x-3">
                            <FormField v-slot="{ componentField }" name="name">
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="ex. Thor" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="number">
                                <FormItem>
                                    <FormLabel>Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="ex. 1800910920" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="email">
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="ex. youe@gmail.com" v-bind="componentField" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
                    </div>
                    <div class="form-section">
                        <div class="w-full flex items-stretch justify-end">
                            <Button variant="outline">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="grid grid-cols-2 gap-4">
                <div class="info-card">
                    <div class="space-y-1">
                        <h6 class="text-lg">Change Your Password</h6>
                        <p class="text-sm opacity-60">Ensure your account security by updating your password regularly.
                        </p>
                    </div>
                    <Button variant="secondary">Change Password</Button>
                </div>
                <div class="info-card">
                    <div class="space-y-1">
                        <h6 class="text-lg">Access Settings</h6>
                        <p class="text-sm opacity-60">Customize your preferences and manage your account <br />
                            settings.
                        </p>
                    </div>
                    <Button variant="secondary">Go to Setting</Button>
                </div>
            </div>
        </section>
    </LayoutWrapper>
</template>

<style scoped>
.form-section {
    @apply w-full rounded-2xl border border-solid border-border p-3.5 bg-card space-y-4
}

.profile-avatar {
    @apply border border-dashed border-border rounded-full relative min-w-56 min-h-56 max-w-56 max-h-56 mx-auto block
}

.profile-avatar button {
    @apply border border-solid border-border rounded-full min-w-12 min-h-12 flex items-center justify-center absolute bottom-2 right-2 bg-card
}

.info-card {
    @apply border border-solid border-border rounded-xl w-full bg-card p-3.5 flex items-end justify-between gap-4
}
</style>