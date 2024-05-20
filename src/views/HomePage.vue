<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getCharacters } from '@/services/api'
import CharacterCard from '../components/CharacterCard.vue'
import type { Character } from '@/models/Character'

const name = ref('')
const status = ref('')
const page = ref(1)
const characters = ref<Character[]>([])

const fetchCharacters = async () => {
  const response = await getCharacters(page.value, name.value, status.value)
  characters.value = response.data.results
}

const applyFilters = () => {
  page.value = 1
  fetchCharacters()
}

const nextPage = () => {
  page.value++
  fetchCharacters()
}

const prevPage = () => {
  page.value--
  fetchCharacters()
}

onMounted(fetchCharacters)
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex py-5 mx-auto w-fit gap-5 mb-4">
      <input v-model="name"
             class="px-2 py-3 pl-8 rounded-md text-gray-300 focus:outline-0 bg-[#14284f] shadow-sky-900 border-sky-800 border-[1px] shadow-inner"
             placeholder="Name" type="text" />
      <select v-model="status" class="input">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button class="btn" @click="applyFilters">Apply</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <div class="flex justify-between mt-4">
      <button :disabled="page === 1" class="btn" @click="prevPage">Previous</button>
      <button class="btn" @click="nextPage">Next</button>
    </div>
  </div>
</template>