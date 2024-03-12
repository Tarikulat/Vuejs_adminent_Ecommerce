<script setup>
import { useDashboard, useProduct, useOrders, useAuth } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const auth              = useAuth();
const order             = useOrders();
const dashboard         = useDashboard();
const product           = useProduct();
const { products }      = storeToRefs(product);
const dashboardInfo     = ref('');
const orders            = ref();
const cancelOrders      = ref();
const authPermission    = ref([]);
const topCustomerData   = ref();
const topProductData    = ref();

const topCustomerReport = async() =>{
    const res = await dashboard.topCustomerReport();
    if(res?.success){
        topCustomerData.value = res.result;
    }
}

const topProductReport = async() =>{
    const res = await dashboard.topProductReport();
    if(res?.success){
        topProductData.value = res.result;
    }
}

const locationWiseOrderReport = async() => {
    const res = await dashboard.locationWiseOrderReport();
    if(res?.success){
        salesGraphCode(res.result.map(o => o.district), res.result.map(o => o.order_count));
    }
}

const getMonthlyOrderReports = async() =>{
    const res = await dashboard.getMonthlyOrderReports();
    if(res?.success){
        orderMonthlyAmount(res?.result?.data?.map(o => o.order_count), res?.result?.data?.map(o => o.order_date));
    }
}

const getYearlyOrderReports = async() =>{
    const res = await dashboard.getYearlyOrderReports();
    if(res?.success){
        orderMonthlyAmount(res?.result?.data?.map(o => o.order_count), res?.result?.data?.map(o => o.month));
    }
}

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getInfo = async() =>{
    const res = await dashboard.getInfo();
    dashboardInfo.value = res?.order_report;
    orderReportsChart(res?.order_report)
    orderMonthlyAmount(res?.order_report)
}

const getOrders = async(page=1) =>{
    let res = await order.getOrders(page=1, 10);
    orders.value = res?.data;
}

const cancelOrderList = async(page=1) =>{
    let res = await order.getOrders(page, 10, 5);
    cancelOrders.value = res?.data;
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

const orderReportsChart = async(order) =>{
        // Get context with jQuery - using jQuery's .get() method.
    var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
    var donutData        = {
      labels: [
          'New Order',
          'Cancel Order',
          'Confirm Order',
          'Return Order',
          'Delivered Order',
          'Paid Order',
          'Unpaid Order',
      ],
      datasets: [
        {
          data: [
            order?.submitted_order,
            order?.canceled_order,
            order?.confirm_order,
            order?.returned_order,
            order?.delivered_order,
            order?.paid_order,
            order?.unpaid_order
          ],
          backgroundColor : ['#00a65a', '#DC3545', '#f39c12', '#ff1fb2', '#0870d1', '#d2d6de', '#FB72E5'],
        }
      ]
    }
    var donutOptions     = {
      maintainAspectRatio : false,
      responsive : true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    new Chart(donutChartCanvas, {
      type: 'doughnut',
      data: donutData,
      options: donutOptions
    })
}

const orderMonthlyAmount = async(monthlyValue, date) =>{
    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartData = {
      labels  : date,
      datasets: [
        {
          label               : 'Daily Order Count',
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : monthlyValue,
        },
      ]
    }


    var barChartOptions = {
      responsive              : true,
      maintainAspectRatio     : false,
      datasetFill             : false
    }

    new Chart(barChartCanvas, {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    })

}

const salesGraphCode = (districts, orders) =>{
      // Sales graph chart
  var salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d')
  // $('#revenue-chart').get(0).getContext('2d');

  var salesGraphChartData = {
    labels: districts,
    datasets: [
      {
        label: 'Total Orders',
        fill: false,
        borderWidth: 3,
        lineTension: 0,
        spanGaps: true,
        borderColor: '#17A2B8',
        pointRadius: 3,
        pointHoverRadius: 7,
        pointColor: '#17A2B8',
        pointBackgroundColor: '#17A2B8',
        data: orders
      }
    ]
  }

  var salesGraphChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#17A2B8'
        },
        gridLines: {
          display: false,
          color: '#17A2B8',
          drawBorder: false
        }
      }],
      yAxes: [{
        ticks: {
          stepSize: 1,
          fontColor: '#17A2B8'
        },
        gridLines: {
          display: true,
          color: '#17A2B8',
          drawBorder: false
        }
      }]
    }
  }
  var salesGraphChart = new Chart(salesGraphChartCanvas, { // lgtm[js/unused-local-variable]
    type: 'line',
    data: salesGraphChartData,
    options: salesGraphChartOptions
  })
}

