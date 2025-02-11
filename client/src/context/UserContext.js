import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  allUsers: [],
  users: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        allUsers: action.payload,
        users: action.payload,
      };
    case "FILTER_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "RESET_USERS":
      return {
        ...state,
        users: state.allUsers,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
