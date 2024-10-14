<script setup>
import { onMounted, ref } from 'vue'
import ClientLayout from "@/components/layout/ClientLayout.vue";
import { Button } from '@/components/ui/button';
import { ApiWrapper } from '@/helpers/apiWrapper';
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import * as z from 'zod';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { LoaderCircle, ChevronLeft } from 'lucide-vue-next';
import { Textarea } from '@/components/ui/textarea'
import { useUserStore } from '@/stores'

const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
    address: z.string().optional(),
}));

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    isLoading.value = true
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("phone", values.phone);
    form_data.append("address", values.address);

    try {
        const response = await ApiWrapper("user/update", form_data);

        if (response.success == 1) {
            isLoading.value = false
            toast.success(response.message)
            useUserStore().setUserDetails({
                name: values.name,
                phone: values.phone,
                address: values.address,
                email: values.email
            })
        }
        else {
            isLoading.value = false
        }

    } catch (e) {
        isLoading.value = false
        console.error("Error sending OTP:", e);
    }
});

const userDetails = async () => {
    try {
        const response = await ApiWrapper("user/detail");

        if (response.success == 1) {
            const { name, email, phone, address } = response.data;
            form.setValues({
                name,
                email,
                phone,
                address: address || '',
            });
            useUserStore().setUserDetails(response.data)
        }

    } catch (e) {
        console.error("Error sending OTP:", e);
    }
}

onMounted(() => {
    userDetails()
});
</script>

<template>
    <ClientLayout>
        <Button variant="outline" size="icon" class="max-w-8 max-h-8">
            <router-link to="/">
                <ChevronLeft class="w-3.5 h-3.5" />
            </router-link>
        </Button>
        <form class="space-y-6 w-full" @submit="onSubmit">
            <Avatar
                class="min-w-44 min-h-44 max-w-44 max-h-44 mx-auto border relative border-dashed rounded-full border-border flex items-center justify-center">
                <AvatarImage src="" alt="profile" class="w-full h-full object-cover absolute inset-0 rounded-full" />
                <AvatarFallback>Upload Picture</AvatarFallback>
            </Avatar>
            <div class="space-y-5">
                <div class="space-y-3.5">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="ex. jhone doe" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="ex. jhone@doe.com" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="phone">
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="ex. +91 9876543210" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="address">
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="ex. 123, street name, city, state, pincode"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <div class="space-y-2">
                    <Button class="w-full">
                        <LoaderCircle v-if="isLoading" class="w-4 h-4 animate-spin" />
                        Save
                    </Button>
                    <Button variant="outline" class="w-full" as-child>
                        <router-link to="/" class="flex items-center">
                            <ChevronLeft class="w-4 h-4 mr-2" />
                            Back
                        </router-link>
                    </Button>
                </div>
            </div>
        </form>
    </ClientLayout>
</template>