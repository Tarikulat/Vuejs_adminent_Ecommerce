import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useUser = defineStore("user", {
    state:() => ({
        users : {},
        loading: false,
        addLoading: false,
     }),

    //  persist: true,

     getters:{},

     actions:{
        async getUsers(page, paginateSize){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/users', {
                    params :{
                        page,
                        paginate_size : paginateSize,
                    }
                });
                if(res.status === 200){
                    this.users = res.data?.result
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        }, 

        async insertUser(formData){
            this.addLoading = true;
            try {
                const res = await axiosInstance.post('/admin/users', formData);
                console.log(res);
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

        async getUserDetailInfo(userId){
            try {
                const res = await axiosInstance.get(`/admin/users/${userId}`);
                if(res.status === 200){
                    return res.data
                }
            } catch (error) {
                console.log(error);
                
            }
        }, 

        async updateUser(userId, formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post(`/admin/users/${userId}`, formData);
                if(res.status === 200){
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
