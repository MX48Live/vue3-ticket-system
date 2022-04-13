<template>
    <div class="summary-button-container">
        <button class="summary-button" :class="sumTotalTicket ? '' : 'disabled'" @click="handleBuyButton">
            <div v-if="isLoading" class="loading">
                <loading-outlined />
            </div>
            <div v-if="!isLoading">
            Buy {{ sumTotalTicket ? sumTotalTicket : '' }} Ticket
            </div>
        </button>
    </div>
</template>

<script setup>
    import { userCart } from "@/stores/user_cart"
    import { computed, ref } from "vue"
    import { LoadingOutlined } from '@ant-design/icons-vue'
    import { Modal } from 'ant-design-vue'
    import { useLoadTicketList } from "@/use/useLoadTicketList"

    const user_cart = userCart()
    const isLoading = ref(false)

    const sumTotalTicket = computed(() => {
        let sum = 0
        user_cart.data.map((item) => {
            sum = sum + parseInt(item.quantity)
        })
        return sum
    })

    const warning = () => {
      Modal.warning({
        title: 'Sorry, Something went wrong.',
        content: 'Something happen while you selecting, please try again. 😥',
      })
    }
    
    const condition = true
    const handleBuyButton = async () => {
        await useLoadTicketList()

        if(!user_cart.ticket_status.has(false)) {
            alert('pass ja')
        } else {
            warning()
            user_cart.clearData()
        }
    }
</script>

<style lang="scss" scoped>
.summary-button-container {
    padding: 15px 15px;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #EEE;
    @media screen and (min-width: 768px) {
        text-align: right;
        padding: 20px 30px;
    }

    .summary-button {
        appearance: none;
        border: none;
        background-color: var(--primary-color);
        color: #FFF;
        font-weight: bold;
        font-size: 16px;
        line-height: 40px;
        max-width: 280px;
        width: 100%;
        border-radius: 10px;
        margin-bottom: 5px;

        &.disabled {
            pointer-events: none;
            background-color: #ccc;

        }
    }

    .loading {
        align-content: center;
        display: grid;
        height: 40px;
    }
}
    
</style>
