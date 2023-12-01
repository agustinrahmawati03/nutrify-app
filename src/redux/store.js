import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistStore, persistReducer } from 'redux-persist'
import foodsFilterReducer from "./slices/foodsFilterSlice";
import toastifyReducer from "./slices/toastifySlice";
import selectedFoodSlice from "./slices/selectedFoodSlice";
import storage from 'redux-persist/lib/storage'

const persistedAuthReducer = persistReducer({ key: 'auth', storage }, authReducer);
const persistedToastifyReducer = persistReducer({ key: 'toastify', storage }, toastifyReducer);
const persistedSelectedFoodReducer = persistReducer({ key: 'selectedFood', storage }, selectedFoodSlice);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        foodsFilter: foodsFilterReducer,
        toastify: persistedToastifyReducer,
        selectedFood: persistedSelectedFoodReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Subscribe to store changes
// store.subscribe(() => {
//     console.log("Store updated!", store.getState());
// });

// Log initial state
// console.log("Initial store state:", store.getState());

// Create the persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
