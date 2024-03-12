import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useCoupon = defineStore("coupon", {
    state: () =>({
        loading : false,
    }),

        actions: {
            async getCouponList(){
                this.loading = true;
                try {
                    const res = await axiosInstance.get(`/admin/coupons`);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async insertCoupon(data){
                this.loading = true;
                try {
                    const res = await axiosInstance.post(`/admin/coupons`, data);
                    if(res.data?.success){
                        return res.data;
                    }else{
                        return res.data;
                    }
                }catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async getSingleCouponData(id){
                try {
                    const res = await axiosInstance.get(`/admin/coupons/${id}`);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async updateCoupon(id, data){
                this.loading = true;
                try {
                    const res = await axiosInstance.put(`/admin/coupons/${id}`, data);
                    if(res.data?.success){
                        return res.data;
                    }else{
                        return res.data;
                    }
                }catch (error) {
                    console.log(error);
                }finally{
                    console.log("Called");
                    this.loading = false;
                }
            },
        }
})