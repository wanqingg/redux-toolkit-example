import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from '../../cartItems'

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, thunkAPI) => {
    try {
        // thunkAPI returns the app's state: cart and modal
        const res = await axios(url)
        return res.data
    } catch(err) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: { // use Promises with API
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.cartItems = payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        },
    },
    reducers: { // just affect internal cart state
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, {payload}) => {
            state.cartItems = state.cartItems.filter(item => item.id !== payload)
        },
        increase: (state, {payload}) => {
            const cartItem = state.cartItems.find(item => item.id === payload)
            cartItem.amount += 1
        },
        decrease: (state, {payload}) => {
            const cartItem = state.cartItems.find(item => item.id === payload)
            cartItem.amount -= 1
        },
        calculateTotals: (state) => {
            let total = 0,
                amount = 0
            
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })

            state.amount = amount
            state.total = total
        }
    }
})

export default cartSlice.reducer

export const {clearCart, removeItem, increase, decrease, calculateTotals} =  cartSlice.actions