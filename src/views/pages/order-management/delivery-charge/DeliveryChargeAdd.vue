<script setup>
import { useDeliveryCharge, useNotification } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router              = useRouter();
const deliveryAreaName    = ref('');
const deliveryAreaCharge  = ref('');
const deliveryAreaMinTime = ref('');
const deliveryAreaMaxTime = ref('');
const errors              = ref({});
const deliveryTimeUnite   = ref('days');
const deliveryStatus      = ref('active');

const deliveryCharge      = useDeliveryCharge();
const notification        = useNotification();

const submit = async() =>{
    const res = await deliveryCharge.insertGateway({
        name       : deliveryAreaName.value,
        deliveryFee: deliveryAreaCharge.value,
        minTime    : deliveryAreaMinTime.value,
        maxTime    : deliveryAreaMaxTime.value,
        timeUnit   : deliveryTimeUnite.value,
        status     : deliveryStatus.value,
    });
    if(res.result){
        router.push({name:'charge-list'})
        notification.Success(`${res.result?.name} Added Successfully`);
    }else{
        errors.value = res.message
    }
}


</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'charge-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="delivery Area">Delivery Area</label>
                      <input type="text" id="delivery Area" class="form-control" placeholder="Enter Delivery Area Name" v-model="deliveryAreaName"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="deliveryCharge">Delivery Charge</label>
                      <input type="number" id="deliveryCharge" class="form-control" placeholder="Enter Delivery Charge" v-model="deliveryAreaCharge"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="deliveryMinTime">Delivery Min-Time</label>
                      <input type="number" id="deliveryMinTime" class="form-control" placeholder="Enter Min-Time" v-model="deliveryAreaMinTime"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="deliveryMaxTime">Delivery Max-Time</label>
                      <input type="number" id="deliveryMaxTime" class="form-control" placeholder="Enter Max-Time" v-model="deliveryAreaMaxTime"/>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="status">Delivery Time Unite</label>
                        <select id="status" class="form-control custom-select" v-model="deliveryTimeUnite">
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" class="form-control custom-select" v-model="deliveryStatus">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
          </section>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-info" v-if="deliveryCharge.addLoading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else> <i class="fas fa-plus"></i> Add New</button>
          </div>
        </div>
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<style>
.close-btn{
    position: absolute;
    top: 0;
    right: 0;
    height: 25px;
    width: 25px;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}
.close-btn i{
    line-height: 25px;
}
.img-remove-btn{
    border: 1px solid #b6b6b6;
    display: inline-block;
    margin: 10px 5px;
    border-radius: 10px;
    padding: 5px;
}
.loading-section{
    border: 1px solid #c4c4c4;
    padding: 5px 10px;
    border-radius: 5px;
}
label{
    font-weight: 600 !important;
}
</style>
