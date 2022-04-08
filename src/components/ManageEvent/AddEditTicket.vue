<template>
    <a-drawer
      v-model:visible="isShowDrawer"
      class="custom-class"
      :title="ticket.name"
      placement="right"
      @close="close"
    >
        <div class="form-group">
            <label>Ticket Name</label>
            <a-input v-model:value="formData.name" placeholder="Basic usage" />
        </div>
        <div class="form-group">
            <label>Ticket Name</label>
            <a-textarea v-model:value="formData.description" placeholder="Basic usage" auto-size />
        </div>
        <div class="form-group date-time">
            <label>Start Date</label>
            <div>
                <a-input v-model:value="formData.start_date_time_utc" type="date" auto-size />
                <a-input v-model:value="formData.start_date_time_utc" type="time" auto-size />
            </div>
        </div>
        <div class="form-group date-time">
            <label>End Date</label>
            <div>
                <a-input v-model:value="formData.end_date_time_utc" type="date" auto-size />
                <a-input v-model:value="formData.end_date_time_utc" type="time" auto-size />
            </div>
        </div>
        
        <div class="form-group">
            <label>Price</label>
            <a-input v-model:value="formData.price" placeholder="Basic usage" auto-size />
        </div>
        <div class="form-group">
            <label>Quantity</label>
            <a-input v-model:value="formData.quantity" placeholder="Basic usage" auto-size />
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
                <a-switch v-model:checked="formData.setting.start_date_time" size="small" /> 
                <span>Show Start Date - Time</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.end_date_time" size="small" /> 
                <span>Show End Date - Time</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.quantity" size="small" /> 
                <span>Show Quantity</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.total_sale" size="small" /> 
                <span>Show Total Sale</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.total_remaining" size="small" /> 
                <span>Show Total Remaning</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.today_remaining" size="small" /> 
                <span>Show Today Remaning</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.limit_per_day" size="small" /> 
                <span>Show Limit Total Sale Per Day</span>
            </label>
        </div>
        <div class="select-group">
            <label>
                <a-switch v-model:checked="formData.setting.show_if_inactive" size="small" /> 
                <span>Show If Inactive</span>
            </label>
        </div>

        <hr>
        <div class="stats" v-if="mode === 'edit'">
            <div>Created: {{ formData.created }}</div>
            <div>Update: {{ formData.updated }}</div>
        </div>
        <a-button type="primary" class="submit">Save</a-button>
    </a-drawer>
</template>

<script setup>
    import { ref, reactive, computed, watch } from 'vue'
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
        isShowDrawer: {
            type: Boolean,
            default: false
        }
    })
    
    /** handle Close Drawer **/
    const close = (e) => {
        emit('update:modelValue', false)
    }


    const formData = reactive({
        name: props.ticket.name,
        description: props.ticket.description,
        start_date_time_utc: props.ticket.start_date_time_utc,
        end_date_time_utc: props.ticket.end_date_time_utc,
        available: props.ticket.available,
        price: props.ticket.price,
        quantity: props.ticket.quantity,
        minimum_buying: props.ticket.minimum_buying,
        limit_per_day: props.ticket.limit_per_day,
        limit_per_time: props.ticket.limit_per_time,
        created: props.ticket.created_date_utc,
        updated: props.ticket.updated_date_utc,
        setting: {
            start_date_time: props.ticket.setting.start_date_time,
            end_date_time: props.ticket.setting.end_date_time,
            quantity: props.ticket.setting.quantity,
            total_sale: props.ticket.setting.total_sale,
            total_remaining: props.ticket.setting.total_remaining,
            today_remaining: props.ticket.setting.today_remaining,
            limit_per_day: props.ticket.setting.limit_per_day,
            show_if_inactive: props.ticket.setting.show_if_inactive,
        }
    })

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
        display: flex;
        justify-content: space-between;
        div {
            margin-bottom: 2px;
        }
    }
    button.submit {
        width: 100%;
    }
</style>
