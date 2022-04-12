<template>
    <a-drawer
        v-model:visible="activeDrawer"
        class="custom-class"
        :title="[ticket.name ? ticket.name : 'Add New Ticket' ]"
        placement="right"
        @close="close"
    >
        <div class="form-group">
            <label>Ticket Name</label>
            <a-input v-model:value="formData.name" placeholder="Ticket Name" />
            <span class="error"></span>
        </div>
        <div class="form-group">
            <label>Description</label>
            <a-textarea v-model:value="formData.description" placeholder="Description" auto-size />
        </div>
        <div class="form-group date-time">
            <label>Start Date</label>
            <div>
                <a-input v-model:value="displayLocalStartDate" type="date" id="start_date" @change="handleStartDateChange" auto-size />
                <a-input v-model:value="displayLocalStartTime" type="time" id="start_time" @change="handleStartTimeChange" auto-size />
            </div>
        </div>
        <div class="form-group date-time">
            <label>End Date</label>
            <div>
                <a-input v-model:value="displayLocalEndDate" type="date" id="end_date" @change="handleEndDateChange" auto-size />
                <a-input v-model:value="displayLocalEndTime" type="time" id="end_time" @change="handleEndTimeChange" auto-size />
            </div>
        </div>
        
        <div class="form-group">
            <label>Price</label>
            <a-input v-model:value="formData.price" placeholder="Price" type="number" />
        </div>
        <div class="form-group">
            <label>Quantity</label>
            <a-input v-model:value="formData.quantity" placeholder="Quantity" type="number" />
        </div>
        <div class="form-group">
            <label>Minimum buying</label>
            <div class="add-remove-group">
                <a-button type="primary" @click="handleMinimumBuying('decrease')" 
                        :class="formData.minimum_buying < 2 ? 'disabled' : ''">
                    <span class="material-icons">remove</span>
                </a-button>
                <div>{{ calculateMinimumBuying }}</div>
                <a-button type="primary" @click="handleMinimumBuying('increase')"
                          :class="formData.minimum_buying < formData.quantity ? '' : 'disabled'">
                    <span class="material-icons">add</span>
                </a-button>
            </div>
        </div>
        <div class="form-group">
            <label><a-checkbox v-model:checked="isLimitPerTime">Limit Ticket Per Time</a-checkbox></label>
            <div class="add-remove-group" v-if="isLimitPerTime">
                <a-button type="primary" @click="handleLimitPerTime('decrease')"
                          :class="formData.limit_per_time <= formData.minimum_buying ? 'disabled' : ''">
                    <span class="material-icons">remove</span>
                </a-button>
                <div>{{ calculateLimitPerTime }}</div>
                <a-button type="primary" @click="handleLimitPerTime('increase')"
                          :class="formData.limit_per_time < formData.quantity ? '' : 'disabled'">
                    <span class="material-icons">add</span>
                </a-button>
            </div>
        </div>

        <div class="form-group">
            <label><a-checkbox v-model:checked="isLimitPerDay">Limit Total Sale Per Day</a-checkbox></label>
            <div class="add-remove-group" v-if="isLimitPerDay">
                <a-button type="primary" @click="handleLimitPerDay('decrease')"
                          :class="formData.limit_per_day <= formData.limit_per_time ? 'disabled' : ''">
                    <span class="material-icons">remove</span>
                </a-button>
                <div>{{ calculateLimitPerDay }}</div>
                <a-button type="primary" @click="handleLimitPerDay('increase')"
                          :class="formData.limit_per_day < formData.quantity ? '' : 'disabled'">
                    <span class="material-icons">add</span>
                </a-button>
            </div>
        </div>
        <div class="form-group">
            <div>
                <label>Active</label>
            </div>
            <a-radio-group v-model:value="formData.available" button-style="solid">
                <a-radio-button :value="true" >Active</a-radio-button>
                <a-radio-button :value="false">Inactive</a-radio-button>
            </a-radio-group>
        </div>
        <hr>
        <div class="title">
            <strong>Ticket Display Setting</strong>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting_start_date_time" size="small" /> 
                <span>Show Start Date - Time</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting_end_date_time" size="small" /> 
                <span>Show End Date - Time</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting_total_sale" size="small" /> 
                <span>Show Total Sale</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting_total_remaining" size="small" /> 
                <span>Show Total Remaning</span>
            </label>
        </div>
        <div class="select-group" v-if="isLimitPerDay">
            <label>
                <a-switch v-model:checked="formData.setting_today_remaining" size="small" /> 
                <span>Show Today Remaning</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting_show_if_inactive" size="small" /> 
                <span>Show If Inactive</span>
            </label>
        </div>

        <hr>
        <div class="stats" v-if="mode === 'edit'">
            <div><strong>Created:</strong> {{ displayCreated }}</div>
            <div><strong>Update:</strong> {{ displayUpdated }}</div>
        </div>
        <a-button type="primary" class="submit" @click="handleSubmitTicket">{{ mode === "edit" ? 'Save' : mode === "add" ? 'Add' : 'Button' }}</a-button>
        <div v-if='mode === "edit"' class="deleteBtn">
            <span @click="confirmDelete">Delete</span>
        </div>
    </a-drawer>
