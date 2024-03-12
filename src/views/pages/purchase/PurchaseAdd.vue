<script setup>
import { useProduct, useNotification, usePurchase } from '@/stores'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router           = useRouter();
const purchase         = usePurchase();
const product          = useProduct();
const notification     = useNotification();
const searchName       = ref('');
const products         = ref({});
const purchaseProducts = ref([]);
const purchaseCode     = ref([]);
const buyPrice         = ref([]);
const dueAmount        = ref([]);
const quantity         = ref([]);
const isPaid           = ref([]);
const supplierName     = ref([]);
const supplierContact  = ref([]);
const errors           = ref();

const searchProduct = async() =>{
    let res = await product.getProducts(1, 10, searchName.value);
    if(res.data){
      products.value = res.data;
    }
}

const addProduct = (product) =>{
  purchaseProducts.value.push(product);
  searchName.value = '';
}

const removeItem = (index) =>{
  purchaseProducts.value.splice(index, 1); 
  purchaseCode.value.splice(index, 1);
  buyPrice.value.splice(index, 1);
  dueAmount.value.splice(index, 1);
  quantity.value.splice(index, 1);
  isPaid.value.splice(index, 1);
  supplierName.value.splice(index, 1);
  supplierContact.value.splice(index, 1);
}

const clearSearch = () =>{
  searchName.value = '';
}

const submit = async() =>{

const itemsWithValues = purchaseProducts.value.map((product, index) => ({
    product_id      : product.id,
    purchase_code   : purchaseCode.value[index] || null,
    buy_price       : buyPrice.value[index] || null,
    due_amount      : dueAmount.value[index] || 0,
    quantity        : quantity.value[index] || null,
    is_paid         : isPaid.value[index] || null,
    supplier_name   : supplierName.value[index] || null,
    supplier_contact: supplierContact.value[index] || null,
}));

const res = await purchase.insertPurchase({
    items     : itemsWithValues,
});

  if(res.success){
    router.push({name:'purchase-list'});
    notification.Success('Purchase Added SuccessFully');
  }else{
    errors.value = res.message;
  }
}

</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card" style="min-height:500px;">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'purchase-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group col-md-12">
                    <label for="inputName">Add Product</label>
                    <div class="d-flex justify-content-between">
                    <div style="width:80%; position:relative;">
                        <input type="text" id="inputName" class="form-control mr-2" v-model="searchName" placeholder="Search Product..." @input="searchProduct"/>
                        <span class="close-searchText" v-show="searchName !=''" @click="clearSearch"><i class="fas fa-times"></i></span>
                        <div class="search-product-area" v-if="searchName !=''">
                        
                        <ul style="padding-left:0;" v-if="products.length > 0">
                            <li v-for="(product, index) in products" :key="index" @click="addProduct(product)">
                            <div class="row">
                                <div class="col-md-1"><img :src="product.image" width="40" alt=""></div>
                                <div class="col-md-11">
                                <div style="font-weight:600;">{{ product.name }}</div>
                                <div style="font-size: 14px;"><span class="text-info">Category : </span> {{ product.category?.name }}</div>
                                </div>
                            </div>
                            </li>
                        </ul>

                        <ul v-else>
                            <li class="text-danger">No Product Found</li>
                        </ul>

                        </div>
                    </div>
                    <!-- <button class="btn btn-info" style="width:15%;"><i class="fas fa-plus"></i> Add Product</button> -->
                    </div>
                </div>
                <div class="row" style="width: 100%;">
                    <div class="col-md-3" v-for="(product, index) in purchaseProducts" :key="index">
                        <div class="card card-light">
                        <div class="card-header d-flex justify-content-between">
                            <div class="card-title"><img :src="product.image" width="40" alt=""> {{ product.name }}</div>
                            <button class="btn btn-danger btn-sm" @click="removeItem(index)"><i class="fas fa-trash"></i></button>
                        </div>
                        <div class="card-body row">
                            <div class="form-group col-md-6">
                                <label for="purchase_code">Purchase Code</label>
                                <div class="">
                                    <input type="text" id="purchase_code" class="form-control mr-2" placeholder="Enter Purchase Code" v-model="purchaseCode[index]"/>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="buy_price">Buy Price</label>
                                <div class="">
                                    <input type="number" id="buy_price" class="form-control mr-2" placeholder="Enter Buy Price" v-model="buyPrice[index]"/>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="due_amount">Due Amount</label>
                                <div class="">
                                    <input type="number" id="due_amount" class="form-control mr-2" placeholder="Due Amount" v-model="dueAmount[index]"/>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="quantity">Quantity</label>
                                <div class="">
                                    <input type="number" id="quantity" class="form-control mr-2" placeholder="Enter Quantity" v-model="quantity[index]"/>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="is_paid">Is Paid</label>
                                <div class="">
                                    <select id="is_paid" class="form-control" v-model="isPaid[index]">
                                        <option value="1">Paid</option>
                                        <option value="0">Unpaid</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="supplier_name">Supplier Name</label>
                                <div class="">
                                    <input type="text" id="supplier_name" class="form-control mr-2" placeholder="Supplier Name" v-model="supplierName[index]"/>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="supplier_contact">Supplier Contact</label>
                                <div class="">
                                    <input type="text" id="supplier_contact" class="form-control mr-2" placeholder="Phone Number" v-model="supplierContact[index]"/>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <span v-if="errors">
                        <span v-for="(error, index) in errors.items" :key="index" class="text-danger">{{ error }}</span>
                    </span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="card-footer d-flex justify-content-end">
            <button class="btn btn-info" v-if="purchase.loading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button class="btn btn-info" @click="submit" v-else>Add Purchase</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-header::after{
  display: none !important;
}
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
.search-product-area{
  position: absolute;
  left: 0;
  z-index: 99;
  width: 100%;
  padding: 10px;
  background:#e6feff;
  border:1px solid #cacaca;
  border-radius: 5px;
}
.search-product-area ul{
  margin-bottom: 0 !important;
}
.search-product-area ul li{
  border-top: 1px solid #cacaca;
  padding: 3px 5px;
  list-style:none;
}
.search-product-area ul li:first-child {
  border-top: none;
}
.search-product-area ul li:hover{
  background-color: rgb(172, 248, 248);
  cursor: pointer;
}
.close-searchText{
  position: absolute;
  color: red;
  top: 7px;
  right: 20px;
  cursor: pointer;
}
</style>
