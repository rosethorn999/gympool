import { createSlice } from "@reduxjs/toolkit";

const initialUser = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;
const initialToken = sessionStorage.getItem("token")
  ? sessionStorage.getItem("token")
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
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    logoutSuccess: (state, action) => {
      state.token = "";
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
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
