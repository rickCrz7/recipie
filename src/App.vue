<template>
    <div class="p-4 items center">
        <div class="flex justify-center m-4">
            <h1 class="text-3xl tracking-wider">RECIPIES</h1>
        </div>
        <div class="flex justify-center">
            <input
                v-model="input"
                type="text"
                class="border-2 border-gray-300 p-2 w-1/2 text-black rounded-md"
                placeholder="Add a recipie"
                @keyup.enter="addRecipie"
            />
            <button
                class="bg-white text-blue-900 font-semibold p-2 rounded-lg ml-2"
                @click="addRecipie"
            >
                ADD
            </button>
        </div>
        <div class="p-12">
            <ul class="list-disc list-inside">
                <li v-for="recipie in recipies" :key="recipie.id">
                    {{ recipie.name }}
                </li>
                <!-- <button
                    class="bg-white text-blue-900 font-semibold p-2 rounded-lg ml-2"
                >
                    ADD INGREDIENTS
                </button> -->
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Recipie {
    id: number
    name: string
    ingredients: Ingredients[]
}

interface Ingredients {
    id: number
    recipieId: number
    name: string
}

const recipies = ref([] as Recipie[])
const input = ref('')
const show = ref(false)

const addRecipie = () => {
    recipies.value.push({
        id: recipies.value.length + 1,
        name: input.value,
        ingredients: []
    })
    input.value = ''
}

const addIngredient = (recipie: Recipie) => {
    recipie.ingredients.push({
        id: recipie.ingredients.length + 1,
        recipieId: recipie.id,
        name: input.value
    })
    input.value = ''
}
</script>
