<template>
    <div class="container">
        <br>
        <br>
        <br>
        <br>
        <br>
        <h1>Test</h1>
        {{ user_cart.data }}
    </div>
</template>

<script setup>
    import { userCart } from "@/stores/user_cart"
    const user_cart = userCart()
</script>
