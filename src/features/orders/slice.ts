import { createSlice } from "@reduxjs/toolkit"
import { getAllOrders, addOrder, deleteOrder, updateOrder } from "./api";
import { Order as Interface} from "./schema"
import { RootState } from '../../app/store';

// Define a type for the slice state
export interface orderState {
    data: Interface[],
    fetchStatus: String
}

// Define the initial state using that type
const initialState: orderState = {
    data: [],
    fetchStatus: ""
}

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            // Fills the initial table
            state.data = action.payload
            state.fetchStatus = "success"
        }).addCase(getAllOrders.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(getAllOrders.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(addOrder.fulfilled, (state, action) => {
            // Adds the new element to the existing table
            state.data = [...state.data, action.meta.arg]
            state.fetchStatus = "success"
        }).addCase(addOrder.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(addOrder.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(deleteOrder.fulfilled, (state, action) => {
            // removes the element from existing table
            state.data = state.data.filter(el => el.id !== action.meta.arg.id)
            state.fetchStatus = "success"
        }).addCase(deleteOrder.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(deleteOrder.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(updateOrder.fulfilled, (state, action) => {
            // Adding and removing
            state.data = state.data.filter(el => el.id !== action.meta.arg.id)
            state.data = [...state.data, action.meta.arg]
            state.fetchStatus = "success"
        }).addCase(updateOrder.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(updateOrder.rejected, (state) => {
            state.fetchStatus = "error"
        })
    }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrders = (state: RootState) => state.orders;

export default orderSlice.reducer