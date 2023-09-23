import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.css';
import store from './store';

// Importe os ícones que você deseja usar
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// Importe todos os ícones de marcas
import { fab } from '@fortawesome/free-brands-svg-icons';
import axios from './config/interceptor';
import il8n from './language/index';

// Adicione os ícones à biblioteca
library.add(fas, fab, far);

const app = createApp(App);

app.config.globalProperties.$api = axios;

app.use(il8n)
app.use(router)
app.use(store)
app.mount('#app');