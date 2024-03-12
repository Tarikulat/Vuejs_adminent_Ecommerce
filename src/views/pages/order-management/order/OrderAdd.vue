<script setup>
import { useProduct, useCart, useDeliveryCharge, useOrders, useNotification } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';

const router               = useRouter();
const errors               = ref();
const searchName           = ref();
const spacialDiscount      = ref(0);
const advancePayment       = ref(0);
const products             = ref({});
const searchError          = ref('');
const hiddenSearchResult   = ref(true);
const deleteLoading        = ref(null);
const order                = useOrders();
const cart                 = useCart();
const notification         = useNotification();
const product              = useProduct();
const deliveryCharge       = useDeliveryCharge();
const {DeliveryChargeInfo} = storeToRefs(deliveryCharge);

const searchProductInfo     = ref({});
const variationPrice        = ref({});
const searchProductPrices   = ref([]);
const deliveryChargeId      = ref('');
const variationId           = ref('');
const quantity              = ref(1);
const cartItems             = ref([]);
const changeableChargeValue = ref(0);
const paymentStatus         = ref(0);
const customerName          = ref('');
const customerDistrict      = ref('');
const customerPhone         = ref('');
const customerAddress       = ref('');
const orderStatusId         = ref('');
const orderStatuses         = ref({});

const searchProduct = async() =>{
    let res = await product.getProducts(1, 10, searchName.value);
    if(res.data){
      products.value = res.data;
      hiddenSearchResult.value = false;
    }
}

const addProduct = (product) =>{
    searchName.value         = product.name;
    hiddenSearchResult.value = true;
    searchProductInfo.value  = product;
    searchProductPrices.value= product.product_prices;
}

const clearSearch= () =>{
    searchName.value = '';
    hiddenSearchResult.value = true;
}

const getVariationPrice = async(productId, variationId) =>{
    let res = await product.getVariationPrice( productId, variationId);
    if(res.status === 200){
        variationPrice.value = res.data?.result;
    }
}

const updateWeight = async(productId, variationId, index) =>{

    let res = await product.getVariationPrice( productId, variationId);
    if(res.status === 200){
        cartItems.value[index].mrp         = res.data?.result?.mrp;
        cartItems.value[index].offer_price = res.data?.result?.offer_price;
        cartItems.value[index].discount    = res.data?.result?.discount;
    }
}

const getOrderStatus = async() =>{
    let res = await order.getOrderStatus();
    if(res.success){
        orderStatuses.value = res.result
    }
}

const getDeliveryCharge = async() =>{
    let res = await deliveryCharge.deliveryChargeSingleData(deliveryChargeId.value);
    if(res.success){
        changeableChargeValue.value = res.result?.delivery_fee;
    }
}

const deleteItem = async(index) =>{
    deleteLoading.value = index;
    await new Promise(resolve => setTimeout(resolve, 1000));
    deleteLoading.value = null;
    cartItems.value.splice(index, 1);
}

const addToCart = async(product) =>{
    if(product.id){
        if(product.product_prices?.length > 0){
            if(variationId.value !=''){
                let res = await cart.addToCart({
                    item_id       : product.id,
                    name          : product.name,
                    image         : product.image,
                    buy_price     : variationPrice.value.buy_price,
                    mrp           : variationPrice.value.mrp,
                    offer_price   : variationPrice.value.offer_price,
                    discount      : variationPrice.value.discount,
                    weight_id     : variationId.value,
                    quantity      : quantity.value,
                    product_prices: product.product_prices,
                    pivot         : product.pivot
                })
                if(res){
                    cartItems.value = res;
                }
            }else{
                searchError.value = 'Select Variation';
            }
        }else{
            let res = await cart.addToCart({
                item_id       : product.id,
                name          : product.name,
                image         : product.image,
                buy_price     : product.buy_price,
                mrp           : product.mrp,
                offer_price   : product.offer_price,
                discount      : product.discount,
                weight_id     : null,
                quantity      : quantity.value,
                product_prices: product.product_prices,
                pivot         : product.pivot
            })
            if(res){
                cartItems.value = res;
            }
        }

        searchName.value  = '';
        quantity.value    = 1;
        variationId.value = '';
    }else{
        searchError.value = 'Product and Variation required'; 
    }
}

// Total Price Calculation *****************************

