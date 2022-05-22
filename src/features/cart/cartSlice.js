import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'

const initialState = {
    cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
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

        }
    }
})

export default cartSlice.reducer

export const {clearCart, removeItem, increase, decrease, calculateTotals} =  cartSlice.actions