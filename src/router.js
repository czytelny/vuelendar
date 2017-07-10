import VueRouter from 'vue-router'
import LoginPage from './LoginPage'
import CalendarPage from './CalendarPage'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: LoginPage },
    { path: '/login', component: LoginPage },
    { path: '/app', component: CalendarPage }
  ]
})

export default router
