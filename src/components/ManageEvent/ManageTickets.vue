<template>
    <Ticket v-for="ticket in data_tickets.data" :ticket="ticket" :key="ticket.id"/>
</template>

<script setup>
    import { dataTickets } from "@/stores/data_tickets"
    import Ticket from '@/components/ManageEvent/Ticket.vue';
    const data_tickets = dataTickets()
</script>
