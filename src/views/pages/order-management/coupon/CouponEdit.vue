
<script setup>
import { useCoupon, useNotification } from '@/stores'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route          = useRoute();
const router         = useRouter();
const notification   = useNotification();
const coupon         = useCoupon();
const name           = ref('');
const couponCode     = ref('');
const status         = ref('active');
const discountAmount = ref('');
const minCartAmount  = ref('');
const discountType   = ref('fixed');
const startDate      = ref('');
const endDate        = ref('');
const description    = ref('');
const errors         = ref('');

const getSingleCouponData = async() =>{
    const res = await coupon.getSingleCouponData(route.params.id);
    if(res?.success){
        name.value           = res?.result?.name;
        couponCode.value     = res?.result?.code;
        status.value         = res?.result?.status;
        discountAmount.value = res?.result?.discount_amount;
        minCartAmount.value  = res?.result?.min_cart_amount;
        discountType.value   = res?.result?.discount_type;
        startDate.value      = res?.result?.started_at;
        endDate.value        = res?.result?.ended_at;
    }
}

const submit = async() =>{
    const res = await coupon.updateCoupon(route.params.id, {
        name           : name.value,
        status         : status.value,
        code           : couponCode.value,
        discount_amount: discountAmount.value,
        min_cart_amount: minCartAmount.value,
        discount_type  : discountType.value,
        started_at     : startDate.value,
        ended_at       : endDate.value,
        description    : description.value,
    });
    if(res?.success){
        router.push({name: 'coupons-list'});
        notification.Success("Coupon Updated Successfully");
        coupon.loading = false;
    }else{
        errors.value = res.message;
    }
}

onMounted(() => {
    getSingleCouponData();  
})

</script>

<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <router-link :to="{name: 'coupons-list'}" class="btn btn-info float-right"><i class="fas fa-arrow-left"></i> Back</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="name">Title</label>
                                <input type="text" id="name" class="form-control" placeholder="Enter Coupon Title" v-model="name">
                                <span v-for="(error, index) in errors?.name" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="code">Coupon Code</label>
                                <input type="text" id="code" class="form-control" placeholder="Enter Coupon Code" v-model="couponCode">
                                <span v-for="(error, index) in errors?.code" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="status">Status</label>
                                <select id="status" class="form-control" v-model="status">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="discount_amount">Discount Amount</label>
                                <input type="number" id="discount_amount" class="form-control" placeholder="Enter Discount Amount" v-model="discountAmount">
                                <span v-for="(error, index) in errors?.discount_amount" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="min_cart_amount">Minimum Cart Amount</label>
                                <input type="number" id="min_cart_amount" class="form-control" placeholder="Enter Minimum Cart Amount" v-model="minCartAmount">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="discount_type">Discount Type</label>
                                <select id="discount_type" class="form-control" v-model="discountType">
                                    <option value="fixed">Fixed</option>
                                    <option value="percentage">% Percentage</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="start_at">Start Date</label>
                                <input id="start_at" type="datetime-local" class="form-control" v-model="startDate">
                                <span v-for="(error, index) in errors?.started_at" :key="index" class="text-danger">{{ error }}</span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="end_at">End Date</label>
                                <input id="end_at" type="datetime-local" class="form-control" v-model="endDate">
                                <span v-for="(error, index) in errors?.ended_at" :key="index" class="text-danger">{{ error }}</span>                            
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea id="description" class="form-control" cols="30" rows="3" placeholder="Enter Coupon Description Here" v-model="description"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <div>
                        <button type="submit" class="btn btn-info" v-if="coupon.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                        <button type="submit" @click.prevent="submit" class="btn btn-info" v-else>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>