import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const usePurchase = defineStore("purchase", {
    state:() => ({
        loading : false,
     }),

     getters:{},

     actions:{
        async getPurchase(purchaseCode){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/purchases', {
                    params:{
                        purchase_code : purchaseCode, 
                    }
                });
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);      
            }finally{
                this.loading = false;
            }
        },

        async insertPurchase(data){
            this.loading = true;
            try {
                const res = await axiosInstance.post('/admin/purchases', data);
                if(res.data?.success){
                    return res.data;
                }else{
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        }
     },

})
