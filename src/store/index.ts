import { usePaintConfigStore } from './modules/paintConfig'

export function useStore() {
  return {
    paintConfig: usePaintConfigStore()
  }
}
