<template>
    <h3>Add new Ticket</h3>
    <button @click="toggleTicketForm">Add Ja</button>
    <TicketForm v-if="isShowForm" :ticket="newTicket" v-model:isShowForm="isShowForm" mode="add" />
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import TicketForm from "@/components/TicketForm.vue"
    
    const newTicket = reactive({})
    const isShowForm = ref(false)
    const toggleTicketForm = () => {
        isShowForm.value = !isShowForm.value
    }
</script>
