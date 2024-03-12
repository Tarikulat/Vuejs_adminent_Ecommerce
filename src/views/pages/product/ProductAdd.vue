<script setup>
import { useCategories, useSubCategories, useBrands, useWeight, useProduct, useNotification } from '@/stores'
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router         = useRouter();
const category       = useCategories();
const subCategory    = useSubCategories();
const notification   = useNotification();
const brand          = useBrands();
const weight         = useWeight();
const product        = useProduct();
const { brands }     = storeToRefs(brand);
const { weights}     = storeToRefs(weight);
const { categories } = storeToRefs(category);
const { subCategories, loading } = storeToRefs(subCategory);

const dynamicInputs         = ref([]);
const images                = ref([]);
const imagePreview          = ref([]);
const isDefault             = ref([]);
const weightId              = ref([]);
const variationBuyPrice     = ref([]);
const variationRegularPrice = ref([]);
const variationOfferPrice   = ref([]);
const errors                = ref([]);
const name                  = ref('');
const thumbnailPreview      = ref();
const thumbnail             = ref();
const categoryId            = ref('');
const subCategoryId         = ref('');
const brandId               = ref('');
const status                = ref('active');
const productType           = ref('');
const isFreeShipping        = ref('0');
const stock                 = ref('');
const sku                   = ref('');
const shortDescription      = ref('');
const description           = ref('');
const buyPrice              = ref('');
const regularPrice          = ref('');
const offerPrice            = ref('');
const metaTitle             = ref('');
const metaKeywords          = ref('');
const metaDescription       = ref('');
const videoUrl              = ref('');

const getSubCategories = (categoryId) =>{
    subCategory.getSubCategories(categoryId);
}

const addInputField = () =>{
    dynamicInputs.value.push('');
    buyPrice.value     = 0;
    regularPrice.value = 0;
    offerPrice.value   = 0;
}

const closeItemVariation = (index) =>{
    dynamicInputs.value.splice(index, 1)
    variationBuyPrice.value.splice(index, 1)
    variationRegularPrice.value.splice(index, 1)
    variationOfferPrice.value.splice(index, 1)
    weightId.value.splice(index, 1)
    isDefault.value.splice(index, 1)
}

const singleFileChange = (e) => {
  thumbnail.value = e.target.files[0];
  let reader  = new FileReader();
  reader.addEventListener("load", function(){
    thumbnailPreview.value = reader.result;
  }.bind(this), false);
  if(thumbnail.value){
    if(/\.(jpe?g|png|gif)$/i.test(thumbnail.value.name)){
      reader.readAsDataURL(thumbnail.value)
    }
  }
}

const handleFileChange = (e) => {
  const selectedImages = Array.from(e.target.files);

  images.value = [...images.value, ...selectedImages];

  for (const image of selectedImages) {
    let reader = new FileReader();
    reader.addEventListener("load", function () {
      imagePreview.value.push(reader.result);
    }, false);

    if (/\.(jpe?g|jpg|png|gif)$/i.test(image.name)) {
      reader.readAsDataURL(image);
    }
  }
};

const deleteImg = (index) => {
  images.value.splice(index, 1);
  imagePreview.value.splice(index, 1);
};

const editors = ref(['Short Description', 'Description'])

watch([()=> shortDescription.value, ()=> description.value,], ([newSD, newD])=>{
    initializeEditors(0, shortDescription.value);
    initializeEditors(1, description.value);
})

const initializeEditors = (index, value) => {
  $(`#summernote${index}`).summernote({
    callbacks: {
      onInit: () => {
        $(`#summernote${index}`).summernote('code', value);
      },
      onChange: (contents) => {
        if(index==0){
          shortDescription.value = contents;
        }else if(index==1){
          description.value = contents;
        }
      },
    },
  });
};


