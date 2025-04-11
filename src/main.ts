// import './assets/main.css'
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router/index.ts"
import { createBootstrap } from "bootstrap-vue-next"
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap-vue-next/dist/bootstrap-vue-next.css"
import "./assets/index.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createBootstrap())
app.mount("#app")
