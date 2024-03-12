<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { useNotification, useOrders, useAuth } from '@/stores'
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const auth            = useAuth();
const order           = useOrders();
const notifications   = useNotification();
const { orders }      = storeToRefs(order);
const searchQuery     = ref('');
const statusId        = ref('');
const orderStatus     = ref({});
const orderInfo       = ref({});
const paginateSize    = ref(50);
const isDetailsActive = ref(false);
const authPermission  = ref([]);
const isPaid          = ref('');

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

const orderDelete = async(orderId) =>{
    let res = await order.orderDelete(orderId);
    if(res.status === 200){
        notifications.Success("Order Deleted Successfully")
        getOrders();
    }
}

const getOrders = async(page=1) =>{
    let res = await order.getOrders(page, paginateSize.value, statusId.value, searchQuery.value, isPaid.value);
}

const getOrderStatus = async() =>{
    let res = await order.getOrderStatus();
    if(res.success){
        orderStatus.value = res.result;
    }
}
const paginateSizeWiseOrder = () =>{
    getOrders();
}

const statusWiseProduct = (id) =>{
    statusId.value = id;
    getOrders();
}

const allOrders = () =>{
    paginateSize.value = 50;
    statusId.value     = '';
    getOrders();
}

const searchOrderData = () =>{
    getOrders();
}

const paidWiseOrder = () =>{
    getOrders();
}

const showOrderDetails = async(orderId) =>{
    if(isDetailsActive.value == orderId){
        isDetailsActive.value = false;
    }else{
        isDetailsActive.value = orderId;
        const res = await order.getSingleOrder(orderId);
        if(res.data?.success){
            orderInfo.value = res.data?.result
        }
    }
}

onMounted(() => {
    authenticateUserPermission();
    getOrders();
    getOrderStatus();
})
</script>

