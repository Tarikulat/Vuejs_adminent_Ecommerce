import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useWeight = defineStore("weights", {
    state: () =>({
        weights : [],
    }),

        actions: {
            async getWeights(){
                try {
                    const res = await axiosInstance.get('/admin/sizes');
                    if(res.status === 200){
                        this.weights = res.data?.result?.data
                    }
                  } catch (error) {
                        console.log(error);
                  }
            }, 
        }
})