import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import './assets/styles/index.less'

// axios.defaults.baseURL = '/_api_';

const app = createApp(App)

app.use(router)

app.mount('#app')