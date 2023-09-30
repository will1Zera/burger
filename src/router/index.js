import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // Define o caminho da rota
    path: '/pedidos',
    // Nomeia a rota
    name: 'pedidos',
    // Importa a rota lá da view
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/PedidosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
