<script setup>
import { HomeSliderSkeleton }  from '@/components';
import { useHomeSlider } from '@/stores';
import { onMounted, ref } from 'vue';

const slider = useHomeSlider();
const sliders = ref({});

const getSlider = async() =>{
    const res = await slider.getSliders();
    if(res.success){
        sliders.value = res.result;
    }
}
onMounted(() => {
    getSlider();
})

</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <router-link :to="{name: 'home-slider-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'sliders-create')"><i class="fas fa-plus"></i> Add New</router-link>
                </div>
                <div class="card-body">
                    <div class="row blog-body">
                        <template v-if="slider.loading">
                            <HomeSliderSkeleton/>
                        </template>
                        <template v-else>
                            <div class="col-md-4" v-for="(slider, index) in sliders" :key="index">
                                <div class="card">
                                    <div class="card-body slider-image p-0">
                                        <img :src="slider.image" alt="Thumbnail">
                                    </div>
                                    <div class="card-footer">
                                        <div class=" d-flex justify-content-between">
                                            <router-link :to="{name:'home-slider-edit', params:{ id: slider.id} }" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'sliders-update')">
                                                <i class="fas fa-edit"></i> Edit
                                            </router-link>
                                            <div class="slider-status">
                                                <div disabled class="btn btn-success" v-if="slider.status == 'active'"><i class="fas fa-check"> Active</i></div>
                                                <div disabled class="btn btn-danger" v-else><i class="fas fa-times"> Inactive</i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>
.slider-image img{
    max-height: 232px;
    width: 100%;
}
.slider-image{
    position: relative;
}

</style>