import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const store = createPinia()
store.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
