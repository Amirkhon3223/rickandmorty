<template>
  <div class="card flex space-x-2 px-5 bg-gray-800 rounded-lg shadow-md shadow-amber-200 text-white">
    <img :src="character.image"
         alt="Character Image"
         class="w-fit object-cover mr-4"
    />
    <div class="space-y-4">
      <h2 class="text-3xl font-bold">
        {{ character.name }}
      </h2>
      <p class="flex text-xl items-center">
        <span :class="statusClass"
              class="w-3 h-3 rounded-full mr-2"></span>
        {{ character.status }} - {{ character.species }}
      </p>
      <p class="text-lg">
        <strong>Last known location:</strong> {{ character.location.name }}
      </p>
      <p class="text-lg">
        <strong>First seen in:</strong> {{ character.origin.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import type { Character } from '@/models/Character'

const props = defineProps<{ character: Character }>()

const statusClass = computed(() => {
  return {
    'bg-green-500': props.character.status === 'Alive',
    'bg-red-500': props.character.status === 'Dead',
    'bg-gray-500': props.character.status === 'unknown'
  }
})
</script>

<style scoped>
.card {
  @apply bg-gray-800 rounded-lg shadow-md p-4 text-white;
}
</style>
