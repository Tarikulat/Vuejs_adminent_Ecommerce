<script setup>
import { useNotification, useExpense } from '@/stores';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route              = useRoute();
const router             = useRouter();
const notification       = useNotification();
const expense            = useExpense();
const errors             = ref({});
const categoryId         = ref('');
const expenseCategories  = ref();
const expenseAmount      = ref();
const expenseDate        = ref();
const expenseDescription = ref();

const getSingleExpense = async() =>{
  const res = await expense.getSingleExpense(route.params.id);
  if(res.success){
    categoryId.value         = res.result?.category_id;
    expenseAmount.value      = res.result?.amount;
    expenseDate.value        = res.result?.expense_date;
    expenseDescription.value = res.result?.description;
  }
}

const getExpenseCategories = async() =>{
  const res = await expense.getExpenseCategories();
  if(res.success){
      expenseCategories.value = res.result;
  }
}

const submit = async() =>{

  const res = await expense.updateExpense(route.params.id, {
    category_id : categoryId.value,
    amount      : expenseAmount.value,
    expense_date: expenseDate.value,
    description : expenseDescription.value
  });
  if(res.success){
    router.push({name:'expense-list'})
    notification.Success(`Expense Update Successfully`);
  }else{
    errors.value = res.message;
  }
}

onMounted(() => {
  getSingleExpense();
  getExpenseCategories();
})
</script>

<template>
    <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <div class="card-tools">
            <div class="mb-2 d-flex justify-content-end">
              <router-link :to="{ name: 'expense-list' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
            </div>
          </div>
        </div>
        <!-- ./card-header -->
        <div class="card-body">
          <section class="content">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="expenseCategory">Select Category</label>
                      <select id="expenseCategory" class="form-control" v-model="categoryId">
                        <option value="">Select One</option>
                        <option :value="category.id" v-for="(category, index) in expenseCategories?.data" :key="index">{{ category.name }}</option>
                      </select>
                      <span v-if="errors">
                        <span v-for="(error, index) in errors?.category_id" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="expenseAmount">Expense Amount</label>
                      <input type="number" id="expenseAmount" class="form-control" placeholder="Enter Expense Amount" v-model="expenseAmount">
                      <span v-if="errors">
                        <span v-for="(error, index) in errors?.amount" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                      <label for="expenseDate">Expense Date</label>
                      <input type="date" id="expenseDate" class="form-control" v-model="expenseDate">
                      <span v-if="errors">
                        <span v-for="(error, index) in errors.expense_date" :key="index" class="text-danger">{{error}}</span>
                      </span>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                      <label for="expenseDescription">Expense Description</label>
                      <textarea id="expenseDescription" cols="30" rows="2" placeholder="Enter Description" class="form-control" v-model="expenseDescription"></textarea>
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
