<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ClientLayout from "@/components/layout/ClientLayout.vue";
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  currentTime.value = `${hours}:${minutes}:${seconds} ${ampm}`;
};

onMounted(() => {
  updateTime();
  const interval = setInterval(updateTime, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});

const animateButton = (event) => {
  const button = event.target;
  gsap.fromTo(button,
    { scale: 1 },
    {
      scale: 0.75,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      overwrite: true
    }
  );
};
</script>

<template>
  <ClientLayout>
    <div class="h-full w-full flex flex-col justify-between gap-4">
      <div></div>
      <div class="w-full flex items-center justify-center">
        <Button class="box" @click="animateButton" variant="secondary">
          Secondary
        </Button>
      </div>
      <div>
        <p class="text-center text-sm text-muted-foreground">{{ currentTime }}</p>
      </div>
    </div>
  </ClientLayout>
</template>
