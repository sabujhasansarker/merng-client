import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

// IntialState
const initialState = {
  user: null,
};

// jwt decode
if (localStorage.getItem("jwtToken")) {
  const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodeToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// Reducer
function authReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case "LOGIN":
      localStorage.setItem("jwtToken", payload.token);
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// Action
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  function login(userData) {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}
export { AuthContext, AuthProvider };
