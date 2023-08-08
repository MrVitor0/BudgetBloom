import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/components/DashboardLayout.vue'; // Importe o novo componente
import HomeView from '@/views/HomeView.vue';
import DashboardPage from '@/views/DashboardPage.vue';

const routes = [
  {
    path: '/',
    component: DashboardLayout, // Use o componente Layout como pai
    children: [
      { path: '', component: HomeView },
      { path: 'dashboard', component: DashboardPage }
      // Adicione mais rotas conforme necessário
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
