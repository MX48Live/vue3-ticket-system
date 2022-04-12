<template>
    <div v-if="!isData">
        <div class="no-item">
          <strong><span>No Ticket</span></strong>
        </div>
    </div>
    <Ticket v-if="isData" v-for="ticket in data_tickets.data" :ticket="ticket" :key="ticket.id"/>
    <div class="container"> 
      <div class="button-group">
        <a-button @click="showDrawer" type="primary" size="large">Add New Ticket</a-button>
      </div>
    </div>
    <AddEditTicket :ticket="formData" :activeDrawer="activeDrawer" v-model="activeDrawer" v-if="displayDrawer" mode="add" />
</template>

<script setup>
    import { ref, reactive, watch } from 'vue';
    import Ticket from '@/components/ManageEvent/Ticket.vue';
    import AddEditTicket from '@/components/ManageEvent/AddEditTicket.vue'
    import { dataTickets } from "@/stores/data_tickets"
    const data_tickets = dataTickets()
    const isData = ref(data_tickets.data.length)

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

<style lang="scss">
  .container {
    max-width: 900px;
    .button-group {
      padding-top: 20px;
      text-align: center;
    }
  }
  .no-item {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    grid-gap: 10px;
    font-size: 20px;
    text-transform: uppercase;
    color: #ccc;
    border: #ccc 2px dashed;
    text-align: center;
  }
</style>
