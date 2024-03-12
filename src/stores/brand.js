import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useBrands = defineStore("brands", {
  state: () =>({
      brands : [],
      loading: false,
      addLoading :false,
  }),

  actions: {
    async getBrands(){
      this.loading = true;
      try {
        const res = await axiosInstance.get('/admin/brands');
        if(res.status === 200){
            this.brands = res.data?.result
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
        const res = await axiosInstance.post('/admin/brands', formData);
        if(res.status === 200){
          return res.data
        }else{
          return res.data;
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.addLoading = false;
      }
    },

    async getSingleBrandData(brandId){
      try {
        const res = await axiosInstance.get(`/admin/brands/${brandId}`);
        if(res.status === 200){
          return res.data
        }else{
          return res
        }
      } catch (error) {
        console.log(error);
      }
    },
    
    async updateBrand(brandId, formData){
      this.loading = true;
      try {
        const res = await axiosInstance.post(`/admin/brands/${brandId}`, formData);
        if(res.status === 200){
          return res.data
        }else{
          return res
        }
      } catch (error) {
        console.log(error);
      }finally{
        this.loading = false;
      }
    },
  }
})