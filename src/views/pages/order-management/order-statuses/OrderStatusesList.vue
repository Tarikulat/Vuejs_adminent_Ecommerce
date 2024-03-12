
<script setup>
import { ProductListTableSkeleton } from '@/components'
import { useAuth, useOrders, useNotification } from '@/stores'
import { onMounted, ref } from 'vue';

const notification   = useNotification();
const auth           = useAuth();
const statuses       = useOrders();
const authPermission = ref([]);
const statusData     = ref('');
const is_open        = ref(false);
const name           = ref('');
const statusValue    = ref('');
const bgColor        = ref('');
const textColor      = ref('');
const errors         = ref();

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getOrderStatus = async() =>{
    const res = await statuses.getOrderStatus();
    if(res.success){
        statusData.value = res.result;
    }
}

const openEditField = (statusData) =>{

    is_open.value == statusData.id ?  is_open.value = false : is_open.value = statusData.id ;
    
    name.value        = statusData.name;
    bgColor.value     = statusData.bg_color;
    textColor.value   = statusData.text_color;
    statusValue.value = statusData.status;
    errors.value      = '';
}

const submit = async(statusId) =>{
    const res = await statuses.updateStatus(statusId, {
        name      : name.value,
        bg_color  : bgColor.value,
        text_color: textColor.value,
        status    : statusValue.value,
    });
    if(res.success){
        notification.Success('Status Updated Successfully');
        getOrderStatus();
    }else{
        console.log(res);
        errors.value = res.message;
    }
}

onMounted(() => {
    getOrderStatus();
    authenticateUserPermission();  
})
</script>

<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <div>
                        <router-link :to="{name: 'dashboard'}" class="btn btn-info"><i class="fas fa-arrow-left"></i> Back</router-link>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <thead class="bg-info">
                            <tr>
                                <th>SL</th>
                                <th>Status Name</th>
                                <th>Background Color</th>
                                <th>Text Color</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="statuses.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="6"/>
                        </tbody>
                        <tbody v-else>
                            <template v-for="(status, index) in statusData?.data" :key="index">
                                <tr>
                                    <td>{{ index+1 }}</td>
                                    <td>{{ status.name }}</td>
                                    <td><span style="padding: 5px 10px;border-radius:4px" :style="{backgroundColor : status.bg_color, color : status.text_color}">{{ status.bg_color }}</span></td>
                                    <td><span style="padding: 5px 10px;border-radius:4px" :style="{backgroundColor : status.bg_color, color : status.text_color}">{{ status.text_color }}</span></td>
                                    <td> <span :class="{'active-status' : status.status=='active', 'inactive-status': status.status=='inactive'}"> {{ status.status }}</span></td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" @click.prevent="openEditField(status)" v-if="is_open==status.id"><i class="fas fa-times"></i></button>
                                        <button class="btn btn-info btn-sm" @click.prevent="openEditField(status)" v-else><i class="fas fa-edit"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6">
                                        <div class="row text-left p-4" v-if="is_open==status.id">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label for="name">Name :</label>
                                                    <input type="text" id="name" class="form-control" v-model="name" :disabled="status.id===5 || status.id === 9">
                                                    <span v-for="(error, index) in errors?.name" :key="index" class="text-danger">{{ error }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="form-group">
                                                    <label for="bg_color">Background Color Code :</label>
                                                    <input type="text" id="bg_color" class="form-control" :style="{borderColor: bgColor, backgroundColor: bgColor, color: textColor}" v-model="bgColor">
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="form-group">
                                                    <label for="text_color">Text Color Code :</label>
                                                    <input type="text" id="text_color" class="form-control" :style="{borderColor: bgColor, backgroundColor: bgColor, color: textColor}" v-model="textColor">
                                                </div>
                                            </div>
                                            <div class="col-md-2" :hidden="status.id===5 || status.id === 9">
                                                <div class="form-group">
                                                    <label for="status">Status :</label>
                                                    <select id="status" class="form-control" v-model="statusValue">
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group d-flex justify-content-end">
                                                    <button class="btn btn-info" style="margin-top:35px;" v-if="statuses.updateLoading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                                                    <button class="btn btn-info" style="margin-top:35px;" @click.prevent="submit(status.id)" v-else>Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>