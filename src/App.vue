<template>
    <Navbar />
    <RouterView class="content-group"/>
</template>


<script setup>
    import Navbar from './components/common/Navbar.vue';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
    import { onMounted } from "vue";
    import { useLoadTicketList } from "@/use/useLoadTicketList"
    import BootstrapVue3 from 'bootstrap-vue-3'

    onMounted(() => {
        // useLoadTicketList()
    })
</script>

<style lang="scss">
    :root {
        --primary-color: #402B83;
    }
    body {
        font-family: 'Noto Sans', 'Noto Sans Thai', sans-serif;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-smoothing: antialiased;
        -webkit-font-smoothing: antialiased;
        text-shadow: rgba(0, 0, 0, .01) 0 0 1px;

    }
    a {
        text-decoration: none;
    }
    .container {
        padding-left: 15px;
        padding-right: 15px;
    }
</style>

