<template>
    <div>
        <label>Available: <input type="checkbox" v-model="formData.available"></label>
    </div>
    <div>
        <label>Start Date: <input type="date" v-model="formData.start_date"></label>
    </div>
    <div>
        <label>Start Time: <input type="time" v-model="formData.start_time"></label>
    </div>
    <div>
        <label>End Date: <input type="date" v-model="formData.end_date"></label>
    </div>
    <div>
        <label>End Time: <input type="time" v-model="formData.end_time"></label>
    </div>
    <div>
        <label>Ticket Name: <input type="text" v-model="formData.ticket_type"></label>
    </div>
    <div>
        <label>Price: <input type="number" v-model="formData.price"></label>
    </div>
    <div>
        <label>Amount limit per day: <input type="number" v-model="formData.limit_per_day"></label>
    </div>
    <div>
        <label>Minimum buying: <input type="number" v-model="formData.minimum_buying"></label>
    </div>
    <div>
        <label>Quantity: <input type="number" v-model="formData.quantity"></label>
    </div>
    <br>
    <div>
        <button @click="handleSubmit">Save</button>
        <button v-if="mode === 'edit'" @click="handleDelete">Delete</button>
    </div>
    {{ formData }}
</template>

<script setup>
    import { reactive } from 'vue';
    import { ticketListStore } from "@/stores/ticketlist"
    import { useAddNewTicket } from "@/use/useAddNewTicket"
    import { useUpdateTicket } from "@/use/useUpdateTicket"
    import { useDeleteTicket } from "@/use/useDeleteTicket"
    import TicketForm from "@/components/TicketForm.vue"
    const TicketList = ticketListStore()

    const props = defineProps({
        ticket: {
            type: Object,
            require: true
        },
        mode: {
            type: String
        },
        isShowForm: {
            type: Boolean
        }
    })

    const formData = reactive({
        id: props.ticket.id,
        available: props.ticket.available,
        start_date: props.ticket.start_date,
        start_time: (props.ticket.start_time || "00:00"),
        end_date: props.ticket.end_date,
        end_time: (props.ticket.end_time || "00:00"),
        ticket_type: props.ticket.ticket_type,
        price: props.ticket.price,
        limit_per_day: props.ticket.limit_per_day,
        minimum_buying: (props.ticket.minimum_buying || 1),
        quantity: props.ticket.quantity,
        total_sales: props.ticket.total_sales
    })

    const emit = defineEmits(['update:isShowForm'])
    const closeTicketForm = () => {
        emit('update:isShowForm', false)
    }

    const handleUpdate = async (ticketID, formData) => {
        await useUpdateTicket(ticketID, formData)
        await closeTicketForm()
    }

    const handleAddTicket = async (newTicket) => {
        await useAddNewTicket(newTicket)
        await closeTicketForm()
    }

    const handleDelete = async (ticketID) => {
        await useDeleteTicket(formData.id)
        await closeTicketForm()
    }

    const handleSubmit = () => {
        if(props.mode === "edit") {
            handleUpdate(formData.id, formData)
        }
        if(props.mode === "add") {
            handleAddTicket({...formData})
        }
    }

</script>
