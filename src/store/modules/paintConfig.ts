import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaintConfigStore = defineStore('paintConfig', {
  state: () => ({
    prompt: ref<string>(''),
    presentTool: ref<string>(''),
    toolSettings: ref<{
      line: number
      color: string
      lineCap: string
      lineJoin: string
      strokeType: string
      fillShape: boolean
      eraser: boolean
      lock: boolean
      backgroundColor: string
      backgroundImage: string
    }>({
      line: 5,
      color: '#3d3d3d',
      lineCap: 'square',
      lineJoin: 'round',
      strokeType: 'dash',
      fillShape: false,
      eraser: false,
      lock: false,
      backgroundColor: '#ffffff',
      backgroundImage: ''
    })
  }),
  actions: {
    setPresentTool(tool: string) {
      this.presentTool = tool
    },
    setPrompt(prompt: string) {
      this.prompt = prompt
    },
    reset() {
      this.prompt = ''
      this.presentTool = ''
    }
  },
  persist: import.meta.env.SSR === false && {
    storage: localStorage
  }
})
