import { createRouter, createWebHistory } from 'vue-router';
import SportsPage from '../components/SportsPage.vue';
import StudentsPage from '../components/StudentsPage.vue';
import UsersPage from '../components/UsersPage.vue';
import HomeView from '../components/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    { path: '/sports', component: SportsPage },
    { path: '/students', component: StudentsPage },
    { path: '/users', component: UsersPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
