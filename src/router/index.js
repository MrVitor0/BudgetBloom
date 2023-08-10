import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Vertical.vue';
import DashboardHome from '@/views/Home.vue';
import DashboardProfile from '@/views/Profile.vue';
import DashboardBanking from '@/views/Banking.vue';
import DashboardInvestments from '@/views/Investments.vue';
const routes = [
  {
    path: '/',
    component: Layout, // Use o Layout aqui
    children: [
      { path: '', name:"Home", component: DashboardHome },
      { path: 'investments', name:"Investments", component: DashboardInvestments },
      { path: 'banking', name:"Banking", component: DashboardBanking },
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
