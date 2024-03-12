<script setup>
import { useOrders } from "@/stores"
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue";

const order          = useOrders();
const route          = useRoute();
const orderHistory   = ref();

const orderHistories = async() =>{
    const res = await order.orderHistories(route.params.id);
    if(res.success){
        orderHistory.value = res.result;
    }
}

onMounted(() => {
    orderHistories();
})
</script>

<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-end">
                        <router-link :to="{ name: 'orders-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                    </div>
                    <div class="card-body">
                        <template v-for="(orderInfo, index) in orderHistory" :key="index">
                            <div class="card card-info" v-if="orderInfo.event=='updated'">
                                <div class="card-header">
                                    <h4>Updated Information (Updated By : {{ orderInfo?.user?.name }})</h4>
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <th class="bg-danger">Old Information</th>
                                                <th class="bg-success">New Information</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="row pHistory">
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.pg_id">
                                                            <label for="">Payment Gateway : </label>
                                                            <span>{{ orderInfo?.old_values?.pg_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.dg_id">
                                                            <label for="">Delivery Gateway : </label>
                                                            <span>{{ orderInfo?.old_values?.dg_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.status_id">
                                                            <label for="">Order Status : </label>
                                                            <span>{{ orderInfo?.old_values?.status_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.is_paid">
                                                            <label for="">Is Paid : </label>
                                                            <span>{{ orderInfo?.old_values?.is_paid }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.delivery_charge">
                                                            <label for="">Delivery Charge : </label>
                                                            <span>{{ orderInfo?.old_values?.delivery_charge }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.address_details">
                                                            <label for="">Address : </label>
                                                            <span>{{ orderInfo?.old_values?.address_details }} </span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.district">
                                                            <label for="">District : </label>
                                                            <span>{{ orderInfo?.old_values?.district }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.customer_name">
                                                            <label for="">Customer Name : </label>
                                                            <span> {{ orderInfo?.old_values?.customer_name }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.phone_number">
                                                            <label for="">Phone Number : </label>
                                                            <span> {{ orderInfo?.old_values?.phone_number }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.special_discount">
                                                            <label for="">Spacial Discount : </label>
                                                            <span> {{ orderInfo?.old_values?.special_discount }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.order_from">
                                                            <label for="">Order From : </label>
                                                            <span> {{ orderInfo?.old_values?.order_from }} </span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.old_values?.note">
                                                            <label for="">Order Note : </label>
                                                            <span> {{ orderInfo?.old_values?.note }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.old_values?.created_by">
                                                            <label for="">Created By : </label>
                                                            <span> {{ orderInfo?.old_values?.created_by }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.old_values?.updated_by">
                                                            <label for="">Updated By : </label>
                                                            <span> {{ orderInfo?.old_values?.updated_by }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.user_agent">
                                                            <label for="">Device Information : </label>
                                                            <span> {{ orderInfo?.user_agent }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.created_at">
                                                            <label for="">Created At : </label>
                                                            <span> {{ orderInfo?.created_at }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.updated_at">
                                                            <label for="">Updated By : </label>
                                                            <span> {{ orderInfo?.updated_at }}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="row pHistory">
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.pg_id">
                                                            <label for="">Payment Gateway : </label>
                                                            <span>{{ orderInfo?.new_values?.pg_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.dg_id">
                                                            <label for="">Delivery Gateway : </label>
                                                            <span>{{ orderInfo?.new_values?.dg_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.status_id">
                                                            <label for="">Order Status : </label>
                                                            <span>{{ orderInfo?.new_values?.status_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.is_paid">
                                                            <label for="">Is Paid : </label>
                                                            <span>{{ orderInfo?.new_values?.is_paid }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.delivery_charge">
                                                            <label for="">Delivery Charge : </label>
                                                            <span>{{ orderInfo?.new_values?.delivery_charge }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.address_details">
                                                            <label for="">Address : </label>
                                                            <span>{{ orderInfo?.new_values?.address_details }} </span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.district">
                                                            <label for="">District : </label>
                                                            <span>{{ orderInfo?.new_values?.district }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.customer_name">
                                                            <label for="">Customer Name : </label>
                                                            <span> {{ orderInfo?.new_values?.customer_name }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.phone_number">
                                                            <label for="">Phone Number : </label>
                                                            <span> {{ orderInfo?.new_values?.phone_number }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.special_discount">
                                                            <label for="">Spacial Discount : </label>
                                                            <span> {{ orderInfo?.new_values?.special_discount }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.order_from">
                                                            <label for="">Order From : </label>
                                                            <span> {{ orderInfo?.new_values?.order_from }} </span>
                                                        </div>
                                                        <div class="col-md-6" v-if="orderInfo?.new_values?.note">
                                                            <label for="">Order Note : </label>
                                                            <span> {{ orderInfo?.new_values?.note }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.new_values?.created_by">
                                                            <label for="">Created By : </label>
                                                            <span> {{ orderInfo?.new_values?.created_by }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.new_values?.updated_by">
                                                            <label for="">Updated By : </label>
                                                            <span> {{ orderInfo?.new_values?.updated_by }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.user_agent">
                                                            <label for="">Device Information : </label>
                                                            <span> {{ orderInfo?.user_agent }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.created_at">
                                                            <label for="">Created At : </label>
                                                            <span> {{ orderInfo?.created_at }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="orderInfo?.updated_at">
                                                            <label for="">Updated By : </label>
                                                            <span> {{ orderInfo?.updated_at }}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-info" v-if="orderInfo.event=='created'">
                                <div class="card-header">
                                    <h4>Order Information</h4>
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Payment Gateway</th>
                                                <td>{{ orderInfo?.new_values?.pg_id }}</td>
                                                <th>Payment Gateway</th>
                                                <td>{{ orderInfo?.new_values?.dg_id }}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Status</th>
                                                <td>{{ orderInfo?.new_values?.status_id }}</td>
                                                <th>Is Paid</th>
                                                <td>{{ orderInfo?.new_values?.is_paid }}</td>
                                            </tr>
                                            <tr>
                                                <th>Delivery Charge</th>
                                                <td>{{ orderInfo?.new_values?.delivery_charge }}</td>
                                                <th>Address</th>
                                                <td>{{ orderInfo?.new_values?.address_details }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>District</th>
                                                <td>{{ orderInfo?.new_values?.district }}</td>
                                                <th>customer_name</th>
                                                <td>{{ orderInfo?.new_values?.customer_name }}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone Number</th>
                                                <td>{{ orderInfo?.new_values?.phone_number }}</td>
                                                <th>Spacial Discount</th>
                                                <td>{{ orderInfo?.new_values?.special_discount }}</td>
                                            </tr>
                                            <tr>
                                                <th>Order Form </th>
                                                <td>{{ orderInfo?.new_values?.order_from }}</td>
                                                <th>Order Note</th>
                                                <td>{{ orderInfo?.new_values?.note }}</td>
                                            </tr>
                                            <tr>
                                                <th>Created By</th>
                                                <td>{{ orderInfo?.new_values?.created_by }}</td>
                                                <th>Updated By</th>
                                                <td>{{ orderInfo?.new_values?.updated_by }}</td>
                                            </tr>
                                            <tr>
                                                <th>User Device Info</th>
                                                <td>{{ orderInfo?.user_agent }}</td>
                                                <th>Created At</th>
                                                <td>{{ orderInfo?.created_at }}</td>
                                            </tr>
                                            <tr>
                                                <th>Updated At</th>
                                                <td>{{ orderInfo?.updated_at }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.pHistory label{
    margin-right: 10px;
}
</style>