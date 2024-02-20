import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MaterialFilter } from '@/utils/types'

export const useMaterialFilterStore = defineStore('materialFilter', {
  state: () => ({
    filter: ref<MaterialFilter>({
      type: '素材',
      childType: '全部',
      style: '全部',
      color: '全部',
      keyword: ''
    })
  }),
  actions: {
    setFilter(filter: MaterialFilter) {
      this.filter = filter
    },
    reset() {
      this.filter = {
        type: '素材',
        childType: '全部',
        style: '全部',
        color: '全部',
        keyword: ''
      }
    }
  },
  persist: import.meta.env.SSR === false && {
    storage: localStorage
  }
})
