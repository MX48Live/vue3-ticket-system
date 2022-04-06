<template>
    <div>
        <div class="ticket-list-container">
            <div class="header">Select Ticket</div>
            <div class="list-group">
                <Ticket v-for="ticket in data_tickets.data" :key="ticket.id" :ticket="ticket"/>
            </div>
        </div>
    </div>
    {{ user_cart.data }}
</template>

<script setup>
    import Ticket from "@/components/EventDetails/Ticket.vue"
    import { dataTickets } from "@/stores/data_tickets"
    import { userCart } from "@/stores/user_cart"
    const data_tickets = dataTickets()
    const user_cart = userCart()
</script>

<style lang="scss" scoped>
    .ticket-list-container {
        margin-bottom: 70px;
        box-shadow: 0px 0px 20px 6px rgba(62, 44, 126, 0.05);
        border-radius: 6px;
        overflow: hidden;
        .header {
            background-color: var(--primary-color);
            color: #FFFFFF;
            font-size: 20px;
            font-weight: bold;
            padding: 10px 20px;
        }
    }
</style>
