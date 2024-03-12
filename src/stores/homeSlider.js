import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useHomeSlider = defineStore("homeSlider", {
    state:() => ({
        sliders : [],
        loading : false,
     }),

     getters:{},

     actions:{
        async getSliders(){
            this.loading = true;
            try {
                const res = await axiosInstance.get('admin/sliders');
                if(res.status === 200){
                    this.sliders = res.data?.result;
                    return res.data;
                }
            } catch (error) {
                console.log(error.response);
            }finally{
                this.loading = false;
            }
        },

        async insert(formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post('admin/sliders', formData);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                if(error.response?.data){
                    return error.response.data
                }
            }finally{
                this.loading = false;
            }
        }, 
        
        async update(id, formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post(`admin/sliders/${id}`, formData);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                if(error.response?.data){
                    return error.response.data
                }
            }finally{
                this.loading = false;
            }
        }, 
        
        async getSingleSlider(id){
            try {
                const res = await axiosInstance.get(`admin/sliders/${id}`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                if(error.response?.data){
                    return error.response.data
                }
            }
        }, 
     },

})
