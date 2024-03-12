import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useProduct = defineStore("product", {
    state:() => ({
        products      : {},
        productDetails: {},
        deleteLoder   : false,
        addLoading    : false,
        loading       : false,
     }),

    //  persist: true,

     getters:{},

     actions:{
        async getProducts(page = 1, paginate_size, name){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/products', {
                    params : {
                        page,
                        paginate_size : paginate_size,
                        name : name,
                    }
                });
                if(res.status === 200){
                    this.products = res.data?.result
                    return res.data?.result
                }
            } catch (error) {
                console.log(error.response);
            }finally{
                this.loading = false;
            }
        },

        async insertProduct(formData){
            this.addLoading = true;
            try {
                const res = await axiosInstance.post('/admin/products', formData);
                if(res.status === 200){
                    return res.data
                }else{
                    return res
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.addLoading = false;
            }
        },

        async editProductInfo(productId){
            try {
                const res = await axiosInstance.get(`/admin/products/${productId}`);
                if(res.status === 200){
                    this.productDetails = res.data.result
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        
        async updateProduct(productId, formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post(`/admin/products/${productId}`, formData);
                if(res.status === 200){
                    return res.data;
                }else{
                    return res;
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        },

        async deleteProduct(id){
            this.deleteLoder = id;
            try {
                const res = await axiosInstance.post(`/admin/products/${id}`);
                if(res.status === 200){
                    return res;
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.deleteLoder = false;
            }
        }, 

        async getVariationPrice(productId, variationId){
            try {
                const res = await axiosInstance.get(`/products/${productId}/${variationId}`);
                if(res.status === 200){
                    return res;
                }
            } catch (error) {
                console.log(error);
            }
        }, 

        async getProductHistories(productId){
            try {
                const res = await axiosInstance.get(`/admin/products/history/${productId}`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
     },

})
