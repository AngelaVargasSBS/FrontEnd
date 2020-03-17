import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import store from '@/store'

Vue.use(Router)


const registerComponents = () => {

  store.getters['userStore/getAppComponents'].forEach((e) => {
   //console.log(`${e.component}`)
   router.addRoutes([{
     path: `/${e.path}`,
     component: ( ) => import(`@/${e.component}`),
     name:  `${e.name}`,
     props: true
   } ])
 })
  store.commit("userStore/registeredComponentsSuccess");
}

const ifAuthenticated = (to, from, next) => {


  if (store.getters['userStore/isAuthenticated']) {   

   
    if (!store.getters['userStore/getRegisteredComponents']) {
      //alert('aca');
      registerComponents()
    }  
    next()
    return
  }
  next('/login')
}

let router = new Router({
  mode:'abstract',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login

  }

  ]
})
export default router