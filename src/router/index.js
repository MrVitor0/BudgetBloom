import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Vertical.vue';
import DashboardHome from '@/views/Home.vue';
import DashboardProfile from '@/views/Profile.vue';

const routes = [
  {
    path: '/',
    component: Layout, // Use o Layout aqui
    children: [
      { path: '', name:"Home", component: DashboardHome },
      { path: 'profile', name:"Profile", component: DashboardProfile }
      // Adicione mais rotas conforme necessário
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
