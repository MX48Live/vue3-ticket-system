<template>
  <div class="item-container">
    <div>
      <a-tag color="green" v-if="ticket.available"><strong>{{ ticket.available ? "ON" : "" }}</strong></a-tag>
      <a-tag color="red" v-if="!ticket.available"><strong>{{ ticket.available ? "" : "OFF" }}</strong></a-tag>
    </div>
    <div>
      <h3>{{ ticket.name }}</h3>
      <div class="description">{{ ticket.description }}</div>
      <div class="date-time">
        <span><strong><span class="material-icons">calendar_today</span> เริ่ม: </strong>{{ displayStartDateTime }}</span>
        <span><strong><span class="material-icons">calendar_today</span> สิ้นสุด: </strong>{{ displayEndDateTime }}</span>
      </div>
      <div class="status-number">
          <span>{{ ticket.id}}</span>
          <span>คงเหลือ: {{ displayTotalRemaining }}</span>
          <span>จำนวนผู้ซื้อ: {{ ticket.stats_total_sale }}</span>
          <span v-if="ticket.setting_today_remaining && displayTodayRemaining !== '-'">คงเหลือวันนี้: {{ displayTodayRemaining }}</span>
      </div>
    </div>

    <div> 
      <a-button @click="showDrawer">Edit</a-button>
    </div>
    <AddEditTicket :ticket="ticket" :isShowDrawer="isShowDrawer" v-model="isShowDrawer" mode="edit" />
  </div>
</template>

<script setup>
    import { computed, ref } from "vue"
    import { useConvertUTCtoLocalDateToDisplay } from "@/use/useConvertUTCtoLocalDateToDisplay"
    import AddEditTicket from "@/components/ManageEvent/AddEditTicket.vue"
    const props = defineProps({
        ticket: {
            type: Object,
            require: true
        }
    })

    /** Drawer Handler **/
    const isShowDrawer = ref(false)
    const showDrawer = () => {
      isShowDrawer.value = true;
    }

    /** Date Time Formatter **/
    const displayStartDateTime = computed(() => {
        return useConvertUTCtoLocalDateToDisplay(props.ticket.start_date_time_utc)
    })
    const displayEndDateTime = computed(() => {
        return useConvertUTCtoLocalDateToDisplay(props.ticket.end_date_time_utc)
    })

   /** Format Remaining **/
    const displayTotalRemaining = computed(() => {
        return props.ticket.quantity - props.ticket.stats_total_sale
    })
     /** Format Remaining **/
    const displayTodayRemaining = computed(() => {
        let totalRemaining = ref(props.ticket.quantity - props.ticket.stats_total_sale)
        let todayRemaining = ref(props.ticket.limit_per_day - props.ticket.stats_today_sale)
        if(todayRemaining.value < 0) {
            return "-"
        } else {
          return todayRemaining
        }
    })

</script>

<style lang="scss" scoped>
  .item-container {
    box-shadow: 0px 0px 20px 6px rgba(62, 44, 126, 0.05);
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 6px;
    display: grid;
    grid-gap: 10px;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
      grid-template-columns: 50px 1fr auto;
    }
    color: #666;
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
  }
  .description {
    margin-bottom: 10px;
  }
  .date-time {
    margin-top: 10px;
    font-size: 12px;
    display: flex;
    column-gap: 10px;
    flex-flow: column;
    @media screen and (min-width: 768px) {
      flex-flow: row;
    }
    span {
      margin-bottom: 5px;
    }

    .material-icons {
      font-size: 12px;
      vertical-align: top;
      padding-top: 3px;
      margin-right: 3px;
    }
  }
  .status-number {
    display: inline-block;
      margin-top: 5px;
      span {
          display: inline-block;
          padding: 0 6px;
          border-radius: 10px;
          color: #555;
          background-color: #fafafa;
          border: 1px solid #eeeeee;
          font-size: 12px;
          margin-right: 10px;
          margin-bottom: 5px;
      }
  }
</style>
