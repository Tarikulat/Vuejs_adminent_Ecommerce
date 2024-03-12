
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        dataAmount:{
            type:Number,
            required: true,
            default:15,
        },
        columnAmount: {
            type : Number,
            required: true,
        }
    });

</script>
<template>
    <tr v-for="(data , index) in dataAmount" :key="index">
        <th v-for="(amount, index) in columnAmount" :key="index"><div class="ssc-head-line w-100"></div></th>
    </tr>
</template>

<style scoped>

</style>