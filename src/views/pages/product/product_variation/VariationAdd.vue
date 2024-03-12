<script setup>
import { useNotification, useVariations } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router        = useRouter();
const notification  = useNotification();
const variation     = useVariations();
const errors        = ref({});
const variationName = ref('');
const status        = ref('active');

const submit = async() =>{
  const res = await variation.insertVariation({
    name  : variationName.value,
    status: status.value,
  });
  if(res.success){
    router.push({name:'variations-list'})
    notification.Success(`Variation Added Successfully`);
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
              <router-link :to="{ name: 'variations-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="name">Variation Name</label>
                      <input type="text" id="name" class="form-control" placeholder="Enter Variation Name" v-model="variationName">
                      <span v-if="errors">
                        <span v-for="(error, index) in errors?.name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                      <label for="status">Variation Status</label>
                      <select id="status" class="form-control" v-model="status">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.description" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
            </div>
          </section>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-end">
                <button class="btn btn-info" v-if="variation.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                <button class="btn btn-info" @click.prevent="submit" v-else>Add</button>
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
