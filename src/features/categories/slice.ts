import { createSlice } from "@reduxjs/toolkit"
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "./api"
import { Category as Interface} from "./schema"
import { RootState } from '../../app/store';

// Define a type for the slice state
export interface CategoryState {
    data: Interface[],
    fetchStatus: String
}

// Define the initial state using that type
const initialState: CategoryState = {
    data: [],
    fetchStatus: ""
}

export const CategorySlice = createSlice({
    name: "Categories",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            // Fills the initial table
            state.data = action.payload
            state.fetchStatus = "success"
        }).addCase(getAllCategories.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(getAllCategories.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(addCategory.fulfilled, (state, action) => {
            // Adds the new element to the existing table
            state.data = [...state.data, action.meta.arg]
            state.fetchStatus = "success"
        }).addCase(addCategory.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(addCategory.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(deleteCategory.fulfilled, (state, action) => {
            // removes the element from existing table
            state.data = state.data.filter(el => el.id !== action.meta.arg.id)
            state.fetchStatus = "success"
        }).addCase(deleteCategory.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(deleteCategory.rejected, (state) => {
            state.fetchStatus = "error"
        }).addCase(updateCategory.fulfilled, (state, action) => {
            // Adding and removing
            state.data = state.data.filter(el => el.id !== action.meta.arg.id)
            state.data = [...state.data, action.meta.arg]
            state.fetchStatus = "success"
        }).addCase(updateCategory.pending, (state) => {
            state.fetchStatus = "loading"
        }).addCase(updateCategory.rejected, (state) => {
            state.fetchStatus = "error"
        })
    }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCategories = (state: RootState) => state.categories;

export default CategorySlice.reducer