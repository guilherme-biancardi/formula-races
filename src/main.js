import {
    createApp
} from 'vue'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router).use(VueChartkick)

app.mount('#app')