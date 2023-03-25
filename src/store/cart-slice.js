import { createSlice } from "@reduxjs/toolkit";

const initialCartState={products:[],totalQuantity:0,showCart:false};

const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        addProduct(state,action){
            let updatedProducts;
            const existingItemIndex=state.products.findIndex((item)=>item.id===action.payload.id)
            const existingItem=state.products[existingItemIndex]
            state.totalQuantity++
            if(existingItem){
                const updatedProduct={
                    ...existingItem,
                    quantity:Number(existingItem.quantity)+1,
                    total:Number(existingItem.total)+Number(action.payload.price)
                }
                updatedProducts=[...state.products]
                updatedProducts[existingItemIndex]=updatedProduct
            }else{
                updatedProducts=state.products.concat({...action.payload,total:action.payload.price})
            }
            state.products=updatedProducts;
        },
        removeProduct(state,action){
            const quantity=action.payload.quantity;
            let updatedProducts;
            state.totalQuantity--;
            if(quantity===1){
                updatedProducts=state.products.filter((item)=>item.id!==action.payload.id)
            }else{
                const existingItemIndex=state.products.findIndex((item)=>item.id===action.payload.id)
            const existingItem=state.products[existingItemIndex]
            const updatedProduct={
                ...existingItem,
                quantity:Number(existingItem.quantity)-1,
                total:Number(existingItem.total)-Number(action.payload.price)
            }
            updatedProducts=[...state.products]
            updatedProducts[existingItemIndex]=updatedProduct
            }
            state.products=updatedProducts
        },
        showCart(state){
            state.showCart=!state.showCart;
        }
    }
});

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;