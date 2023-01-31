import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import env from "react-dotenv";

// Interface
import { Product } from "./schema";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllProducts = createAsyncThunk("get-all-products", async () => {
    try {

        const response = await axios({
            url: "/products",
            baseURL: env.API_URL,
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    
        return response.data
    } catch (err) {
        console.error(err)
    }
})
 
export const addProduct = createAsyncThunk("add-product", async (item: Product) => {
    const response = await axios({
        url: "/products",
        baseURL: env.API_URL,
        method: "put",
        data: item,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })

    return response.data
})


export const updateProduct = createAsyncThunk("update-product", async (item: Product) => {

    const response = await axios({
        url: `/products/${item.id}`,
        baseURL: env.API_URL,
        method: "put",
        data: item,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })

    return response.data
})

export const deleteProduct = createAsyncThunk("delete-product", async (item: Product) => {

    const response = await axios({
        url: `/products/${item.id}`,
        baseURL: env.API_URL,
        method: "delete",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })

    return response.data
})
