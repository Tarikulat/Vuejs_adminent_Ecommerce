<script setup>
import { useHomeSlider, useNotification } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route         = useRoute();
const router        = useRouter();
const slider        = useHomeSlider();
const notifications = useNotification();

const errors       = ref([]);
const image        = ref();
const imagePreview = ref();
const title        = ref('');
const status       = ref('active');

const getSingleSlider = async() =>{
    const res = await slider.getSingleSlider(route.params.id);
    if(res.success){
        imagePreview.value = res.result?.image;
        title.value        = res.result?.title;
        status.value       = res.result?.status;
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

    const formData = new FormData;
    formData.append('title', title.value);
    formData.append('status', status.value);
    if(image.value){
        formData.append('image', image.value);
    }
    formData.append('_method', 'put');
    const res = await slider.update(route.params.id, formData);
    if(res.success){
        router.push({name:'home-sliders'});
        notifications.Success("Slider Updated Successfully");
    }else{
        errors.value = res.errors;
    }
}

onMounted(() => {
  getSingleSlider();  
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <router-link :to="{name: 'home-sliders'}" class="btn btn-info"><i class="fas fa-arrow-left"></i> Back</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                
                                <div class="col-md-6">
                                    <div class="card" style="height:310px">
                                        <div class="card-body p-0 slider-image">
                                            <img :src="imagePreview" alt="">
                                        </div>
                                        <div class="card-footer d-flex justify-content-between">
                                            <div>
                                                <span v-if="errors">
                                                    <span v-for="(error, index) in errors.image" :key="index" class="text-danger">{{ error }}</span>
                                                </span>
                                            </div>
                                            <div style="position:relative;margin-left:auto;">
                                                <button class="btn btn-info"><i class="fas fa-cloud-upload-alt"></i> Upload</button>
                                                <input type="file" class="choose-file-btn" @change="handleFileChange">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="title">Home Slider Title</label>
                                        <input type="text" class="form-control" placeholder="Enter Title" v-model="title">   
                                    </div>
                                    <div class="form-group">
                                        <label for="title">Home Slider Status</label>
                                        <select name="" id="" class="form-control" v-model="status">
                                            <option value="">Select One</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-info" v-if="slider.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                    <button class="btn btn-info" @click.prevent="submit" v-else> Update</button>
                </div>
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>
.choose-file-btn{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
}
</style>