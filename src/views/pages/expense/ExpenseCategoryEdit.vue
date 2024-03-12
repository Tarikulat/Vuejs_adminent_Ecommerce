<script setup>
import { useNotification, useExpense } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route        = useRoute();
const router       = useRouter();
const notification = useNotification();
const expense      = useExpense();
const errors       = ref({});
const categoryName = ref('');

const getSingleExpenseCategory = async() =>{
  const res = await expense.getSingleExpenseCategory(route.params.id);
  if(res.success){
    categoryName.value = res.result?.name;
  }
}

const submit = async() =>{

  const res = await expense.updateCategory(route.params.id, {name: categoryName.value});
  if(res.success){
    router.push({name:'expense-categories-list'})
    notification.Success(`Expense Category Updated Successfully`);
  }else{
    errors.value = res.message;
  }
}

onMounted(() => {
  getSingleExpenseCategory();
})
</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'expense-categories-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                      <label for="inputName">Category Name</label>
                      <input type="text" id="inputName" class="form-control" placeholder="Enter Product English Name" v-model="categoryName"/>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.name" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
            </div>
          </section>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-end">
                <button class="btn btn-info" v-if="expense.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                <button class="btn btn-info" @click.prevent="submit" v-else>Update</button>
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
