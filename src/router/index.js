import Vue from 'vue';
import Router from "vue-router";
import Login from "../views/Login";
import Success from "../views/Success";
import Register from "../views/Register";
import Error from "../views/Error";
import Main from "../views/Main";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {

      path: '/login',
      name: 'login',
      component: Login
    },
    {
      props: true,
      path: '/success/:account',
      name: 'success',
      component: Success
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '*',
      name: 'error',
      component: Error
    }
  ]
});
