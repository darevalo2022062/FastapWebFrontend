import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { apiMiddlewares } from './rootReducer';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddlewares),
});

setupListeners(store.dispatch);

export default store;
