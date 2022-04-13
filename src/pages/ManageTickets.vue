<template>
    <div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="container">
             <ManageTickets />
        </div>
    </div>
</template>

<script setup>
    import { DateTime } from "luxon";
    import { ref } from 'vue'
    import { dataTickets } from "@/stores/data_tickets"
    import ManageTickets from "@/components/ManageEvent/ManageTickets.vue"
    const data_tickets = dataTickets()

    const now_date_utc = parseInt(DateTime.now().toUTC().toFormat('yyyyMMddHHmm'))
    
    // const define_local_date = DateTime.local(2022, 4, 17, 8, 55).toLocal().toFormat('yyyyMMddHHmm');
    const define_now_local_time = DateTime.now().toFormat('yyyyMMddHHmm')
    const define_local_date = DateTime.local(2022, 4, 7, 0, 0).toFormat('yyyyMMddHHmm')
    const utc_to_local = DateTime.utc(2022, 4, 7, 0, 0).toLocal().toFormat('yyyyMMddHHmm')


</script>

<style lang="scss" scoped>

</style>
