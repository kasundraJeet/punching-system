<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-vue-next';
import LayoutWrapper from "@/components/layout/LayoutWrapper.vue";

const formSchema = toTypedSchema(z.object({
    username: z.string().min(2).max(50),
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
    console.log('Form submitted!', values)
})
</script>

<template>
    <LayoutWrapper>
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
                        <p class="text-sm opacity-50"> Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>
                    <div class="w-full grid grid-cols-2 gap-4">
                        <FormField v-slot="{ componentField }" name="username">
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="username">
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="username">
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
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
</style>