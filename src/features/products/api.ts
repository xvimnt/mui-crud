import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import env from "react-dotenv";

// Interface
import { Product } from "./slice";

export const getAllProducts = createAsyncThunk("get-all-products", async () => {

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
