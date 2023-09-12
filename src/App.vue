<template>
    <div class="p-4 items center">
        <div class="flex justify-center m-4">
            <h1 class="text-4xl tracking-wider">RECIPIES</h1>
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
        <div class="container mx-auto p-12 min-h-screen flex flex-col">
            <ul>
                <li
                    v-for="recipie in recipies"
                    :key="recipie.id"
                    class="bg-amber-400 text-gray-900 text-4xl tracking-widest py-10 px-4 rounded-md mb-2 flex justify-between items-center shadow shadow-blue hover:shadow-md transition-all"
                >
                    {{ recipie.name }}
                    <div class="flex flex-col items-center">
                        <button
                            class="bg-white text-red-4 rounded-full flex items-ceter p-2 hover:bg-red-100"
                            @click="deleteRecipie(recipie.id)"
                        >
                            <i class="i-mdi:delete"></i>
                        </button>
                    </div>
                </li>
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

const deleteRecipie = (id: number) => {
    recipies.value = recipies.value.filter((recipie) => recipie.id !== id)
}
</script>
