import { createRouter, createWebHistory } from 'vue-router';
import Sports from '../components/Sports.vue';
import Students from '../components/Students.vue';
import Users from '../components/Users.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    { path: '/sports', component: Sports },
    { path: '/students', component: Students },
    { path: '/users', component: Users },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