</template>

<script setup>
    import { DateTime } from "luxon";
    import { Modal } from 'ant-design-vue';
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { ref, reactive, computed, watch, createVNode, onUnmounted, onMounted } from 'vue'
    import { useConvertUTCtoLocalDateToDisplay } from "@/use/useConvertUTCtoLocalDateToDisplay"
    import { convertUTCtoLocal, convertLocaltoUTC, convertDateForDisplay, convertTimeForDisplay } from "@/use/useTimeConvert"
    import { dataTickets } from "@/stores/data_tickets"
    import { useAddNewTicket } from "@/use/useAddNewTicket"
    import { useUpdateTicket } from "@/use/useUpdateTicket"
    import { useDeleteTicket } from "@/use/useDeleteTicket"
    import { notify } from "@kyvg/vue3-notification";

    const now = DateTime.now().toUTC().toFormat('yyyyMMddHHmm').toString()
    const data_tickets = dataTickets()
    const emit = defineEmits(['update:modelValue'])
    const props = defineProps({
        ticket: {
            type: Object
        },
        mode: {
            type: String
        },
        modelValue: {
            type: Boolean,
            default: false
        },
        activeDrawer: {
            type: Boolean,
            default: false
        }
    })

    
    /** handle Close Drawer **/
    const close = (e) => {
        emit('update:modelValue', false)

    }

    const formData = reactive({
        id: props.ticket.id,
        name: props.ticket.name,
        description: props.ticket.description,
        start_date_time_utc: parseInt(props.ticket.start_date_time_utc ? props.ticket.start_date_time_utc : now),
        end_date_time_utc: parseInt(props.ticket.end_date_time_utc ? props.ticket.end_date_time_utc : now),
        available: props.ticket.available,
        price: parseInt(props.ticket.price),
        quantity: parseInt(props.ticket.quantity),
        minimum_buying: parseInt(props.ticket.minimum_buying),
        limit_per_day: parseInt(props.ticket.limit_per_day),
        limit_per_time: parseInt(props.ticket.limit_per_time),
        created_date: parseInt(props.ticket.created_date),
        updated_date: parseInt(props.ticket.updated_date),
        stats_total_sale: parseInt(props.ticket.stats_total_sale),
        stats_today_sale: parseInt(props.ticket.stats_today_sale),
        setting_start_date_time: props.ticket.setting_start_date_time,
        setting_end_date_time: props.ticket.setting_end_date_time,
        setting_total_remaining: props.ticket.setting_total_remaining,
        setting_total_sale: props.ticket.setting_total_sale,
        setting_today_remaining: props.ticket.setting_today_remaining,
        setting_show_if_inactive: props.ticket.setting_show_if_inactive,
    })

    
    const LocalStartDateTime = ref(convertUTCtoLocal(formData.start_date_time_utc))
    const LocalEndDateTime = ref(convertUTCtoLocal(formData.end_date_time_utc))
    const displayLocalStartDate = ref(convertDateForDisplay(LocalStartDateTime.value))
    const displayLocalStartTime = ref(convertTimeForDisplay(LocalStartDateTime.value))
    const displayLocalEndDate = ref(convertDateForDisplay(LocalEndDateTime.value))
    const displayLocalEndTime = ref(convertTimeForDisplay(LocalEndDateTime.value))

     
     /** Display Create Edit time **/
    const displayCreated = computed(() => {
        return useConvertUTCtoLocalDateToDisplay(formData.created_date)
    })
    const displayUpdated = computed(() => {
        return useConvertUTCtoLocalDateToDisplay(formData.updated_date)
    })


    /** Date Time handler **/
    const concatDateChange = (e, defaultTime) => {
        const concat = e.target.value + defaultTime 
        const source = concat.replace(/[-: ]/g, "")
        return source
    }
    const concatTimeChange = (defaultDate, e) => {
        const concat = defaultDate + e.target.value
        const source = concat.replace(/[-: ]/g, "")
        return source
    }
    const handleStartDateChange = (e) => {
        const source = concatDateChange(e, displayLocalStartTime.value)
        console.log(source)
        formData.start_date_time_utc = convertLocaltoUTC(source)
    }
    const handleStartTimeChange = (e) => {
        const source = concatTimeChange(displayLocalStartDate.value, e)
        console.log(source)
        formData.start_date_time_utc = convertLocaltoUTC(source)
    }
    const handleEndDateChange = (e) => {
        const source = concatDateChange(e, displayLocalEndTime.value)
        formData.end_date_time_utc = convertLocaltoUTC(source)
    }
    const handleEndTimeChange = (e) => {
        const source = concatTimeChange(displayLocalEndDate.value, e)
        formData.end_date_time_utc = convertLocaltoUTC(source)
    }

    
    /** handle handleMinimumBuying Drawer **/
    const handleMinimumBuying = (type) => {
        actionButtons(type, 'minimum_buying', 'limit_per_time', isLimitPerTime.value)
    }
    const calculateMinimumBuying = computed(() => {
        return calculatedNumber('minimum_buying')
    })

    /** handle Limit Per Time Drawer **/
    const isLimitPerTime = ref(false)
    if(formData.limit_per_time != -1) {
        isLimitPerTime.value = true
    }
    watch(isLimitPerTime, (checked) => {
        if(!checked) {
            formData.limit_per_time = -1
        }
    })
    const handleLimitPerTime = (type) => {
        actionButtons(type, 'limit_per_time', 'limit_per_day', isLimitPerDay.value)
    }
    const calculateLimitPerTime = computed(() => {
        return calculatedNumber('limit_per_time')
    })
    

    /** handle Limit Per Day Drawer **/
    const isLimitPerDay = ref(false)
    if(formData.limit_per_day != -1) {
        isLimitPerDay.value = true
    }
    const handleLimitPerDay = (type) => {
        actionButtons(type, 'limit_per_day')
    }
    const calculateLimitPerDay = computed(() => {
        return calculatedNumber('limit_per_day')
    })
    watch(isLimitPerDay, (checked) => {
        if(!checked) {
            formData.limit_per_day = -1
        }
    })


    const actionButtons = (type, currentTarget, alsoUpdate, alsoUpdateIsActive) => {
        if(type === 'increase') {
            formData[currentTarget]++
            if(alsoUpdateIsActive && formData[alsoUpdate] < formData[currentTarget]) {
                formData[alsoUpdate] = formData[currentTarget]
            }
            if(alsoUpdateIsActive && currentTarget === 'minimum_buying') {
                if(formData.limit_per_day < formData.minimum_buying) {
                    formData.limit_per_day = formData.minimum_buying
                }
            }
        }
        if(type === 'decrease') {
            if(currentTarget !== 1) {
                formData[currentTarget]--
            }
        }
    }


    const calculatedNumber = (data) => {
        if(formData[data] > formData.quantity) {
            formData[data] = formData.quantity
        }
        if(!formData.quantity || formData.quantity == 0 || formData[data] < 0) {
            formData[data] = 1
        }
        return formData[data]
    }

    
    /** handle Validate Form **/
    const formValidate = reactive({
        name: true,
        description: true,
        start_date_time: true,
        end_date_time: true,
        price: true,
        quantity: true
    })
    const handleValidate = () => {
        const checkNumber = new RegExp('^[1-9][0-9]*$')
        formData.name === '' ? formValidate.name = false : formValidate.name = true
        formData.description === '' ? formValidate.description = false : formValidate.description = true
        formData.start_date_time_utc.toString().length != 12 ? formValidate.start_date_time = false : formValidate.start_date_time = true
        formData.end_date_time_utc.toString().length != 12 ? formValidate.end_date_time = false : formValidate.end_date_time = true
        checkNumber.test(formData.price) ? formValidate.price = true : formValidate.price = false
        checkNumber.test(formData.quantity) ? formValidate.quantity = true : formValidate.quantity = false
        return  formValidate.name && 
                formValidate.description && 
                formValidate.start_date_time && 
                formValidate.end_date_time &&
                formValidate.price &&
                formValidate.quantity
    }


    const updateUpdatedDateTime = () => {
        if(props.mode === 'add') {
            formData.created_date = parseInt(now)
        }
        formData.updated_date = parseInt(now)
    }

    const confirmDelete = () => {
        Modal.confirm({
            title: 'Delete ?',
            icon: createVNode(ExclamationCircleOutlined),
            content: `${formData.name} Ticket`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                const resp = useDeleteTicket(formData.id)
                if(resp) {
                    notify({ type: "success", title: `😵 Deleted ${formData.name}` })
                    close()
                }
            },
        });
    }

    /** Form Submit **/
    const handleSubmitTicket = async () => {
        if(handleValidate()) {
            updateUpdatedDateTime()
            if(props.mode === 'edit') {
                await useUpdateTicket(props.ticket.id, formData)
                await close()
                notify({ type: "success", title: "Saved 🎉" })
            }
            if(props.mode === 'add') {
                await useAddNewTicket(formData)
                await close()
                notify({ type: "success", title: "🎉 New Ticket Added" })
            }
        } else {
            notify({ type: "error", title: "Something went wrong, Please Check again." }) 
        }
    }
