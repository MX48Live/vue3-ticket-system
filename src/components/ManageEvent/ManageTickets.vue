<template>
    <Ticket v-for="ticket in data_tickets.data" :ticket="ticket" :key="ticket.id"/>
    <div> 
      <a-button @click="showDrawer">Add</a-button>
    </div>
    <AddEditTicket :ticket="formData" :activeDrawer="activeDrawer" v-model="activeDrawer" v-if="displayDrawer" mode="add" />
</template>

<script setup>
    import { ref, reactive, watch } from 'vue';
    import Ticket from '@/components/ManageEvent/Ticket.vue';
    import AddEditTicket from '@/components/ManageEvent/AddEditTicket.vue'
    import { dataTickets } from "@/stores/data_tickets"
    const data_tickets = dataTickets()

    /** Drawer Handler **/
    const activeDrawer = ref(false)
    const displayDrawer = ref(false)

    const showDrawer = () => {
      activeDrawer.value = true;
    }
    watch(activeDrawer, () => {
      if(activeDrawer.value) {
        displayDrawer.value = true
      } else {
        setTimeout(() => {
          displayDrawer.value = false
        }, 300)
      }
    })

    const formData = reactive({
        name: '',
        description: '',
        start_date_time_utc: '',
        end_date_time_utc: '',
        available: true,
        price: 0,
        quantity: 1,
        minimum_buying: 1,
        limit_per_day: -1,
        limit_per_time: -1,
        created_date: null,
        updated_date: null,
        stats_total_sale: 0,
        stats_today_sale: 0,
        setting_start_date_time: true,
        setting_end_date_time: true,
        setting_total_remaining: true,
        setting_total_sale: true,
        setting_today_remaining: true,
        setting_show_if_inactive: true,
    })

</script>
