import { createRouter, createWebHistory } from 'vue-router';
import SportsPage from '../components/SportsPage.vue';
import StudentsPage from '../components/StudentsPage.vue';
import UsersPage from '../components/UsersPage.vue';
import MainPage from '../components/MainPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import AboutView from '@/components/AboutView.vue';
import SignupPage from '@/components/SignupPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
    { path: '/sports', component: SportsPage },
    { path: '/students', component: StudentsPage },
    { path: '/users', component: UsersPage },
    { path: '/about', component: AboutView },
    { path: '/login', component: LoginPage},
    { path: '/signup', component: SignupPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
