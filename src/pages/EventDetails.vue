<template>
    <div class="container">
    <h1>Event Details</h1>
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
            </tr>
        </thead>
        <tbody>
            <TicketItem v-for="ticket in TicketList.ticket_list" :key="ticket.id" :ticket="ticket" mode="view"/>
        </tbody>
    </table>
    </div>
</template>

<script setup>
    import { ticketListStore } from "@/stores/ticketlist"
    import TicketItem from "@/components/TicketItem.vue"
    const TicketList = ticketListStore()
</script>
