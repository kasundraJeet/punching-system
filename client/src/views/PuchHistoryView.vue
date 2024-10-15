<script setup>
import { Calendar } from '@/components/ui/calendar'
import { ref, onMounted } from 'vue';
import { getLocalTimeZone, today } from '@internationalized/date'
import ClientLayout from "@/components/layout/ClientLayout.vue";
import { ApiWrapper } from '@/helpers/apiWrapper';

const puchingInData = ref('')
const value = ref(today(getLocalTimeZone()))

const checkPuchHistory = async () => {
    try {
        const response = await ApiWrapper("puch-histoy");

        if (response.success == 1) {
            puchingInData(response.data.punchRecords)
        }

    } catch (e) {
        console.error(e);
    }
}

onMounted(() => {
    checkPuchHistory()
});
</script>

<template>
    <ClientLayout>
        <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" />
    </ClientLayout>
</template>