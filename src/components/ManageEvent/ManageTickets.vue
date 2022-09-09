<template>
    <loading  v-if="data_tickets.isLoading && data_tickets.isInitialLoading "/>
    <div v-if="!data_tickets.isInitialLoading">
      <div v-if="data_tickets.data.length === 0">
          <div class="no-item">
            <strong><span>No Ticket</span></strong>
          </div>
      </div>
      
      <div v-if="data_tickets.data !== 0">
        <TicketAdmin v-for="ticket in data_tickets.data" :ticket="ticket" :key="ticket.id"/>
      </div>

      <div class="container"> 
        <div class="button-group">
          <a-button @click="showDrawer" type="primary" size="large">Add New Ticket</a-button>
        </div>
      </div>

      <div class="add-new-button">
        <AddEditTicket :ticket="formData" :activeDrawer="activeDrawer" v-model="activeDrawer" v-if="displayDrawer" mode="add" />
      </div>
    </div>

</template>

<script setup>
    import { ref, reactive, watch, onUpdated, onMounted } from 'vue';
    import TicketAdmin from '@/components/ManageEvent/TicketAdmin.vue';
    import AddEditTicket from '@/components/ManageEvent/AddEditTicket.vue'
    import { dataTickets } from "@/stores/data_tickets"
    import Loading from "@/components/common/Loading.vue"
    const data_tickets = dataTickets()
    const finishedInitialLoading = ref(0)

    /** Drawer Handler **/
    const activeDrawer = ref(false)
    const displayDrawer = ref(false)

    const showDrawer = () => {
      finishedInitialLoading.value = true
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

    onMounted(() => {
      finishedInitialLoading.value += 1
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
    border-radius: 6px;
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
  .add-new-button {
    margin-bottom: 40px;
  }
</style>
