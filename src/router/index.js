import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/layout/Vertical.vue';
import DashboardHome from '@/views/Home.vue';
import DashboardProfile from '@/views/Profile.vue';
import DashboardCredit from '@/views/Credit.vue';
import DashboardBanking from '@/views/Banking.vue';
import DashboardInvestments from '@/views/Investments.vue';
import TravelHome from '@/views/Travel.vue';
import Logout from '@/views/Logout.vue';
import PurpleLogin from '@/views/Login.vue';
import PurpleRegister from '@/views/Register.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', name: "Travel", component: TravelHome, meta: { requiresAuth: true }},
      { path: 'Home', name:"Home", component: DashboardHome, meta: { requiresAuth: true } },
     
      { path: 'investments', name:"Investments", component: DashboardInvestments, meta: { requiresAuth: true } },
      { path: 'banking', name:"Banking", component: DashboardBanking, meta: { requiresAuth: true } },
      { path: 'credit', name:"Credit Cards", component: DashboardCredit, meta: { requiresAuth: true }},
      { path: 'profile', name:"Profile", component: DashboardProfile, meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login', name:"Login", component: PurpleLogin, meta: { requiresAuth: false } },
      { path: 'register', name:"Register", component: PurpleRegister, meta: { requiresAuth: false } },
    ]
  },
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
    next('/login');
  } else {
    next();
  }
});



export default router;
