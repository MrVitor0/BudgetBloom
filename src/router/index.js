import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Vertical.vue';
import DashboardHome from '@/views/Home.vue';
import DashboardProfile from '@/views/Profile.vue';
import DashboardCredit from '@/views/Credit.vue';
import DashboardBanking from '@/views/Banking.vue';
import DashboardInvestments from '@/views/Investments.vue';
import TravelHome from '@/views/Travel.vue';
import DebtsHome from '@/views/Debts.vue';
import PurpleLanding from '@/views/Landing.vue';
import Logout from '@/views/Logout.vue';
import PurpleLogin from '@/views/Login.vue';
import PurpleRegister from '@/views/Register.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        meta: { requiresAuth: true },
        children: [
          { path: '', name: "Home", component: DashboardHome }, // Adicione uma rota vazia para renderizar DashboardHome
          {
            path: '/contas',
            meta: { requiresAuth: true },
            children: [
              { path: 'gastos', name: "Spends", component: TravelHome },
              { path: 'debitos', name: "Debts", component: DebtsHome },
            ]
          },
          { path: 'investments', name: "Investments", component: DashboardInvestments },
          { path: 'banking', name: "Banking", component: DashboardBanking },
          { path: 'credit', name: "CreditCards", component: DashboardCredit },
          { path: 'profile', name: "Profile", component: DashboardProfile },
        ]
      },
    ]
  },
  {
    path: '/auth',
    meta: { requiresAuth: false },
    children: [
      { path: 'login', name:"Login", component: PurpleLogin },
      { path: 'register', name:"Register", component: PurpleRegister },
    ]
  },
  { path: '', name:"Landing", component: PurpleLanding, meta: { requiresAuth: false } },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    console.log({
      to: to,
      getter: store.getters['auth/isAuthenticated'],
    });
    next({ name: 'Login' });
  } else if (!to.meta.requiresAuth && store.getters['auth/isAuthenticated']) {
    next({ name: 'Home' });
  } else {
    next();
  }
});



export default router;