const submit = async() => {
  const formData = new FormData();
    formData.append('name', name.value)
    formData.append('brand_id', brandId.value)
    formData.append('category_id', categoryId.value)
    formData.append('sub_category_id', subCategoryId.value)
    formData.append('current_stock', stock.value)
    formData.append('free_shipping', isFreeShipping.value)
    formData.append('status', status.value)
    formData.append('type', productType.value)
    formData.append('description', description.value)
    formData.append('short_description', shortDescription.value)
    formData.append('offer_price', offerPrice.value)
    formData.append('mrp', regularPrice.value)
    formData.append('buy_price', buyPrice.value)
    formData.append('meta_title', metaTitle.value)
    formData.append('meta_keywords', metaKeywords.value)
    formData.append('meta_description', metaDescription.value)
    formData.append('sku', sku.value)
    formData.append('image', thumbnail.value);
    formData.append('video_url', videoUrl.value);

    // Append all gallery images
    for (const image of images.value) {
      formData.append('gallery_images[]', image);
    }

    let d = 0;
    for (const de_fault of isDefault.value) {
      formData.append(`product_prices[${d}][is_default]`, de_fault=='1'?1:0);
      d++;
    }

    let s = 0;
    for (const weight of weightId.value) {
      formData.append(`product_prices[${s}][size_id]`, weight);
      s++;
    }
    
    let b = 0;
    for (const buyPrice of variationBuyPrice.value) {
      formData.append(`product_prices[${b}][buy_price]`, buyPrice);
      b++;
    }
    
    let m = 0;
    for (const mrp of variationRegularPrice.value) {
      formData.append(`product_prices[${m}][mrp]`, mrp);
      m++;
    }
    
    let o = 0;
    for (const offerPrice of variationOfferPrice.value) {
      formData.append(`product_prices[${o}][offer_price]`, offerPrice);
      o++;
    }

  const res = await product.insertProduct(formData);

  if(res.result){
    router.push({name:'product-list'})
    notification.Success(`${res.result?.name} Added Successfully`);
  }else{
    errors.value = res.data.message
  }
}

