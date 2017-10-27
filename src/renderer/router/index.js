import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import newPlayer from '@/components/edit/newPlayer'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Clubs from '@/components/Clubs'
import Club from '@/components/Club'
import Manager from '@/components/myleague/Manager'
import CreateManager from '@/components/myleague/CreateManager'
import LoadManager from '@/components/myleague/LoadManager'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu,
      props: { menuId: "main" }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Menu,
      props: { menuId: "edit" }
    },
    {
      path: '/player/new',
      name: 'newPlayer',
      component: newPlayer
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager,
      children: [
        { path: '', component: LoadManager },
        { path: 'info', component: Menu, props: { menuId: "managerInfo" } },
        { path: 'clubs', component: Menu, props: { menuId: "managerLeagues" } },
        { path: 'clubs/league/:id', component: Clubs },
        { path: 'clubs/:id', component: Club },
      ]
    },
    {
      path: '/manager/create',
      name: 'CreateManager',
      component: CreateManager
    }
  ]
})
