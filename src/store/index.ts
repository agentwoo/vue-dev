import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
    state: () => ({
        name: 'helloWorld!'
    })
})