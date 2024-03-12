<script setup>
import { useOrders } from '@/stores'
import { computed, onMounted, ref } from 'vue';

const order     = useOrders();
const startDate = ref();
const endDate   = ref();
const reports   = ref([]);
const errors    = ref();
const action    = ref('export');

const orderReportsData = async() =>{
    const res = await order.orderReports(startDate.value, endDate.value);
    if(res.success){
        reports.value = res.result;
    }else{
        errors.value = res.message;
    }
}

const orderReportsExport = async() =>{
    const res = await order.orderReportsExport(startDate.value, endDate.value, action.value);
    if(res.success){
        reports.value = res.result;
    }else{
        errors.value = res.message;
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

const amount = computed(() => {
    if(reports.value){
        var buy_price = reports.value.reduce((total, report) => {
            return total + parseFloat(report.buy_price || 0);
        }, 0).toFixed(2);
   
        var mrp = reports.value.reduce((total, report) => {
            return total + parseFloat(report.mrp || 0);
        }, 0).toFixed(2);
    
        var discount = reports.value.reduce((total, report) => {
            return total + parseFloat(report.discount || 0);
        }, 0).toFixed(2);

        var sell_price = reports.value.reduce((total, report) => {
            return total + parseFloat(report.sell_price || 0);
        }, 0).toFixed(2);

        var delivery_charge = reports.value.reduce((total, report) => {
            return total + parseFloat(report.delivery_charge || 0);
        }, 0).toFixed(2);

        var special_discount = reports.value.reduce((total, report) => {
            return total + parseFloat(report.special_discount || 0);
        }, 0).toFixed(2);

        var payable_price = reports.value.reduce((total, report) => {
            return total + parseFloat(report.payable_price || 0);
        }, 0).toFixed(2);
    }

    return  {
        buy_price       : buy_price,
        mrp             : mrp,
        discount        : discount,
        sell_price      : sell_price,
        delivery_charge : delivery_charge,
        special_discount: special_discount,
        payable_price   : payable_price,
          // discount_price : totalDiscount,
    };
});

</script>

<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <div class="search-date d-flex align-items-end">
                            <div class="form-group mr-2">
                                <label for="start_date">Start date</label>
                                <input type="date" class="form-control" v-model="startDate">
                            </div>
                            <div class="form-group">
                                <label for="end_date">End date</label>
                                <input type="date" class="form-control" v-model="endDate">
                            </div>
                        </div>
                        <div class="d-flex align-items-end mb-2">
                            <button class="btn btn-info mr-2" @click.prevent="orderReportsData">Filter</button>
                            <button class="btn btn-success mr-2" @click.prevent="orderReportsExport"><i class="far fa-file-excel"></i>   Excel</button>
                            <router-link :to="{name:'dashboard'}" class="btn btn-info mr-2"><i class="fas fa-arrow-left"></i> Back</router-link>
                        </div>
                    </div>
                    <span v-if="errors">
                        <span class="text-danger" v-for="(error, index ) in errors.start_date" :key="index">{{ error }}</span>
                        <span class="text-danger" v-for="(error, index ) in errors.end_date" :key="index">{{ error }}</span>
                    </span>
                </div>
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <thead class="bg-info">
                            <th>SL</th>
                            <th>Order Id</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Buy Price</th>
                            <th>Mrp Price</th>
                            <th>Discount</th>
                            <th>Sell Price</th>
                            <th>Delivery Charge</th>
                            <th>Spacial Discount</th>
                            <th>Total</th>
                            <th>Profit</th>
                        </thead>
                        <tbody>
                            <tr v-for="(report, index) in reports" :key="index">
                                <td>{{ index+1 }} </td>
                                <td>{{ report.id }} </td>
                                <td>{{ report.phone_number }} </td>
                                <td>{{ formatDate(report.created_at) }} </td>
                                <td>{{ report.customer_name }} </td>
                                <td>{{ report.buy_price }} Tk</td>
                                <td>{{ report.mrp }} Tk</td>
                                <td>{{ report.discount }} Tk</td>
                                <td>{{ report.sell_price }} Tk</td>
                                <td>{{ report.delivery_charge }} Tk</td>
                                <td>{{ report.special_discount }} Tk</td>
                                <td>{{ report.payable_price }} Tk</td>
                                <td>{{ report.sell_price - report.buy_price - report.special_discount }} Tk</td>
                            </tr>
                            <tr style="background-color: #ececec;font-weight:700;">
                                <td>#</td>
                                <td class="text-left" colspan="4">Total = </td>
                                <td>{{ amount.buy_price }} Tk</td>
                                <td>{{ amount.mrp }} Tk</td>
                                <td>{{ amount.discount }} Tk</td>
                                <td>{{ amount.sell_price }} Tk</td>
                                <td>{{ amount.delivery_charge }} Tk</td>
                                <td>{{ amount.special_discount }} Tk</td>
                                <td>{{ amount.payable_price }} Tk</td>
                                <td>{{ amount.sell_price - amount.buy_price - amount.special_discount }} Tk</td>
                            </tr>
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

</style>