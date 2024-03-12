
import NProgress from 'nprogress'
import {createRouter, createWebHistory} from 'vue-router'
import { useAuth } from '@/stores'
import Index from '@/views/pages/Home.vue'
import Login from '@/views/pages/Login.vue'

import ProductList      from '@/views/pages/product/ProductList.vue'
import ProductAdd       from '@/views/pages/product/ProductAdd.vue'
import ProductEdit      from '@/views/pages/product/ProductEdit.vue'
import ProductHistories from '@/views/pages/product/ProductHistories.vue'

import Brands     from '@/views/pages/brand/Brands.vue'
import BrandAdd   from '@/views/pages/brand/BrandAdd.vue'
import BrandEdit  from '@/views/pages/brand/BrandEdit.vue'

import CategoriesList from '@/views/pages/category/Categories.vue'
import CategoryAdd    from '@/views/pages/category/CategoryAdd.vue'
import CategoryEdit   from '@/views/pages/category/CategoryEdit.vue'

import SbuCategoriesList  from '@/views/pages/sub-category/SubCategories.vue'
import SbuCategoryAdd     from '@/views/pages/sub-category/SubCategoryAdd.vue'
import SbuCategoryEdit    from '@/views/pages/sub-category/SubCategoryEdit.vue'

import UsersList  from '@/views/pages/acl-management/user/Users.vue'
import UserAdd    from '@/views/pages/acl-management/user/UserAdd.vue'
import UserEdit   from '@/views/pages/acl-management/user/UserEdit.vue'

import RolesList  from '@/views/pages/acl-management/role/Roles.vue'
import RoleAdd    from '@/views/pages/acl-management/role/RoleAdd.vue'
import RoleEdit   from '@/views/pages/acl-management/role/RoleEdit.vue'

import Campaigns    from '@/views/pages/campaign/Campaigns.vue'
import CampaignAdd  from '@/views/pages/campaign/CampaignAdd.vue'
import CampaignEdit from '@/views/pages/campaign/CampaignEdit.vue'

import DeliveryChargeList from '@/views/pages/order-management/delivery-charge/DeliveryChargeList.vue'
import DeliveryChargeAdd  from '@/views/pages/order-management/delivery-charge/DeliveryChargeAdd.vue'
import DeliveryChargeEdit from '@/views/pages/order-management/delivery-charge/DeliveryChargeEdit.vue'

import PaymentGatewayList from '@/views/pages/order-management/payment-gateway/PaymentGatewayList.vue'

import OrdersList     from '@/views/pages/order-management/order/OrderList.vue'
import OrderAdd       from '@/views/pages/order-management/order/OrderAdd.vue'
import OrderEdit      from '@/views/pages/order-management/order/OrderEdit.vue'
import OrderReports   from '@/views/pages/order-management/order/OrderReports.vue'
import OrderHistories from '@/views/pages/order-management/order/OrderHistories.vue'

import OrderAssign            from '@/views/pages/order-management/order/OrderAssign.vue'
import MyCompleteAssignOrders from '@/views/pages/order-management/order/myCompleteAssignOrder.vue'

import HomeSliders    from '@/views/pages/home-slider/HomeSliders.vue'
import HomeSliderAdd  from '@/views/pages/home-slider/HomeSliderAdd.vue'
import HomeSliderEdit from '@/views/pages/home-slider/HomeSliderEdit.vue'

import PosInvoice from '@/views/pages/invoice/PosInvoice.vue'
import Invoice    from '@/views/pages/invoice/Invoice.vue'

import SteadFast          from '@/views/pages/courier/Steadfast.vue'
import Pathao             from '@/views/pages/courier/Pathao.vue'
import PathaoStoreCreate  from '@/views/pages/courier/PathaoStoreCreate.vue'

import PurchaseList from '@/views/pages/purchase/Purchase.vue'
import PurchaseAdd  from '@/views/pages/purchase/PurchaseAdd.vue'

import ExpenseCategoriesList  from '@/views/pages/expense/ExpenseCategories.vue'
import ExpenseCategoryAdd     from '@/views/pages/expense/ExpenseCategoryAdd.vue'
import ExpenseCategoryEdit    from '@/views/pages/expense/ExpenseCategoryEdit.vue'

import ExpenseList  from '@/views/pages/expense/Expense.vue'
import ExpenseAdd   from '@/views/pages/expense/ExpenseAdd.vue'
import ExpenseEdit  from '@/views/pages/expense/ExpenseEdit.vue'

