<template>
    <div class="is-loading">
        <loading-outlined />
        <p>Loading...</p>
    </div>
</template>

<script setup>
    import { LoadingOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
    .is-loading {
        text-align: center;
        padding: 40px;
        span {
            margin-bottom: 10px;
            font-size: 30px;
            color: #888888;
        }
        p {
            font-family: monospace;
            color: #888888;
            padding-left: 15px;
        }
    }
</style>
