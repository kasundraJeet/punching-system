<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const navLinks = [
    {
        link_name: "Home",
        link_paht: "/admin",
        is: 1
    }
]
</script>

<template>
    <header class="layout-header">
        <ul class="flex items-center gap-2">
            <li v-for="(item, index) in navLinks" :key="index">
                <Button variant="link">
                    Link
                </Button>
            </li>
        </ul>
        <DropdownMenu>
            <DropdownMenuTrigger class="leading-none">
                <Avatar>
                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
</template>

<style>
.layout-header {
    @apply w-full py-2 px-3.5 flex items-center justify-between
}
</style>