import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Vertical.vue';
import DashboardHome from '@/views/Home.vue';
import DashboardProfile from '@/views/Profile.vue';
import DashboardCredit from '@/views/Credit.vue';
import DashboardBanking from '@/views/Banking.vue';
import DashboardInvestments from '@/views/Investments.vue';
import TravelHome from '@/views/Travel.vue';
const routes = [
  {
    path: '/',
    component: Layout, // Use o Layout aqui
    children: [
      { path: '', name:"Home", component: DashboardHome },
      { path: 'investments', name:"Investments", component: DashboardInvestments },
      { path: 'banking', name:"Banking", component: DashboardBanking },
      { path: 'credit', name:"Credit Cards", component: DashboardCredit},
      { path: 'profile', name:"Profile", component: DashboardProfile },
      { path: 'travel', name: "Travel", component: TravelHome},
      
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
