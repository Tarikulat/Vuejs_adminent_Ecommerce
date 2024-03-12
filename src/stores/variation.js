import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useVariations = defineStore("variation", {
  state: () =>({
    loading : false,
  }),

  actions: {
    async getVariations(){
        this.loading = true;
        try {
            const res = await axiosInstance.get('/admin/sizes');
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

    async insertVariation(formData){
        this.loading = true;
        try {
            const res = await axiosInstance.post('/admin/sizes', formData);
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

    async getSingleVariation(id){
        try {
            const res = await axiosInstance.get(`/admin/sizes/${id}`);
            if(res.data?.success){
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    },

    async updateVariation(id, formData){
        this.loading = true;
        try {
            const res = await axiosInstance.put(`/admin/sizes/${id}`, formData);
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

  }
})