<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useNotification, useOrders } from '@/stores'
import { onMounted, ref, watch } from 'vue';

const order         = useOrders();
const notifications = useNotification();
const searchQuery   = ref('');
const orders        = ref();
const paginateSize  = ref(20);
const orderIds      = ref([]);
const allCheckbox   = ref(false);

const ordersTeamList = async(page=1) =>{
    let res = await order.ordersTeamList(page, paginateSize.value, searchQuery.value);
    if(res.success){
        orders.value = res.result;
    }
}

const searchOrder = () =>{
    ordersTeamList();
}

const paginateSizeWiseOrder = () =>{
    ordersTeamList();
}

const assignOrder = async(orderId) =>{
    orderIds.value.push(orderId);
    const res = await order.assignOrder({
        order_ids : orderIds.value,
    }, orderId);
    if(res.success){
        notifications.Success('Order Assign Successfully');
        ordersTeamList();
    }
}

watch(() => orderIds.value, () => {
    allCheckbox.value = orderIds.value.length === orders.value?.data.length;
});

const toggleAllCheckbox = () => {
    if (allCheckbox.value) {
        orderIds.value = orders.value?.data.map(order => order.id) || [];
    } else {
        orderIds.value = [];
    }
};

const submit = async() =>{
    const res = await order.assignOrder({
        order_ids : orderIds.value,
    });
    if(res.success){
        notifications.Success('Order Assign Successfully');
        ordersTeamList();
        orderIds.value = [];
    }
}

onMounted(() => {
    ordersTeamList();
})
</script>

<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex" style="float:right;">
                        <input type="text" placeholder="Enter Your Search Key...." class="form-control mb-2 mr-2" v-model="searchQuery" @input="searchOrder">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize" @change="paginateSizeWiseOrder">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <router-link :to="{name:'my-complete-orders'}" class="btn btn-info mb-2 ml-2" style="width:150px;">My Orders</router-link>
                    </div>
                    <ul class="pagination pagination-sm mb-0" v-if="orders">
                        <Bootstrap5Pagination
                            :data="orders"
                            @pagination-change-page="ordersTeamList"
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
                <!-- ./card-header -->
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="bg-info">
                                <th><input type="checkbox" id="check_all" class="mr-2" v-model="allCheckbox" @change="toggleAllCheckbox"    ><label for="check_all" style="margin-bottom:0;"> All</label></th>
                                <th>SL</th>
                                <th>Order Id</th>
                                <th>Status</th>
                                <th>Customer Name</th>
                                <th>Phone</th>
                                <th>Paid Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="order.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="8"/>
                        </tbody>
                        <tbody v-else>
                            <template v-for="(order, index) in orders?.data" :key="index">
                                <tr data-widget="expandable-table">
                                    <td><input type="checkbox" v-model="orderIds" :value="order.id"></td>
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ order.id }}</td>
                                    <td>
                                        <span v-if="order.current_status?.name=='Submitted'" class="payment_status" style="background-color:#1175AE;color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='On Hold'" class="payment_status" style="background-color:#C98209;color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='Under Verified'" class="payment_status" style="background-color:#ddb063;color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='Under Processing'" class="payment_status" style="background-color:#ddb063;color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='On Way'" class="payment_status" style="background-color:#06d14a;rgb(182, 124, 25)fff; color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='Completed'" class="payment_status" style="background-color:#086928;rgb(182, 124, 25)fff; color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='Canceled'" class="payment_status" style="background-color:#e03602;rgb(182, 124, 25)fff; color:#fff;">{{  order.current_status?.name  }}</span>
                                        <span v-else-if="order.current_status?.name=='Returned'" class="payment_status">{{  order.current_status.name  }}</span>
                                        
                                        <span v-else-if="order.current_status?.name=='Delivered'" class="delivered">{{  order.current_status.name  }}</span>
                                    </td>
                                    <td>{{ order.customer_name }}</td>
                                    <td>{{ order.phone_number }}</td>
                                    <td class="order-success" v-if="order.is_paid == 1"> <span>Paid</span> </td>
                                    <td class="order-cancle" v-else> <span>Unpaid</span> </td>
                                    <td>
                                        <button class="btn btn-info btn-sm" v-if="order.loading == order.id"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                                        <button class="btn btn-info btn-sm" @click.prevent="assignOrder(order.id)" v-else><i class="fas fa-plus"></i> Assign Me</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="12">
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <div class="float-left">
                        <p>Showing {{ orders?.from }}-{{ orders?.to > orders?.total ? orders?.total : orders?.to }} of {{ orders?.total }} item(s)</p>
                    </div>
                    <div class="float-right" v-if="orderIds.length > 0">
                        <button class="btn btn-info" @click="submit">Assign Selected Orders</button>
                    </div>
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
.payment_status{
    padding: 3px 10px;
    border-radius: 6px;
}
.order-success span, .delivered{
    background-color: rgba(66, 186, 150, 0.2);
    color: #42ba96;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    position: relative;
}
.order-cancle span, .payment_status{
    background-color: rgba(207, 20, 43, 0.2);
    color: #cf142b;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    position: relative;
}



.order-status-line{
    width: 100%;
    height: 6px;
    display: inline-block;
    position: relative;
    background-color: #d6d6d6;
}
.order-status-line i{
    height: 40px;
    width: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    border: 2px solid #d6d6d6;
    text-align: center;
    line-height: 36px;
    position: absolute;
    top: -18px;
    left: 40%;
    color: #ffffff;
    font-size: 22px;
}

.order-status-line.active{
    background-color: #17A2B8;
}
.order-status-line.active i{
    background-color: #17A2B8;
    border: 2px solid #17A2B8;
}
.cart-area{
    border: 1px solid #c0c0c0;
    padding: 50px;
    border-radius: 20px;
}

.order_info{
    text-align: left;
}
.order_info li{
    list-style: none;
}
</style>