onMounted(() => {
    category.getCategories();
    brand.getBrands();
    weight.getWeights();
    initializeEditors(0, shortDescription.value);
    initializeEditors(1, description.value);
})
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'product-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
              <div class="col-md-6">
                <div class="card card-info">
                  <div class="card-header d-flex">
                    <h3 class="card-title">Product Information</h3>
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
                  <div class="card-body">
                    <div class="form-group">
                      <label for="inputName">Product Name</label>
                      <input type="text" id="inputName" class="form-control" placeholder="Enter Product English Name" v-model="name"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="category">Category</label>
                              <select id="category" class="form-control custom-select" v-model="categoryId" @change="getSubCategories(categoryId)">
                                  <option selected="" disabled="" value="">Select one</option>
                                  <option v-for="(category, index) in categories.data" :key="index" :value="category.id">{{ category.name }}</option>
                              </select>
                              <span v-if="errors">
                                <span v-for="(error, index) in errors.category_id" :key="index" class="text-danger">{{error}}</span>
                              </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <label for="sub-category">Sub-Category</label>
                            <select id="sub-category" class="form-control custom-select" v-model="subCategoryId" v-if="!loading">
                                <option selected="" disabled="" value="">Select one</option>
                                <option v-for="(subCategory, index) in subCategories.data" :key="index" :value="subCategory.id">{{ subCategory.name }}</option>
                            </select>
                            <span class="d-block loading-section" v-else>
                                <i class="fas fa-spinner fa-spin"></i> Loading....
                            </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <label for="brand">Brand</label>
                            <select id="brand" class="form-control custom-select" v-model="brandId">
                                <option selected="" disabled="">Select one</option>
                                <option v-for="(brand, index) in brands.data" :key="index" :value="brand.id">{{ brand.name }}</option>
                            </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="status">Status</label>
                              <select id="status" class="form-control custom-select" v-model="status">
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                              </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <label for="product-type">Product Type</label>
                            <select id="product-type" class="form-control custom-select" v-model="productType">
                                <option selected="" disabled="" value="">Select one</option>
                                <option value="top-product">Top Product</option>
                                <option value="feature-product">Fetured Product</option>
                                <option value="recent-product">New Product</option>
                            </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                            <label for="is-free">Is Free Shipping</label>
                            <select id="is-free" class="form-control custom-select" v-model="isFreeShipping">
                                <option selected="" disabled="">Select one</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="stock">Stock</label>
                              <input type="number" id="stock" class="form-control" placeholder="Enter Stock Quantity" v-model="stock">
                              <span v-if="errors">
                                <span v-for="(error, index) in errors.current_stock" :key="index" class="text-danger">{{error}}</span>
                              </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                              <label for="sku">Product SKU</label>
                              <input type="text" id="sku" class="form-control" placeholder="Enter SKU Number" v-model="sku">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                              <label for="video_url">Video Url</label>
                              <input type="text" id="video_url" class="form-control" placeholder="Enter Video Url" v-model="videoUrl">
                            </div>
                        </div>
                    </div>

                    <!-- Short Description(English) -->
                    <div class="form-group" v-for="(editor, index) in editors" :key="index">
                        <label for="inputDescription">{{ editor }}</label>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card-body" style="padding:0;">
                                    <textarea :id="'summernote' + index" placeholder="Enter description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                      <label for="inputDescription">Thumbnail</label>
                      <div class="row">
                        <div class="col-md-12">
                            <input class="form-control form-choose" type="file" id="formFileMultiple" multiple @change="singleFileChange"/>
                            <span v-if="errors">
                              <span v-for="(error, index) in errors.image" :key="index" class="text-danger d-block">{{error}}</span>
                            </span>
                            <span class="img-remove-btn" style="position:relative" v-if="thumbnailPreview">
                              <img width="100" class="gallery_img" :src="thumbnailPreview" alt="">
                            </span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputDescription">Gallery Images</label>
                        <div class="row">
                            <div class="col-md-12">
                                <input class="form-control form-choose" type="file" id="formFileMultiple" multiple @change="handleFileChange"/>
                                <span v-if="errors">
                                  <span v-for="(error, index) in errors.image" :key="index" class="text-danger d-block">{{error}}</span>
                                </span>
                                <span class="img-remove-btn" style="position:relative" v-for="(image, index) in imagePreview" :key="index">
                                    <img width="100" class="gallery_img" :src="image" alt="">
                                    <span class="close-btn bg-danger text-light" @click="deleteImg(index)"><i class="fas fa-times"></i></span>
                                </span>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-info">
                  <div class="card-header d-flex">
                    <h3 class="card-title">Product Price and Variations</h3>
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
                        <div class="col-md-12 d-flex justify-content-end">
                            <button class="btn btn-info btn-sm" @click="addInputField"><i class="fas fa-plus"></i> Add Variation</button>
                        </div>
                        <div class="col-md-12 mt-2">
                            <template v-if="dynamicInputs.length > 0">
                                <div class="card card-outline card-info" style="padding: 10px;" v-for="(input, index) in dynamicInputs" :key="index">
                                    <div class="price-header d-flex justify-content-between mb-2" style="padding:0 width:100%; border-bottom:1px solid rgb(204, 204, 204);">
                                        <div class="text-success">Variation-{{ index+1 }} form</div>
                                        <div style="cursor:pointer;" @click="closeItemVariation(index)"><i class="fas fa-times text-danger"></i></div>
                                    </div>
                                    <div class=" row cart-body">
                                        <div class="form-group col-md-4">
                                            <label for="isDefault">Is Default</label>
                                            <select name="" id="isDefault" class="form-control" v-model="isDefault[index]">
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="weight">Weight</label>
                                            <select name="" id="weight" class="form-control" v-model="weightId[index]">
                                                <option v-for="(weight, index1) in weights" :key="index1" :value="weight.id">{{ weight.name }}</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="buy_price">Buy Price</label>
                                            <input type="number" id="buy_price" class="form-control" placeholder="Enter Buy Price" v-model="variationBuyPrice[index]"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="regular_price">Regular Price</label>
                                            <input type="number" id="regular_price" class="form-control" placeholder="Enter Regular Price" v-model="variationRegularPrice[index]"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="offer_price">Offer Price</label>
                                            <input type="number" id="offer_price" class="form-control" placeholder="Enter offer Price" v-model="variationOfferPrice[index]"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="card card-outline card-info" style="padding: 10px;">
                                    <div class="card-header" style="padding:0;margin-bottom:10px;">Without Variation</div>
                                    <div class=" row cart-body">
                                        <div class="form-group col-md-4">

                                            <label for="buyPrice">Buy Price</label>
                                            <input type="number" id="buyPrice" class="form-control" placeholder="Enter Buy Price" v-model="buyPrice"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="regularPrice">Regular Price</label>
                                            <input type="number" id="regularPrice" class="form-control" placeholder="Enter Regular Price" v-model="regularPrice"/>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="offerPrice">Offer Price</label>
                                            <input type="number" id="offerPrice" class="form-control" placeholder="Enter offer Price" v-model="offerPrice"/>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="card card-secondary">
                  <div class="card-header d-flex">
                    <h3 class="card-title">Seo Information</h3>
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
                  <div class="card-body">
                    <div class="form-group">
                      <label for="meta_title">Meta Title</label>
                      <input type="text" id="meta_title" class="form-control" placeholder="Enter Meta Title" v-model="metaTitle"/>
                    </div>
                    <div class="form-group">
                      <label for="meta_keywords">Meta Keywords</label>
                      <input type="text" id="meta_keywords" class="form-control" placeholder="Enter Meta Keywords" v-model="metaKeywords"/>
                    </div>
                    <div class="form-group">
                      <label for="meta_description">Meta Description</label>
                      <textarea class="form-control" id="meta_description" placeholder="Enter Meta Description" v-model="metaDescription"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="modal-footer justify-content-end">
            <button type="button" class="btn btn-info" v-if="product.addLoading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else>Add Product</button>
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
