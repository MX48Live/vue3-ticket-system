<template>
    <div class="ticket-item" :class="selected ? 'selected' : 'no-select'" v-if="ticket.setting_show_if_inactive">
        <div class="ticket-select" @click="handleSelectItem" :class="enable ? '' : 'no-pointer'">
            <span class="material-icons" v-if="enable">check_box_outline</span>
        </div>
        <div class="detail-group">
            <div class="ticket-detail">
                <div class="name" @click="handleSelectItem"  :class="enable ? '' : 'no-pointer'">{{ ticket.name }}</div>
                <div class="desc">{{ ticket.description }}</div>
                <div class="status status-date" v-if="ticket.setting_start_date_time || ticket.setting_end_date_time">
                    <span v-if="ticket.start_date_time_utc && ticket.setting_start_date_time">
                        <strong><span class="material-icons">calendar_today</span>Start:</strong> {{ displayStartDateTime }}
                    </span>
                    <span v-if="ticket.end_date_time_utc  && ticket.setting_end_date_time">
                        <strong><span class="material-icons">calendar_today</span>End:</strong> {{ displayEndDateTime }}
                    </span>
                </div>
                <div class="status status-number" v-if="ticket.setting_total_remaining || ticket.setting_total_sale || ticket.setting_today_remaining">
                    <span v-if="ticket.setting_total_remaining">Total Remaining: {{ displayTotalRemaining }}</span>
                    <span v-if="ticket.setting_total_sale && ticket.stats_total_sale > 0">Total Sale: {{ ticket.stats_total_sale }}</span>
                    <span v-if="ticket.setting_today_remaining && displayTodayRemaining > -1">Today's Remaining: {{ displayTodayRemaining }}</span>
                </div>
            </div>
            <div class="ticket-price error" v-if="!enable"> 
                {{ error }}
            </div>
            <div class="ticket-price" v-if="enable">
                <div class="price">{{ priceDecorate }}</div>
                <div class="select">
                    <div class="x-mark"><span class="material-icons">close</span></div>
                    <button @click="handleActionButton('decrease')" :disabled="disableDecreaseButton"><span class="material-icons">remove</span></button>
                    <div class="number">{{ quantity }}</div>
                    <button @click="handleActionButton('increase')" :disabled="disableIncreaseButton"><span class="material-icons">add</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { DateTime } from "luxon";
    import { computed, onMounted, reactive, ref } from "vue"
    import { userCart } from "@/stores/user_cart"
    import { useConvertUTCtoLocalDateToDisplay } from "@/use/useConvertUTCtoLocalDateToDisplay"

    const user_cart = userCart()
    const enable = ref(false)
    const quantity = ref(props.ticket.minimum_buying)
    const selected = ref(false)
    const error = ref('Not Available')

    const props = defineProps({
        ticket: {
            type: Object,
            required: true
        }
    })

    const currentUTCTime = parseInt(DateTime.now().toUTC().toFormat('yyyyMMddHHmm'))
    const totalRemaining = props.ticket.quantity - props.ticket.stats_total_sale
    const todayRemaining = props.ticket.limit_per_day - props.ticket.stats_today_sale
    // Check InitialAvailable
    onMounted(() => {
        checkInitialAvailability()
    })
    const checkTodayRemaining = () => {
        if(todayRemaining > 0 || todayRemaining < 0) {
            return true
        } else {

        }
        error.value = "Out of Order (Today)"
    }
    const checkQuantityRemaining = () => {
        if(totalRemaining != 0) {
            return true
        }
        error.value = "Out of Order"
    }
    const checkTodayRemainingEnoughForMinimumBuying = () => {
        if(
            todayRemaining >= props.ticket.minimum_buying || todayRemaining < 0
        ) {
            return true
        }
        error.value = "Insufficiency amount due Minimum buying (Today)"
    }
    const checkTotalRemainingEnoughForMinimumBuying = () => {
        if(
            totalRemaining >= props.ticket.minimum_buying || totalRemaining < 0
        ) {
            return true
        }
        error.value = "Insufficiency amount due Minimum buying"
    }
    const checkStartDate = () => {
        if(currentUTCTime >= props.ticket.start_date_time_utc) {
            return true
        }
        error.value = "Starting Soon"
    }
    const checkEndDate = () => {
        if(currentUTCTime <= props.ticket.end_date_time_utc) {
            return true
        }
        error.value = "End of Sale Period"
    }
    const checkInitialAvailability = () => {
        if(
            checkStartDate() &&
            checkEndDate() &&
            checkQuantityRemaining() && 
            checkTodayRemaining() && 
            checkTodayRemainingEnoughForMinimumBuying() &&
            checkTotalRemainingEnoughForMinimumBuying() &&
            props.ticket.available
        ) {
            enable.value = true
            checkActionButtonAvailability()
        }
    }

    /** Date Time Formatter **/    
    const displayStartDateTime = computed(() => {
        return useConvertUTCtoLocalDateToDisplay(props.ticket.start_date_time_utc)
    })
    const displayEndDateTime = computed(() => {
        return useConvertUTCtoLocalDateToDisplay(props.ticket.end_date_time_utc)
    })


    /** Format Remaining **/
    const displayTotalRemaining = computed(() => {
        return props.ticket.quantity - props.ticket.stats_total_sale
    })

    /** Format Remaining **/
    const displayTodayRemaining = computed(() => {
        if(totalRemaining < todayRemaining) {
            return totalRemaining
        }
        return todayRemaining
    })



    /** Handle Add-Remove Ticket to Cart **/
    const addTicketToCart = () => {   
        const dataToAdd = {
            ticket_id: props.ticket.id,
            quantity: quantity.value,
            price: props.ticket.price
        }
        user_cart.addData(dataToAdd)
    }
    const removeTicketFromCart = () => {
        user_cart.removeData(props.ticket.id)
    }
    const handleSelectItem = (e) => {
        e.preventDefault()
        if(props.ticket.available && enable.value) {
            if(selected.value) {
                removeTicketFromCart()
                selected.value = false
            } else {
                addTicketToCart()
                selected.value = true
            }
        }
    }


    /** handleActionButton Increase and Decrease  **/
    const disableDecreaseButton = ref(true)
    const disableIncreaseButton = ref(true)
    const updateTicketToCart = () => {
        removeTicketFromCart()
        addTicketToCart()
    }
    const handleIncreaseButton = () => {
        const limit_per_time = props.ticket.limit_per_time
        const limit_per_day = props.ticket.limit_per_day

        if(
            (quantity.value < totalRemaining || totalRemaining < 0) &&
            (quantity.value < todayRemaining || todayRemaining < 0) &&
            (quantity.value < limit_per_day || limit_per_day < 0) &&
            (quantity.value < limit_per_time || limit_per_time < 0) 
        ) {
            disableIncreaseButton.value = false
        } else {
            disableIncreaseButton.value = true
        }
    }
    const handleDecreaseButton = () => {
        if(quantity.value > props.ticket.minimum_buying) {
            disableDecreaseButton.value = false
        } else {
            disableDecreaseButton.value = true
        }
    }
    const checkActionButtonAvailability = () => {
        handleIncreaseButton()
        handleDecreaseButton()
    }
    const handleActionButton = (type) => {
        if (type === 'decrease') {
            quantity.value--
        }
        if (type === 'increase') {
            quantity.value++
        }
        checkActionButtonAvailability()
        updateTicketToCart()
    }

    const priceDecorate = computed(() => {
        let price = props.ticket.price.toString()
        let priceText = price.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")
        return '฿ '+ priceText
    })
    
