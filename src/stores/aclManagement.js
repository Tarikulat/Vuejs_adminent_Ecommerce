import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useAclManagement = defineStore("aclManagement", {
    state:() => ({
        roles      : {},
        permissions: {},
        loading    : false,
        addLoading : false,
     }),

    //  persist: true,

     getters:{},

     actions:{
        async getRoles(page, paginateSize){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/roles', {
                    params :{
                        page,
                        paginate_size : paginateSize,
                    }
                });
                if(res.status === 200){
                    this.roles = res.data?.result
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        }, 

        async insertRole(formData){
            this.addLoading = true;
            try {
                const res = await axiosInstance.post('/admin/roles', formData);
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

        async getRoleDetailsInfo(roleId){
            try {
                const res = await axiosInstance.get(`/admin/roles/${roleId}`);
                if(res.status === 200){
                    return res.data
                }
            } catch (error) {
                console.log(error);
            }
        },

        async updateRole(roleId, formData){
            this.loading = true;
            try {
                const res = await axiosInstance.put(`/admin/roles/${roleId}`, formData);
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
        },

        async getPermissions(){
            try {
                const res = await axiosInstance.get('/admin/permissions');
                if(res.status === 200){
                    this.permissions = res.data?.result
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.addLoading = false;
            }
        }, 
     },

})
