import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'

import './assets/main.css'
import 'primevue/resources/themes/aura-light-indigo/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(PrimeVue);

app.mount('#app')