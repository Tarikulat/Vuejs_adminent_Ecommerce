<script setup>
import {useAuth, useNotification} from '@/stores'
import { useRouter } from 'vue-router';

const auth   = useAuth();
const router = useRouter();
const notifications = useNotification();

const handleLogout = async() =>{
    const res = await auth.logout();
    if(res.status){
        router.push({name:'login'})
        notifications.Success("Logout Successfully")
    }
}

</script>

<template>
    <div>
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="javascript::void(0)" class="nav-link text-info" style="font-size:20px;font-weight:700;line-height:1;">Welcome to Max Fit Food Admin panel</a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">            
                <li class="nav-item">
                    <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
                <!-- User Dropdown Menu Dropdown Menu -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-user-circle" style="font-size:26px;"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-item dropdown-header">
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" width="100" style="border-radius:50%;" alt="">
                            <h4>{{ auth.user?.name }}</h4>
                        </span>

                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-user mr-2"></i> My Profile
                        </a>

                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-key mr-2"></i> Change Password
                        </a>

                        <div class="dropdown-divider"></div>
                        <a href="javascript::void(0)" class="dropdown-item" v-if="auth.logoutLoading">
                            <i class="fas fa-spinner fa-spain mr-2"></i> Loading....
                        </a>
                        <a href="javascript::void(0)" class="dropdown-item" @click="handleLogout" v-else>
                            <i class="fas fa-sign-out-alt mr-2"></i> Logout
                        </a>

                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>


<style scoped>
</style>
