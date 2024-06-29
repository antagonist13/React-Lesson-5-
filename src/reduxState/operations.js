import { createAsyncThunk } from "@reduxjs/toolkit";
import { exchangeCurrency } from "service/exchangeAPI";
import { getUserInfo } from "service/opencagedataApi";

export const getBaseCurrency = createAsyncThunk(
    "currency/getBaseCurrency",
    async (crd) => {
            const response = await getUserInfo(crd)
            return response.results[0].annotations.currency.iso_code
    },
    {
        condition(_, thunkAPI) {
            const reduxState = thunkAPI.getState()
            return reduxState.currency.baseCurrency === ''
        }
    }
)
export const setExchangeInfo = createAsyncThunk(
    "currency/setExchangeInfo",
    async (exchangeInfo) => {
        const response = await exchangeCurrency(exchangeInfo)
        return response
    }
)