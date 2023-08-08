import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.css';

// Importe os ícones que você deseja usar
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// Importe todos os ícones de marcas
import { fab } from '@fortawesome/free-brands-svg-icons';
// Adicione os ícones à biblioteca
library.add(fas, fab, far);

createApp(App).use(router).mount('#app');