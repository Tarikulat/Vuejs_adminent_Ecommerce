import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useExpense = defineStore("expense", {
    state: () =>({
        loading : false,
    }),

        actions: {
            async insertCategory(data){
                this.loading = true;
                try {
                    const res = await axiosInstance.post('/admin/expense-categories', data);
                    if(res.data?.success){
                        return res.data;
                    }else{
                        return res.data
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },
            
            async updateCategory(expenseCategoryId, data){
                this.loading = true;
                try {
                    const res = await axiosInstance.put(`/admin/expense-categories/${expenseCategoryId}`, data);
                    console.log(res);
                    if(res.data?.success){
                        return res.data;
                    }else{
                        return res.data
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async getExpenseCategories(page, paginateSize, searchQuery){
                this.loading = true;
                try {
                    const res = await axiosInstance.get('/admin/expense-categories', {
                        params : {
                            page         : page,
                            paginate_size: paginateSize,
                            search_key   : searchQuery
                        }
                    })
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async getSingleExpenseCategory(expenseCategoryId){
                try {
                    const res = await axiosInstance.get(`/admin/expense-categories/${expenseCategoryId}`);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async insertExpense(data){
                this.loading = true;
                try {
                    const res = await axiosInstance.post('/admin/expenses', data);
                    if(res.data?.success){
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
            
            async updateExpense(id, data){
                this.loading = true;
                try {
                    const res = await axiosInstance.put(`/admin/expenses/${id}`, data);
                    if(res.data?.success){
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

            async getExpenses(page, paginateSize, searchQuery){
                this.loading = true;
                try {
                    const res = await axiosInstance.get('/admin/expenses', {
                        params : {
                            page         : page,
                            paginate_size: paginateSize,
                            search_key   : searchQuery
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

            async getSingleExpense(expenseId){
                try {
                    const res = await axiosInstance.get(`/admin/expenses/${expenseId}`);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
})