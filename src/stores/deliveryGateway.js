import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useDeliveryGateway = defineStore("deliveryGateway", {
    state:() => ({
        gatewayData: {},
        addLoading : false,
        updateLoading : false,
        loading    : false,
     }),

    //  persist: true,

     getters:{},

     actions:{

        async getGatewayData(page, paginate_size){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/payment-gateways', {
                    params :{
                        page : page,
                        paginate_size : paginate_size,
                    }
                });
                if(res.status === 200){
                    this.gatewayData = res.data?.result
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        },

        async addGateway(data){
            this.addLoading = true;
            try {
                const res = await axiosInstance.post('/admin/payment-gateways', data);
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

        async updateGateway(id, data){
            this.updateLoading = true;
            try {
                const res = await axiosInstance.put(`/admin/payment-gateways/${id}`, data);
                if(res.status === 200){
                    return res. data;
                }else{
                    return res.data
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.updateLoading = false;
            }
        }
     },

})
