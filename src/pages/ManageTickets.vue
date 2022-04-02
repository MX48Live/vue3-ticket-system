<template>
    <h1>Manage Tickets</h1>
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
            <TicketItem v-for="ticket in TicketList.ticket_list" :key="ticket.id" :ticket="ticket" :editable="true" />
        </tbody>
    </table>
    <div>
        <AddTicket />
    </div>
</template>

<script setup>
    import { ticketListStore } from "@/stores/ticketlist"
    import TicketItem from "@/components/TicketItem.vue"
    import AddTicket from "@/components/AddTicket.vue"
    const TicketList = ticketListStore()
</script>
