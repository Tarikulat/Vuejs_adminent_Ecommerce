<script setup>
import { useProduct } from "@/stores"
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue";

const product        = useProduct();
const route          = useRoute();
const productHistory = ref();

const getProductHistories = async() =>{
    const res = await product.getProductHistories(route.params.id);
    if(res.success){
        productHistory.value = res.result;
    }
}

onMounted(() => {
    getProductHistories();
})
</script>

<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-end">
                        <router-link :to="{ name: 'product-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                    </div>
                    <div class="card-body">
                        <template v-for="(productInfo, index) in productHistory" :key="index">
                            <div class="card card-info" v-if="productInfo.event=='updated'">
                                <div class="card-header">
                                    <h4>Updated Information (Updated By : {{ productInfo?.user?.name }})</h4>
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
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.name">
                                                            <label for="">Product Name : </label>
                                                            <span>{{ productInfo?.old_values?.name }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.brand_id">
                                                            <label for="">Brand Name : </label>
                                                            <span>{{ productInfo?.old_values?.brand_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.category_id">
                                                            <label for="">Category Name : </label>
                                                            <span>{{ productInfo?.old_values?.category_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.sub_category_id">
                                                            <label for="">Sub Category Name : </label>
                                                            <span>{{ productInfo?.old_values?.sub_category_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.buy_price">
                                                            <label for="">Buy Price : </label>
                                                            <span>{{ productInfo?.old_values?.buy_price }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.mrp">
                                                            <label for="">Regular Price : </label>
                                                            <span>{{ productInfo?.old_values?.mrp }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.offer_price">
                                                            <label for="">Offer Price : </label>
                                                            <span>{{ productInfo?.old_values?.offer_price }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.current_stock">
                                                            <label for="">Current Stock : </label>
                                                            <span> {{ productInfo?.old_values?.current_stock }} Nos</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.status">
                                                            <label for="">Status : </label>
                                                            <span> {{ productInfo?.old_values?.status }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.sku">
                                                            <label for="">SKU : </label>
                                                            <span> {{ productInfo?.old_values?.sku }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.image">
                                                            <label for="">Image : </label>
                                                            <span> <img :src="productInfo?.old_values?.image" alt=""></span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.old_values?.free_shipping">
                                                            <label for="">Is Free Shipping : </label>
                                                            <span> {{ productInfo?.old_values?.free_shipping }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.old_values?.short_description">
                                                            <label for="">Short Description : </label>
                                                            <p v-html="productInfo?.old_values?.short_description"> </p>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.old_values?.description">
                                                            <label for="">Description : </label>
                                                            <p v-html="productInfo?.old_values?.description"> </p>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.old_values?.meta_title">
                                                            <label for="">Meta Title : </label>
                                                            <span> {{ productInfo?.old_values?.meta_title }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.old_values?.meta_keywords">
                                                            <label for="">Meta Keywords : </label>
                                                            <span> {{ productInfo?.old_values?.meta_keywords }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.old_values?.meta_description">
                                                            <label for="">Meta Description : </label>
                                                            <span> {{ productInfo?.old_values?.meta_description }}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="row pHistory">
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.name">
                                                            <label for="">Product Name : </label>
                                                            <span>{{ productInfo?.new_values?.name }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.brand_id">
                                                            <label for="">Brand Name : </label>
                                                            <span>{{ productInfo?.new_values?.brand_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.category_id">
                                                            <label for="">Category Name : </label>
                                                            <span>{{ productInfo?.new_values?.category_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.sub_category_id">
                                                            <label for="">Sub Category Name : </label>
                                                            <span>{{ productInfo?.new_values?.sub_category_id }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.buy_price">
                                                            <label for="">Buy Price : </label>
                                                            <span>{{ productInfo?.new_values?.buy_price }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.mrp">
                                                            <label for="">Regular Price : </label>
                                                            <span>{{ productInfo?.new_values?.mrp }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.offer_price">
                                                            <label for="">Offer Price : </label>
                                                            <span>{{ productInfo?.new_values?.offer_price }} Tk</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.current_stock">
                                                            <label for="">Current Stock : </label>
                                                            <span> {{ productInfo?.new_values?.current_stock }} Nos</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.status">
                                                            <label for="">Status : </label>
                                                            <span> {{ productInfo?.new_values?.status }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.sku">
                                                            <label for="">SKU : </label>
                                                            <span> {{ productInfo?.new_values?.sku }}</span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.image">
                                                            <label for="">Image : </label>
                                                            <span> <img :src="productInfo?.new_values?.image" width="150px;" alt=""></span>
                                                        </div>
                                                        <div class="col-md-6" v-if="productInfo?.new_values?.free_shipping">
                                                            <label for="">Is Free Shipping : </label>
                                                            <span> {{ productInfo?.new_values?.free_shipping }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.new_values?.short_description">
                                                            <label for="">Short Description : </label>
                                                            <p v-html="productInfo?.new_values?.short_description"> </p>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.new_values?.description">
                                                            <label for="">Description : </label>
                                                            <p v-html="productInfo?.new_values?.description"> </p>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.new_values?.meta_title">
                                                            <label for="">Meta Title : </label>
                                                            <span> {{ productInfo?.new_values?.meta_title }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.new_values?.meta_keywords">
                                                            <label for="">Meta Keywords : </label>
                                                            <span> {{ productInfo?.new_values?.meta_keywords }}</span>
                                                        </div>
                                                        <div class="col-md-12" v-if="productInfo?.new_values?.meta_description">
                                                            <label for="">Meta Description : </label>
                                                            <span> {{ productInfo?.new_values?.meta_description }}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card card-info" v-if="productInfo.event=='created'">
                                <div class="card-header">
                                    <h4>Product Primary Information</h4>
                                </div>
                                <div class="card-body">
                                    <table class="table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <th>Product Name</th>
                                                <td>{{ productInfo?.new_values?.name }}</td>
                                                <th>Brand Name</th>
                                                <td>{{ productInfo?.new_values?.brand_id }}</td>
                                            </tr>
                                            <tr>
                                                <th>Category Name</th>
                                                <td>{{ productInfo?.new_values?.category_id }}</td>
                                                <th>Sub-Category Name</th>
                                                <td>{{ productInfo?.new_values?.sub_category_id }}</td>
                                            </tr>
                                            <tr>
                                                <th>Buy Price</th>
                                                <td>{{ productInfo?.new_values?.buy_price }} Tk</td>
                                                <th>Regular Price/Mrp Price</th>
                                                <td>{{ productInfo?.new_values?.mrp }} Tk</td>
                                            </tr>
                                            <tr>
                                                <th>Offer Price</th>
                                                <td>{{ productInfo?.new_values?.offer_price }} Tk</td>
                                                <th>Offer Percent</th>
                                                <td>{{ Math.round(productInfo?.new_values?.offer_percent) }} %</td>
                                            </tr>
                                            <tr>
                                                <th>Discount</th>
                                                <td>{{ productInfo?.new_values?.discount }} Tk</td>
                                                <th>Current Stock</th>
                                                <td>{{ productInfo?.new_values?.current_stock }} Nos</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td>{{ productInfo?.new_values?.status }}</td>
                                                <th>SKU Number</th>
                                                <td>{{ productInfo?.new_values?.sku }}</td>
                                            </tr>
                                            <tr>
                                                <th>Is Free Shipping</th>
                                                <td>{{ productInfo?.new_values?.free_shipping == 1 ? 'Yes' : 'No' }}</td>
                                                <th>Created By</th>
                                                <td>{{ productInfo?.new_values?.created_by }}</td>
                                            </tr>
                                            <tr>
                                                <th>Created At</th>
                                                <td>{{ productInfo?.created_at }}</td>
                                                <th>Updated At</th>
                                                <td>{{ productInfo?.updated_at }}</td>
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