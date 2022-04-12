import { createRouter, createWebHistory } from 'vue-router'
import EventDetails from "@/pages/EventDetails.vue"
import ManageTickets from "@/pages/ManageTickets.vue"
import SignIn from "@/pages/SignIn.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'eventdetails',
      component: EventDetails
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/manage-tickets',
      name: 'managetickets',
      component: ManageTickets,
      beforeEnter: (to, from, next) => {
        onAuthStateChanged(getAuth(), (user) => {
          if (user) {
            next();
          } else {
            next('/sign-in')
          }
        })
      }
    },
  ]
})
 

export default router
