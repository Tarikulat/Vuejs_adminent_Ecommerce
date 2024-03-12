<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useAclManagement, useAuth } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const auth           = useAuth();
const aclManagement  = useAclManagement();
const { roles }      = storeToRefs(aclManagement);
const searchQuery    = ref('');
const paginateSize   = ref(20);
const authPermission = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getRoles = async(page=1) =>{
    aclManagement.getRoles(page, paginateSize.value);
}

const paginateSizeWiseData = () =>{
    getRoles();
}

onMounted(() => {
    authenticateUserPermission();
    getRoles();
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
                        <select name="" class="form-control paginate" id="" v-model="paginateSize" @change="paginateSizeWiseData">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name:'role-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'roles-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <Bootstrap5Pagination
                                :data="roles"
                                @pagination-change-page="getRoles"
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
                                <th>Display Name</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="aclManagement.loading">
                            <ProductListTableSkeleton :dataAmount="11" :columnAmount="5"/>
                        </tbody>
                        <tbody v-else>
                            <tr data-widget="expandable-table" v-for="(role, index) in roles.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>{{ role.display_name }}</td>
                                <td>{{ role.name }}</td>
                                <td>{{ role.description }}</td>
                                <td>
                                    <router-link :to="{name:'role-edit', params: {id: role.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'roles-update')">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-if="deleteLoder == role.id"><i class="fas fa-spinner fa-spin"></i></a>
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

</style>