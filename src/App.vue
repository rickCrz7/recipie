<template>
    <div class="p-4 items center">
        <div class="flex justify-center m-4">
            <h1 class="text-4xl tracking-wider">RECIPIES</h1>
        </div>
        <div class="container mx-auto p-12 min-h-screen flex flex-col">
            <div class="flex justify-center mb-2">
                <input
                    v-model="input"
                    type="text"
                    class="border-2 border-gray-300 p-2 w-full text-black rounded-md"
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
            <div v-for="recipie in recipies" :key="recipie.id">
                <div
                    class="bg-#ffe6a7 text-gray-900 text-4xl tracking-widest py-10 px-4 rounded-t-md mt-2 flex justify-between items-center transition-all"
                >
                    <button
                        v-if="!recipie.show"
                        class="rounded-full flex items-center p-2"
                        @click="deleteRecipie(recipie.id)"
                    >
                        <i class="i-mdi:delete invisible"></i>
                    </button>
                    <button
                        v-if="recipie.show"
                        class="hover:bg-white hover:text-black rounded-full flex items-center p-2 bg-#6f1d1b text-white"
                        @click="deleteRecipie(recipie.id)"
                    >
                        <i class="i-mdi:delete"></i>
                    </button>
                    {{ recipie.name }}
                    <div class="flex flex-col items-center">
                        <button
                            :key="recipie.id"
                            class="rounded-full flex items-ceter p-2 bg-#6f1d1b text-white"
                            @click="toggleShow(recipie)"
                        >
                            <i class="i-mdi:chef-hat"></i>
                            <i
                                v-if="!recipie.show"
                                class="i-mdi:arrow-down"
                            ></i>
                            <i v-if="recipie.show" class="i-mdi:arrow-up"></i>
                        </button>
                    </div>
                </div>
                <div
                    v-if="recipie.show"
                    class="bg-#ffe6a7 text-gray-900 text-4xl tracking-widest p-2 flex justify-center items-center transition-all"
                >
                    <input
                        v-model="ingredientInput"
                        type="text"
                        class="border-2 border-gray-300 p-2 w-full text-black rounded-md"
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
                <div class="rounded-b-md bg-#ffe6a7">
                    <div
                        v-for="ingredient in recipie.ingredients"
                        :key="ingredient.id"
                        class="text-gray-900 text-xl tracking-widest py-4 px-4 flex justify-between items-center transition-all"
                    >
                        {{ '- ' + ingredient.name }}
                        <button
                            v-if="recipie.show"
                            class="hover:bg-white hover:text-black rounded-full flex items-center p-2 bg-#6f1d1b text-white"
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
    show: boolean
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
const whichElement = ref('')

const addRecipie = () => {
    recipies.value.push({
        id: recipies.value.length + 1,
        name: input.value,
        show: false,
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

const toggleShow = (r: Recipie) => {
    if (r.show) {
        r.show = false
        return
    } else {
        r.show = true
        return
    }
}

const deleteRecipie = (id: number) => {
    recipies.value = recipies.value.filter((recipie) => recipie.id !== id)
}
</script>
