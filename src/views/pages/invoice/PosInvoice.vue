<script setup>
import { useOrders } from '@/stores'
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const order      = useOrders();
const { params } = useRoute();
const order_details = ref('');
const printButton = ref(null);

const getOrder = async () => {
  const res = await order.getSingleOrder(params.id);
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

const printPage = () => {
  const printableContent = document.getElementById('print-section');
  if (printableContent) {
    printButton.value.style.display = 'none';

    const printWindow = window.open('');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <!-- Add any additional styles or meta tags if needed -->
          <style>
            body {
              /* Add your desired margin or padding here */
              margin-top: -22px;
              margin-left: 15px;
            }
            /* Add your styles here */
          </style>
        </head>
        <body>
          ${printableContent.outerHTML}
        </body>
      </html>
    `);

    // Use setTimeout to ensure the content is fully loaded before triggering print
    setTimeout(() => {
      printWindow.print();
      printButton.value.style.display = 'block';
    }, 1000); // You can adjust the delay (in milliseconds) as needed
  }
};
</script>

<template>
  <div>
    <div class="bg-white p-2">
      <div id="print-section" class="full-width" style="padding: 0px; margin: 0px;">
        <div style="display: flex;  flex-direction:column; margin-top: 8px">

            <div style="display:flex;justify-content:space-between; border-bottom:1px solid #818181;padding-bottom:2px;">
                <div style="display:flex;align-items:end;">
                    <div>
                        <img src="@/assets/logo.png" width="50" alt=""><br>
                        <span style="font-size:10px">Phone: +8801773377673</span>
                    </div>
                </div>
                <div style="width: 150px;">
                    <p style="font-weight:600;margin-bottom:0;font-size:14px">Address:</p>
                    <span style="font-size:10px">Shop: 05, House: 22, Road: 03, Block: C, Mirpur 13, Dhaka-1216</span>
                </div>
            </div>
            <div style="display: block; width: 100%;">
                <span style="font-size:12px; font-weight:700; display:block;" v-if="order_details.courier_name=='Pathao'"><span>Pathao Shop Id : </span> <span style="font-weight:700; margin-right:10px;font-size:12px;">  134125,  </span></span>
                <span style="font-size:12px; font-weight:700; display:block;" v-if="order_details.courier_name=='Pathao'"><span>Tracking Code : </span> <span style="font-weight:700; margin-right:10px;font-size:12px;">  {{ order_details.tracking_code }} </span></span>
                <span style="font-size:12px; font-weight:700; display:block;" v-if="order_details.courier_name=='Steadfast'"><span>Steadfast Shop Id : </span> <span style="font-weight:700; margin-right:10px;font-size:12px;">  10670,  </span></span>
                <span style="font-size:12px; font-weight:700; display:block;" v-if="order_details.courier_name=='Steadfast'"><span>Consignment Id : </span> <span style="font-weight:700; margin-right:10px;font-size:12px;">  {{ order_details.consignment_id }} </span></span>
            </div>

            <div style="display: block; width: 100%;">
                <span style="font-weight:700;margin-bottom:0; font-size:10px;display:block;margin-bottom:0; border-bottom:1px solid #818181">Order Information</span>
                <span style="font-size:10px; font-weight:700;"><span>Order Id : </span> <span style="font-weight:400; margin-right:10px"> {{ order_details.id }} , </span></span>
                <span style="font-size:10px; font-weight:700;"><span>Name : </span> <span style="font-weight:400;margin-right:10p"> {{ order_details.customer_name }} , </span></span>
                <span style="font-size:10px; font-weight:700;"><span>Phone : </span> <span style="font-weight:400;margin-right:10p"> {{ order_details.phone_number }} , </span></span>
                <span style="font-size:10px; font-weight:700;"><span>Date : </span> <span style="font-weight:400;margin-right:10p"> {{ formattedCreatedAt }} , </span></span>
                <span style="font-size:10px; font-weight:700;"><span>Addres : </span> <span style="font-weight:400;margin-right:10p"> {{ order_details.address_details }}, {{ order_details.district }} , </span></span>
                <span style="font-size:10px; font-weight:700;"><span>payment Status : </span> <span style="font-weight:400;margin-right:10p"> {{ order_details.is_paid? "Paid" : "Unpaid" }}</span></span>
            </div>
        </div>

        <div class="">
            <div class="table" style="width: 100%;margin-top: 2px;">
                <table style="width: 100%;margin-top: 2px;">
                    <thead>
                        <tr>
                            <th style="width: 30%; font-size: 10px; font-weight:700; border-bottom: 0.25px solid #000; text-align: left;">Product</th>
                            <th style="width: 10%; font-size: 10px; font-weight:700; border-bottom: 0.25px solid #000; text-align: right;">QTY</th>
                            <th style="width: 25%; font-size: 10px; font-weight:700; border-bottom: 0.25px solid #000; text-align: right;">Price</th>
                            <th style="width: 25%; font-size: 10px; font-weight:700; border-bottom: 0.25px solid #000; text-align: right;">TOTAL</th>
                        </tr>
                    </thead>
                    
                    <tr v-for="(item, index) in order_details.items" :key="index" style="border-bottom: 1.5px solid black">
                        <td style="font-size: 10px;">{{ item.name }}</td>
                        <td style="font-size: 10px; text-align: right;">{{ item.pivot.quantity }}</td>
                        <td style="font-size: 10px; text-align: right;">{{ item.pivot.item_mrp}} tk</td>
                        <td style="font-size: 10px; text-align: right;">{{ item.pivot.quantity * item.pivot.item_mrp }} tk</td>
                    </tr>
                </table>
                <div style="border-top: 0.25px solid #000;" class="info-footer">
                    <div class="invoice-info-box">
                        <span style="font-size:10px; display:flex; justify-content:space-between; font-weight:700; padding:0; margin-top:10px;">
                            <span>Subtotal : </span> 
                            <span style="font-weight:400; margin-right:10px"> {{ order_details.mrp }} tk.</span>
                        </span>
                        <span style="font-size:10px; display:flex; justify-content:space-between; font-weight:700; padding:0;">
                            <span>Discount :  </span> 
                            <span style="font-weight:400; margin-right:10px"> {{ order_details.discount }} tk.</span>
                        </span>
                        
                        <span style="font-size:10px; display:flex; justify-content:space-between; font-weight:700; padding:0;">
                            <span>Total Price :  </span> 
                            <span style="font-weight:400; margin-right:10px"> {{ order_details.sell_price }} tk.</span>
                        </span>

                        <span style="font-size:10px; display:flex; justify-content:space-between; font-weight:700; padding:0;">
                            <span>Delivery Charge :  </span> 
                            <span style="font-weight:400; margin-right:10px"> {{ order_details.delivery_charge }} tk.</span>
                        </span>
                        <span style="font-size:10px; display:flex; justify-content:space-between; font-weight:700; padding:0;">
                            <span>Total Payable Price :  </span> 
                            <span style="font-weight:400; margin-right:10px"> {{ order_details.payable_price }} tk.</span>
                        </span>
                        
                    </div>
                    <div style="text-align:center;position:absolute;bottom:0;">
                        <span style="font-weight:700;font-size:13px;">"Thank you for shopping with us!"</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <button class="btn btn-info" ref="printButton" @click="printPage">Print Invoice</button>
    <a href=""></a>
  </div>
</template>