</script>

<style lang="scss" scoped>
    .ticket-item {
            padding: 15px 15px;
            box-sizing: border-box;
            @media screen and (min-width: 768px) {
                padding: 20px 30px;
            }
            &:hover {
                background-color: #E8EFF8;
            }

            display: grid;
            grid-template-columns: 30px 1fr;
            grid-gap: 10px;

            .detail-group {
                @media screen and (min-width: 768px) {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    grid-gap: 20px;
                }
                .ticket-price {
                    background-color: #fafafa;
                    border: 1px solid #eeeeee;
                    padding: 5px 10px;
                    border-radius: 5px;
                    height: fit-content;
                    margin-top: 15px;
                    @media screen and (min-width: 768px) {
                        margin-top: -5px;
                        
                    }
                    .price {
                        font-size: 18px;
                    }
                    .select {
                        .x-mark {
                            margin-right: 10px;
                            margin-left: 10px;
                            .material-icons {
                                padding-top: 1px;
                                font-size: 20px;
                                vertical-align: top;
                            }
                        }

                        .number {
                            width: 40px;
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                        }

                        button {
                            width: 30px;
                            height: 30px;
                            padding: 0;
                            border: none;
                            background-color: var(--primary-color);
                            border-radius: 6px;
                            .material-icons {
                                color: #FFFFFF;
                                font-size: 15px;
                                line-height: 30px;
                            }
                        }
                        button:disabled {
                            background-color: #cccccc;
                            pointer-events: none;
                        }
                    }
                    div {
                        display: inline-block;
                        white-space: nowrap;
                    }
                }
            }
        }


        .ticket-item.no-select {
            // cursor: pointer;
            .ticket-price .select {
                pointer-events: none;
                opacity: 0.2;

                button {
                    background-color: #ccc;
                }
            }
            .ticket-select {
                color: #eee;
            }

        }
        .ticket-item.no-select:hover {
            .ticket-select {
                color: #cccccc;
            }
        }

        .ticket-item.selected {
            background-color: #F0F6FE;
            &:hover {
                background-color: #E8EFF8;
            }
            .ticket-price {
                .price {
                    font-weight: bold;
                }
            }
        }

        .ticket-select {
            color: var(--primary-color);
            cursor: pointer;
            .material-icons {
                font-size: 26px;
                margin-top: 1px;
            }
            &.no-pointer {
                cursor: auto;
            }
        }
        .ticket-detail {
            .name {
                cursor: pointer;
                font-weight: bold;
                font-size: 18px;
            }
            .name.no-pointer {
                cursor: auto;
            }
            .desc {
                color: var(--primary-color);
                font-size: 13px;
                margin-top: 5px;
                margin-bottom: 10px;
            }
            .status {
                font-size: 13px;
                display: flex;
                flex-wrap: wrap;
                column-gap: 15px;
                margin-top: 5px;

                .material-icons {
                    font-size: 12px;
                    margin-right: 3px;
                    vertical-align: middle;
                    padding-bottom: 3px;
                }
            }
            .status-number {
                margin-top: 10px;
                span {
                    padding: 0 6px;
                    border-radius: 10px;
                    color: #555;
                    background-color: #fafafa;
                    border: 1px solid #eeeeee;
                }
            }
        }
        .error {
            max-width: 280px;
            text-align: left;
            font-size: 14px;
            color: #EA8781;
        }
</style>
