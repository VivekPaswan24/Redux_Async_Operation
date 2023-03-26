import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import axios from "axios";

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
        replaceState(state,action){
            state.products=action.payload.products
            state.totalQuantity=action.payload.totalQuantity
        }
    }
});

 export const sendCartDta=(cart)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({status:'Pending',title:'Sending',message:'Sending cart data'}));
        try{
            await axios.put("https://react-http-71f81-default-rtdb.firebaseio.com/cart.json",{cart});
            dispatch(uiActions.showNotification({status:'success',title:'Suceess',message:'Sent cart data successfully'}));
           }catch(error){
             dispatch(uiActions.showNotification({status:'error',title:'Error',message:'Seding cart data failed!'}));
           }
           setTimeout(()=>{
            dispatch(uiActions.closeNotification())
        },2000)
    }
}

export const getCartData=()=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({status:'Pending',title:'Sending',message:'Sending cart data'}));
        try{
            const response=await axios.get('https://react-http-71f81-default-rtdb.firebaseio.com/cart.json')
            dispatch(cartActions.replaceState({products:response.data.cart.products,totalQuantity:response.data.cart.totalQuantity}))
            dispatch(uiActions.showNotification({status:'success',title:'Suceess',message:'Sent cart data successfully'}));
        }catch(error){
            dispatch(uiActions.showNotification({status:'error',title:'Error',message:'Seding cart data failed!'}));
        }
        setTimeout(()=>{
            dispatch(uiActions.closeNotification())
        },2000)
    }
}

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;