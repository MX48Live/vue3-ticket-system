<template>
    <div class="ticket-item" :class="selected ? 'selected' : 'no-select'">
        <div class="ticket-select" @click="handleSelectItem" :class="enable ? '' : 'no-pointer'">
            <span class="material-icons" v-if="enable">check_box_outline</span>
        </div>
        <div class="detail-group">
            <div class="ticket-detail">
                <div class="name" @click="handleSelectItem"  :class="enable ? '' : 'no-pointer'">{{ ticket.name }}</div>
                <div class="desc">{{ ticket.description }}</div>
                <div class="status status-date" v-if="ticket.start_date_time_utc || ticket.end_date_time_utc">
                    <span v-if="ticket.start_date_time_utc && ticket.setting.start_date_time">
                        <strong><span class="material-icons">calendar_today</span>เริ่ม:</strong> {{ displayStartDateTime }}
                    </span>
                    <span v-if="ticket.end_date_time_utc  && ticket.setting.end_date_time">
                        <strong><span class="material-icons">calendar_today</span>สิ้นสุด:</strong> {{ displayEndDateTime }}
                    </span>
                </div>
                <div class="status status-number" v-if="ticket.stats.total_remaining || ticket.stats.total_sale || ticket.stats.today_remaining">
                    <span v-if="ticket.stats.total_remaining >= 0 && ticket.setting.total_remaining">คงเหลือ: {{ ticket.stats.total_remaining }}</span>
                    <span v-if="ticket.stats.total_sale >= 0 && ticket.setting.total_sale">จำนวนผู้ซื้อ: {{ ticket.stats.total_sale }}</span>
                    <span v-if="ticket.stats.today_remaining >= 0  && ticket.setting.today_remaining">คงเหลือวันนี้: {{ ticket.stats.today_remaining }}</span>
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
    const user_cart = userCart()

    const enable = ref(false)
    const quantity = ref(props.ticket.minimum_buying)
    const selected = ref(false)
    const error = ref('Not Available')
    const cart = reactive([])
    const props = defineProps({
        ticket: {
            type: Object,
            required: true
        }
    })

    const currentUTCTime = parseInt(DateTime.now().toUTC().toFormat('yyyyMMddHHmm'))

    // Check InitialAvailable
    onMounted(() => {
        checkInitialAvailability()
    })
    const checkTodayRemaining = () => {
        if(props.ticket.stats.today_remaining != 0) {
            return true
        } else {

        }
    }
    const checkQuantityRemaining = () => {
        if(props.ticket.quantity != 0) {
            return true
        }
    }
    const checkTodayRemainingEnoughForMinimumBuying = () => {
        if(
            props.ticket.stats.today_remaining >= props.ticket.minimum_buying ||
            props.ticket.stats.today_remaining == -1
        ) {
            return true
        }
    }
    const checkTotalRemainingEnoughForMinimumBuying = () => {
        if(
            props.ticket.stats.total_remaining >= props.ticket.minimum_buying ||
            props.ticket.stats.total_remaining == -1
        ) {
            return true
        }
    }
    const checkStartDate = () => {
        return currentUTCTime > props.ticket.start_date_time_utc
    }
    const checkEndDate = () => {
        return currentUTCTime < props.ticket.end_date_time_utc
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
    const convertNumberDateToDisplay = (number) => {
        const arr = []
        const tempNumber = number.toString()
        for(let i = 0; i < tempNumber.length; i++) {
            arr.push(tempNumber[i])
        }
        const year = parseInt(arr.slice(0,4).join(''))
        const month = parseInt(arr.slice(4,6).join(''))
        const day = arr.slice(6,8).join('')
        const hour = arr.slice(8,10).join('')
        const minute =  arr.slice(10,12).join('')
        const thaiMonth = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
        const thaiYear = year+543
        return day+ " " + thaiMonth[month] + " " + thaiYear + " · " + hour + ":" + minute
    }
    
    const displayStartDateTime = computed(() => {
        return convertNumberDateToDisplay(props.ticket.start_date_time_utc)
    })
    const displayEndDateTime = computed(() => {
        return convertNumberDateToDisplay(props.ticket.end_date_time_utc)
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
    const handleSelectItem = () => {
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
        const limit_per_day = props.ticket.limit_per_day === -1 ? limit_per_time : props.ticket.limit_per_day
        const today_remaining = props.ticket.stats.today_remaining === -1 ? limit_per_time : props.ticket.stats.today_remaining
  
        if(
            quantity.value < limit_per_day && 
            quantity.value < limit_per_time &&
            quantity.value < today_remaining
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
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            color: #EA8781;
        }
</style>
