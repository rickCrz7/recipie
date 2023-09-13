<template>
    <div class="p-4 items center">
        <div class="flex justify-center m-4">
            <h1 class="text-4xl tracking-wider">RECIPIES</h1>
        </div>
        <div class="flex justify-center">
            <input
                v-model="input"
                type="text"
                class="border-2 border-gray-300 p-2 w-3/4 text-black rounded-md"
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
            <div v-for="recipie in recipies" :key="recipie.id">
                <div
                    class="bg-amber-400 text-gray-900 text-4xl tracking-widest py-10 px-4 rounded-t-md mt-2 flex justify-between items-center transition-all"
                >
                    <button
                        class="bg-white text-red-4 rounded-full flex items-ceter p-2 hover:bg-red-200"
                        @click="deleteRecipie(recipie.id)"
                    >
                        <i class="i-mdi:delete"></i>
                    </button>
                    {{ recipie.name }}
                    <div class="flex flex-col items-center">
                        <button
                            :key="recipie.id"
                            class="bg-white text-red-4 rounded-full flex items-ceter p-2 hover:bg-red-200"
                            @click="toggleShow()"
                        >
                            <i class="i-mdi:chef-hat"></i>
                            <i class="i-mdi:arrow-down"></i>
                        </button>
                    </div>
                </div>
                <div
                    v-if="show"
                    class="bg-amber-400 text-gray-900 text-4xl tracking-widest p-2 flex justify-center items-center transition-all"
                >
                    <input
                        v-model="ingredientInput"
                        type="text"
                        class="border-2 border-gray-300 p-2 w-3/4 text-black rounded-md"
                        placeholder="Add an ingredient"
                        @keyup.enter="addIngredient(recipie)"
                    />
                    <button
                        class="bg-white text-blue-900 font-semibold rounded-md ml-2 flex align-center p-1 hover:bg-blue-200"
                        @click="addIngredient(recipie)"
                    >
                        <i class="i-mdi:add"></i>
                    </button>
                </div>
                <div class="rounded-b-md bg-amber-400">
                    <div
                        v-for="ingredient in recipie.ingredients"
                        :key="ingredient.id"
                        class="text-gray-900 text-4xl tracking-widest py-4 px-4 flex justify-between items-center transition-all"
                    >
                        {{ ingredient.name }}
                        <button
                            class="bg-white text-red-4 rounded-full flex items-ceter p-2 hover:bg-red-200"
                            @click="deleteIngredient(ingredient.id)"
                        >
                            <i class="i-mdi:delete"></i>
                        </button>
                    </div>
                </div>
            </div>
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
const ingredientInput = ref('')
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
        name: ingredientInput.value
    })
    ingredientInput.value = ''
}

const deleteIngredient = (id: number) => {
    recipies.value.forEach((recipie) => {
        recipie.ingredients = recipie.ingredients.filter(
            (ingredient) => ingredient.id !== id
        )
    })
}

const toggleShow = () => {
    if (show.value) {
        show.value = false
        return
    } else {
        show.value = true
        return
    }
}

const deleteRecipie = (id: number) => {
    recipies.value = recipies.value.filter((recipie) => recipie.id !== id)
}
</script>