import CouponList from '@/views/pages/order-management/coupon/CouponList.vue'
import CouponAdd  from '@/views/pages/order-management/coupon/CouponAdd.vue'
import CouponEdit  from '@/views/pages/order-management/coupon/CouponEdit.vue'

import OrderStatusesList from '@/views/pages/order-management/order-statuses/OrderStatusesList.vue'

import Variations from '@/views/pages/product/product_variation/Variations.vue'
import VariationAdd from '@/views/pages/product/product_variation/VariationAdd.vue'
import VariationEdit from '@/views/pages/product/product_variation/VariationEdit.vue'

import BannerList from '@/views/pages/banner/Banner.vue'
import BannerAdd from '@/views/pages/banner/BannerAdd.vue'
import BannerEdit from '@/views/pages/banner/BannerEdit.vue'

import SocialContactList from '@/views/pages/social-contact/SocialContactList.vue'
import SocialContactAdd from '@/views/pages/social-contact/SocialContactAdd.vue'
import SocialContactEdit from '@/views/pages/social-contact/SocialContactEdit.vue'

const routes =[
    {
      path     : '/',
      name     : 'dashboard',
      component: Index,
      meta     : { title: 'Dashboard', requiresAuth : true }
    },
    {
      path     : '/login',
      name     : 'login',
      component: Login,
      meta     : { title: 'Login', guest : true }
    },
    {
      path     : '/product-list',
      name     : 'product-list',
      component: ProductList,
      meta     : { title: 'All Products', requiresAuth : true }
    },
    {
      path     : '/product-add',
      name     : 'product-add',
      component: ProductAdd,
      meta     : { title: 'Add a New Product', requiresAuth : true }
    },
    {
      path     : '/product-edit/:id',
      name     : 'product-edit',
      component: ProductEdit,
      meta     : { title: 'Edit Product', requiresAuth : true }
    },
    {
      path     : '/product-histories/:id',
      name     : 'product-histories',
      component: ProductHistories,
      meta     : { title: 'Product Histories', requiresAuth : true }
    },
    {
      path     : '/brands',
      name     : 'brand-list',
      component: Brands,
      meta     : { title: 'All Brands', requiresAuth : true }
    },
    {
      path     : '/brand-add',
      name     : 'brand-add',
      component: BrandAdd,
      meta     : { title: 'Add a New Brand', requiresAuth : true }
    },
    {
      path     : '/brand-edit/:id',
      name     : 'brand-edit',
      component: BrandEdit,
      meta     : { title: 'Edit Brand', requiresAuth : true }
    },
    {
      path     : '/categories',
      name     : 'categories-list',
      component: CategoriesList,
      meta     : { title: 'All Categories', requiresAuth : true }
    },
    {
      path     : '/category-add',
      name     : 'category-add',
      component: CategoryAdd,
      meta     : { title: 'Add a New Category', requiresAuth : true }
    },
    {
      path     : '/category-edit/:id',
      name     : 'category-edit',
      component: CategoryEdit,
      meta     : { title: 'Edit Category', requiresAuth : true }
    },
    {
      path     : '/sub-categories',
      name     : 'sub-categories-list',
      component: SbuCategoriesList,
      meta     : { title: 'All Sub-Categories', requiresAuth : true }
    },
    {
      path     : '/sub-category-add',
      name     : 'sub-category-add',
      component: SbuCategoryAdd,
      meta     : { title: 'Add a New Sub-Category', requiresAuth : true }
    },
    {
      path     : '/sub-category-edit/:id',
      name     : 'sub-category-edit',
      component: SbuCategoryEdit,
      meta     : { title: 'Edit Sub-Category', requiresAuth : true }
    },
    {
      path     : '/users-list',
      name     : 'users-list',
      component: UsersList,
      meta     : { title: 'All Users', requiresAuth : true }
    },
    {
      path     : '/user-add',
      name     : 'user-add',
      component: UserAdd,
      meta     : { title: 'Add New User', requiresAuth : true }
    },
    {
      path     : '/user-edit/:id',
      name     : 'user-edit',
      component: UserEdit,
      meta     : { title: 'Edit User', requiresAuth : true }
    },
    {
      path     : '/roles-list',
      name     : 'roles-list',
      component: RolesList,
      meta     : { title: 'All Roles', requiresAuth : true }
    },
    {
      path     : '/role-add',
      name     : 'role-add',
      component: RoleAdd,
      meta     : { title: 'Add New Role', requiresAuth : true }
    },
    {
      path     : '/role-edit/:id',
      name     : 'role-edit',
      component: RoleEdit,
      meta     : { title: 'Edit Role', requiresAuth : true }
    },
    {
      path     : '/campaigns',
      name     : 'campaigns',
      component: Campaigns,
      meta     : { title: 'All Campaigns', requiresAuth : true }
    },
    {
      path     : '/campaign-add',
      name     : 'campaign-add',
      component: CampaignAdd,
      meta     : { title: 'Campaign Add', requiresAuth : true }
    },
    {
      path     : '/campaign-edit/:id',
      name     : 'campaign-edit',
      component: CampaignEdit,
      meta     : { title: 'Campaign Edit', requiresAuth : true }
    },
    {
      path     : '/delivery-charge-list',
      name     : 'charge-list',
      component: DeliveryChargeList,
      meta     : { title: 'Delivery Gateway List', requiresAuth : true }
    },
    {
      path     : '/delivery-charge-add',
      name     : 'charge-add',
      component: DeliveryChargeAdd,
      meta     : { title: 'Add Delivery Charge', requiresAuth : true }
    },
    {
      path     : '/delivery-charge-edit/:id',
      name     : 'delivery-charge-edit',
      component: DeliveryChargeEdit,
      meta     : { title: 'Edit Delivery Charge', requiresAuth : true }
    },
    {
      path     : '/payment-gateway-list',
      name     : 'payment-gateway-list',
      component: PaymentGatewayList,
      meta     : { title: 'Payment Gateway', requiresAuth : true }
    },
    {
      path     : '/orders-list',
      name     : 'orders-list',
      component: OrdersList,
      meta     : { title: 'All Orders', requiresAuth : true }
    },
    {
      path     : '/order-add',
      name     : 'order-add',
      component: OrderAdd,
      meta     : { title: 'Add New Order', requiresAuth : true }
    },
    {
      path     : '/order-edit/:id',
      name     : 'order-edit',
      component: OrderEdit,
      meta     : { title: 'Order Edit', requiresAuth : true }
    },
    {
      path     : '/order-reports',
      name     : 'order-reports',
      component: OrderReports,
      meta     : { title: 'Orders Reports', requiresAuth : true }
    },
    {
      path     : '/order-histories/:id',
      name     : 'order-histories',
      component: OrderHistories,
      meta     : { title: 'Order Histories', requiresAuth : true }
    },
    {
      path     : '/order-assign',
      name     : 'order-assign',
      component: OrderAssign,
      meta     : { title: 'Order Assign', requiresAuth : true }
    },
    {
      path     : '/my-complete-orders',
      name     : 'my-complete-orders',
      component: MyCompleteAssignOrders,
      meta     : { title: 'My Complete Orders', requiresAuth : true }
    },
    
    {
      path     : '/home-sliders',
      name     : 'home-sliders',
      component: HomeSliders,
      meta     : { title: 'All Home Sliders', requiresAuth : true }
    },
    {
      path     : '/home-slider-add',
      name     : 'home-slider-add',
      component: HomeSliderAdd,
      meta     : { title: 'Add a Slider', requiresAuth : true }
    },
    {
      path     : '/home-slider-edit/:id',
      name     : 'home-slider-edit',
      component: HomeSliderEdit,
      meta     : { title: 'All Home Sliders', requiresAuth : true }
    },
    {
      path     : '/pos-invoice/:id',
      name     : 'pos-invoice',
      component: PosInvoice,
      meta     : { title: 'Pos Printer Invoice', requiresAuth : true }
    },
    {
      path     : '/invoice/:id',
      name     : 'invoice',
      component: Invoice,
      meta     : { title: 'Invoice', requiresAuth : true }
    },
    {
      path     : '/steadfast/:id',
      name     : 'steadfast',
      component: SteadFast,
      meta     : { title: 'Shipped to Steadfast', requiresAuth : true }
    },
    {
      path     : '/pathao/:id',
      name     : 'pathao',
      component: Pathao,
      meta     : { title: 'Shipped to Pathao', requiresAuth : true }
    },
    {
      path     : '/store-create/:id',
      name     : 'store-create',
      component: PathaoStoreCreate,
      meta     : { title: 'Pathao Store Create', requiresAuth : true }
    },
    {
      path     : '/purchase-list',
      name     : 'purchase-list',
      component: PurchaseList,
      meta     : { title: 'All Purchase List', requiresAuth : true }
    },
    {
      path     : '/purchase-add',
      name     : 'purchase-add',
      component: PurchaseAdd,
      meta     : { title: 'Add a new Purchase', requiresAuth : true }
    },
    {
      path     : '/expense-categories-list',
      name     : 'expense-categories-list',
      component: ExpenseCategoriesList,
      meta     : { title: 'All Expense Categories List', requiresAuth : true }
    },
    {
      path     : '/expense-category-add',
      name     : 'expense-category-add',
      component: ExpenseCategoryAdd,
      meta     : { title: 'Add a new expense category', requiresAuth : true }
    },
    {
      path     : '/expense-category-edit/:id',
      name     : 'expense-category-edit',
      component: ExpenseCategoryEdit,
      meta     : { title: 'Edit expense category', requiresAuth : true }
    },
    {
      path     : '/expense-list',
      name     : 'expense-list',
      component: ExpenseList,
      meta     : { title: 'All Expense List', requiresAuth : true }
    },
    {
      path     : '/expense-add',
      name     : 'expense-add',
      component: ExpenseAdd,
      meta     : { title: 'Add new Expense', requiresAuth : true }
    },
    {
      path     : '/expense-edit/:id',
      name     : 'expense-edit',
      component: ExpenseEdit,
      meta     : { title: 'Edit Expense', requiresAuth : true }
    },
    {
      path     : '/coupons-list',
      name     : 'coupons-list',
      component: CouponList,
      meta     : { title: 'All Coupons List', requiresAuth : true}
    },
    {
      path     : '/coupon-add',
      name     : 'coupon-add',
      component: CouponAdd,
      meta     : { title: 'Add New Coupon', requiresAuth : true }
    },
    {
      path     : '/coupon-edit/:id',
      name     : 'coupon-edit',
      component: CouponEdit,
      meta     : { title: 'Edit Coupon', requiresAuth : true }
    },
    {
      path     : '/order-statuses-list',
      name     : 'order-statuses-list',
      component: OrderStatusesList,
      meta     : { title: 'All Statuses List', requiresAuth : true }
    },
    {
      path     : '/variations-list',
      name     : 'variations-list',
      component: Variations,
      meta     : { title: 'All Variations List', requiresAuth : true }
    },
    {
      path     : '/variation-add',
      name     : 'variation-add',
      component: VariationAdd,
      meta     : { title: 'Add New Variations', requiresAuth : true }
    },
    {
      path     : '/variation-edit/:id',
      name     : 'variation-edit',
      component: VariationEdit,
      meta     : { title: 'Edit Variation', requiresAuth : true }
    },
    {
      path     : '/banners-list',
      name     : 'banners-list',
      component: BannerList,
      meta     : { title: 'All Banners List', requiresAuth : true }
    },
    {
      path     : '/banner-add',
      name     : 'banner-add',
      component: BannerAdd,
      meta     : { title: 'Add New Banner', requiresAuth : true }
    },
    {
      path     : '/banner-edit/:id',
      name     : 'banner-edit',
      component: BannerEdit,
      meta     : { title: 'Edit Banner', requiresAuth : true }
    },
    {
      path: '/social-contact-list',
      name: 'social-contact-list',
      component: SocialContactList,
      meta: { title: 'All Social Contact List', requiresAuth : true }
    },
    {
      path: '/social-contact-add',
      name: 'social-contact-add',
      component: SocialContactAdd,
      meta: { title: 'Add Social Contact', requiresAuth : true }
    },
    {
      path: '/social-contact-edit/:id',
      name: 'social-contact-edit',
      component: SocialContactEdit,
      meta: { title: 'Edit Social Contact', requiresAuth : true }
    }
  ];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior:"smooth" }
  },
})

const DEFAULT_TITLE = "404";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  NProgress.start();
  const auth = useAuth();
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(!auth.getAuthStatus){
      next({name:"login"});
    }else{
      next();
    }
  }else if(to.matched.some((record) => record.meta.guest)){
    if(auth.getAuthStatus){
      next({name:"dashboard"});
    }else{
      next();
    }
  }else{
    next();
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router;
