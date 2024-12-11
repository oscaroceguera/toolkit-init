import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../services/pokemon";

const rootReducer = combineReducers({
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const store = configureStore({
  // reducer: {
  //   counter: counterReducer,
  //   // Add the generated reducer as a specific top-level slice
  //   [pokemonApi.reducerPath]: pokemonApi.reducer,
  //   // Adding the api middleware enables caching, invalidation, polling,
  //   // and other useful features of `rtk-query`.
  // },
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
