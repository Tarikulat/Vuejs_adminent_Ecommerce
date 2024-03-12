import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useDeliveryCharge = defineStore("deliveryCharge", {
    state: () =>({
        DeliveryChargeInfo : [],
        loading : false,
        addLoading: false,
    }),

    actions: {
        async getDeliveryChargeList(){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/delivery-gateways');
                if(res.status === 200){
                    this.DeliveryChargeInfo = res.data?.result
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        },

        async deliveryChargeSingleData(id){
            try {
                const res = await axiosInstance.get(`/admin/delivery-gateways/${id}`);
                if(res.status == 200 ){
                    return res.data
                }
            } catch (error) {
                console.log(error);
            }
        },

        async insertGateway(data){
            this.addLoading = true;
            try {
                const res = await axiosInstance.post('/admin/delivery-gateways', data);
                if(res.status === 200){
                    return res.data
                }else{
                    return res.data
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.addLoading = false;
            }
        },

        async updateGateway(id, deliveryInfo){
            this.loading = true;
            try {
                const res = await axiosInstance.put(`/admin/delivery-gateways/${id}`, deliveryInfo);
                if(res.status == 200 ){
                    return res.data
                }else{
                    console.log(res);
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