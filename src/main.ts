import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/styles/index.less'

axios.defaults.baseURL = 'http://localhost:8829'

const app = createApp(App)

app.use(router)

app.mount('#app')