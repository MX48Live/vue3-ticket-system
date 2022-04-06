<template>
    <tr>
        <td>{{ ticket.available }}</td>
        <td>{{ ticket.start_date }} - {{ ticket.start_time }}</td>
        <td>{{ ticket.end_date }} - {{ ticket.end_time }}</td>
        <td>{{ ticket.ticket_type }}</td>
        <td>{{ ticket.price }}</td>
        <td>{{ ticket.limit_per_day }}</td>
        <td>{{ ticket.minimum_buying }}</td>
        <td>{{ ticket.quantity }}</td>
        <td v-if="mode !== 'view'">{{ ticket.total_sales}}</td>
        <td v-if="editable">
            <button @click="toggleTicketForm">Edit</button>
        </td>
    </tr>
    <TicketForm v-if="isShowForm" :ticket="ticket" v-model:isShowForm="isShowForm" mode="edit" />
</template>

<script setup>
    import { ref } from 'vue';
    import { dataTickets } from "@/stores/data_tickets"
    import TicketForm from "@/components/TicketForm.vue"

    const data_tickets = dataTickets()
    const isShowForm = ref(false)
    const wtf = ref(false)
    const props = defineProps({
        ticket: {
            type: Object,
            require: true
        },
        editable: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            require: true
        }
    })
    
    const toggleTicketForm = () => {
        isShowForm.value = !isShowForm.value
    }
</script>
