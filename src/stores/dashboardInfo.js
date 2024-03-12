import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useDashboard = defineStore("dashboard", {
    state:() => ({
        dashboardInfo : {},
     }),

     getters:{},

     actions:{
        async getInfo(){
            try {
                const res = await axiosInstance.get('admin/dashboard');
                if(res.status === 200){
                    this.dashboardInfo = res.data?.result
                    return res.data?.result;
                }
            } catch (error) {
                console.log(error.response);
            }
        },

        async locationWiseOrderReport(){
            try {
                const res = await axiosInstance.get('/admin/orders/report/by-location');
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        }, 

        async getMonthlyOrderReports(){
            try {
                const res = await axiosInstance.get(`/admin/orders/report/monthly`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        
        async getYearlyOrderReports(){
            try {
                const res = await axiosInstance.get(`/admin/orders/report/yearly`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async topCustomerReport(){
            try {
                const res = await axiosInstance.get(`/admin/orders/report/by-customer`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        
        async topProductReport(){
            try {
                const res = await axiosInstance.get(`/admin/orders/report/by-selling`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
     },

})
