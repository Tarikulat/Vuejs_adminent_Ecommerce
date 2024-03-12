<script setup>
import { ProductListTableSkeleton } from '@/components'
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { useProduct, useNotification, useAuth } from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const auth                      = useAuth();
const searchQuery               = ref('');
const paginateSize              = ref(50);
const notifications             = useNotification();
const product                   = useProduct();
const { products, deleteLoder } = storeToRefs(product);
const authPermission            = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}


const getProducts = (page=1, ) =>{
    product.getProducts(page, paginateSize.value, searchQuery.value);
}

const searchProduct = () =>{
    getProducts();
}

const sortByPaginateSize = () =>{
    getProducts();
}

const getVariationPrice = (productPrices) =>{
  const prices = productPrices.map(s=>s.pivot.offer_price==0?s.pivot.mrp:s.pivot.offer_price)
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  return {
    'minPrice' :minPrice,
    'maxPrice' :maxPrice,
  }
}

const deleteProduct = async(id, name) => {
    let res = await product.deleteProduct(id);
    if(res.status){
        notifications.Success(`${name} Delete Successfully`)
        getProducts();
    }
}



onMounted(() => {
    authenticateUserPermission();
    getProducts();
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <input type="text" placeholder="Search Product...." class="form-control mb-2 mr-2" v-model="searchQuery" @input="searchProduct">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize" @change="sortByPaginateSize">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name: 'product-add'}" class="btn btn-info" v-if="authPermission.some(permission => permission?.name === 'products-create')">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <Bootstrap5Pagination
                                :data="products"
                                @pagination-change-page="getProducts"
                                :limit="3"
                            >
                                <template #prev-nav>
                                    <a class="Previous" href="#">Previous</a>
                                </template>
                                <template #next-nav>
                                    <a class="Next" href="#">Next</a>
                                </template>
                            </Bootstrap5Pagination>
                        </ul>
                    </div>
                </div>
                <!-- ./card-header -->
                <div class="card-body">
                    <table class="table table-bordered table-hover text-center">
                        <thead>
                            <tr class="bg-info">
                                <th>SL</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>SKU</th>
                                <th>Type</th>
                                <th>QTY</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="product.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="11"/>
                        </tbody>
                        <tbody v-else>
                            <tr data-widget="expandable-table" v-for="(product, index) in products.data" :key="index">
                                <td>{{ index += 1 }}</td>
                                <td>
                                    <img :src="product.image" width="50" alt="">
                                </td>
                                <td><a :href="`https://ewant.com.bd/product-details/`+ product.id +`/`+ product.slug +``" target="_blank">{{ product.name }}</a></td>
                                <td>{{ product.category?.name }}</td>
                                <td>{{ product.brand?.name }}</td>
                                <td>{{ product.sku }}</td>
                                <td>
                                    <span class="text-warning" v-if="product.type == 'top-product'">Top</span>
                                    <span class="text-success" v-if="product.type == 'recent-product'">New</span>
                                    <span class="text-info" v-if="product.type == 'feature-product'">Fetured</span>
                                </td>
                                <td>{{ product.current_stock }}</td>
                                <td v-if="product.product_prices.length > 0" class="text-success">{{getVariationPrice(product.product_prices).minPrice}} tk -- {{getVariationPrice(product.product_prices).maxPrice}} tk</td>
                                <td v-else>
                                    <span v-if="product.offer_price != 0" style="font-size:14px;"><del class="text-danger mr-2">{{ product.mrp }} tk </del> -- </span>
                                    <span class="text-success ml-2">{{ product.offer_price != 0 ? product.offer_price : product.mrp }} tk</span>
                                </td>
                                <td>
                                    <span :class="{'active-status' : product.status=='active', 'inactive-status': product.status=='inactive'}">{{ product.status }}</span>
                                </td>
                                <td>
                                    <router-link :to="{name: 'product-edit', params : { id: product.id } }" class="btn btn-info btn-sm mr-2" v-if="authPermission.some(permission => permission?.name === 'products-update')"><i class="fas fa-edit"></i></router-link>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" v-if="deleteLoder == product.id"><i class="fas fa-spinner fa-spin"></i></a>
                                    <a href="javascript::void(0)" class="btn btn-danger btn-sm" @click="deleteProduct(product.id, product.name)" v-else><i class="fas fa-trash"></i></a>
                                    <router-link :to="{name:'product-histories', params: { id: product.id } }" class="btn btn-warning btn-sm ml-2"><i class="fas fa-file-medical-alt"></i></router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>
    .page-link{
        color: #000 !important;
    }
    .page-item.active .page-link {
        z-index: 3;
        color: #fff;
        background-color: #17A2B8 !important;
        border-color: #17A2B8 !important;
        color: #fff !important;
    }
    .card-title{
        width: 500px;
    }
    .paginate{
        width: 100px !important;
    }
</style>