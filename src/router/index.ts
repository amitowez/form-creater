import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import SimpleFormPage from '@/pages/SimpleFormPage.vue'
import ComplexFormPage from '@/pages/ComplexFormPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/simple', name: 'simple', component: SimpleFormPage },
  { path: '/complex', name: 'complex', component: ComplexFormPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router