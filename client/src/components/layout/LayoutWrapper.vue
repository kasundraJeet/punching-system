<script setup>
import LayoutHeader from './LayoutHeader.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
    <main class="layout-wrapper">
        <LayoutHeader />
        <ScrollArea as="section" class="w-full h-full">

        </ScrollArea>
    </main>
</template>

<style>
.layout-wrapper {
    @apply divide-y divide-border w-full h-dvh flex flex-col
}
</style>