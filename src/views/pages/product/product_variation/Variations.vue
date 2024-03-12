<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useVariations, useAuth } from '@/stores'
import { onMounted, ref } from 'vue';

const auth           = useAuth();
const variation      = useVariations();
const searchQuery    = ref('');
const paginateSize   = ref(50);
const variationData  = ref();
const authPermission = ref([]);

const getVariations = async() =>{
  const res = await variation.getVariations();
  if(res.success){
    variationData.value = res.result;
  }
}

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

onMounted(() => {
  authenticateUserPermission();
  getVariations();
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <input type="text" placeholder="Search Product...." class="form-control mb-2 mr-2" v-model="searchQuery" @input="searchVariation">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name:'variation-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'sizes-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right" v-if="variationData">
                            <Bootstrap5Pagination
                                :data="variationData"
                                @pagination-change-page="getVariations"
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
                                <th>Variation Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="variation.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="5"/>
                        </tbody>
                        <tbody>
                            <tr data-widget="expandable-table" v-for="(variation, index) in variationData?.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>{{ variation.name }}</td>
                                <td> {{ formatDate(variation.created_at) }}</td>
                                <td> <span :class="{'active-status' : variation.status=='active', 'inactive-status': variation.status=='inactive'}"> {{ variation.status }}</span></td>
                                <td>
                                    <router-link :to="{name:'variation-edit', params: {id: variation.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'sizes-update')">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    <!-- <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-if="deleteLoder == category.id"><i class="fas fa-spinner fa-spin"></i></a>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-else><i class="fas fa-trash"></i></a> -->
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