<script setup>
import {useAuth, useNotification} from '@/stores'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const auth               = useAuth();
const router             = useRouter();
const route              = useRoute();
const notifications      = useNotification();
const authPermission     = ref([]);

const authenticateUserPermission = async() =>{
    const res = await auth.authenticateUserPermission();
    authPermission.value = res;
}

onMounted(() => {
    authenticateUserPermission();
})

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
        <div class="sidebarClose" data-widget="pushmenu"></div>
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <router-link :to="{name:'dashboard'}" class="brand-link text-center bg-info">
                <span class="brand-text text-light" style="font-weight: 900; text-transform:uppercase;">Max Fit Food</span>
            </router-link>

            <!-- Sidebar -->
            <div class="sidebar">

            <!-- Sidebar Menu -->
            <nav class="mt-2" style="overflow:auto;">
                <ul class="nav nav-pills nav-sidebar flex-column mt-4" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'dashboards-read')">
                        <router-link :to="{ name: 'dashboard' }" class="nav-link" :class="{'active': route.name == 'dashboard'}">
                            <i class="nav-icon fas fa-chart-bar"></i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>
                    <li class="nav-item" :class="{'menu-open' : route.name == 'users-list' || route.name == 'user-add' || route.name == 'user-edit' || route.name == 'roles-list' || route.name == 'role-add' || route.name == 'role-edit'}" v-if="authPermission.some(permission => permission?.name === 'users-read' || permission?.name === 'roles-read')">
                        <a href="javascript::void(0)" class="nav-link">
                            <i class="nav-icon fas fa-user"></i>
                            <p>
                                ACL Management
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" :class="{'active' : route.name == 'users-list' || route.name == 'user-add' || route.name == 'user-edit' || route.name == 'roles-list' || route.name == 'role-add' || route.name == 'role-edit'}">
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'users-read')">
                                <router-link :to="{name: 'users-list'}" class="nav-link" :class="{ 'active' : route.name == 'users-list' || route.name == 'user-add' || route.name == 'user-edit' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Users</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'roles-read')">
                                <router-link :to="{name: 'roles-list'}" class="nav-link" :class="{ 'active' : route.name == 'roles-list' || route.name == 'role-add' || route.name == 'role-edit' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Roles</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" :class="{'menu-open' : route.name == 'brand-list' ||
                         route.name == 'categories-list' || route.name == 'sub-categories-list' ||
                         route.name == 'product-list' || route.name == 'variations-list' ||
                         route.name == 'variation-add' || 
                         route.name == 'variation-edit' 
                    }" v-if="authPermission.some(permission => permission?.name === 'brands-read' || permission?.name === 'categories-read' || permission?.name === 'sub_categories-read' || permission?.name === 'products-read' || permission?.name === 'sizes-read')">
                        <a href="javascript::void(0)" class="nav-link">
                            <i class="nav-icon fas fa-shopping-bag"></i>
                            <p>
                                Product Management
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" :class="{'active' : route.name == 'brand-list' || route.name == 'categories-list' || route.name == 'sub-categories-list' || route.name == 'product-list' }">
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'brands-read')">
                                <router-link :to="{name: 'brand-list'}" class="nav-link" :class="{ 'active' : route.name == 'brand-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Brands</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'categories-read')">
                                <router-link :to="{name: 'categories-list'}" class="nav-link" :class="{ 'active' : route.name == 'categories-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Categories</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'sizes-read')">
                                <router-link :to="{name: 'variations-list'}" class="nav-link" :class="{ 'active' : route.name == 'variations-list' || route.name == 'variation-add' || route.name == 'variation-edit'}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Variations</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'sub-categories-read')">
                                <router-link :to="{name: 'sub-categories-list'}" class="nav-link" :class="{ 'active' : route.name == 'sub-categories-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Sub-Categories</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'products-read')">
                                <router-link :to="{name: 'product-list'}" class="nav-link" :class="{ 'active' : route.name == 'product-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Products</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" :class="{'menu-open' : route.name == 'charge-list' ||
                            route.name == 'payment-gateway-list' ||
                            route.name == 'orders-list' ||
                            route.name == 'order-add' || 
                            route.name == 'order-edit' || 
                            route.name == 'order-reports' || 
                            route.name == 'order-assign' ||
                            route.name == 'my-complete-orders' ||
                            route.name == 'coupons-list' || 
                            route.name == 'coupon-add' ||
                            route.name == 'coupon-edit' ||
                            route.name == 'order-statuses-list'
                        }" v-if="authPermission.some(permission => permission?.name === 'delivery_gateways-read' || permission?.name === 'payment_gateways-read' || permission?.name === 'orders-read' || permission?.name === 'orders-team-list-read' || permission?.name === 'coupons-read')">
                        <a href="javascript::void(0)" class="nav-link">
                            <i class="nav-icon fab fa-jedi-order"></i>
                            <p>
                                Order Management
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" :class="{
                            'active' : route.name == 'charge-list' ||
                            route.name == 'payment-gateway-list' ||
                            route.name == 'orders-list' ||
                            route.name == 'order-add' || 
                            route.name == 'order-edit' || 
                            route.name == 'order-reports' || 
                            route.name == 'order-assign' ||
                            route.name == 'my-complete-orders' ||
                            route.name == 'coupons-list' || 
                            route.name == 'coupon-add' ||
                            route.name == 'coupon-edit' ||
                            route.name == 'order-statuses-list'
                        }">
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'delivery-gateways-read')">
                                <router-link :to="{name: 'charge-list'}" class="nav-link" :class="{ 'active' : route.name == 'charge-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Delivery Charge</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'payment-gateways-read')">
                                <router-link :to="{name: 'payment-gateway-list'}" class="nav-link" :class="{ 'active' : route.name == 'payment-gateway-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Payment Gateway</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'statuses-read')">
                                <router-link :to="{name: 'order-statuses-list'}" class="nav-link" :class="{ 'active' : route.name == 'order-statuses-list' || route.name == 'coupon-add' || route.name == 'coupon-edit'}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Order Statuses</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'coupons-read')">
                                <router-link :to="{name: 'coupons-list'}" class="nav-link" :class="{ 'active' : route.name == 'coupons-list' || route.name == 'coupon-add' || route.name == 'coupon-edit'}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Coupon</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'orders-read')">
                                <router-link :to="{name: 'orders-list'}" class="nav-link" :class="{ 'active' : route.name == 'orders-list' || route.name == 'order-add' || route.name == 'order-edit' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Orders</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'order-reports'}" class="nav-link" :class="{ 'active' : route.name == 'order-reports'}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Order Reports</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'orders-team-list-read')">
                                <router-link :to="{name: 'order-assign'}" class="nav-link" :class="{ 'active' : route.name == 'order-assign' || route.name == 'my-complete-orders'}">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Order Assign</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" :class="{'menu-open' : route.name == 'expense-categories-list' || route.name == 'expense-category-add' || route.name == 'expense-category-edit' || route.name == 'expense-list'}" v-if="authPermission.some(permission => permission?.name === 'expenses-read' || permission?.name === 'expense_categories-read')">
                        <a href="javascript::void(0)" class="nav-link">
                            <i class="nav-icon fas fa-snowflake"></i>
                            <p>
                                Expense Manage
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview" :class="{'active' : route.name == 'expense-categories-list' || route.name == 'expense-category-add' || route.name == 'expense-category-edit' || route.name == 'expense-list'}">
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'expense-categories-read')">
                                <router-link :to="{name: 'expense-categories-list'}" class="nav-link" :class="{ 'active' : route.name == 'expense-categories-list' || route.name == 'expense-category-add' || route.name == 'expense-category-edit' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Expense Categories</p>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'expenses-read')">
                                <router-link :to="{name: 'expense-list'}" class="nav-link" :class="{ 'active' : route.name == 'expense-list' }">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Expenses</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'campaigns'}" class="nav-link" :class="{ 'active' : route.name == 'campaigns' }">
                            <i class="fas fa-fire-alt nav-icon"></i>
                            <p>Campaigns</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'purchase-list'}" class="nav-link" :class="{ 'active' : route.name == 'purchase-list   ' }">
                            <i class="nav-icon fas fa-money-check-alt"></i>
                            <p>Purchases</p>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'social-medias-read')">
                        <router-link :to="{ name: 'social-contact-list' }" class="nav-link" :class="{'active': route.name == 'social-contact-list' }">
                            <i class="nav-icon fas fa-address-book"></i>
                            <p>Social Contacts</p>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'sliders-read')">
                        <router-link :to="{name: 'home-sliders'}" class="nav-link" :class="{ 'active' : route.name == 'home-sliders' || route.name == 'home-slider-add' }">
                            <i class="nav-icon far fa-images"></i>
                            <p>Home Sliders</p>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="authPermission.some(permission => permission?.name === 'brands-read')">
                        <router-link :to="{name: 'banners-list'}" class="nav-link" :class="{ 'active' : route.name == 'banners-list' || route.name == 'banner-add'}">
                            <i class="nav-icon far fa-images"></i>
                            <p>Offer Banner</p>
                        </router-link>
                    </li>
                    <li class="nav-item" style="cursor:pointer;">
                        <a class="nav-link" v-if="auth.logoutLoading">
                            <i class="fas fa-spinner fa-spin mr-2"></i>
                            <span>Loading....</span>
                        </a>
                        <a class="nav-link" @click="handleLogout" v-else>
                            <i class="fas fa-sign-out-alt nav-icon"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>
    </div>
</template>


<style scoped>

    .logout{
        background-color: rgba(255,255,255,.1);
    }
    .nav-link:hover{
        background-color: #fff !important;
        color: #000 !important;
    }
    .sidebar-dark-primary .nav-sidebar > .nav-item > .nav-link.active{
      background-color: #fff;
      color: #000;
    }
    .nav-treeview.active{
        display: block;
    }
    @media screen and (max-width: 992px) {
        .sidebar-open .sidebarClose{
            display: block;
            position: fixed;
            background: #00000026;
            width: 100%;
            height: 100%;
            z-index: 1;
            right: 0;
            top: 0;
        }
    }
</style>