const totalPrice = computed(() => {
    var totalOfferPrice =  cartItems.value.reduce((total, item) => {
        return total + (item.offer_price * item.quantity);
    }, 0);
   
    var totalMrp =  cartItems.value.reduce((total, item) => {
        return total + (item.mrp * item.quantity);
    }, 0);
   
    var totalDiscount =  cartItems.value.reduce((total, item) => {
        return total + (item.discount * item.quantity);
    }, 0);

    return  {
        mrp_price : totalMrp,
        offer_price : totalOfferPrice,
        discount_price : totalDiscount,
    };
});

const submit = async() =>{
    let res = await order.insertOrder(cartItems.value, {
        customer_name      : customerName.value,
        phone_number       : customerPhone.value,
        address_details    : customerAddress.value,
        district           : customerDistrict.value,
        status_id          : orderStatusId.value,
        payment_gateway_id : 1,
        is_paid            : paymentStatus.value,
        delivery_gateway_id: deliveryChargeId.value,
        special_discount   : spacialDiscount.value,
        advance_payment    : advancePayment.value,
        delivery_charge    : changeableChargeValue.value,
    });
    if(res.status === 200){
        router.push({name: 'orders-list'});
        notification.Success("Order Created Successfully");
    }else{
        errors.value = res.data?.message
    }
}

