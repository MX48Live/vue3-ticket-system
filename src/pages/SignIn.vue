<template>
    <div class="sign-page-container">
        <div v-if="checkingStatus" class="checking-authen">
            <loading-outlined />
        </div>
        <div class="sign-in-box" v-if="!checkingStatus">
            <h2>Sign In</h2>
                <div class="form-group" :class="!formValidate.email ? 'error' : ''">
                    <label>Email</label>
                    <a-input v-model:value="formData.email" type="email" placeholder="Ticket Name" />
                    <span class="error-message">Please Email</span>
                </div>
                <div class="form-group" :class="!formValidate.password ? 'error' : ''">
                    <label>Password</label>
                    <a-input v-model:value="formData.password" type="password" placeholder="Ticket Name" />
                    <span class="error-message">Please Password</span>
                </div>
                <a-button type="primary" class="submit" :class="isLoading ? 'disabled' : '' " @click="handleSignIn" size="large" > 
                    <span v-if="isLoading">
                        <loading-outlined />
                    </span>
                    <span v-if="!isLoading">
                        Sign In
                    </span>
                </a-button>
        </div>
    </div>
</template>

<script setup>
    import { computed, reactive, ref, watch } from 'vue';
    import { signInWithEmailAndPassword } from "firebase/auth"
    import { getAuth, signOut } from "firebase/auth"
    import { notify } from "@kyvg/vue3-notification"
    import { LoadingOutlined } from '@ant-design/icons-vue';
    import { authStatus } from "@/stores/auth_status"
    import router from '@/router';

    const auth_status = authStatus()
    const auth = getAuth()
    const isLoading = ref(false)
    const checkingAuthen = ref()

    watch(checkingAuthen, (checked) => {
        if(checked) {
            alert('changed')
        }
    })

    const checkingStatus = computed(() => {
        if(!auth_status.isCheckingAuthen) {
            if(auth_status.isUser) {
                router.push({ path: '/manage-tickets' })
            }
        }
        return auth_status.isCheckingAuthen
    })

    const formData = reactive({
      email: 'mx48live@gmail.com',
      password: 'D3as3496',
    })

    const formValidate = reactive({
      email: true,
      password: true,
    })

    const handleSignIn = async () => {
        isLoading.value = true
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            const user = await userCredential.user
            await notify({ type: "success", title: `✅ Sign Out Successful` })
            await router.push({ path: '/manage-tickets' })
        } catch (error) {
            // console.log('Error code: ', error.code)
            // console.log('Error Message: ', error.message)
            notify({ type: "error", title: `☹️ Something went wrong, please try again.` })
        }
        isLoading.value = false
    }


</script>

<style lang="scss" scoped>
    .sign-page-container {
        height: 100vh;
        width: 100%;
        display: grid;
        justify-content: center;
        align-content: center;
    }
     .sign-in-box {

         display: block;
         width: 300px;
         h2 {
             font-weight: bold;
             color: var(--primary-color);
         }

         .sign-in-button {
             text-align: center;
             width: 100%;
         }
    }

    .form-group {
        margin-bottom: 10px;
        label {
            margin-bottom: 1px;
            font-size: 12px;
            font-weight: bold;
            color: #666;
        }
    }
    .error-message {
        display: none;
    }
    .form-group.error {
        label {
            color: red;
        }
        input, textarea {
            border-color: red;
        }
        .error-message {
            font-size: 10px;
            font-weight: bold;
            font-family: monospace;
            color: red;
            margin-top: 2px;
            display: block;
        }
    }

    button.submit {
        width: 100%;
        margin-top: 20px;
        &.disabled {
            pointer-events: none;
            background-color: #ccc;
            border-color: #ccc;
        }
    }
    .checking-authen {
        font-size: 50px;
    }
</style>