</script>

<style lang="scss" scoped>
    .form-group {
        margin-bottom: 10px;
        label {
            margin-bottom: 1px;
            font-size: 12px;
            font-weight: bold;
            color: #666;
        }
    }
    .date-time {
        div {
            display: grid;
            grid-gap: 5px;
            grid-template-columns: 1fr 130px;
        }
    }
    .select-group {
        margin-bottom: 4px;
        padding-left: 5px;
        padding-bottom: 5px;
        &:hover {
            background-color: #f5f5f5;
        }
        label {
            display: block;
            cursor: pointer;
            font-size: 14px;
            span {
                padding-left: 10px;
            }
        }
    }
    .add-remove-group {
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        button.disabled {
            pointer-events: none;
            opacity: 0.2;
        }
        button {
            text-align: center;
            padding: 0;
            width: 40px;
            font-weight: bold;
            .material-icons {
                font-size: 20px;
                padding-top: 5px;
            }
        }
        div {
            text-align: center;
            font-weight: bold;
            line-height: 30px;
            background-color: #eee;
        }
        border: 1px solid #eee;
    }
    .title {
        margin-bottom: 10px;
        display: block;
    }
    .stats {
        margin-bottom: 5px;
        font-size: 10px;
        color: #888;
        div {
            margin-bottom: 2px;
        }
    }
    button.submit {
        width: 100%;
    }
    .deleteBtn {
        text-align: center;
        display: block;
        margin-top: 15px;
        span {
            padding: 10px;
            cursor: pointer;
            color: #888888;
            &:hover {
                color: #CD3939;
            }
        }
    }
</style>
