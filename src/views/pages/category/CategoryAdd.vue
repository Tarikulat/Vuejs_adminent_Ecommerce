<script setup>
import { useCategories, useNotification } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router       = useRouter();
const images       = ref([]);
const imagePreview = ref([]);
const errors       = ref({});
const categoryName = ref('');
const status       = ref('active');
const category     = useCategories();
const notification = useNotification();

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

const submit = async() =>{
  const formData = new FormData();
  formData.append('name', categoryName.value)
  formData.append('status', status.value)
  formData.append('image', images.value[0])

  const res = await category.insertBrand(formData);
  if(res.result){
    router.push({name:'categories-list'})
    notification.Success(`${res.result?.name} Added Successfully`);
  }else{
    errors.value = res.message
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
              <router-link :to="{ name: 'categories-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputName">Category Name</label>
                      <input type="text" id="inputName" class="form-control" placeholder="Enter Product English Name" v-model="categoryName"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-6">
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
                                <span class="img-remove-btn" style="position:relative" v-for="(image, index) in imagePreview" :key="index">
                                    <img width="100" class="gallery_img" :src="image" alt="">
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-info" v-if="category.addLoading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else>Add Brand</button>
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
