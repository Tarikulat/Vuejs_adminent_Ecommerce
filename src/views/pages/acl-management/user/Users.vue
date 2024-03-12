<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useUser, useAuth } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const auth           = useAuth();
const searchQuery    = ref('');
const paginateSize   = ref(20);
const user           = useUser();
const { users }      = storeToRefs(user);
const authPermission = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getUsers = async(page=1) =>{
    user.getUsers(page, paginateSize.value);
}

const paginateSizeWiseData = () =>{
    getUsers();
}

onMounted(() => {
    authenticateUserPermission();
    getUsers();
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
                            <router-link :to="{name:'user-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'users-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <Bootstrap5Pagination
                                :data="users"
                                @pagination-change-page="getUsers"
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
                                <th>User Name</th>
                                <th>User Number</th>
                                <th>Email</th>
                                <th>User Roles</th>
                                <th>User Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="user.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="8"/>
                        </tbody>
                        <tbody v-else>
                            <tr data-widget="expandable-table" v-for="(user, index) in users.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>
                                    <img :src="user.image" width="50" alt="">
                                </td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.phone_number }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <span v-for="(role, index) in user.roles" :key="index" :class="{'super-admin' : role.name == 'superadmin', 'admin' : role.name == 'admin' , 'user' : role.name == 'user'}">
                                        {{ role.name }}
                                    </span> 
                                </td>
                                <td><span :class="{'active-status' : user.is_active==1?'active':'', 'inactive-status': user.is_active==0?'inactive':''}"> {{ user.is_active==1? 'Active' : 'Inactive' }}</span></td>
                                <td>
                                    <router-link :to="{name:'user-edit', params: {id: user.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'users-update')">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-if="deleteLoder == user.id"><i class="fas fa-spinner fa-spin"></i></a>
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
    .super-admin{
        background-color: rgba(66,186,150,.4);
        color: #1e7e61;
        padding: 5px 10px;
        border-radius: 4px;
        text-transform: capitalize;
    }
    .admin{
        background-color: rgba(66, 94, 186, 0.4);
        color: #1e347e;
        padding: 5px 10px;
        border-radius: 4px;
        text-transform: capitalize;
    }
    .user{
        background-color: rgba(186, 144, 66, 0.4);
        color: #a07e0e;
        padding: 5px 10px;
        border-radius: 4px;
        text-transform: capitalize;
    }
</style>