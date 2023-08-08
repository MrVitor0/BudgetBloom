import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/components/DashboardLayout.vue';
import DashboardHome from '@/views/DashboardHome.vue';
import DashboardPage from '@/views/DashboardPage.vue';

const routes = [
  {
    path: '/',
    component: DashboardLayout, // Use o DashboardLayout aqui
    children: [
      { path: '', component: DashboardHome },
      { path: 'dashboard', component: DashboardPage }
      // Adicione mais rotas conforme necessário
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
