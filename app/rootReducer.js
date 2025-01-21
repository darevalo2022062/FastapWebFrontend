import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "../src/services/userApi";
import { categoryApi } from "../src/services/categoryApi";
import { modelApi } from "../src/services/modelApi";
import { colorApi } from "../src/services/colorApi";
import { productApi } from "../src/services/productApi";

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [modelApi.reducerPath]: modelApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [productApi.reducerPath]: productApi.reducer,


    // add more reducers
})

export const apiMiddlewares = [userApi.middleware, categoryApi.middleware, modelApi.middleware, colorApi.middleware, productApi.middleware];


export default rootReducer;