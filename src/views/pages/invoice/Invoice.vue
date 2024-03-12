<script setup>
import { useOrders } from '@/stores'
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const order      = useOrders();
const { params } = useRoute();
const order_details = ref('');

const getOrder = async () => {
  const res = await order.getSingleOrder(params.id);
  console.log(res);
  if(res.data?.success){
    order_details.value = res.data?.result;
  }
};

const formattedCreatedAt = computed(() => {
  if (!order_details.value.created_at) {
    return '';
  }
  const createdAt = new Date(order_details.value.created_at);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return createdAt.toLocaleString(undefined, options);
});

onMounted(() => {
  getOrder();
});

const printInvoice = () => {
    const footer = document.querySelector('.main-footer');
    const footerParent = footer.parentElement;
    footerParent.removeChild(footer);
    setTimeout(() => {
        window.print();
        footerParent.appendChild(footer);
    }, 500);
}
</script>

<template>
<div>
    <section class="invoice" style="padding:10px; margin-bottom:20px;">
        <!-- title row -->
        <div class="row">
        <div class="col-12">
            <h2 class="page-header">
            <img src="@/assets/logo.png" width="120" alt="">
            <small class="float-right">Date : {{ formattedCreatedAt }}</small>
            </h2>
        </div>
        <!-- /.col -->
        </div>
        <!-- info row -->
        <div class="row invoice-info">
        <div class="col-sm-4 invoice-col">
            From
            <address>
            <strong>Admin, Inc.</strong><br>
            795 Folsom Ave, Suite 600<br>
            San Francisco, CA 94107<br>
            Phone: (804) 123-5432<br>
            Email: info@almasaeedstudio.com
            </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-4 invoice-col">
            To
            <address>
            <strong>John Doe</strong><br>
            795 Folsom Ave, Suite 600<br>
            San Francisco, CA 94107<br>
            Phone: (555) 539-1037<br>
            Email: john.doe@example.com
            </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-4 invoice-col">
            <b>Invoice #</b><br>
            <br>
            <b>Order ID:</b> {{ order_details.id }}<br>
            <b>Payment Due:</b> 2/22/2014<br>
            <b>Account:</b> 968-34567
        </div>
        <!-- /.col -->
        </div>
        <!-- /.row -->

        <!-- Table row -->
        <div class="row">
        <div class="col-12 table-responsive">
            <table class="table table-striped">
            <thead>
            <tr>
                <th>Qty</th>
                <th>Product</th>
                <th>Order Date</th>
                <th>Unit Price</th>
                <th>Unit Total</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in order_details.items" :key="index">
                    <td>{{ item.pivot.quantity }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ formattedCreatedAt }}</td>
                    <td>{{ item.pivot.item_mrp }} tk</td>
                    <td>{{ item.pivot.item_mrp }} tk</td>
                </tr>
            </tbody>
            </table>
        </div>
        <!-- /.col -->
        </div>
        <!-- /.row -->

        <div class="row">
        <!-- accepted payments column -->
        <div class="col-6">
            <p class="lead">Payment Methods:</p>
            

            <p class="text-muted well well-sm shadow-none" style="margin-top: 10px;">
                {{ order_details.payment_gateway?.name }}
            </p>
        </div>
        <!-- /.col -->
        <div class="col-6">
            <div class="table-responsive">
            <table class="table">
                <tr>
                    <th style="width:50%">Subtotal :</th>
                    <td>{{ order_details.mrp }} tk</td>
                </tr>
                <tr>
                    <th>Discount :</th>
                    <td>{{ order_details.discount }} tk</td>
                </tr>
                <tr>
                    <th>Total Price :</th>
                    <td>{{ order_details.sell_price }} tk</td>
                </tr>
                <tr>
                    <th>Delivery Charge : </th>
                    <td>{{ order_details.delivery_charge }} tk</td>
                </tr>
                <tr>
                    <th>Total Payable Price : </th>
                    <td>{{ order_details.payable_price }} tk</td>
                </tr>
            </table>
            </div>
        </div>
        <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
    <div class="print-button">
        <button class="btn btn-info m-4" @click.prevent="printInvoice">Print Invoice</button>
    </div>
</div>
</template>


<style scoped>

@media print {
    .print-button {
      display: none;
    }
    footer.main-footer{
        display: none !important;
    }
}
</style>