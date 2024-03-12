import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';
import { useRoute } from "vue-router";

export const useOrders = defineStore("orders", {
    state: () =>({
        orders       : {},
        orderStatus  : {},
        loading      : false,
        updateLoading: false,
    }),

        actions: {
            async getOrderStatus(){
                this.loading = true;
                try {
                    const res = await axiosInstance.get(`/admin/statuses`);
                    if(res.status == 200){
                        this.orderStatus = res.data?.result;
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async updateStatus(id, data){
                this.updateLoading = true;
                try {
                    const res = await axiosInstance.put(`/admin/statuses/${id}`, data);
                    if(res.data?.success){
                        return res.data;
                    }else{
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.updateLoading = false;
                }
            },

            async getOrders(page, paginate, statusId, searchQuery, isPaid){
                this.loading = true;
                try {
                    const res = await axiosInstance.get('/admin/orders', {
                        params :{
                            page,
                            paginate_size: paginate,
                            status_id    : statusId,
                            search_key   : searchQuery,
                            is_paid      : isPaid,
                        }
                    });
                    if(res.status === 200){
                        this.orders = res.data?.result;
                        return res.data?.result;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async getSingleOrder(orderId){
                try {
                    let res = await axiosInstance.get(`/admin/orders/${orderId}`);
                    if(res.status === 200){
                        return res;
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async insertOrder(cartItems, orderInfo){
                this.loading = true;
                const items = [];
                for(let item of cartItems){
                    let processItem = {
                        'item_id'   : item.item_id,
                        'buy_price' : item.buy_price,
                        'sell_price': item.offer_price,
                        'price'     : item.offer_price,
                        'mrp'       : item.mrp,
                        'discount'  : item.discount,
                        'size_id'   : item.weight_id,
                        'quantity'  : item.quantity,
                    }

                    items.push(processItem)
                }
                try {
                    const res = await axiosInstance.post('/admin/orders',{
                        customer_name      : orderInfo.customer_name,
                        phone_number       : orderInfo.phone_number,
                        address_details    : orderInfo.address_details,
                        delivery_gateway_id: orderInfo.delivery_gateway_id,
                        payment_gateway_id : 1,
                        status_id          : orderInfo.status_id,
                        is_paid            : orderInfo.is_paid,
                        district           : orderInfo.district,
                        special_discount   : orderInfo.special_discount,
                        advance_payment    : orderInfo.advance_payment,
                        delivery_charge    : orderInfo.delivery_charge,
                        items              : items,
                    });

                    if(res.status === 200){
                        return res;
                    }else{
                        return res;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
                
            }, 
            
            async updateOrder(orderId, cartItems, orderInfo){
                this.loading = true;
                const items = [];
                for(let item of cartItems){
                    let processItem = {
                        'item_id'   : item.item_id,
                        'buy_price' : parseInt(item.buy_price),
                        'sell_price': parseInt(item.offer_price),
                        'price'     : parseInt(item.offer_price),
                        'mrp'       : parseInt(item.mrp),
                        'discount'  : parseInt(item.discount),
                        'size_id'   : item.weight_id,
                        'quantity'  : item.quantity,
                    }

                    items.push(processItem)
                }
                try {
                    const res = await axiosInstance.put(`/admin/orders/${orderId}`,{
                        customer_name      : orderInfo.customer_name,
                        phone_number       : orderInfo.phone_number,
                        address_details    : orderInfo.address_details,
                        delivery_gateway_id: orderInfo.delivery_gateway_id,
                        payment_gateway_id : 1,
                        status_id          : orderInfo.status_id,
                        is_paid            : orderInfo.is_paid,
                        district           : orderInfo.district,
                        special_discount   : orderInfo.special_discount,
                        advance_payment    : orderInfo.advance_payment,
                        delivery_charge    : orderInfo.delivery_charge,
                        items              : items,
                    });

                    if(res.status === 200){
                        return res;
                    }else{
                        return res;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
                
            }, 

            async orderReports(startDate, endDate){
                try {
                    const res = await axiosInstance.get('/admin/orders/report', {
                        params : {
                            start_date : startDate,
                            end_date   : endDate,
                            action     : '',
                        }
                    });
                    if(res.data?.success){
                        return res.data;
                    }else{
                        console.log(res);
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async orderReportsExport(startDate, endDate, action){
                try {
                    const apiUrl = '/admin/orders/report';
                    const params = {
                        start_date: startDate,
                        end_date: endDate,
                        action: action,
                    };
                    const fullUrl = `${import.meta.env.VITE_APP_URL}/api${apiUrl}?${new URLSearchParams(params)}`;
                    window.location.href = fullUrl;

                    const res = await axiosInstance.get(apiUrl, { params });
                } catch (error) {
                    console.log(error);
                }
            },

            async orderDelete(orderId){
                this.loading = orderId;
                try {
                    const res = await axiosInstance.post(`/admin/orders/${orderId}`);
                    if(res.status === 200){
                        return res;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            },

            async orderHistories(orderId){
                try {
                    const res = await axiosInstance.get(`/admin/orders/history/${orderId}`);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            }, 

            async ordersTeamList(page, paginateSize, searchKey){
                try {
                    const res = await axiosInstance.get('/admin/orders/team/list', {
                        params : {
                            page : page,
                            paginate_size : paginateSize,
                            search_key : searchKey
                        }
                    });
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            
            async myOrderAssignList(page, paginateSize, searchKey){
                try {
                    const res = await axiosInstance.get('/admin/orders/prepared-by-list', {
                        params : {
                            page : page,
                            paginate_size : paginateSize,
                            search_key : searchKey
                        }
                    });
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async assignOrder(orderIds, orderId){
                this.loading = orderId;
                try {
                    const res = await axiosInstance.post('/admin/orders/prepared-by', orderIds);
                    if(res.data?.success){
                        return res.data;
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    this.loading = false;
                }
            }
        }
})