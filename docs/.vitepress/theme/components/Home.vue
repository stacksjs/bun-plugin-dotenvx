<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // eslint-disable-next-line no-console
  console.log('HUGEICONS_TOKEN', import.meta.env.FRONTEND_HUGEICONS_TOKEN)
})
</script>

<template>
  <div class="flex flex-col items-center mt-4 home">
    <HomeTeam />

    <HomeSponsors />

    <HomeContributors />
  </div>
</template>
