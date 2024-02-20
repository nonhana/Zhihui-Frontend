import { usePaintConfigStore } from './modules/paintConfig'
import { useMaterialFilterStore } from './modules/materialFilter'

export function useStore() {
  return {
    paintConfig: usePaintConfigStore(),
    materialFilter: useMaterialFilterStore()
  }
}
