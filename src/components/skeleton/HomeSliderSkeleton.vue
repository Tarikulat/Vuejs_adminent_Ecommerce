<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        dataAmount:{
            type:Number,
            required: true,
            default:6,
        }
    });
</script>

<template>
    <div class="col-md-4" v-for="(data, index) in dataAmount" :key="index">
        <div class="card">
            <div class="card-body slider-skeleton p-0">
                <div class="ssc-head-line w-100 slider-skeleton" style="border-radius:3px;"></div>
            </div>
            <div class="card-footer">
                <div class=" d-flex justify-content-between">
                    <div style="width:100px;">
                        <div class="ssc-head-line w-100" style="border-radius:6px; height:35px;"></div>
                    </div>
                    <div style="width:100px;">
                        <div class="ssc-head-line w-100" style="border-radius:6px; height:35px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.slider-skeleton{
    max-height: 232px;
    height: 232px;
    width: 100%;
}
</style>