<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex" style="float:right;">
                        <input type="text" placeholder="Enter Your Search Key...." class="form-control mb-2 mr-2" v-model="searchQuery" @input="searchOrderData">
                        <select name="" class="form-control paginate mb-2 mr-2" id="" v-model="paginateSize" @change="paginateSizeWiseOrder">
                            <option value="1">1</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <select name="" class="form-control paginate" id="" v-model="isPaid" @change="paidWiseOrder">
                            <option value=""> Paid Status</option>
                            <option value="1"> Paid</option>
                            <option value="0"> Unpaid</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="d-flex justify-content-end">
                            <router-link :to="{name:'order-add'}" class="btn btn-info mr-2 mb-1" v-if="authPermission.some(permission => permission?.name === 'orders-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <div>
                                <button class="btn btn-info mr-2 mb-1" @click.prevent="allOrders">All</button>
                            </div>
                            <div>
                                <button class="btn btn-light mr-2 mb-1" :style="{backgroundColor: status.bg_color, color: status.text_color}" v-for="(status, index) in orderStatus?.data" :key="index" @click.prevent="statusWiseProduct(status.id)">{{ status.name }}({{status.orders_count}})</button>
                            </div>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info mb-1"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                    </div>
                </div>
                <!-- ./card-header -->
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr class="bg-info">
                                <th><input type="checkbox" id="check_all" class="mr-2"><label for="check_all" style="margin-bottom:0;"> All</label></th>
                                <th>Order Id</th>
                                <th>Status</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th>Payment Method</th>
                                <th>Currier</th>
                                <th>Paid Status</th>
                                <th>Update By</th>
                                <th>Payable Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="order.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="11"/>
                        </tbody>
                        <tbody v-else>
                            <template v-for="(order, index) in orders?.data" :key="index">
                                <tr data-widget="expandable-table">
                                    <td><input type="checkbox"></td>
                                    <td>{{ order.id }}</td>
                                    <td>
                                        <span v-for="(status, index) in orderStatus?.data" :key="index">
                                            <span v-if="order.current_status?.name==status.name" class="payment_status" :style="{backgroundColor: status.bg_color, color: status.text_color}">{{  order.current_status?.name  }}</span>
                                        </span>
                                    </td>
                                    <td>{{ order.phone_number }}</td>
                                    <td>{{ formatDate(order.created_at) }}</td>
                                    <td>{{ order.payment_gateway.name }}</td>
                                    <td :class="{
                                        'order-success': order.courier_name =='Steadfast',
                                        'order-cancle' : order.courier_name =='Pathao'
                                        }">
                                        <span>{{ order.courier_name }}</span>
                                    </td>
                                    <td class="order-success" v-if="order.is_paid == 1"> <span>Paid</span> </td>
                                    <td class="order-cancle" v-else> <span>Unpaid</span> </td>
                                    <td>{{ order.updated_by?.name }}</td>
                                    <td>{{  order.payable_price  }} tk</td>
                                    <td style="min-width:285px;">
                                        <router-link :to="{name:'order-edit', params: {id: order.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'orders-update')">
                                            <i class="fas fa-edit"></i>
                                        </router-link>
                                        <span class="d-inline-block mr-2">
                                            <div class="input-group-prepend">
                                                <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
                                                    <i class="fas fa-print"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                    <router-link class="dropdown-item" :to="{name:'invoice', params: {id: order.id} }" href="javascript::void(0)">
                                                        Normal Print
                                                    </router-link>
                                                    <router-link class="dropdown-item" :to="{name:'pos-invoice', params: {id: order.id} }" href="javascript::void(0)">
                                                        Pos Print
                                                    </router-link>
                                                </div>
                                            </div>
                                        </span>
                                        <button class="btn btn-secondary btn-sm mr-2" @click.prevent="showOrderDetails(order.id)">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <!-- <router-link :to="{name:'pathao', params : {id : order.id} }" class="btn btn-warning btn-sm mr-2">
                                            <img src="/src/assets/pathao_icon.png" width="20" alt="">
                                        </router-link>
                                        <router-link :to="{name : 'steadfast', params : {id: order.id} }" class="btn btn-light btn-sm mr-2" style="background:#eaddb6;">
                                            <img src="/src/assets/streetfast.png" width="20" alt="">
                                        </router-link> -->
                                        <button class="btn btn-danger btn-sm" v-if="order.loading == order.id"><i class="fas fa-spinner fa-spin"></i></button>
                                        <button class="btn btn-danger btn-sm" v-else @click="orderDelete(order.id)"><i class="fas fa-trash"></i></button>
                                        <router-link :to="{name:'order-histories', params: { id: order.id } }" class="btn btn-primary btn-sm ml-2"><i class="fas fa-file-medical-alt"></i></router-link>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="12">
                                        <div class="row">
                                            <div class="col-md-12" v-show="isDetailsActive == order.id">
                                                <div class="mt-4 btn d-flex justify-content-between">
                                                    <h4>Order Details</h4>
                                                    <button class="btn btn-danger" @click="showOrderDetails(orderInfo.id)"><i class="fa fa-times me-2"></i></button>
                                                </div>
                                                <div>
                                                    <div class="d-flex mt-4">
                                                        <div style="width: 20%;" v-for="(status, index5) in orderStatus?.data" :key="index5" :hidden=" status.id == 5 && orderInfo.status_id !=5">
                                                            <span 
                                                                class="order-status-line"
                                                                :style="{'background-color' : status.id <= orderInfo.status_id ? status.bg_color :  '' }"
                                                                :class="{'active' : status.id <= orderInfo.status_id}"
                                                            >
                                                                <i class="fa fa-check" :style="{'background-color' : status.id <= orderInfo.status_id ? status.bg_color :  '' }"></i>
                                                            </span>
                                                            <h6 class="text-center mt-4">{{ status.name }}</h6>
                                                            <p class="text-center" v-if="status.id < orderInfo.status_id">Complete</p>
                                                            <p class="text-center" v-if="status.id == orderInfo.status_id">{{ orderInfo.updated_at ? formatDate(orderInfo.created_at) : "Pending" }}</p>
                                                            <p class="text-center" v-if="status.id > orderInfo.status_id">Pending</p>
                                                        </div>
                                                        
                                                    </div>
                                                    <div class="row mt-4">
                                                    <div class="col-md-8">
                                                        <table class="table table-bordered order-list">
                                                        <thead>
                                                            <tr class="bg-info text-center">
                                                            <th class="text-light" style="width: 5%;" scope="col">Serial</th>
                                                            <th class="text-light" style="width: 10%;" scope="col">Image</th>
                                                            <th class="text-light" style="width: 25%;" scope="col">Name</th>
                                                            <th class="text-light" style="width: 5%;" scope="col">Quantity</th>
                                                            <th class="text-light" style="width: 10%;" scope="col">Regular Price</th>
                                                            <th class="text-light" style="width: 10%;" scope="col">Offer Price</th>
                                                            <th class="text-light" style="width: 10%;" scope="col">Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr class="text-center" v-for="(item, index) in orderInfo.items" :key="index">
                                                                <th scope="row">{{ index+1 }}</th>
                                                                <td><img :src="item.image" width="30" alt=""></td>
                                                                <td>{{ item.name }}</td>
                                                                <td> {{ item.pivot?.quantity }}</td>
                                                                <td>{{item.pivot?.item_mrp }} tk</td>
                                                                <td>{{item.pivot?.item_sell_price }} tk</td>
                                                                <td>{{item.pivot?.quantity*item.pivot?.item_sell_price }} tk</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left" colspan="6" style="font-weight: 500; font-size: 16px;">SubTotal</td>
                                                                <td style="font-weight: 500; font-size: 16px;">{{ orderInfo.mrp}} tk</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left" colspan="6">Discount</td>
                                                                <td>- {{orderInfo.discount }} tk</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left" colspan="6">Spacial Discount</td>
                                                                <td>- {{orderInfo.special_discount }} tk</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left" colspan="6">Delivery Charge</td>
                                                                <td>- {{orderInfo.delivery_charge }} tk</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-left" colspan="6" style="font-weight: 700; font-size:18px;">Total Payable Amount</td>
                                                                <td style="font-weight: 700; font-size:18px;">{{orderInfo.payable_price }} tk</td>
                                                            </tr>
                                                        </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="col-md-4 p-4 text-left" style="background-color:rgba(175, 209, 238, 0.466); border-radius:20px;">
                                                        <h5 class="text-info text-left"><u>Order Information</u></h5>
                                                        <ul class="ms-3 order_info">
                                                            <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Order Number </span>: #{{ orderInfo.id }}</li>
                                                            <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Order Name </span>: {{ orderInfo.customer_name }}</li>
                                                            <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Phone Number </span>: {{ orderInfo.phone_number }}</li>
                                                            <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Order Date </span>: {{ formatDate(orderInfo.created_at) }}</li>
                                                            <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Payable Amount </span>: {{ orderInfo.payable_price }} tk.</li>
                                                            <li class="mb-2"><span class="text-dark d-inline-block" style="font-weight:500;width:140px;">Payment Status </span>: {{ orderInfo.is_paid == 1 ? 'Paid' : 'Unpaid' }}</li>
                                                        </ul>

                                                        <h5 class="text-info mt-4 text-left"><u>Order Address</u></h5>
                                                        <span>{{ orderInfo?.address_details }} , {{ orderInfo?.district }}, Bangladesh</span>

                                                        <h5 class="text-info mt-4"><u>Payment Method</u></h5>
                                                        <span style="font-weight:500;text-transform:capitalize">{{ orderInfo.payment_gateway?.name }}</span>

                                                        <h5 class="text-info mt-4"><u>Expected date of delivery</u></h5>
                                                        <span style="font-weight:500;">  </span>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <div class="float-left">
                        <p>Showing {{ orders.from }}-{{ orders.to > orders.total ? orders.total : orders.to }} of {{ orders.total }} item(s)</p>
                    </div>
                    <ul class="pagination pagination-sm float-right mb-0">
                        <Bootstrap5Pagination
                            :data="orders"
                            @pagination-change-page="getOrders"
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