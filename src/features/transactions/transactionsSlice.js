import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchTransactionsMock, transactions as seedTransactions } from "./mockData";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async () => {
    const data = await fetchTransactionsMock();
    return data;
  }
);

const initialState = {
  items: seedTransactions,
  status: "idle",
  error: null
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
      },
      prepare: (transaction) => ({
        payload: {
          ...transaction,
          id: nanoid()
        }
      })
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
