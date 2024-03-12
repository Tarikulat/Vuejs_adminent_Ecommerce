<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useNotification, useDeliveryGateway, useAuth} from '@/stores'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const auth                 = useAuth();
const router               = useRouter();
const searchQuery          = ref('');
const paymentGatewayName   = ref('');
const paymentGatewayStatus = ref('active');
const name                 = ref('');
const status               = ref('');
const errors               = ref();
const is_open              = ref(false);
const paginateSize         = ref(50);
const notifications        = useNotification();
const deliveryGateway      = useDeliveryGateway();
const { gatewayData }      = storeToRefs(deliveryGateway);
const authPermission       = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getGatewayData = async(page=1) =>{
    let res = await deliveryGateway.getGatewayData(page, paginateSize.value);
}

const addGateway = async() =>{
    let res = await deliveryGateway.addGateway({
        name  : paymentGatewayName.value,
        status: paymentGatewayStatus.value,
    });
    if(res.result){
        notifications.Success('A New Gateway Added Successfully');
        paymentGatewayName.value   = '';
        paymentGatewayStatus.value = 'active';
        getGatewayData();
    }else{
        errors.value = res.message
    }
}

const updateGateway = async(gatewayID) =>{
    let res = await deliveryGateway.updateGateway(gatewayID, {name : name.value, status : status.value});
    if(res.result){
        notifications.Success(`${res.result?.name} Updated Successfully`);
        is_open.value = false;
        getGatewayData();
    }
}

const paginateSizeWizeData = () =>{
    getGatewayData();
}

const openEditField = (gatewayId, gateway) =>{

    is_open.value == gatewayId ?  is_open.value = false : is_open.value = gatewayId ;
    
    name.value   = gateway.name;
    status.value = gateway.status;
}


onMounted(() => {
    authenticateUserPermission();
    getGatewayData();  
})

</script>

<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card" v-if="authPermission.some(permission => permission?.name === 'payment-gateways-create')">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <h4>Payment Gateway Add</h4>
                    </div>
                </div>
                <!-- ./card-header -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="gatewayName">Delivery Gateway Name</label>
                                <input type="text" id="gatewayName" class="form-control" placeholder="Enter Delivery Gateway Name" v-model="paymentGatewayName"/>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="gatewayStatus">Delivery Status</label>
                                <select name="" id="gatewayStatus" class="form-control" v-model="paymentGatewayStatus">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-info" v-if="deliveryGateway.addLoading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                    <button class="btn btn-info" @click.prevent="addGateway" v-else><i class="fas fa-plus"></i> Add New</button>
                </div>
                <!-- /.card-body -->
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <input type="text" placeholder="Search Product...." class="form-control mb-2 mr-2" v-model="searchQuery">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize" @change="paginateSizeWizeData">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <Bootstrap5Pagination
                                :data="gatewayData"
                                @pagination-change-page="getGatewayData"
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
                <div class="card-body">
                    <table class="table table-bordered table-hover text-center">
                        <thead>
                            <tr class="bg-info">
                                <th>SL</th>
                                <th>Delivery Gateway Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="deliveryGateway.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="4"/>
                        </tbody>
                        <tbody v-else>
                            <template v-for="(gateway, index) in gatewayData.data" :key="index">
                                <tr data-widget="expandable-table">
                                    <td>{{ index += 1 }}</td>
                                    <td>{{ gateway.name }}</td>
                                    <td><span :class="{'active-status' : gateway.status=='active', 'inactive-status': gateway.status=='inactive'}">{{ gateway.status }}</span></td>
                                    <td>
                                        <button class="btn btn-info btn-sm mr-2" @click.prevent="openEditField(gateway.id, gateway)" v-if="authPermission.some(permission => permission?.name === 'payment-gateways-update')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-if="deleteLoder == gateway.id"><i class="fas fa-spinner fa-spin"></i></a>
                                        <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-else><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                                <tr v-if="is_open == gateway.id">
                                    <td colspan="4" >
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group text-left">
                                                    <label for="gatewayName">Delivery Gateway Name</label>
                                                    <input type="text" id="gatewayName" class="form-control" placeholder="Enter Delivery Gateway Name" v-model="name"/>
                                                    <span v-if="errors">
                                                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{ error }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group text-left">
                                                    <label for="gatewayStatus">Delivery Status</label>
                                                    <select name="" id="gatewayStatus" class="form-control" v-model="status">
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <button class="btn btn-info" v-if="deliveryGateway.updateLoading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                                            <button class="btn btn-info" @click="updateGateway(gateway.id)" v-else> Update</button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
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