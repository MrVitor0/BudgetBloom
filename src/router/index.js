import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Vertical.vue';
import DashboardHome from '@/views/Home.vue';
import DashboardPage from '@/views/Sample.vue';

const routes = [
  {
    path: '/',
    component: Layout, // Use o Layout aqui
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
