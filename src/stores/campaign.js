import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useCampaign = defineStore("campaigns", {
    state: () =>({
        campaigns : {},
        loading : false,
    }),

        actions: {
            async getCampaigns(){
              this.loading = true;
              try {
                const res = await axiosInstance.get('/admin/campaigns');
                if(res.status === 200){
                    this.campaigns = res.data?.result
                }
              } catch (error) {
                console.log(error);
              }finally{
                this.loading = false;
              }
            },

            async getSingleInfo(campaignId){
              try {
                const res = await axiosInstance.get(`/admin/campaigns/product/${campaignId}`);
                if(res.status === 200){
                  return res.data
                }
              } catch (error) {
                console.log(error);
              }
            },

            async insertCampaign(data){
                this.loading = true;
                try {
                    const res = await axiosInstance.post('/admin/campaigns', data);
                    if(res.status === 200){
                        return res
                    }else{
                        return res.data
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async updateCampaign(campaignId, data){
              this.loading = true;
              try {
                const res = await axiosInstance.put(`/admin/campaigns/${campaignId}`, data);
                if(res.status === 200){
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