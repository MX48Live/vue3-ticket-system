<template>
    <header :class="isOpen ? 'open' : 'close'">
        <div class="container-fluid">
            <div class="navbar-group">
                <div class="logo">
                    <RouterLink to="/" @click="closeMenu">Block Mountain</RouterLink>
                    <div class="mobile-toggle" :class="isOpen ? 'active' : ''" @click="toggleMenu">{{ isOpen ? "Close" : "Menu" }}</div>
                </div>
                <nav>
                    <RouterLink to="/" @click="closeMenu">Event Detail</RouterLink>
                    <!-- <RouterLink to="/">My Ticket</RouterLink> -->
                    <RouterLink to="/manage-tickets" @click="closeMenu">Organizer</RouterLink>
                    <RouterLink to="/sign-out" v-if="auth_status.isUser" @click="closeMenu" class="sign-out">Sign Out</RouterLink>
                </nav>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { ref } from 'vue'
    import { getAuth, onAuthStateChanged } from "firebase/auth"
    import { authStatus } from "@/stores/auth_status"

    const auth_status = authStatus()
    
    const isOpen = ref(false)

    const toggleMenu = (e) => {
        isOpen.value = !isOpen.value
    }
    const closeMenu = (e) => {
        isOpen.value = false
    }


</script>


<style scoped lang="scss">
    header {
        max-height: 65px;
        @media screen and (min-width: 768px) {
            max-height: unset;
        }
        overflow: hidden;
        display: block;
        background-color: #FFFFFF;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
        padding-top: 15px;
        padding-bottom: 15px;
        border-top: 5px solid var(--primary-color);
        position: absolute;
        width: 100%;
        transition: max-height 0.2s;

        &.open {
            max-height: 300px;
        }
        z-index: 100;
    }

    .navbar-group {
        display: grid;
        @media screen and (min-width: 768px) {
            grid-template-columns: auto auto;
            justify-content: space-between;
            align-content: center;
            align-items: center;
        }
    }
    .logo {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-color);
        a {
             color: var(--primary-color);
        }
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        .mobile-toggle {
            @media screen and (min-width: 768px) {
                display: none;
            }
            font-size: 14px;
            display: grid;
            justify-content: center;
            align-content: center;
            border: 1px solid var(--primary-color);
            padding: 0 10px;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.25s;
            &:hover, &.active {
                background-color: var(--primary-color);
                color: #FFFFFF;
            }
        }

    }
    nav {
        display: grid;
        grid-gap: 10px;
        margin-top: 20px;
        @media screen and (min-width: 768px) {
            margin-top: 0px;
            grid-auto-flow: column;
        }
        a {
            font-size: 16px;
            color: var(--primary-color);
            padding: 8px 12px;
            border-radius: 6px;
        }
        a:hover,
        .router-link-exact-active {
            background-color: rgba($color: #CCCCCC, $alpha: 0.2);
        }
        .sign-out {
            color: #CD3939;
        }
    }

</style>

