<script setup>
import { useNotification, useUser, useAclManagement } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router        = useRouter();
const images        = ref([]);
const imagePreview  = ref([]);
const errors        = ref({});
const userName      = ref('');
const email         = ref('');
const phone         = ref('');
const password      = ref('');
const roleId        = ref();
const status        = ref(1);
const user          = useUser();
const aclManagement = useAclManagement();
const notification  = useNotification();

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
  formData.append('name', userName.value)
  formData.append('is_active', status.value)
  if(roleId.value){
    formData.append('role_ids[0]', roleId.value)
  }
  formData.append('email', email.value)
  formData.append('phone_number', phone.value)
  formData.append('password', password.value)
  formData.append('image', images.value[0])

  const res = await user.insertUser(formData);
  if(res.result){
    router.push({name:'users-list'})
    notification.Success(`${res.result?.name} Added Successfully`);
  }else{
    errors.value = res.message
  }
}

onMounted(() => {
  aclManagement.getRoles(1, 100);
})
</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'users-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="inputName">User Name</label>
                      <input type="text" id="inputName" class="form-control" placeholder="Enter User Name" v-model="userName"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="inputPhone">Phone Number</label>
                      <input type="text" id="inputPhone" class="form-control" placeholder="Enter Phone Number" v-model="phone"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.phone_number" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="inputEmail">User Email</label>
                      <input type="email" id="inputEmail" class="form-control" placeholder="Enter Email" v-model="email"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.email" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="status">User Roles</label>
                        <select id="status" class="form-control custom-select" v-model="roleId">
                            <option value="">Select One</option>
                            <option v-for="(role, index) in aclManagement.roles?.data" :key="index" :value="role.id">{{ role.name }}</option>
                        </select>
                        <span v-if="errors">
                          <span v-for="(error, index) in errors.role_ids" :key="index" class="text-danger">{{error}}</span>
                        </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" class="form-control custom-select" v-model="status">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        <span v-if="errors">
                          <span v-for="(error, index) in errors.status" :key="index" class="text-danger">{{error}}</span>
                        </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="text" id="password" class="form-control" placeholder="Set Password" v-model="password"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.password" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
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
            <button type="button" class="btn btn-info" v-if="user.addLoading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else>Add User</button>
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
