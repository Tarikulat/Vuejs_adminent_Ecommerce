<script setup>
import { useCourier, useNotification } from '@/stores'
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const notification    = useNotification();
const courier         = useCourier();
const router          = useRouter();
const route           = useRoute();
const customer_name   = ref('');
const phone_number    = ref('');
const address_details = ref('');
const payable_price   = ref('');
const note            = ref('');
const order_id        = ref('');
const errors          = ref({});

const getInfo = async() =>{
    const res = await courier.getSteadfastInfo(route.params.id);
    if(res.success){
        customer_name.value   = res.result?.order?.customer_name;
        phone_number.value    = res.result?.order?.phone_number;
        address_details.value = res.result?.order?.address_details;
        payable_price.value   = res.result?.order?.payable_price;
        order_id.value        = res.result?.order?.id;
    }
}

const submit = async() =>{
    const res = await courier.insertSteadfast({
        customer_name  : customer_name.value,
        phone_number   : phone_number.value,
        address_details: address_details.value,
        payable_price  : payable_price.value,
        order_id       : order_id.value,
    });

    if(res.success){
        router.push({name:'orders-list'});
        notification.Success("Order Shipped Steadfast Successfully");
    }else{
        errors.value = res.errors;
    }
}

onMounted(() => {
    getInfo();    
})
</script>

<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <router-link :to="{name: 'orders-list'}" class="btn btn-info"><i class="fas fa-arrow-left"></i> Back</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="title">Customer Name</label>
                                <input type="text" class="form-control" placeholder="Customer Name" v-model="customer_name">   
                            </div>
                            <div class="form-group">
                                <label for="title">Customer Phone Number</label>
                                <input type="text" class="form-control" placeholder="Customer Phone Number" v-model="phone_number">   
                            </div>
                            <div class="form-group">
                                <label for="title">Customer Address</label>
                                <input type="text" class="form-control" placeholder="Customer Address" v-model="address_details">   
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="title">Payable Price</label>
                                <input type="text" class="form-control" placeholder="Enter Payable Price" v-model="payable_price">   
                            </div>
                            <div class="form-group">
                                <label for="note">Note</label>
                                <textarea id="note" cols="30" rows="3" class="form-control" placeholder="Enter Note" v-model="note"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-danger" v-if="courier.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                    <button class="btn btn-info" @click.prevent="submit" v-else>Shipped to Steadfast</button>
                </div>
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>

</style>