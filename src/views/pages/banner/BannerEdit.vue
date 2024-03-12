<script setup>
import { useBanner, useNotification } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const notification = useNotification();
const status       = ref('active');
const banner       = useBanner();
const route        = useRoute();
const router       = useRouter();
const image        = ref();
const imagePreview = ref();
const errors       = ref({});
const title        = ref('');
const link         = ref('');
const type         = ref('');

const getSingleBannerData = async() =>{
  const res = await banner.getSingleBannerData(route.params.id);
  if(res.success){
    title.value  = res.result?.title;
    link.value   = res.result?.link;
    type.value   = res.result?.type;
    image.value  = res.result?.image;
    status.value = res.result?.status;
  }
}

const handleFileChange = (e) => {
  const selectedImage = e.target.files[0];

  image.value = selectedImage;

  let reader = new FileReader();
  reader.addEventListener("load", function () {
    imagePreview.value = [reader.result];
  }, false);

  if (/\.(jpe?g|jpg|png|gif)$/i.test(selectedImage.name)) {
    reader.readAsDataURL(selectedImage);
  }
};


const submit = async() =>{
  const formData = new FormData();
  formData.append('title', title.value)
  formData.append('type', type.value)
  formData.append('link', link.value)
  formData.append('status', status.value)
  formData.append('_method', 'put');
  if(imagePreview.value){
    formData.append('image', image.value)
  }

  const res = await banner.updateBanner(route.params.id, formData);
  if(res.result){
    router.push({name:'banners-list'})
    notification.Success(`Banner Updated Successfully`);
  }else{
    errors.value = res.message
  }
}

onMounted(() => {
    getSingleBannerData();
})

</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'banners-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="title">Title</label>
                      <input type="text" id="title" class="form-control" placeholder="Enter Banner Title" v-model="title"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.title" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="link">Banner Link</label>
                      <input type="text" id="link" class="form-control" placeholder="Enter Banner Link" v-model="link"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.link" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="type">Banner Type</label>
                        <select id="type" class="form-control custom-select" v-model="type">
                            <option value="">Select One</option>
                            <option value="first">First</option>
                            <option value="secound">Secound</option>
                            <option value="third">Third</option>
                        </select>
                        <span v-if="errors">
                          <span v-for="(error, index) in errors.type" :key="index" class="text-danger">{{error}}</span>
                        </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" class="form-control custom-select" v-model="status">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <span v-if="errors">
                          <span v-for="(error, index) in errors.status" :key="index" class="text-danger">{{error}}</span>
                        </span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputDescription">Images</label>
                        <div class="row">
                            <div class="col-md-12">
                                <input class="form-control form-choose" type="file" id="formFileMultiple" @change="handleFileChange"/>
                                <span v-if="errors">
                                  <span v-for="(error, index) in errors.image" :key="index" class="text-danger d-block">{{error}}</span>
                                </span>
                                <span class="img-remove-btn" style="position:relative" v-if="image">
                                    <img width="100" class="gallery_img" :src="imagePreview ? imagePreview : image" alt="">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-info" v-if="banner.loading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else>Update Banner</button>
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
