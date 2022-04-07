<template>
    <div>
        <!-- <h1>Manage Tickets</h1>
        <table>
            <thead>
                <tr>
                    <th>Available</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Ticket Name</th>
                    <th>Price</th>
                    <th>Amount limit per day</th>
                    <th>Minimum buying</th>
                    <th>Quantity</th>
                    <th>Total Sales</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <TicketItem v-for="ticket in data_tickets.data" :key="ticket.id" :ticket="ticket" :editable="true" />
            </tbody>
        </table> -->
        <div>
            <AddTicket />
        </div>
            <br>
            <br>
            <br>
        <div class="container">

            {{ utc_to_local }}
        <div>
        <br>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { DateTime } from "luxon";
    import { ref } from 'vue'
    import { dataTickets } from "@/stores/data_tickets"
    import TicketItem from "@/components/TicketItem.vue"
    import AddTicket from "@/components/AddTicket.vue"
    const data_tickets = dataTickets()

    const now_date_utc = parseInt(DateTime.now().toUTC().toFormat('yyyyMMddHHmm'))
    
    // const define_local_date = DateTime.local(2022, 4, 17, 8, 55).toLocal().toFormat('yyyyMMddHHmm');
    const define_now_local_time = DateTime.now().toFormat('yyyyMMddHHmm')
    const define_local_date = DateTime.local(2022, 4, 7, 0, 0).toFormat('yyyyMMddHHmm')
    const utc_to_local = DateTime.utc(2022, 4, 7, 0, 0).toLocal().toFormat('yyyyMMddHHmm')


</script>

<style lang="scss" scoped>

</style>
