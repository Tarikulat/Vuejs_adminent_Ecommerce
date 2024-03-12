import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useBanner = defineStore("banner", {
    state:() => ({
        deleteLoader  : false,
        loading       : false,
     }),

    //  persist: true,

     getters:{},

     actions:{
        async getBannerData(){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/banners');
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        },

        async insertBanner(formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post('/admin/banners', formData);
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
        },
        
        async updateBanner(bannerId, formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post(`/admin/banners/${bannerId}`, formData);
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
        },

        async getSingleBannerData(bannerId){
            try {
                const res = await axiosInstance.get(`/admin/banners/${bannerId}`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
     },

})
