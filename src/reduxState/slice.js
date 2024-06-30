import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getBaseCurrency, setExchangeInfo, getLatestRates } from "./operations";
export const currencySlice = createSlice({
    name: "currency",
    initialState: {
        baseCurrency: '',
        exchangeInfo: null,
        isLoading: false,
        error: '',
        rates: [],
        filter: '',
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
        .addCase(getLatestRates.pending, state => {
            state.isLoading = true,
            state.error = ''
            state.rates = []
        })
        .addCase(getLatestRates.fulfilled, (state, action) => {
            state.isLoading = false,
            state.rates = action.payload
        })
        .addCase(getLatestRates.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.error.message
        })
    ,
    reducers: {
        setDefaultCurrency: {
            reducer(state, action) {
            state.baseCurrency = action.payload
            }
        },
        setFilterValue: {
            reducer(state, action) {
            state.filter = action.payload
            }
        }
    },
    selectors: {
        selectCurrency: state => state.baseCurrency  ,
        selectIsLoading: state => state.isLoading ,
        selectError: state => state.error,
        selectExchangeInfo: state => state.exchangeInfo,
        selectCurrencyRates: state => state.rates,
        selectFilterValue: state => state.filter,
        selectFilteredRates: createSelector(
            state => state.rates,
            state => state.baseCurrency,
            state => state.filter,
            (rates, baseCurrency, filter) =>
                rates
                .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter),)
                .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }))
    ),
    }
})
export const { selectCurrency, selectIsLoading, selectError, selectExchangeInfo, selectCurrencyRates, selectFilteredRates, selectFilterValue } = currencySlice.selectors
export const { setDefaultCurrency, setFilterValue } = currencySlice.actions
