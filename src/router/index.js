import { createRouter, createWebHistory } from 'vue-router'
import EventDetails from "@/pages/EventDetails.vue"
import ManageTickets from "@/pages/ManageTickets.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'eventdetails',
      component: EventDetails
    },
    {
      path: '/manage-tickets',
      name: 'managetickets',
      component: ManageTickets
    }
  ]
})

export default router
