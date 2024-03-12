<script setup>
import { useCourier } from '@/stores'
import { useRoute } from 'vue-router';

const route   = useRoute();
const courier = useCourier();

</script>

<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <router-link :to="{name:'pathao', params : {id : route.params.id}}" class="btn btn-info mr-2"><i class="fas fa-arrow-left"></i> Back</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Store Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter Store Name">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Contact Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter Contact Name">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Contact Number <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter Contact Number">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Secondary Contact (Optional)</label>
                                <input type="text" class="form-control" placeholder="Enter Secondary Contact (Optional)">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">City <span class="text-danger">*</span></label>
                                <select  id="" class="form-control">
                                    <option value="">Select One</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Zone <span class="text-danger">*</span></label>
                                <select  id="" class="form-control">
                                    <option value="">Select One</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Area <span class="text-danger">*</span></label>
                                <select  id="" class="form-control">
                                    <option value="">Select One</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-data mb-4">
                                <label for="recipient_number">Address <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter Address">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-danger" v-if="courier.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                    <button class="btn btn-info" @click.prevent="submit" >Create Store</button>
                </div>
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>

</style>