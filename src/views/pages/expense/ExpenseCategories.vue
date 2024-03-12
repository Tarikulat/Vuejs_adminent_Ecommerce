<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useExpense, useAuth } from '@/stores'
import { onMounted, ref } from 'vue';

const auth              = useAuth();
const expense           = useExpense();
const searchQuery       = ref('');
const paginateSize      = ref(50);
const expenseCategories = ref();
const authPermission    = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getExpenseCategories = async(page=1) =>{
    const res = await expense.getExpenseCategories(page, paginateSize.value, searchQuery.value);
    if(res.success){
        expenseCategories.value = res.result;
    }

}

const searchExpenseCategory = () =>{
    getExpenseCategories();
}



onMounted(() => {
    authenticateUserPermission();
    getExpenseCategories();
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <input type="text" placeholder="Search Product...." class="form-control mb-2 mr-2" v-model="searchQuery" @input="searchExpenseCategory">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name:'expense-category-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'expense-categories-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right" v-if="expenseCategories">
                            <Bootstrap5Pagination
                                :data="expenseCategories"
                                @pagination-change-page="getExpenseCategories"
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
                                <th>Expense Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="expense.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="3"/>
                        </tbody>
                        <tbody>
                            <tr data-widget="expandable-table" v-for="(category, index) in expenseCategories?.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>{{ category.name }}</td>
                                <td>
                                    <router-link :to="{name:'expense-category-edit', params: {id: category.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'expense-categories-update')">
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