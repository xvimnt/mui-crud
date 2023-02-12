import { createSlice } from "@reduxjs/toolkit"
import { User as Interface} from "./schema"
import { RootState } from '../../app/store';

// Define the initial state using that type
const initialState: Interface = {
    email: "",
    nickname: "",
    email_verified: false,
    jwt: "",
    sub: "",
}

export const userSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        confirmUser: (state) => {
            state.email_verified = true
        },
        loginUser: (state, action) => {
            state.email = action.payload.email
            state.nickname = action.payload.nickname
            state.email_verified = action.payload.email_verified
            state.jwt = action.payload.jwt
            state.sub = action.payload.sub
        },
        logoutUser: (state) => {
            state.email = initialState.email
            state.nickname = initialState.nickname
            state.email_verified = initialState.email_verified
            state.jwt = initialState.jwt
            state.sub = initialState.sub
        },
    },
})

export const { confirmUser, loginUser, logoutUser } = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer