<template>
    <Ticket v-for="ticket in data_tickets.data" :ticket="ticket" :key="ticket.id"/>
</template>

<script setup>
    import Ticket from '@/components/ManageEvent/Ticket.vue';
    import { dataTickets } from "@/stores/data_tickets"
    const data_tickets = dataTickets()
</script>
