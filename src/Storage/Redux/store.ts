// We are manage all the Slices inside this page ( store.ts )

import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { authApi, menuItemApi, orderApi, paymentApi, shoppingCartApi } from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";
const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware) //That is the default configuration
      .concat(shoppingCartApi.middleware) //That is the default configuration
      .concat(authApi.middleware)
      .concat(orderApi.middleware)
      .concat(paymentApi.middleware),
});

//When we are working with typescript we have to export the RootState
//Whenever we are calling the particular store, typescript will expect a type! that's why we have to use RootState
//That way whatever is the type of this current state of Slice that will be exported in the RootState!

export type RootState = ReturnType<typeof store.getState>;

export default store;
