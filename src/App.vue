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
        useLoadTicketList()
    })
</script>

<style lang="scss">
    :root {
        --primary-color: #402B83;
    }
    body {
        font-family: 'Noto Sans', 'Noto Sans Thai', sans-serif;
    }
    a {
        text-decoration: none;
    }
    .content-group {
        padding-top: 75px;
    }
</style>

