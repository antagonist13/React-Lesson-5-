import { createSlice } from "@reduxjs/toolkit";
import { getBaseCurrency, setExchangeInfo } from "./operations";
export const currencySlice = createSlice({
    name: "currency",
    initialState: {
        baseCurrency: '',
        exchangeInfo: null,
        isLoading: false,
        error: '',

    },
    extraReducers: builder => builder
        .addCase(getBaseCurrency.pending, state => {
            state.isLoading = true,
            state.error = ''
        })
        .addCase(getBaseCurrency.fulfilled, (state, action) => {
            state.isLoading = false,
            state.baseCurrency = action.payload
        })
        .addCase(getBaseCurrency.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.error.message
        })
        .addCase(setExchangeInfo.pending, state => {
            state.isLoading = true,
            state.error = ''
        })
        .addCase(setExchangeInfo.fulfilled, (state, action) => {
            state.isLoading = false,
            state.exchangeInfo = action.payload
        })
        .addCase(setExchangeInfo.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.error.message
            state.exchangeInfo = null
        })
    ,
    reducers: {
        setDefaultCurrency: {
            reducer(state, action) {
            state.baseCurrency = action.payload
            }
        } 
    },
    selectors: {
        selectCurrency: state => state.baseCurrency  ,
        selectIsLoading: state => state.isLoading ,
        selectError: state => state.error,
        selectExchangeInfo: state => state.exchangeInfo
    }
})
export const { selectCurrency, selectIsLoading, selectError, selectExchangeInfo } = currencySlice.selectors
export const { setDefaultCurrency } = currencySlice.actions
