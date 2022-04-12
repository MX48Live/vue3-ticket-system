import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import Notifications from '@kyvg/vue3-notification'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(createPinia()).use(router).use(BootstrapVue3).use(Notifications).mount('#app')
