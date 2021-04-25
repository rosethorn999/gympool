import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

const slice = createSlice({
  name: "user",
  initialState: {
    token: initialToken,
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutSuccess: (state, action) => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
export default slice.reducer;
// Actions
const { loginSuccess, logoutSuccess } = slice.actions;
export const login = (o) => async (dispatch) => {
  try {
    dispatch(loginSuccess(o));
  } catch (e) {
    return console.error(e.message);
  }
};
export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
