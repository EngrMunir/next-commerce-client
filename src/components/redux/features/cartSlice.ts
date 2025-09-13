import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
    products: IProduct[];
};

const initialState: InitialState = {
    products: []
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProduct: (state, action) => {
            const productToAdd = state.products.find(
                (product) => product._id === action.payload._id
            );
            if(productToAdd){
                productToAdd.orderQuantity +=1
            }
            state.products.push({...action.payload, orderQuantity:1});
        }
    }
});

export const orderProductsSelector =(state:RootState)=> {
    
    return state.cart.products
}

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;