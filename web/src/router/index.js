import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'mdi-home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/fornecedores',
    name: 'Fornecedores',
    icon: 'mdi-account-multiple-outline',
    component: () => import('@/views/Fornecedores.vue')
  },
  {
    path: '/contas',
    name: 'Contas',
    // icon: 'mdi-email',
    icon: 'mdi-coin',
    component: () => import('@/views/Contas.vue')
  },
  {
    path: '/titulos',
    name: 'Títulos',
    icon: 'mdi-file',
    component: () => import('@/views/Titulos.vue')
  },
  {
    path: '/pagamentos',
    name: 'Pagamentos',
    icon: 'mdi-check-all',
    component: () => import('@/views/Pagamentos.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
