<script setup>
import { useNotification, useAclManagement } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router        = useRouter();
const permissionIds = ref([]);
const errors        = ref({});
const name          = ref('');
const displayName   = ref('');
const description   = ref('');
const checked       = ref(false);
const aclManagement = useAclManagement();
const notification  = useNotification();

const checkAllPermissions = () => {
  permissionIds.value = aclManagement.permissions.data.map(permission => permission.id);
  checked.value = true;
};

const uncheckAllPermissions = () => {
  permissionIds.value = [];
  checked.value = false;
};

const submit = async() =>{
  const res = await aclManagement.insertRole({
    display_name  : displayName.value,
    permission_ids: permissionIds.value,
    description   : description.value
  });
  if(res.result){
    router.push({name:'roles-list'})
    notification.Success(`A New Role Added Successfully`);
  }else{
    errors.value = res.message
  }
}

onMounted(() => {
  aclManagement.getPermissions();
})
</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'roles-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="displayName">Display Name</label>
                      <input type="text" id="displayName" class="form-control" placeholder="Enter Display Name" v-model="displayName"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.display_name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="description">Description</label>
                      <input type="text" id="description" class="form-control" placeholder="Enter Role Description" v-model="description"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.description" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                      <label for="permissions" class="d-block">Permissions</label>
                      <div>
                        <button class="btn btn-light btn-sm mb-4 mr-2" @click="checkAllPermissions"><input type="checkbox" v-model="checked"> Check All</button>
                        <button class="btn btn-light btn-sm mb-4" @click="uncheckAllPermissions"><input type="checkbox"> Uncheck All</button>
                      </div>
                      <div class="row">
                        <div class="col-md-2" v-for="(permission, index) in aclManagement.permissions?.data" :key="index">
                          <input type="checkbox" :id="'permissions'+ index" :value="permission.id" v-model="permissionIds"/> <label :for="'permissions'+ index" class="ml-2">{{ permission.name }}</label>
                        </div>
                      </div>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.permission_ids" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
            </div>
          </section>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-info" v-if="aclManagement.addLoading"><i class="fas fa-spinner fa-spin"></i> Loading...</button>
            <button type="button" class="btn btn-info" @click.prevent="submit" v-else>Add Role</button>
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
