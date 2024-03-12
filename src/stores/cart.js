import { defineStore } from "pinia";


export const useCart = defineStore("cart", {
    state: () =>({
        cartItems   : [],
        loading2    : false,
    }),

    getters: {},

    actions: {

        async addToCart(product){
            this.loading2 = true;
            let item = product;

            if(this.cartItems.length > 0){
                if(item.weight_id){
                    let boolean = this.cartItems.some((i) => i.item_id === item.item_id && i.weight_id === item.weight_id);
                    if(boolean){
                        let index = this.cartItems.findIndex((i) => i.item_id === item.item_id && i.weight_id === item.weight_id);
                        this.cartItems[index]["quantity"] += item.quantity;
                    }else{
                        this.cartItems.push(item)          
                    }
                }else{
                    let boolean = this.cartItems.some((i) => i.item_id === item.item_id)
                    if(boolean){
                        let index = this.cartItems.findIndex((i) => i.item_id === item.item_id);
                        this.cartItems[index]["quantity"] += item.quantity;
                    }else{
                        this.cartItems.push(item)                   
                    }
                }    
            }else{
                this.cartItems.push(item)
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.loading2 = false;
            return this.cartItems;
        },

    }
})