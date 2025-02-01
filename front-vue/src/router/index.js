import { createRouter, createWebHistory } from 'vue-router';
import SportsPage from '../components/SportsPage.vue';
import SportPageAdd from '../components/SportPageAdd.vue';
import SportPageEdit from '../components/SportPageEdit.vue';
import StudentsPage from '../components/StudentsPage.vue';
import StudentPageAdd from '../components/StudentPageAdd.vue';
import StudentPageEdit from '../components/StudentPageEdit.vue';
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
    { path: '/sports/edit/:id', component: SportPageEdit},
    { path: '/sports/add', component: SportPageAdd},
    { path: '/students', component: StudentsPage },
    { path: '/students/edit/:id', component: StudentPageEdit},
    { path: '/students/add', component: StudentPageAdd},
    { path: '/about', component: AboutView },
    { path: '/login', component: LoginPage},
    { path: '/signup', component: SignupPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
