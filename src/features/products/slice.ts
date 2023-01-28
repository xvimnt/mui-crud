import { createSlice } from "@reduxjs/toolkit"
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "./api"
import { Product } from "./schema"
import { RootState } from '../../app/store';

// Define a type for the slice state
export interface ProductState {
    data: Product[],
    fetchStatus: String
}

// Define the initial state using that type
const initialState: ProductState = {
    data: [],
    fetchStatus: ""
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            // Fills the initial table
            state.data = action.payload
            state.fetchStatus = "success"
        }).addCase(getAllProducts.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(getAllProducts.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(addProduct.fulfilled, (state, action) => {
            // Adds the new element to the existing table
            state.data = [...state.data, action.meta.arg]
            state.fetchStatus = "success"
        }).addCase(addProduct.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(addProduct.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            // removes the element from existing table
            state.data = state.data.filter(el => el.id !== action.meta.arg.id)
            state.fetchStatus = "success"
        }).addCase(deleteProduct.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(deleteProduct.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(updateProduct.fulfilled, (state, action) => {
            // Adding and removing
            state.data = state.data.filter(el => el.id !== action.meta.arg.id)
            state.data = [...state.data, action.meta.arg]
            state.fetchStatus = "success"
        }).addCase(updateProduct.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(updateProduct.rejected, (state) => {
            state.fetchStatus = "error"
        })
    }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state: RootState) => state.products;

export default productSlice.reducer