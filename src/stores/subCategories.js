import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useSubCategories = defineStore("subCategories", {
    state: () =>({
        subCategories : [],
        loading : false,
        addLoading :false,
    }),

    actions: {
      async getSubCategories(){
        this.loading = true;
        try {
            const res = await axiosInstance.get('/admin/sub-categories');
            if(res.status === 200){
                this.subCategories = res.data?.result;
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false
          }
      }, 

      async insertSubCategory(formData){
        this.addLoading = true;
        try {
          const res = await axiosInstance.post('/admin/sub-categories', formData);
          if(res.status === 200){
            return res.data;
          }else{
            return res.data
          }
        } catch (error) {
          console.log(error);
        }finally{
          this.addLoading = false;
        }
      }, 

      async getSingleSubCategoryData(subCategoryId){
        try {
          const res = await axiosInstance.get(`/admin/sub-categories/${subCategoryId}`);
          if(res.status === 200){
            return res.data;
          }
        } catch (error) {
          
        }
      },

      async updateSubCategory(subCategoryId, formData){
        this.loading = true;
        try {
          const res = await axiosInstance.post(`/admin/sub-categories/${subCategoryId}`, formData);
          if(res.status == 200){
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
    }
})