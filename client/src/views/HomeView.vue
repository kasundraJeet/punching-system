<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import ClientLayout from "@/components/layout/ClientLayout.vue";
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ApiWrapper } from '@/helpers/apiWrapper';
import { useUserStore } from '@/stores';

const currentTime = ref('');
const ispunched = ref(false);
const ispunchedCompelete = ref(false);

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



const animateText = () => {
  nextTick(() => {
    const words = document.querySelectorAll('.animated-word');
    gsap.fromTo(words,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 }
    );
  });
};


watch(ispunched, (newValue) => {
  if (newValue) {
    animateText();
  }
});

const isLoading = ref(false)

const handlePuch = async (status) => {
  isLoading.value = true
  const form_data = new FormData();
  form_data.append("punchStatus", status);

  try {
    const response = await ApiWrapper("puch", form_data);

    if (response.success == 1) {
      isLoading.value = false
      ispunched.value = true
      puchChecker();
    }
    else {
      isLoading.value = false
    }

  } catch (e) {
    isLoading.value = false
    console.error("Error sending OTP:", e);
  }
};

const puchChecker = async () => {
  try {
    const response = await ApiWrapper("puch-check");

    if (response.success == 1) {
      isLoading.value = false
      ispunched.value = response.data.is_puching
      if (response.data.status == 2) {
        ispunchedCompelete.value = true
      }
    }
    else {
      isLoading.value = false
    }

  } catch (e) {
    isLoading.value = false
    console.error("Error sending OTP:", e);
  }
}

onMounted(() => {
  puchChecker()
});
</script>

<template>
  <ClientLayout>
    <div class="h-full w-full flex flex-col justify-between gap-4" v-if="!ispunchedCompelete">
      <div></div>
      <div class="w-full flex items-center justify-center">
        <Button class="box" @click="handlePuch(1)" variant="secondary" v-if="!ispunched">
          Puch In
        </Button>
        <Button class="box" @click="handlePuch(2)" variant="secondary" v-else>
          Puch Out
        </Button>
      </div>
      <div>
        <p class="text-center text-sm text-muted-foreground">{{ currentTime }}</p>
      </div>
    </div>
    <div class="h-full w-full flex flex-col justify-between gap-4" v-else>
      <div class="py-8">
        <h2>
          <span
            v-for="word in `Thank you, ${useUserStore().userDetails.name || 'User'} Your punch-in for today is complete. Enjoy your day!`.split(' ')"
            :key="word" class="animated-word">{{ word
            }}</span>
        </h2>
      </div>
    </div>
  </ClientLayout>
</template>

<style scoped>
h2 {
  @apply font-semibold text-2xl capitalize;
}

.animated-word {
  display: inline-block;
  margin-right: 8px;
  line-height: 2;
}
</style>
