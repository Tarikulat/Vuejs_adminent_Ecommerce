<script setup>
import { useNotification, useSocialContact } from '@/stores';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { ProductListTableSkeleton } from '@/components'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router        = useRouter();
const notification  = useNotification();
const socialContact = useSocialContact();
const searchQuery   = ref('');
const paginateSize  = ref(20);
const contactData   = ref('');

const getSocialContacts = async(page=1) =>{
    const res = await socialContact.getSocialContacts(page, paginateSize.value, searchQuery.value);
    if(res?.success){
        contactData.value = res.result;
    }
}

const searchData = () =>{
    getSocialContacts();
}

const paginateSizeWiseData = () =>{
    getSocialContacts();
}

onMounted(() => {
    getSocialContacts();
})
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="card-title d-flex">
                        <input type="text" placeholder="Enter Your Search Key...." class="form-control mb-2 mr-2" v-model="searchQuery" @input="searchData">
                        <select name="" class="form-control paginate" id="" v-model="paginateSize" @change="paginateSizeWiseData">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="card-tools">
                        <div class="mb-4 d-flex justify-content-end">
                            <router-link :to="{name:'social-contact-add'}" class="btn btn-info">
                                <i class="fas fa-plus mr-2"></i>Add
                            </router-link>
                            <router-link :to="{ name: 'dashboard' }" class="btn btn-info ml-2"><i class="fas fa-arrow-left mr-2"></i>Back</router-link>
                        </div>
                        <ul class="pagination pagination-sm float-right">
                            <Bootstrap5Pagination
                                :data="contactData"
                                @pagination-change-page="getSocialContacts"
                                :limit="3"
                            >
                                <template #prev-nav>
                                    <a class="Previous" href="#">Previous</a>
                                </template>
                                <template #next-nav>
                                    <a class="Next" href="#">Next</a>
                                </template>
                            </Bootstrap5Pagination>
                        </ul>
                    </div>
                </div>
                <!-- ./card-header -->
                <div class="card-body">
                    <table class="table table-bordered table-hover text-center">
                        <thead>
                            <tr class="bg-info">
                                <th>SL</th>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Contact Info</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="socialContact.loading">
                            <ProductListTableSkeleton :dataAmount="15" :columnAmount="6"/>
                        </tbody>
                        <tbody>
                            <tr v-for="(contact, index) in contactData.data" :key="index">
                                <th>{{index+1}}</th>
                                <td>
                                    <i class="fab fa-facebook" v-if="contact.type == 'Facebook'" style="font-size:20px; color:#0863F7;"></i>
                                    <i class="fab fa-whatsapp" v-if="contact.type == 'Whatsapp'" style="font-size:20px; color:#43BF51;"></i>
                                    <i class="fas fa-phone" v-if="contact.type == 'Phone'" style="font-size:20px; color:#0B8F42;"></i>
                                    <i class="fab fa-facebook-messenger" v-if="contact.type == 'Messenger'" style="font-size:20px; color:#8E39F7;"></i>
                                    <i class="fab fa-twitter" v-if="contact.type == 'Twitter'" style="font-size:20px; color:#1C96E9;"></i>
                                    <i class="fab fa-youtube" v-if="contact.type == 'Youtube'" style="font-size:20px; color:#F60002;"></i>
                                    <i class="fab fa-linkedin-in" v-if="contact.type == 'Linkedin'" style="font-size:20px; color:#0C61BF;"></i>
                                    <i class="fas fa-envelope" v-if="contact.type == 'Email'" style="font-size:20px; color:#CE493B;"></i>
                                </td>
                                <td>{{ contact.title }}</td>
                                <td>{{ contact.contact }}</td>
                                <td>
                                    <span :class="{'active-status' : contact.status == 'active', 'inactive-status': contact.status == 'inactive' }"> {{ contact.status=='active'? 'Active' : 'Inactive' }}</span>
                                </td>
                                <td>
                                    <router-link :to="{name:'social-contact-edit', params: { id: contact.id } }" class="btn btn-info btn-sm mr-2"><i class="fas fa-edit"></i></router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- /.row -->
</template>
<style>
.active-status{
    background-color: rgba(8, 197, 8, 0.336) ;
    padding: 5px 10px;
    color: green;
    border-radius: 6px;
}
.inactive-status{
    background-color: rgba(255, 0, 0, 0.212) ;
    padding: 5px 10px;
    color: red;
    border-radius: 6px;
}

</style>