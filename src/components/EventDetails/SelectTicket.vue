<template>
    <div>
        <div class="ticket-list-container">
            <div class="header">Select Your Ticket</div>
            <div class="list-group">
                <loading  v-if="data_tickets.isLoading" />
            </div>
            <div class="list-group" v-if="!data_tickets.isLoading">
                <div v-if="!checkIfData" class="coming-soon">
                    Coming Soon
                </div>
                <div v-if="checkIfData" >
                    <Ticket v-for="ticket in data_tickets.data" :key="ticket.id" :ticket="ticket"/>
                    <!-- <SummaryButton /> -->
                </div>
            </div>
        </div>
    </div>
    <pre>
        {{ user_cart.data }}
    </pre>
</template>

<script setup>
    import { ref, computed } from "vue";
    import Ticket from "@/components/EventDetails/Ticket.vue"
    import { dataTickets } from "@/stores/data_tickets"
    import { userCart } from "@/stores/user_cart"
    import Loading from "@/components/common/Loading.vue"
    import SummaryButton from "./SummaryButton.vue";

    const data_tickets = dataTickets()
    const user_cart = userCart()

    const checkIfData = computed(() => {
        if(!data_tickets.data.length) {
            return false
        } else {
            let count = 0
            data_tickets.data.map((item) => {
                if(item.setting_show_if_inactive === false) {
                    count++
                }
            })
            if(count === data_tickets.data.length) {
                return false
            }
        }
        return true
    })
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
    .coming-soon {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #888;
        padding: 40px 0;
    }
</style>
