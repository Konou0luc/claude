import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue'), meta: { title: 'Joyeux Anniversaire' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
