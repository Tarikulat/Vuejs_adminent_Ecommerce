<script setup>
import { useProduct, useCampaign, useNotification } from '@/stores'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router           = useRouter();
const searchName       = ref('');
const products         = ref({});
const campaignProducts = ref([]);
const campaignTitle    = ref('');
const campaignStartDate= ref();
const campaignEndDate  = ref();
const campaignValue    = ref([]);
const valueType        = ref([]);
const campaignStatus   = ref('inactive');
const errors           = ref();
const product          = useProduct();
const campaign         = useCampaign();
const notification     = useNotification();

const searchProduct = async() =>{
    let res = await product.getProducts(1, 10, searchName.value);
    if(res.data){
      products.value = res.data;
    }
}

const addProduct = (product) =>{
  campaignProducts.value.push(product);
  searchName.value = '';
}

const removeItem = (index) =>{
  campaignProducts.value.splice(index, 1);
  campaignValue.value.splice(index, 1);
  valueType.value.splice(index, 1);    
}

const clearSearch = () =>{
  searchName.value = '';
}

const submit = async() =>{

  const itemsWithValues = campaignProducts.value.map((product, index) => ({
    product_id: product.id,
    discount  : campaignValue.value[index] || null,
    type      : valueType.value[index] || null,
  }));


  const res = await campaign.insertCampaign({
    title     : campaignTitle.value,
    start_date: campaignStartDate.value,
    end_date  : campaignEndDate.value,
    status    : campaignStatus.value,
    items     : itemsWithValues,
  });

  if(res.status == 200){
    router.push({name:'campaigns'});
    notification.Success('Campaign Created SuccessFully');
  }else{
    errors.value = res.message;
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
              <router-link :to="{ name: 'campaigns' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
              <div class="col-md-8">
                <div class="card card-info">
                  <div class="card-header d-flex justify-content-between">
                    <h3 class="card-title">Add Product in Campaign</h3>
                    <div class="card-tools">
                      <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse" >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>
                  <div class="card-body row">
                    <div class="form-group col-md-12">
                      <label for="inputName">Add a new product</label>
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
                        <div class="col-md-4" v-for="(product, index) in campaignProducts" :key="index">
                          <div class="card card-light">
                            <div class="card-header d-flex justify-content-between">
                                <div class="card-title"><img :src="product.image" width="40" alt=""> {{ product.name }}</div>
                                <button class="btn btn-danger btn-sm" @click="removeItem(index)"><i class="fas fa-trash"></i></button>
                            </div>
                            <div class="card-body row">
                                <div class="form-group col-md-7">
                                  <label for="value">Discount Value</label>
                                  <div class="">
                                      <input type="number" id="value" class="form-control mr-2" placeholder="Enter Value" v-model="campaignValue[index]" required/>
                                  </div>
                                </div>
                                <div class="form-group col-md-5">
                                  <label for="value-type">Type</label>
                                  <div class="d-flex justify-content-between">
                                      <select name="" class="form-control" id="value-type" v-model="valueType[index]" required>
                                          <option value="">Select One</option>
                                          <option value="percentage">Percent %</option>
                                          <option value="fixed">Fixed</option>
                                      </select>
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
              </div>
              <div class="col-md-4">
                <div class="card card-info">
                  <div class="card-header d-flex">
                    <h3 class="card-title">Campaign Information</h3>
                    <div class="card-tools">
                      <button
                        type="button"
                        class="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                    </div>
                  </div>
                    <div class="card-body row">
                        <div class="form-group col-md-12">
                            <label for="campaignName">Campaign Title</label>
                            <input type="text" id="campaignName" class="form-control" placeholder="Write you campaign name" v-model="campaignTitle"/>
                            <span v-if="errors">
                              <span v-for="(error, index) in errors.title" :key="index" class="text-danger">{{ error }}</span>
                            </span>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="startDate">Campaign Start Date</label>
                            <input type="datetime-local" id="startDate" class="form-control" placeholder="Enter Date" v-model="campaignStartDate"/>
                            <span v-if="errors">
                              <span v-for="(error, index) in errors.start_date" :key="index" class="text-danger">{{ error }}</span>
                            </span>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="startDate">Campaign End Date</label>
                            <input type="datetime-local" id="startDate" class="form-control" placeholder="Enter Date" v-model="campaignEndDate"/>
                            <span v-if="errors">
                              <span v-for="(error, index) in errors.end_date" :key="index" class="text-danger">{{ error }}</span>
                            </span>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="status">Status</label>
                            <select name="" id="status" class="form-control" v-model="campaignStatus">
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </section>
          <div class="modal-footer justify-content-end">
            <button type="button" class="btn btn-info" v-if="campaign.loading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else>Add Campaign</button>
          </div>
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
