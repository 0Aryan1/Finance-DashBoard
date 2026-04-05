import { createSlice } from "@reduxjs/toolkit";
import { users } from "@/features/transactions/mockData";

const initialState = {
  id: users.currentUser.id,
  name: users.currentUser.name,
  role: users.currentUser.role,
  theme: "light"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});

export const { setRole, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
