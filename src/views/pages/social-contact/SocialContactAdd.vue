<script setup>
import { useNotification, useSocialContact } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router        = useRouter();
const notifications = useNotification();
const socialContact = useSocialContact();

const errors       = ref([]);
const title        = ref('');
const contact      = ref('');
const type         = ref('Facebook');
const status       = ref('active');
const contactText  = ref('Facebook Username');

const contactType = () =>{
    if(type.value == 'Facebook'){
        contactText.value = 'Facebook Profile Username'
    }
    if(type.value == 'Whatsapp'){
        contactText.value = 'WhatsApp Number'
    }
    if(type.value == 'Phone'){
        contactText.value = 'Phone Number'
    }
    if(type.value == 'Messenger'){
        contactText.value = 'Facebook Username'
    }
    if(type.value == 'Twitter'){
        contactText.value = 'Twitter Profile Username'
    }
    if(type.value == 'Youtube'){
        contactText.value = 'Youtube Profile Username'
    }
    if(type.value == 'Linkedin'){
        contactText.value = 'Linkedin Profile Username'
    }
    if(type.value == 'Email'){
        contactText.value = 'Your Email'
    }
}

const submit = async() =>{

    const res = await socialContact.insert({
        title  : title.value,
        status : status.value,
        contact: contact.value,
        type   : type.value,
    });
    if(res.success){
        router.push({name:'social-contact-list'});
        notifications.Success("Social Link Added Successfully");
    }else{
        errors.value = res.errors;
    }
}
</script>
<template>
    <!-- /.row -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header d-flex justify-content-end">
                    <router-link :to="{name: 'social-contact-list'}" class="btn btn-info"><i class="fas fa-arrow-left"></i> Back</router-link>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">

                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="title">Title</label>
                                                <input type="text" id="title" class="form-control" placeholder="Enter Title" v-model="title">   
                                            </div>
                                        </div>
                                        <div class="col-md-4">  
                                            <div class="form-group">
                                                <label for="type">Type</label>
                                                <select name="" id="type" class="form-control" v-model="type" @change="contactType">
                                                    <option value="">Select One</option>
                                                    <option value="Facebook">Facebook</option>
                                                    <option value="Whatsapp">WhatsApp</option>
                                                    <option value="Phone">Phone</option>
                                                    <option value="Messenger">Messenger</option>
                                                    <option value="Twitter">Twitter</option>
                                                    <option value="Youtube">Youtube</option>
                                                    <option value="Linkedin">Linkedin</option>
                                                    <option value="Email">Email</option>
                                                </select> 
                                            </div>
                                        </div>
                                        <div class="col-md-4">  
                                            <div class="form-group">
                                                <label for="status">Status</label>
                                                <select name="" id="status" class="form-control" v-model="status">
                                                    <option value="">Select One</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select> 
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="title">{{ contactText }}</label>
                                                <input type="text" id="title" class="form-control" :placeholder="'Enter '+ contactText +''" v-model="contact">   
                                                <span v-if="errors">
                                                    <span v-for="(error, index) in errors.contact" :key="index" class="text-danger">{{ error }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button class="btn btn-info" v-if="socialContact.loading"><i class="fas fa-spinner fa-spin"></i> Loading....</button>
                    <button class="btn btn-info" @click.prevent="submit" v-else>Create</button>
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