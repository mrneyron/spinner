import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './rootReducer';
import { mockApi } from '../api/mockApi';

export function makeStore() {
  const store = configureStore({
    reducer: rootReducer as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mockApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
}

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const appStore = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
