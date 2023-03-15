import { createContext, useReducer } from "react";
import AuthReducers from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducers, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};