
<script setup>
import { ProductListTableSkeleton } from '@/components'
import { useAuth, useCoupon } from '@/stores'
import { onMounted, ref } from 'vue';

const auth           = useAuth();
const coupon         = useCoupon();
const authPermission = ref([]);
const couponData     = ref('');

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

const getCouponList = async() =>{
    const res = await coupon.getCouponList();
    if(res.success){
        couponData.value = res.result;
    }
}

onMounted(() => {
    getCouponList();
    authenticateUserPermission();  
})
</script>

<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <div>
                        <router-link :to="{name: 'coupon-add'}" class="btn btn-info mr-2" v-if="authPermission.some(permission => permission?.name === 'coupons-create')">
                            <i class="fas fa-plus"></i> Add
                        </router-link>
                        <router-link :to="{name: 'dashboard'}" class="btn btn-info"><i class="fas fa-arrow-left"></i> Back</router-link>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered text-center">
                        <thead class="bg-info">
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Discount Amount</th>
                                <th>Min. Cart Amount</th>
                                <th>Discount Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="coupon.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="10"/>
                        </tbody>
                        <tbody v-else>
                            <tr v-for="(coupon, index) in couponData?.data" :key="index">
                                <td>{{ index+1 }}</td>
                                <td>{{ coupon.name }}</td>
                                <td>{{ coupon.code }}</td>
                                <td v-if="coupon.discount_type=='fixed'">{{ coupon.discount_amount }} TK</td>
                                <td v-else>{{ coupon.discount_amount }} %</td>
                                <td>{{ coupon.min_cart_amount }} TK</td>
                                <td>{{ coupon.discount_type }}</td>
                                <td>{{ coupon.started_at }}</td>
                                <td>{{ coupon.ended_at }}</td>
                                <td> <span :class="{'active-status' : coupon.status=='active', 'inactive-status': coupon.status=='inactive'}"> {{ coupon.status }}</span></td>
                                <td>
                                    <router-link :to="{name:'coupon-edit', params: {id: coupon.id} }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'coupons-update')">
                                        <i class="fas fa-edit"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>