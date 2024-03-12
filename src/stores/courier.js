import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useCourier = defineStore("courier", {
    state: () =>({
        steadfastInfo : {},
        loading       : false,
    }),

        actions: {
            async getSteadfastInfo(orderId){
                try {
                    const res = await axiosInstance.get(`/admin/stead/orders/shipped/${orderId}`)
                    if(res.data?.success){
                        this.steadfastInfo = res.data?.result;
                        return res.data;
                    }
                } catch (error) {
                    console.log(error.response);
                }
            }, 

            async insertSteadfast(data){
                this.loading = true;
                try {
                    const res = await axiosInstance.post('/admin/stead-fast/create-order', data);
                    console.log(res);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    if(error.response?.data){
                        return error.response?.data;
                    }
                }finally{
                    this.loading = false;
                }
            }
        }   
})