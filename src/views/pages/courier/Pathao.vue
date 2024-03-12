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
                    <router-link :to="{name: 'orders-list'}" class="btn btn-info mr-2"><i class="fas fa-arrow-left"></i> Back</router-link>
                    <router-link :to="{name: 'store-create', params : {id:route.params.id} }" class="btn btn-info"><i class="fas fa-plus"></i> Store</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="form-data mb-4">
                                        <label for="sender_name">Sender Name</label>
                                        <input type="text" id="sender_name" placeholder="Enter Sender Name" class="form-control" disabled>
                                    </div>
                                    <div class="form-data mb-4">
                                        <label for="sender_phone">Sender Phone</label>
                                        <input type="text" id="sender_phone" placeholder="Sender Phone Number" class="form-control">
                                    </div>
                                    <div class="form-data mb-4">
                                        <label for="recipient_name">Recipient Name</label>
                                        <input type="text" id="recipient_name" placeholder="Recipient Name" class="form-control">
                                    </div>
                                    <div class="form-data mb-4">
                                        <label for="recipient_number">Recipient Number</label>
                                        <input type="text" id="recipient_number" placeholder="Recipient Number" class="form-control">
                                    </div>
                                    <div class="form-data mb-4">
                                        <label for="recipient_address">Recipient Address</label>
                                        <input type="text" id="recipient_address" placeholder="Recipient Address" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Select Store <span class="text-danger">*</span></label>
                                                <select  id="" class="form-control">
                                                    <option value="">Select One</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Recipient City <span class="text-danger">*</span></label>
                                                <select  id="" class="form-control">
                                                    <option value="">Select One</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Recipient Zone <span class="text-danger">*</span></label>
                                                <select  id="" class="form-control">
                                                    <option value="">Select One</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Recipient Area <span class="text-danger">*</span></label>
                                                <select  id="" class="form-control">
                                                    <option value="">Select One</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Delivery Type <span class="text-danger">*</span></label>
                                                <select  id="" class="form-control">
                                                    <option value="">Select One</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Item Type <span class="text-danger">*</span></label>
                                                <select  id="" class="form-control">
                                                    <option value="">Select One</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Items Weight (0.5kg - 10kg) <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" placeholder="Weight ( min-0.5kg,  max-10kg )">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Collect Amount <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" placeholder="Enter Collected Amount">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Pathao Cost <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" placeholder="Pathao Cost">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Special Instruction (Optional) </label>
                                                <textarea id="" cols="30" rows="3" class="form-control" placeholder="Spacial Instruction"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Item Description (Optional) </label>
                                                <textarea id="" cols="30" rows="3" class="form-control" placeholder="Item Description"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-data mb-4">
                                                <label for="recipient_number">Item Quantity <span class="text-danger">*</span></label>
                                                <input type="text" class="form-control" placeholder="Enter Item Quantity">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-danger" v-if="courier.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                    <button class="btn btn-info" @click.prevent="submit" >Shipped to Pathao</button>
                </div>
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>

</style>