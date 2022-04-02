<template>
    <Navbar />
    <RouterView />
</template>


<script setup>
    import Navbar from './components/common/Navbar.vue';
    import { onMounted } from "vue";
    import { useLoadTicketList } from "@/use/useLoadTicketList"

    onMounted(() => {
        useLoadTicketList()
    })
</script>
