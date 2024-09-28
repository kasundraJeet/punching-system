<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, CircleUserRound, Settings } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'

const navLinks = [
    {
        link_name: "Home",
        link_path: "/admin",
        is: 1
    },
    {
        link_name: "User",
        link_path: "/admin",
        is: 1
    }
]

const mode = useColorMode()
</script>

<template>
    <header class="layout-header">
        <ul class="flex items-center gap-2">
            <li v-for="(item, index) in navLinks" :key="index">
                <Button variant="link">
                    {{ item.link_name }}
                </Button>
            </li>
        </ul>
        <div class="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" size="icon">
                        <Icon icon="radix-icons:moon"
                            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Icon icon="radix-icons:sun"
                            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span class="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="mode = 'light'">
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="mode = 'dark'">
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="mode = 'auto'">
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger class="leading-none">
                    <Avatar>
                        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <CircleUserRound class="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings class="mr-2 h-4 w-4" />
                        Setting
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem class="text-red-400 cursor-pointer">
                        <LogOut class="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
</template>

<style>
.layout-header {
    @apply w-full py-2 px-3.5 flex items-center justify-between
}
</style>