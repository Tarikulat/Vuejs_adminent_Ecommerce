<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useNotification, useBrands, useAuth } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const auth           = useAuth();
const searchQuery    = ref('');
const paginateSize   = ref(50);
const brand          = useBrands();
const notifications  = useNotification();
const { brands }     = storeToRefs(brand);
const authPermission = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}





onMounted(() => {
    authenticateUserPermission();
    brand.getBrands();
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <input type="text" placeholder="Search Product...." class="form-control mb-2 mr-2" v-model="searchQuery">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name:'brand-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'brands-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <Bootstrap5Pagination
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
                            </Bootstrap5Pagination>
                        </ul>
                    </div>
                </div>
                <!-- ./card-header -->
                <div class="card-body">
                    <table class="table table-bordered table-hover text-center">
                        <thead>
                            <tr class="bg-info">
                                <th>SL</th>
                                <th>Image</th>
                                <th>Brand Name</th>
                                <th>Brand Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="brand.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="5"/>
                        </tbody>
                        <tbody v-else>
                            <tr data-widget="expandable-table" v-for="(brand, index) in brands.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>
                                    <img :src="brand.image" width="50" alt="">
                                </td>
                                <td>{{ brand.name }}</td>
                                <td><span :class="{'active-status' : brand.status=='active', 'inactive-status': brand.status=='inactive'}">{{ brand.status }}</span></td>
                                <td>
                                    <router-link :to="{name:'brand-edit', params: {id: brand.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'brands-update')">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-if="deleteLoder == brand.id"><i class="fas fa-spinner fa-spin"></i></a>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-else><i class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
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