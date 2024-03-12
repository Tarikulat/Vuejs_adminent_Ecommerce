<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useNotification, useBanner, useAuth } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const auth           = useAuth();
const searchQuery    = ref('');
const paginateSize   = ref(50);
const banner         = useBanner();
const notifications  = useNotification();
const authPermission = ref([]);

const bannerData   = ref();

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getBannerData = async() =>{
    const res = await banner.getBannerData();
    if(res.success){
        bannerData.value = res.result;
    }
}

onMounted(() => {
    authenticateUserPermission();
    getBannerData();
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <!-- <input type="text" placeholder="Search Product...." class="form-control mb-2 mr-2" v-model="searchQuery">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> -->
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name:'banner-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'banners-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <!-- <Bootstrap5Pagination
                                :data="brands"
                                @pagination-change-page="brand.getBrands"
                                :limit="3"
                            >
                                <template #prev-nav>
                                    <a class="Previous" href="#">Previous</a>
                                </template>
                                <template #next-nav>
                                    <a class="Next" href="#">Next</a>
                                </template>
                            </Bootstrap5Pagination> -->
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-hover text-center">
                        <thead>
                            <tr class="bg-info">
                                <th>SL</th>
                                <th>Image</th>
                                <th>Banner Title</th>
                                <th>Banner Link</th>
                                <th>Banner Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="banner.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="7"/>
                        </tbody>
                        <tbody v-else>
                            <tr data-widget="expandable-table" v-for="(banner, index) in bannerData?.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>
                                    <img :src="banner.image" width="50" alt="">
                                </td>
                                <td>{{ banner.title }}</td>
                                <td>{{ banner.link }}</td>
                                <td>{{ banner.type }}</td>
                                <td><span :class="{'active-status' : banner.status=='active', 'inactive-status': banner.status=='inactive'}">{{ banner.status }}</span></td>
                                <td>
                                    <router-link :to="{name:'banner-edit', params: {id: banner.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'banners-update')">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- /.row -->
</template>
<style>
    .page-link{
        color: #000 !important;
    }
    .page-item.active .page-link {
        z-index: 3;
        color: #fff;
        background-color: #17A2B8 !important;
        border-color: #17A2B8 !important;
        color: #fff !important;
    }
    .card-title{
        width: 500px;
    }
    .paginate{
        width: 100px !important;
    }
</style>