
<script setup>
import { ProductListTableSkeleton } from '@/components'
import { usePurchase } from '@/stores'
import { onMounted, ref } from 'vue';

const purchase         = usePurchase();
const purchaseItems    = ref();
const purchaseCode     = ref('');

const getPurchase = async() =>{
    const res = await purchase.getPurchase(purchaseCode.value);
    if(res.success){
        purchaseItems.value = res.result;
    }
}

const searchPurchase = () =>{
    getPurchase();
}

onMounted(() => {
    getPurchase();
})
</script>

<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                                <input type="text" placeholder="Enter Search key...." class="form-control" v-model="purchaseCode" @input="searchPurchase">
                            </div>
                            <div class="d-flex justify-content-between">
                                <router-link :to="{name:'dashboard'}" class="btn btn-info mr-2"><i class="fas fa-arrow-left"></i> Back</router-link>
                                <router-link :to="{name:'purchase-add'}" class="btn btn-info"><i class="fas fa-plus"></i> Add</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-bordered text-center">
                                    <thead class="bg-info">
                                        <th>SL</th>
                                        <th>Purchase Code</th>
                                        <th>Supplier Name</th>
                                        <th>Supplier Phone</th>
                                        <th>Product Name</th>
                                        <th>Buy Price</th>
                                        <th>Is Paid</th>
                                    </thead>
                                    <tbody v-if="purchase.loading">
                                        <ProductListTableSkeleton :dataAmount="15" :columnAmount="7"/>
                                    </tbody>
                                    <tbody>
                                        <tr v-for="(item, index) in purchaseItems?.data" :key="index">
                                            <td>{{ index+1 }}</td>
                                            <td>{{ item.purchase_code }}</td>
                                            <td>{{ item.supplier_name }}</td>
                                            <td>{{ item.supplier_contact }}</td>
                                            <td>{{ item.product?.name }}</td>
                                            <td>{{ item.buy_price }} Tk</td>
                                            <td class="order-success" v-if="item.is_paid"> <span>Paid</span></td>
                                            <td class="order-cancle" v-else> <span>Unpaid</span> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>