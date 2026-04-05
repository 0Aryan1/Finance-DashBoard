import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "@/features/transactions/transactionsSlice";
import filtersReducer from "@/features/filters/filterSlice";
import userReducer from "@/features/user/userSlice";
import { loadState, saveState } from "@/utils/localStorage";

const persisted = loadState();

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filtersReducer,
    user: userReducer
  },
  preloadedState: persisted
});

store.subscribe(() => {
  saveState({
    transactions: { ...store.getState().transactions, status: "idle", error: null },
    filters: store.getState().filters,
    user: store.getState().user
  });
});
