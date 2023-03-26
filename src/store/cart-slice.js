import { createSlice } from "@reduxjs/toolkit";

const initialCartState={products:[],totalQuantity:0};

const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        addProduct(state,action){
            const existingItemIndex=state.products.findIndex((item)=>item.id===action.payload.id)
            const existingItem=state.products[existingItemIndex]
            state.totalQuantity++
            if(existingItem){
                existingItem.quantity++;
                existingItem.total=existingItem.total+action.payload.price
            }else{
                state.products.push({...action.payload,total:action.payload.price})
            }
        },
        removeProduct(state,action){
            const quantity=action.payload.quantity;
            state.totalQuantity--;
            if(quantity===1){
                state.products=state.products.filter((item)=>item.id!==action.payload.id)
            }else{
                const existingItem=state.products.find((item)=>item.id===action.payload.id)
            existingItem.quantity--;
            existingItem.total=existingItem.total-existingItem.price;
            }
        },
    }
});

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;