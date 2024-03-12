import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useCategories = defineStore("categories", {
    state: () =>({
        categories : [],
        loading : false,
        addLoading: false,
    }),

        actions: {
            async getCategories(){
                this.loading = true;
                try {
                    const res = await axiosInstance.get('/admin/categories');
                    if(res.status === 200){
                        this.categories = res.data?.result
                    }
                  } catch (error) {
                    console.log(error);
                  }finally{
                    this.loading = false;
                  }
            }, 

            async insertBrand(formData){
                this.addLoading = true;
                try {
                    const res = await axiosInstance.post('/admin/categories', formData);
                    if(res.status === 200){
                        return res.data;
                    }else{
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.addLoading = false;
                }
            }, 

            async getSingleCategoryData(categoryId){
                try {
                    const res = await axiosInstance.get(`/admin/categories/${categoryId}`);
                    if(res.status === 200){
                        return res.data
                    }else{
                        return res.data
                    }
                } catch (error) {
                    console.log(error);
                }
            }, 

            async updateCategory(categoryId, formData){
                this.loading = true;
                try {
                    const res = await axiosInstance.post(`/admin/categories/${categoryId}`, formData);
                    if(res.status === 200){
                        return res.data;
                    }else{
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
})