import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import CodeBlock from './components/CodeBlock.vue'

const app = createApp(App)
app.component('CodeBlock', CodeBlock)
app.use(router)
app.mount('#app');
