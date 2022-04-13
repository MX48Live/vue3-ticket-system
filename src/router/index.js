import { createRouter, createWebHistory } from 'vue-router'
import EventDetails from "@/pages/EventDetails.vue"
import ManageTickets from "@/pages/ManageTickets.vue"
import SignIn from "@/pages/SignIn.vue"
import { getAuth, signOut } from "firebase/auth"
import { notify } from "@kyvg/vue3-notification"
import { authStatus } from "@/stores/auth_status"

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
        if (authStatus().isUser) {
          next()
        } else {
          next("/sign-in")
        }
      }
    },
    {
      path: '/sign-out',
      name: 'signout',
      beforeEnter: async (to, from, next) => {
        try {
          await signOut(getAuth())
          await next('/')
          await notify({ type: "success", title: `✅ Sign Out Successful` })
        } catch (error) {
          notify({ type: "error", title: `😭 Something went wrong, please try again.` })
        }          
        }
      }
  ]
})
 

export default router
