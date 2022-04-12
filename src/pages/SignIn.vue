<template>
    <div class="sign-page-container">
        <div class="sign-in-box">
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
                <a-button type="primary" class="submit" @click="handleSignIn" size="large" >Sign In</a-button>
                <div class="sign-out" @click="handleSignOut" v-if="user">Sign Out</div>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { getAuth, signOut } from "firebase/auth"; 
    const auth = getAuth()
    const user = auth.currentUser

    const formData = reactive({
      email: '',
      password: '',
    })

    const formValidate = reactive({
      email: true,
      password: true,
    })

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed Out ⚡️')
        }).catch((error) => {
            console.log('Can not Sign Out 😵 ')
        })
    } 

    const handleSignIn = () => {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Signed In Success ✅')
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error code: ', errorCode)
                console.log('Error Message: ', errorMessage)
            })
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
</style>
