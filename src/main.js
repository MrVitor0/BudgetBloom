import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles.css';

// Importe os ícones que você deseja usar
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesomeLogoFull } from '@fortawesome/free-brands-svg-icons';

// Adicione os ícones à biblioteca
library.add(faHome, faChartBar, faFontAwesomeLogoFull);

createApp(App).use(router).mount('#app');