onMounted(() => {
    cart.cartItems = [];
    getOrderStatus();
    deliveryCharge.getDeliveryChargeList();
})
</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'orders-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-3">
                    <div class="card card-info">
                        <div class="card-header">
                            <span>Order Information</span>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="delivery Area">Customer Phone Number</label>
                                <input type="text" id="name" class="form-control" placeholder="Enter Customer Phone" v-model="customerPhone"/>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.phone_number" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="delivery Area">Customer Name</label>
                                <input type="text" id="name" class="form-control" placeholder="Enter Customer Name" v-model="customerName"/>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.customer_name" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="delivery Area">District</label>
                                <input type="text" id="name" class="form-control" placeholder="Enter District Name" v-model="customerDistrict"/>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="delivery Area">Customer Address</label>
                                <input type="text" id="name" class="form-control" placeholder="Enter Customer Address" v-model="customerAddress"/>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.address_details" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="delivery Area">Order Status</label>
                                <select name="" id="" class="form-control" v-model="orderStatusId">
                                    <option value="">Select One</option>
                                    <option :value="status.id" v-for="(status, index) in orderStatuses.data" :key="index">{{ status.name }}</option>
                                </select>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="delivery Area">Shipping Area</label>
                                <select name="" id="" class="form-control" v-model="deliveryChargeId" @change="getDeliveryCharge">
                                    <option value="">Select One</option>
                                    <option :value="charge.id" v-for="(charge, index) in DeliveryChargeInfo.data" :key="index">{{ charge.name }}</option>
                                </select>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="delivery Area">Payment Status</label>
                                <select name="" id="" class="form-control" v-model="paymentStatus">
                                    <option value='1'>Paid</option>
                                    <option value='0'>Unpaid</option>
                                </select>
                                <span v-if="errors">
                                    <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card card-info">
                        <div class="card-header">
                            <span>Product Information</span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="delivery Area">Search Product</label>
                                        <input type="text" id="delivery Area" class="form-control" placeholder="Search Your Product" @input="searchProduct" v-model="searchName"/>
                                        <span v-if="searchError" class="text-danger">{{searchError}}</span>
                                        <span class="close-searchText" :hidden="hiddenSearchResult" @click="clearSearch"><i class="fas fa-times"></i></span>
                                        <div class="search-product-area" :hidden="hiddenSearchResult">
                                            
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
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="variations">Select Variation</label>
                                        <select name="" id="variations" class="form-control" v-model="variationId" @change="getVariationPrice(searchProductInfo.id , variationId)">
                                            <option value="">Select One</option>
                                            <option :value="variation.id" v-for="(variation, index) in searchProductPrices" :key="index">{{ variation.name }}</option>
                                        </select>
                                        <span v-if="errors">
                                            <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label for="delivery Area">Quantity</label>
                                        <input type="number" class="form-control" v-model="quantity">
                                        <span v-if="errors">
                                            <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-2 d-flex justify-content-end align-items-end mb-3">
                                    <button class="btn btn-info" @click.prevent="addToCart(searchProductInfo)"><i class="fas fa-spinner fa-spin" v-if="cart.loading2"></i><i class="fas fa-plus" v-else></i> Add</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table table-bordered text-center">
                                        <thead class="bg-info">
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Variation</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Unit Price</th>
                                                <th scope="col">Offer Price</th>
                                                <th scope="col">Total Price</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in cartItems" :key="index">
                                                <th><img :src="item.image" width="30" alt=""></th>
                                                <td>{{ item.name }}</td>
                                                <td>
                                                    <select class="form-control" v-if="item.product_prices?.length > 0" v-model="item.weight_id" @change="updateWeight(item.item_id, item.weight_id, index)">
                                                        <option value="">Select Variation</option>
                                                        <option :selected="item.weight_id==weight.id" :value="weight.id" v-for="(weight, index2) in item.product_prices" :key="index2">{{ weight.name }}</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="number" class="form-control" v-model="item.quantity" style="width:100px;">
                                                </td>
                                                <td>{{ item.mrp }} tk.</td>
                                                <td>{{ item.offer_price }} tk.</td>
                                                <td>{{ item.quantity*item.offer_price }} tk.</td>
                                                <td >
                                                    <i class="fas fa-spinner fa-spin text-danger" v-if="deleteLoading==index"></i>
                                                    <i class="fas fa-trash text-danger" @click.prevent="deleteItem(index)" style="cursor:pointer;" v-else></i>
                                                </td>
                                            </tr>
                                            <tr v-if="errors?.items">
                                                <td colspan="8"><span v-for="(error, index) in errors.items" :key="index" class="text-danger">{{error}}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 ml-auto">
                                    <div class="card">
                                        <div class="card-body" style="padding:0;">
                                            <ul style="padding:0;margin:0;">
                                                <li class="d-flex justify-content-between bg-info" style="padding: 3px 10px;border-bottom:2px solid #fff;">
                                                    <div>Regular Price </div>
                                                    <div>: {{ totalPrice.mrp_price }} tk</div>
                                                </li>
                                                <li class="d-flex justify-content-between bg-info" style="padding: 3px 10px;border-bottom:2px solid #fff;">
                                                    <div>Discount </div>
                                                    <div>: -{{ totalPrice.discount_price }} tk</div>
                                                </li>
                                                <li class="d-flex justify-content-between bg-info" style="padding: 3px 10px;border-bottom:2px solid #fff;">
                                                    <div>Buy Price </div>
                                                    <div>: {{ totalPrice.offer_price }} tk</div>
                                                </li>
                                                <li class="d-flex justify-content-between bg-info" style="padding: 3px 10px;border-bottom:2px solid #fff;">
                                                    <div>Advanced Payment</div>
                                                    <div>: <input type="number" style="width:100px;border:none;border-radius:3px; outline:none;padding:2px 5px;" v-model="advancePayment"></div>
                                                </li>
                                                <li class="d-flex justify-content-between bg-info" style="padding: 3px 10px;border-bottom:2px solid #fff;">
                                                    <div>Delivery Charge </div>
                                                    <div>: <input type="number" style="width:100px;border:none;border-radius:3px; outline:none;padding:2px 5px;" v-model="changeableChargeValue"></div>
                                                </li>
                                                <li class="d-flex justify-content-between bg-info" style="padding: 3px 10px;border-bottom:2px solid #fff;">
                                                    <div>Spacial Discount </div>
                                                    <div>: <input type="number" style="width:100px;border:none;border-radius:3px; outline:none;padding:2px 5px;" v-model="spacialDiscount"></div>
                                                </li>
                                                <li class="d-flex justify-content-between bg-secondary" style="padding: 3px 10px;">
                                                    <div>Payable Price</div>
                                                    <div>: {{ parseFloat(totalPrice.offer_price) + parseFloat(changeableChargeValue)-parseFloat(spacialDiscount? spacialDiscount : 0)-parseFloat(advancePayment? advancePayment : 0) }} tk</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-info" v-if="order.loading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
                                <button type="submit" class="btn btn-info" @click="submit" v-else> Add Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
        </div>
      </div>
      <!-- /.card -->
    </div>
  </div>
</template>

<style>
    .close-searchText{
        top: 40px;
    }
    .search-product-area{
        padding: 0;
    }
    .search-product-area ul{
        padding: 0;
    }
    .search-product-area ul li{
        padding: 5px 10px;
    }
</style>
