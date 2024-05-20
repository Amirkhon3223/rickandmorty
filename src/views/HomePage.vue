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
    <div class="mx-auto w-fit">
      <div class="flex justify-between items-center gap-5 mb-4">
        <div class="flex space-x-2 justify-start items-center cursor-pointer w-fit h-fit">
          <p class="text-4xl font-bold text-white  pt-2">
            Рик и Морти
          </p>
        </div>
        <div class="relative">
          <input v-model="name"
                 class="px-2 py-5 pl-8 w-[500px] rounded-md text-gray-300 focus:outline-0 bg-[#14284f] shadow-sky-900 border-sky-800 border-[1px] shadow-inner"
                 placeholder="Name" type="text"
          />
        </div>
        <select v-model="status"
                class="px-8 py-5 rounded-md text-gray-300 focus:outline-0 bg-[#14284f] shadow-sky-900 border-sky-800 border-[1px] shadow-inner"
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <button
          class="px-8 py-5 rounded-md text-gray-300 focus:outline-0 bg-[#14284f] shadow-sky-900 border-sky-800 border-[1px] shadow-inner"
          @click="applyFilters"
        >
          Apply
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
      <CharacterCard v-for="character in characters"
                     :key="character.id"
                     :character="character" />
    </div>
    <div class="flex justify-between my-10">
      <button :disabled="page === 1"
              class="px-8 py-5 rounded-md text-gray-300 focus:outline-0 bg-[#14284f] shadow-sky-900 border-sky-800 border-[1px] shadow-inner"
              @click="prevPage"
      >
        Previous
      </button>
      <button
        class="px-8 py-5 rounded-md text-gray-300 focus:outline-0 bg-[#14284f] shadow-sky-900 border-sky-800 border-[1px] shadow-inner"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>