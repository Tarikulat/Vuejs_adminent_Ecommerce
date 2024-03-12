import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useSocialContact = defineStore("socialContact", {
    state:() => ({
        loading     : false,
        deleteLoader: false,
     }),

     getters:{},

     actions:{
        async getSocialContacts(page, paginateSize, searchQuery){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/social-medias', {
                    params : {
                        page         : page,
                        paginate_size: paginateSize,
                        search_key   : searchQuery,
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

        async getSingleContactInfo(id){
            try {
                const res = await axiosInstance.get(`/admin/social-medias/${id}`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async insert(data){
            this.loading = true;
            try {
                const res = await axiosInstance.post('/admin/social-medias', data);
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
        },

        async update(id, data){
            this.loading = true;
            try {
                const res = await axiosInstance.put(`/admin/social-medias/${id}`, data);
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
        },
     },

})
