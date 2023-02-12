import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import env from "react-dotenv";

// Interface
import { Category as Interface} from "./schema";
const table_name = "categories"

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllCategories = createAsyncThunk(`get-all-${table_name}`, async (sub: string) => {
    try {
        const response = await axios({
            url: `/${table_name}/${sub}`,
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
 
export const addCategory = createAsyncThunk(`add-${table_name}`, async (item: Interface) => {
    const response = await axios({
        url: `/${table_name}`,
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


export const updateCategory = createAsyncThunk(`update-${table_name}`, async (item: Interface) => {
    const response = await axios({
        url: `/${table_name}/${item.id}`,
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

export const deleteCategory = createAsyncThunk(`delete-${table_name}`, async (item: Interface) => {

    const response = await axios({
        url: `/${table_name}/${item.id}`,
        baseURL: env.API_URL,
        method: "delete",
        data: item,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })

    return response.data
})
