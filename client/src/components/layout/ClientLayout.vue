<script setup>
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, CircleUserRound, Info } from 'lucide-vue-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<template>
    <main class="client-layout-wrapper">
        <ScrollArea class="w-full h-full">
            <div class="flex flex-col w-full h-dvh py-2 px-2.5">
                <div class="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon">
                        <Info class="w-5 h-5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger class="leading-none">
                            <Avatar class="max-w-9 max-h-9">
                                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-80">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem as-child>
                                <RouterLink to="/profile" class="flex items-center">
                                    <CircleUserRound class="mr-2 h-4 w-4" />
                                    Profile
                                </RouterLink>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="text-red-400 cursor-pointer">
                                <LogOut class="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div class="h-full w-full pt-2 px-4">
                    <slot />
                </div>
            </div>
        </ScrollArea>
    </main>
</template>

<style>
.client-layout-wrapper {
    @apply w-full mx-auto max-w-sm
}
</style>