import { defineStore } from 'pinia'

export const usePaintConfigStore = defineStore('paintConfig', {
  state: () => ({
    prompt: <string>'',
    presentTool: <string>''
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