onMounted(() => {
    authenticateUserPermission();
    getInfo();
    getOrders();
    cancelOrderList();
    getMonthlyOrderReports();
    locationWiseOrderReport();
    topCustomerReport();
    topProductReport();
    product.getProducts();

})
</script>


<template>
    <div class="row">
        <div class="col-md-5">
            <!-- DONUT CHART -->
            <div class="card card-info">
              <div class="card-body">
                <canvas id="donutChart" style="min-height: 330px; height: 330px; max-height: 330px; max-width: 100%;"></canvas>
              </div>
              <!-- /.card-body -->
            </div>
        </div>
        <div class="col-md-7">
            <div class="card card-light">
                <div class="card-body">
                    <div class="d-flex justify-content-end">
                        <div class="btn-group">
                        <button type="button" class="btn btn-info btn-sm" @click.prevent="getMonthlyOrderReports">Daily</button>
                        <button type="button" class="btn btn-info btn-sm" @click.prevent="getYearlyOrderReports">Monthly</button>
                    </div>
                    </div>
                    <div class="chart">
                    <canvas id="barChart" style="min-height: 300px; height: 300px; max-height: 300px; max-width: 100%;"></canvas>
                    </div>
                </div>
              <!-- /.card-body -->
            </div>
        </div>
        <div class="col-md-12">
            <div class="card bg-gradient-light">
              <div class="card-body">
                <canvas class="chart" id="line-chart" style="min-height: 300px; height: 300px; max-height: 300px; max-width: 100%;"></canvas>
              </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light">
                <div class="info-box-content">
                    <span class="info-box-text">Total Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.order_count }}
                        <span class="value">{{ dashboardInfo?.order_value==null? 0 : dashboardInfo?.order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fab fa-jedi-order"></i></span>
                <!-- /.info-box-content -->
            </div>
        <!-- /.info-box -->
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light new-order">
                <div class="info-box-content">
                    <span class="info-box-text">New Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.submitted_order==null? 0 : dashboardInfo?.submitted_order }}
                        <span class="value">{{ dashboardInfo?.submitted_order_value==null? 0 : dashboardInfo?.submitted_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fas fa-cart-plus"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light cancel-order">
                <div class="info-box-content">
                    <span class="info-box-text">Cancel Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.canceled_order==null? 0 : dashboardInfo?.canceled_order }}
                        <span class="value">{{ dashboardInfo?.canceled_order_value==null? 0 : dashboardInfo?.canceled_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fas fa-window-close"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light confirm-order">
                <div class="info-box-content">
                    <span class="info-box-text">Confirm Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.confirm_order==null? 0 : dashboardInfo?.confirm_order }}
                        <span class="value">{{ dashboardInfo?.confirm_order_value==null? 0 : dashboardInfo?.confirm_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fas fa-clipboard-check"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light return-order">
                <div class="info-box-content">
                    <span class="info-box-text">Return Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.returned_order==null? 0 : dashboardInfo?.returned_order }}
                        <span class="value">{{ dashboardInfo?.returned_order_value==null? 0 : dashboardInfo?.returned_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fas fa-undo-alt"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light delivered-order">
                <div class="info-box-content">
                    <span class="info-box-text">Delivered Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.delivered_order==null? 0 : dashboardInfo?.delivered_order }}
                        <span class="value">{{ dashboardInfo?.delivered_order_value==null? 0 : dashboardInfo?.delivered_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fas fa-truck"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light paid-order">
                <div class="info-box-content">
                    <span class="info-box-text">Paid Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.paid_order==null? 0 : dashboardInfo?.paid_order }}
                        <span class="value">{{ dashboardInfo?.paid_order_value==null? 0 : dashboardInfo?.paid_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="fas fa-hands-helping"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light unpaid-order">
                <div class="info-box-content">
                    <span class="info-box-text">Unpaid Order</span>
                    <span class="info-box-number" style="font-size:20px;">{{ dashboardInfo?.unpaid_order==null? 0 : dashboardInfo?.unpaid_order }}
                        <span class="value">{{ dashboardInfo?.unpaid_order_value==null? 0 : dashboardInfo?.unpaid_order_value}} ট</span>
                    </span>
                </div>
                <span class="info-box-icon"><i class="far fa-calendar-alt"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light">
                <div class="info-box-content">
                    <span class="info-box-text">Total User</span>
                    <span class="info-box-number">{{ dashboardInfo?.total_users }}</span>
                </div>
                <span class="info-box-icon"><i class="fas fa-users"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box bg-gradient-light">
                <div class="info-box-content">
                    <span class="info-box-text">Total Products</span>
                    <span class="info-box-number">{{ products.total }}</span>
                </div>
                <span class="info-box-icon"><i class="fas fa-gifts"></i></span>
                <!-- /.info-box-content -->
            </div>
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-info">
                        <div class="card-header">
                            <h3 class="card-title">Recent 10-Orders List</h3>

                            <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        <div class="card-body" style="height:476px;">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th class="p-1">SL</th>
                                        <th class="p-1">Order Id</th>
                                        <th class="p-1">Phone Number</th>
                                        <th class="p-1">Date</th>
                                        <th class="p-1">Payable Amount</th>
                                        <th class="p-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in orders" :key="index">
                                        <td class="p-1">{{ index+1 }}</td>
                                        <td class="p-1">{{ order.id }}</td>
                                        <td class="p-1">{{ order.phone_number }}</td>
                                        <td class="p-1">{{ formatDate(order.created_at) }}</td>
                                        <td class="p-1">{{ order.payable_price }} Tk</td>
                                        <td class="p-1">
                                            <router-link :to="{name:'order-edit', params: {id: order.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'orders-update')">
                                                <i class="fas fa-edit"></i>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-danger">
                        <div class="card-header">
                            <h3 class="card-title">Top 10 Cancel Orders List</h3>

                            <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        <div class="card-body" style="height:476px;">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th class="p-1">SL</th>
                                        <th class="p-1">Order Id</th>
                                        <th class="p-1">Phone Number</th>
                                        <th class="p-1">Date</th>
                                        <th class="p-1">Payable Amount</th>
                                        <th class="p-1">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in cancelOrders" :key="index">
                                        <td class="p-1">{{ index+1 }}</td>
                                        <td class="p-1">{{ order.id }}</td>
                                        <td class="p-1">{{ order.phone_number }}</td>
                                        <td class="p-1">{{ formatDate(order.created_at) }}</td>
                                        <td class="p-1">{{ order.payable_price }} Tk</td>
                                        <td class="p-1">
                                            <router-link :to="{name:'order-edit', params: {id: order.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'orders-update')">
                                                <i class="fas fa-edit"></i>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-success">
                        <div class="card-header">
                            <h3 class="card-title">Top 10 Customer List</h3>

                            <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        <div class="card-body" style="height:476px;">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th class="p-1">SL</th>
                                        <th class="p-1">Customer Name</th>
                                        <th class="p-1">Phone Number</th>
                                        <th class="p-1">Total Order</th>
                                        <th class="p-1">Order Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in topCustomerData" :key="index">
                                        <td style="padding:7px;">{{ index+1 }}</td>
                                        <td style="padding:7px;">{{ order.customer_name }}</td>
                                        <td style="padding:7px;">{{ order.phone_number }}</td>
                                        <td style="padding:7px;">{{ order.order_count }}</td>
                                        <td style="padding:7px;">{{ order.order_value }} Tk</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Top 10 Selling Products</h3>

                            <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        <div class="card-body" style="height:476px;">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th class="p-1">SL</th>
                                        <th class="p-1">Product Name</th>
                                        <th class="p-1">Total Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in topProductData" :key="index">
                                        <td style="padding:7px;">{{ index+1 }}</td>
                                        <td style="padding:7px;">{{ order.name }}</td>
                                        <td style="padding:7px;">{{ order.order_count }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .info-box{
        border-bottom: 4px solid #2DABBF;
        border-radius: 20px !important;
        padding: 20px 10px !important;
    }
    .info-box:hover{
        background: #2DABBF !important;
        color: #fff !important;
    }
    .info-box:hover .info-box-icon{
        border: 2px solid #fff;
        border-radius: 50% !important;
        color: #fff !important;
    }
    .info-box-text{
        font-size: 20px;
        font-weight: 700;
    }
    .info-box-icon{
        border: 2px solid #2DABBF;
        border-radius: 50% !important;
        color: #2DABBF !important;
        width: 70px !important;
        height: 70px !important;
        margin-right: 20px;
    }
    .value{
        font-size: 14px;
        font-weight: 400px;
        width: 120px !important;
        display: inline-block;
        margin-left: 15px;
        border: 1px solid #fff;
        border-radius: 5px;
        background-color: #2dacbf52;
        padding: 3px 10px;
        color: #000;
    }
    .info-box:hover .value{
        background-color: #2DABBF;
        color: #fff;
    }

    .new-order{
        border-bottom: 4px solid green;
        color: green !important;
    }
    .new-order .info-box-icon{
        border: 2px solid green;
        color: green !important;
    }
    .new-order .value{
        background-color: rgba(0, 128, 0, 0.349);
    }
    .new-order:hover .value{
        background-color: green;
        color: #fff;
    }
    .new-order:hover{
        background: green !important;
        color: #fff !important;
    }
    .cancel-order{
        border-bottom: 4px solid #DC3545;
        color: #DC3545 !important;
    }
    .cancel-order .info-box-icon{
        border: 2px solid #DC3545;
        color: #DC3545 !important;
    }
    .cancel-order .value{
        background-color: #dc354660;
    }
    .cancel-order:hover .value{
        background-color: #DC3545;
        color: #fff;
    }
    .cancel-order:hover{
        background: #DC3545 !important;
        color: #fff !important;
    }
    .confirm-order{
        border-bottom: 4px solid #f39c12;
        color: #f39c12 !important;
    }
    .confirm-order .info-box-icon{
        border: 2px solid #f39c12;
        color: #f39c12 !important;
    }
    .confirm-order .value{
        background-color: #f39d124d;
    }
    .confirm-order:hover .value{
        background-color: #f39c12;
        color: #fff;
    }
    .confirm-order:hover{
        background: #f39c12 !important;
        color: #fff !important;
    }
    .return-order{
        border-bottom: 4px solid #ff1fb2 ;
        color: #ff1fb2  !important;
    }
    .return-order .info-box-icon{
        border: 2px solid #ff1fb2 ;
        color: #ff1fb2  !important;
    }
    .return-order .value{
        background-color: #ff1fb14b;
    }
    .return-order:hover .value{
        background-color: #ff1fb2;
        color: #fff;
    }
    .return-order:hover{
        background: #ff1fb2 !important;
        color: #fff !important;
    }
    .delivered-order{
        border-bottom: 4px solid #0870d1;
        color: #0870d1 !important;
    }
    .delivered-order .info-box-icon{
        border: 2px solid #0870d1;
        color: #0870d1 !important;
    }
    .delivered-order .value{
        background-color: #0870d149;
    }
    .delivered-order:hover .value{
        background-color: #0870d1;
        color: #fff;
    }
    .delivered-order:hover{
        background: #0870d1 !important;
        color: #fff !important;
    }
    .paid-order{
        border-bottom: 4px solid #949494;
        color: #949494 !important;
    }
    .paid-order .info-box-icon{
        border: 2px solid #949494;
        color: #949494 !important;
    }
    .paid-order .value{
        background-color: #ced1d6;
    }
    .paid-order:hover .value{
        background-color: #949494;
        color: #fff;
    }
    .paid-order:hover{
        background: #949494 !important;
        color: #fff !important;
    }
    .unpaid-order{
        border-bottom: 4px solid #FB72E5;
        color: #FB72E5 !important;
    }
    .unpaid-order .info-box-icon{
        border: 2px solid #FB72E5;
        color: #FB72E5 !important;
    }
    .unpaid-order .value{
        background-color: #fb72e446;
    }
    .unpaid-order:hover .value{
        background-color: #FB72E5;
        color: #fff;
    }
    .unpaid-order:hover{
        background: #FB72E5 !important;
        color: #fff !important;
    }
    
</style>
